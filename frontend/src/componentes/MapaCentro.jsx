import { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import imagenPlano from '../assets/plano-instituto.png';

// Medidas reales del plano arquitectonico
const ANCHO_PLANO = 1440;
const ALTO_PLANO = 675;
const LIMITES_PLANO = [
  [0, 0],
  [ALTO_PLANO, ANCHO_PLANO]
];

// Emojis segun el tipo de espacio
const EMOJIS_TIPO = {
  entrada: '🚪',
  aula: '📚',
  ascensor: '🛗',
  escalera: '🪜',
  direccion: '🏛️',
  gimnasio: '🏀',
  bano: '🚻',
  pasillo: '🚶'
};

// Ajustar el mapa al contenedor para que ocupe toda la pantalla
function AjustarPlanoPantalla() {
  const mapa = useMap();

  useEffect(() => {
    function centrarYAdaptar() {
      mapa.invalidateSize();
      const tamaño = mapa.getSize();
      if (!tamaño || tamaño.x <= 0) return;

      const escala = Math.max(tamaño.x / ANCHO_PLANO, tamaño.y / ALTO_PLANO);
      const zoom = Math.log2(escala);

      mapa.setMinZoom(-5);
      mapa.setMaxZoom(10);
      mapa.setView([ALTO_PLANO / 2, ANCHO_PLANO / 2], zoom, { animate: false });
      mapa.setMinZoom(zoom);
      mapa.setMaxZoom(zoom);
    }

    centrarYAdaptar();
    window.addEventListener('resize', centrarYAdaptar);
    return () => window.removeEventListener('resize', centrarYAdaptar);
  }, [mapa]);

  return null;
}

// Detectar toques en el mapa al reportar
function ClicEnPlano({ activo, onCoordenadas }) {
  useMapEvents({
    click(evento) {
      if (activo && onCoordenadas) {
        onCoordenadas({
          coord_x: Math.round(evento.latlng.lng),
          coord_y: Math.round(evento.latlng.lat)
        });
      }
    }
  });
  return null;
}

// Generar icono del marcador para Leaflet
function obtenerIconoEspacio(espacio, tieneIncidencia) {
  let emoji = EMOJIS_TIPO[espacio.tipo] || '📚';
  let colorFondo = '#2563eb';

  if (espacio.id.includes('ACTOS')) {
    emoji = '🎭';
    colorFondo = '#ec4899';
  } else if (espacio.id.includes('PATIO')) {
    emoji = '🌳';
    colorFondo = '#15803d';
  } else if (espacio.id.includes('BANO-H')) {
    emoji = '🚹';
    colorFondo = '#0284c7';
  } else if (espacio.id.includes('BANO-M')) {
    emoji = '🚺';
    colorFondo = '#db2777';
  } else if (espacio.tipo === 'entrada') {
    colorFondo = '#10b981';
  } else if (espacio.tipo === 'ascensor') {
    colorFondo = '#8b5cf6';
  } else if (espacio.tipo === 'escalera') {
    colorFondo = '#64748b';
  }

  if (tieneIncidencia) {
    emoji = '🚨';
    colorFondo = '#ef4444';
  }

  return L.divIcon({
    className: 'icono-marcador-contenedor',
    html: `
      <div style="
        background-color: ${colorFondo};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        border: 2px solid #ffffff;
      ">
        ${emoji}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
  });
}

// Icono para incidencias activas en el mapa
function obtenerIconoIncidencia(incidencia) {
  const color = incidencia.color_tipo || '#ef4444';
  return L.divIcon({
    className: 'icono-marcador-incidencia',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 0 12px ${color};
        border: 2px solid #ffffff;
      ">
        ⚠️
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
}

// Chincheta temporal en el punto tocado
const iconoChincheta = L.divIcon({
  className: 'chincheta-temporal',
  html: `
    <div style="
      background-color: #ef4444;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 0 20px #ef4444;
      border: 3px solid #ffffff;
    ">
      📍
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

export default function MapaCentro({
  onSeleccionarEspacio,
  onReportarEspacio,
  onCargarEspacios,
  modoReporte = false,
  tipoIncidenciaAReportar = null,
  onConfirmarReporte,
  onCancelarReporte,
  actualizadorIncidencias = 0
}) {
  const [espacios, setEspacios] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [planta, setPlanta] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [puntoReporte, setPuntoReporte] = useState(null);

  // Cargar espacios e incidencias desde la API
  useEffect(() => {
    async function cargarDatos() {
      try {
        const resEspacios = await fetch('http://localhost:3001/api/espacios');
        const listaEspacios = await resEspacios.json();
        setEspacios(listaEspacios);
        if (onCargarEspacios) onCargarEspacios(listaEspacios);

        const resIncidencias = await fetch('http://localhost:3001/api/incidencias');
        const listaIncidencias = await resIncidencias.json();
        setIncidencias(listaIncidencias);
      } catch (error) {
        console.error('Error al conectar con la API:', error);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, [actualizadorIncidencias, onCargarEspacios]);

  useEffect(() => {
    if (!modoReporte) setPuntoReporte(null);
  }, [modoReporte]);

  // Espacios e incidencias de la planta seleccionada
  const espaciosPlanta = espacios.filter(
    (e) => e.planta === planta && e.coord_x !== null && e.coord_y !== null
  );

  const incidenciasPlanta = incidencias.filter(
    (i) => i.planta === planta && i.coord_x !== null && i.coord_y !== null
  );

  // Buscar el espacio mas cercano al tocar la pantalla
  const espacioMasCercano = puntoReporte
    ? espaciosPlanta.reduce((masCercano, actual) => {
        const distActual = Math.hypot(actual.coord_x - puntoReporte.coord_x, actual.coord_y - puntoReporte.coord_y);
        if (!masCercano) return { espacio: actual, distancia: distActual };
        const distMinima = Math.hypot(masCercano.espacio.coord_x - puntoReporte.coord_x, masCercano.espacio.coord_y - puntoReporte.coord_y);
        return distActual < distMinima ? { espacio: actual, distancia: distActual } : masCercano;
      }, null)
    : null;

  if (cargando) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--texto-secundario)' }}>
        Cargando plano del centro educativo...
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* Banner de aviso en modo reporte */}
      {modoReporte && (
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          backgroundColor: '#dc2626',
          color: '#ffffff',
          padding: '10px 20px',
          borderRadius: '10px',
          fontWeight: 700,
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          border: '2px solid #ffffff'
        }}>
          MODO REPORTE: Toca en el mapa donde esta el problema ({tipoIncidenciaAReportar})
        </div>
      )}

      {/* Selector de plantas */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        padding: '6px',
        borderRadius: '12px',
        border: '1px solid var(--borde-suave)'
      }}>
        <button
          type="button"
          onClick={() => setPlanta(1)}
          className={`boton-tactil ${planta === 1 ? 'boton-primario' : ''}`}
          style={{ minHeight: '40px', padding: '8px 16px', fontSize: '0.95rem' }}
        >
          Planta 1 (Baja)
        </button>
        <button
          type="button"
          onClick={() => setPlanta(2)}
          className={`boton-tactil ${planta === 2 ? 'boton-primario' : ''}`}
          style={{ minHeight: '40px', padding: '8px 16px', fontSize: '0.95rem' }}
        >
          Planta 2 (Alta)
        </button>
      </div>

      {/* Mapa Leaflet */}
      <MapContainer
        crs={L.CRS.Simple}
        center={[ALTO_PLANO / 2, ANCHO_PLANO / 2]}
        zoom={0}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
        fadeAnimation={false}
        zoomAnimation={false}
        maxBounds={LIMITES_PLANO}
        style={{ width: '100%', height: '100%', backgroundColor: '#090d16' }}
      >
        <AjustarPlanoPantalla />
        <ImageOverlay url={imagenPlano} bounds={LIMITES_PLANO} />

        <ClicEnPlano
          activo={modoReporte}
          onCoordenadas={(coords) => setPuntoReporte(coords)}
        />

        {modoReporte && puntoReporte && (
          <Marker position={[puntoReporte.coord_y, puntoReporte.coord_x]} icon={iconoChincheta} />
        )}

        {/* Marcadores de incidencias activas */}
        {incidenciasPlanta.map((inc) => (
          <Marker
            key={`inc-${inc.id}`}
            position={[inc.coord_y, inc.coord_x]}
            icon={obtenerIconoIncidencia(inc)}
          >
            <Popup>
              <div style={{ padding: '4px', minWidth: '180px' }}>
                <h4 style={{ margin: '0 0 4px', color: '#dc2626' }}>Incidencia activa</h4>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>{inc.nombre_tipo || inc.tipo}</p>
                <p style={{ margin: '0', fontSize: '0.85rem', color: '#475569' }}>{inc.nombre_espacio}</p>
                {inc.descripcion && <p style={{ margin: '4px 0 0', fontStyle: 'italic', fontSize: '0.8rem' }}>"{inc.descripcion}"</p>}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Marcadores de los espacios */}
        {espaciosPlanta.map((espacio) => {
          const tieneIncidencia = Boolean(espacio.tiene_incidencia || incidencias.some((i) => i.id_espacio === espacio.id));
          return (
            <Marker
              key={`espacio-${espacio.id}`}
              position={[espacio.coord_y, espacio.coord_x]}
              icon={obtenerIconoEspacio(espacio, tieneIncidencia)}
              eventHandlers={{
                click: (e) => {
                  if (e.originalEvent) e.originalEvent.stopPropagation();
                  if (modoReporte) {
                    if (tieneIncidencia) {
                      alert('Este espacio ya tiene una incidencia activa registrada. No se pueden marcar más.');
                      return;
                    }
                    setPuntoReporte({ coord_x: espacio.coord_x, coord_y: espacio.coord_y });
                  }
                }
              }}
            >
              <Popup>
                <div style={{
                  padding: '8px 10px',
                  minWidth: '200px',
                  borderRadius: '8px',
                  backgroundColor: tieneIncidencia ? '#fef2f2' : '#ffffff',
                  border: tieneIncidencia ? '2px solid #ef4444' : '1px solid #cbd5e1'
                }}>
                  {tieneIncidencia && (
                    <div style={{
                      backgroundColor: '#fee2e2',
                      color: '#b91c1c',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      display: 'inline-block'
                    }}>
                      Aviso de incidencia
                    </div>
                  )}

                  <h3 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#0f172a' }}>{espacio.nombre}</h3>
                  <p style={{ margin: '0 0 6px', fontSize: '0.85rem', color: '#475569' }}>
                    Bloque {espacio.bloque} - Planta {espacio.planta}
                  </p>

                  <p style={{
                    margin: '0 0 10px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: tieneIncidencia ? '#dc2626' : (espacio.es_accesible ? '#15803d' : '#b91c1c')
                  }}>
                    {tieneIncidencia
                      ? 'Inaccesible por incidencia activa'
                      : (espacio.es_accesible
                          ? 'Adaptat per movilitat reducida'
                          : 'Acceso no adaptado para movilidad reducida')}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {onSeleccionarEspacio && (
                      <button
                        type="button"
                        onClick={() => onSeleccionarEspacio({ ...espacio, tiene_incidencia: tieneIncidencia })}
                        style={{
                          padding: '8px',
                          backgroundColor: '#2563eb',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                      >
                        Seleccionar espacio
                      </button>
                    )}

                    {!tieneIncidencia && onReportarEspacio && (
                      <button
                        type="button"
                        onClick={() => onReportarEspacio(espacio)}
                        style={{
                          padding: '8px',
                          backgroundColor: '#dc2626',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                      >
                        Reportar incidencia
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Barra inferior de confirmacion en modo reporte */}
      {modoReporte && (
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          border: '2px solid var(--color-peligro)',
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: 'var(--sombra-panel)'
        }}>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--color-peligro)' }}>
              {puntoReporte ? 'Punto fijado en el mapa' : 'Toca el mapa en el lugar exacto'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--texto-secundario)' }}>
              {puntoReporte && espacioMasCercano
                ? (espacioMasCercano.espacio.tiene_incidencia || incidencias.some((i) => i.id_espacio === espacioMasCercano.espacio.id)
                    ? `⚠️ ${espacioMasCercano.espacio.nombre} ya tiene incidencia activa. No se pueden marcar más.`
                    : `Espacio más cercano: ${espacioMasCercano.espacio.nombre}`)
                : 'Indica la posición de la avería o barrera'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              disabled={
                !puntoReporte ||
                Boolean(espacioMasCercano?.espacio && (espacioMasCercano.espacio.tiene_incidencia || incidencias.some((i) => i.id_espacio === espacioMasCercano.espacio.id)))
              }
              onClick={() => {
                const tieneActiva = espacioMasCercano?.espacio && (espacioMasCercano.espacio.tiene_incidencia || incidencias.some((i) => i.id_espacio === espacioMasCercano.espacio.id));
                if (tieneActiva) {
                  alert('Este espacio ya tiene una incidencia activa.');
                  return;
                }
                if (puntoReporte && onConfirmarReporte) {
                  onConfirmarReporte({
                    tipo: tipoIncidenciaAReportar,
                    id_espacio: espacioMasCercano?.espacio?.id || espaciosPlanta[0]?.id
                  });
                  setPuntoReporte(null);
                }
              }}
              style={{
                backgroundColor: (puntoReporte && !espacioMasCercano?.espacio?.tiene_incidencia && !incidencias.some((i) => i.id_espacio === espacioMasCercano?.espacio?.id))
                  ? 'var(--color-peligro)'
                  : '#475569',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 700,
                cursor: (puntoReporte && !espacioMasCercano?.espacio?.tiene_incidencia && !incidencias.some((i) => i.id_espacio === espacioMasCercano?.espacio?.id))
                  ? 'pointer'
                  : 'not-allowed'
              }}
            >
              Confirmar
            </button>
            <button
              type="button"
              onClick={() => {
                setPuntoReporte(null);
                if (onCancelarReporte) onCancelarReporte();
              }}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--borde-suave)',
                color: 'var(--texto-atenuado)',
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
