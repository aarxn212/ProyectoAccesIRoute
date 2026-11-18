import { Router } from 'express';
import { pool } from '../db/conexion.js';

const router = Router();

// Obtener los tipos de incidencia para el selector
router.get('/tipos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, nombre, descripcion, color FROM tipos_incidencia ORDER BY nombre ASC;');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los tipos de incidencia:', error);
    res.status(500).json({ error: 'Error al consultar tipos de incidencia' });
  }
});

// Listar incidencias (por defecto las activas)
router.get('/', async (req, res) => {
  const { estado = 'activa' } = req.query;

  try {
    let consulta = `
      SELECT 
        i.id,
        i.id_espacio,
        e.nombre AS nombre_espacio,
        e.bloque,
        e.planta,
        e.coord_x,
        e.coord_y,
        i.tipo,
        ti.nombre AS nombre_tipo,
        ti.color AS color_tipo,
        i.descripcion,
        i.estado,
        i.fecha_incidencia
      FROM incidencias i
      JOIN espacios e ON i.id_espacio = e.id
      LEFT JOIN tipos_incidencia ti ON i.tipo = ti.id
    `;

    const params = [];
    if (estado !== 'todas') {
      consulta += ' WHERE i.estado = $1';
      params.push(estado);
    }
    consulta += ' ORDER BY i.fecha_incidencia DESC;';

    const { rows } = await pool.query(consulta, params);
    res.json(rows);
  } catch (error) {
    console.error('Error al listar incidencias:', error);
    res.status(500).json({ error: 'Error al consultar incidencias' });
  }
});

// Registrar nueva incidencia
router.post('/', async (req, res) => {
  const { id_espacio, tipo, descripcion = '' } = req.body;

  if (!id_espacio || !tipo) {
    return res.status(400).json({ error: 'Falta indicar el espacio y el tipo de incidencia' });
  }

  try {
    // Comprobar que el espacio y el tipo existen
    const [espacioRes, tipoRes] = await Promise.all([
      pool.query('SELECT id, bloque, planta, tipo FROM espacios WHERE id = $1;', [id_espacio]),
      pool.query('SELECT id FROM tipos_incidencia WHERE id = $1;', [tipo])
    ]);

    if (espacioRes.rows.length === 0) {
      return res.status(404).json({ error: 'El espacio indicado no existe' });
    }

    if (tipoRes.rows.length === 0) {
      return res.status(400).json({ error: 'El tipo de incidencia no es valido' });
    }

    const espacio = espacioRes.rows[0];

    // Si es ascensor o escalera, la incidencia afecta a ambas plantas del mismo edificio
    let espaciosAfectados = [espacio.id];
    if (espacio.tipo === 'ascensor' || espacio.tipo === 'escalera') {
      const { rows } = await pool.query(
        'SELECT id FROM espacios WHERE bloque = $1 AND tipo = $2;',
        [espacio.bloque, espacio.tipo]
      );
      espaciosAfectados = rows.map((e) => e.id);
    }

    // Verificar si ya tiene incidencia activa
    const { rows: activas } = await pool.query(
      "SELECT id_espacio FROM incidencias WHERE id_espacio = ANY($1) AND estado = 'activa';",
      [espaciosAfectados]
    );

    if (activas.length > 0) {
      return res.status(400).json({
        error: 'Este espacio (o su ascensor/escalera en la otra planta) ya tiene una incidencia activa registrada.'
      });
    }

    // Insertar la incidencia (en una o en las dos plantas si es ascensor/escalera)
    const creadas = [];
    for (const idEsp of espaciosAfectados) {
      const { rows } = await pool.query(
        "INSERT INTO incidencias (id_espacio, tipo, descripcion, estado) VALUES ($1, $2, $3, 'activa') RETURNING *;",
        [idEsp, tipo, descripcion]
      );
      creadas.push(rows[0]);
    }

    res.status(201).json({
      mensaje: 'Incidencia guardada con exito',
      total_afectados: creadas.length,
      incidencias: creadas
    });
  } catch (error) {
    console.error('Error al guardar incidencia:', error);
    res.status(500).json({ error: 'Error al registrar la incidencia' });
  }
});

// Marcar incidencia como resuelta
router.patch('/:id/resolver', async (req, res) => {
  const { id } = req.params;

  try {
    const { rows: incActual } = await pool.query(
      `SELECT i.id, i.id_espacio, e.bloque, e.tipo AS tipo_espacio
       FROM incidencias i
       JOIN espacios e ON i.id_espacio = e.id
       WHERE i.id = $1;`,
      [id]
    );

    if (incActual.length === 0) {
      return res.status(404).json({ error: 'Incidencia no encontrada' });
    }

    const { bloque, tipo_espacio } = incActual[0];

    // Si es ascensor o escalera se resuelven ambas plantas
    if (tipo_espacio === 'ascensor' || tipo_espacio === 'escalera') {
      await pool.query(
        `UPDATE incidencias 
         SET estado = 'resuelta' 
         WHERE estado = 'activa' 
           AND id_espacio IN (SELECT id FROM espacios WHERE bloque = $1 AND tipo = $2);`,
        [bloque, tipo_espacio]
      );
    } else {
      await pool.query("UPDATE incidencias SET estado = 'resuelta' WHERE id = $1;", [id]);
    }

    res.json({ mensaje: 'Incidencia marcada como resuelta' });
  } catch (error) {
    console.error(`Error al resolver la incidencia ${id}:`, error);
    res.status(500).json({ error: 'Error al resolver la incidencia' });
  }
});

export default router;
