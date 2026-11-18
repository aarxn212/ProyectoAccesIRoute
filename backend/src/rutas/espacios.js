import { Router } from 'express';
import { pool } from '../db/conexion.js';

const router = Router();

// Devuelve todos los espacios y si tienen alguna incidencia activa
router.get('/', async (req, res) => {
  try {
    const consulta = `
      SELECT 
        e.id, 
        e.nombre, 
        e.bloque, 
        e.planta, 
        e.tipo, 
        e.es_accesible, 
        e.coord_x, 
        e.coord_y,
        EXISTS(
          SELECT 1 FROM incidencias i 
          WHERE i.id_espacio = e.id AND i.estado = 'activa'
        ) AS tiene_incidencia
      FROM espacios e 
      ORDER BY e.bloque, e.planta, e.nombre ASC;
    `;
    const { rows } = await pool.query(consulta);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los espacios:', error);
    res.status(500).json({ error: 'Error al consultar espacios en la base de datos' });
  }
});

// Busca un espacio por su id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = `
      SELECT 
        e.id, 
        e.nombre, 
        e.bloque, 
        e.planta, 
        e.tipo, 
        e.es_accesible, 
        e.coord_x, 
        e.coord_y,
        EXISTS(
          SELECT 1 FROM incidencias i 
          WHERE i.id_espacio = e.id AND i.estado = 'activa'
        ) AS tiene_incidencia
      FROM espacios e 
      WHERE e.id = $1;
    `;
    const { rows } = await pool.query(consulta, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Espacio no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(`Error al buscar el espacio ${id}:`, error);
    res.status(500).json({ error: 'Error al consultar el espacio' });
  }
});

export default router;
