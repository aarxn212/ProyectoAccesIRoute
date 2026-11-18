import { useState } from 'react';
import MapaCentro from './componentes/MapaCentro';
import ModalReportar from './componentes/ModalReportar';

function App() {
  const [espacios, setEspacios] = useState([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);

  // Estados del flujo de reporte de incidencias
  const [modalReportarAbierto, setModalReportarAbierto] = useState(false);
  const [modoReporte, setModoReporte] = useState(false);
  const [tipoIncidencia, setTipoIncidencia] = useState(null);
  const [espacioReporteDirecto, setEspacioReporteDirecto] = useState(null);
  const [actualizadorIncidencias, setActualizadorIncidencias] = useState(0);
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

  // Reportar desde el popup de un aula
  function reportarDesdeEspacio(espacio) {
    if (espacio.tiene_incidencia) {
      alert('Este espacio ya tiene una incidencia activa registrada. No se pueden marcar más.');
      return;
    }
    setEspacioReporteDirecto(espacio);
    setEspacioSeleccionado(null);
    setModalReportarAbierto(true);
  }

  // Al elegir el tipo de incidencia en el modal
  function seleccionarTipoIncidencia(tipo) {
    setModalReportarAbierto(false);

    if (espacioReporteDirecto) {
      // Si ya sabemos el espacio, guardamos directo
      guardarIncidencia({ tipo, id_espacio: espacioReporteDirecto.id });
      setEspacioReporteDirecto(null);
    } else {
      // Si se pulso el boton de arriba, pedimos tocar el mapa
      setTipoIncidencia(tipo);
      setModoReporte(true);
    }
  }

  // Enviar la incidencia a la API de Express
  async function guardarIncidencia({ tipo, id_espacio }) {
    try {
      const respuesta = await fetch('http://localhost:3001/api/incidencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_espacio,
          tipo,
          descripcion: `Incidencia reportada en quiosco`
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'Error al guardar la incidencia');
      }

      setModoReporte(false);
      setTipoIncidencia(null);
      setActualizadorIncidencias((prev) => prev + 1);

      const textoExito = datos.total_afectados > 1
        ? 'Incidencia registrada y aplicada a ambas plantas del edificio.'
        : 'Incidencia registrada con éxito en el mapa.';
      setMensajeNotificacion(textoExito);
      setTimeout(() => setMensajeNotificacion(null), 4000);
    } catch (error) {
      console.error('Error al guardar incidencia:', error);
      alert(error.message || 'No se pudo registrar la incidencia.');
    }
  }

  function cancelarReporte() {
    setModoReporte(false);
    setTipoIncidencia(null);
    setEspacioReporteDirecto(null);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {/* Barra superior */}
      <header className="barra-superior" role="banner">
        <div className="marca-app">
          <span>AccessiRoute</span>
          <span className="marca-badge">Panel Táctil</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setModalReportarAbierto(true)}
            className="boton-tactil boton-reportar"
          >
            Reportar
          </button>

          <button
            type="button"
            className="boton-tactil"
            style={{ opacity: 0.7 }}
          >
            Admin
          </button>
        </div>
      </header>

      {/* Mapa interactivo */}
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <MapaCentro
          onSeleccionarEspacio={(espacio) => setEspacioSeleccionado(espacio)}
          onReportarEspacio={reportarDesdeEspacio}
          onCargarEspacios={(lista) => setEspacios(lista)}
          modoReporte={modoReporte}
          tipoIncidenciaAReportar={tipoIncidencia}
          onConfirmarReporte={guardarIncidencia}
          onCancelarReporte={cancelarReporte}
          actualizadorIncidencias={actualizadorIncidencias}
        />

        {/* Tarjeta de informacion del espacio seleccionado */}
        {espacioSeleccionado && (
          <aside
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              backgroundColor: espacioSeleccionado.tiene_incidencia ? '#450a0a' : 'var(--fondo-superficie)',
              border: espacioSeleccionado.tiene_incidencia ? '2px solid #ef4444' : '2px solid var(--color-primario)',
              borderRadius: 'var(--radio-borde)',
              padding: '14px 20px',
              boxShadow: 'var(--sombra-panel)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{espacioSeleccionado.nombre}</h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--texto-secundario)' }}>
                Bloque {espacioSeleccionado.bloque} • Planta {espacioSeleccionado.planta} • {espacioSeleccionado.tipo}
              </p>
              <p style={{
                margin: '4px 0 0',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: espacioSeleccionado.tiene_incidencia
                  ? '#f87171'
                  : (espacioSeleccionado.es_accesible ? '#4ade80' : '#f87171')
              }}>
                {espacioSeleccionado.tiene_incidencia
                  ? 'Inaccesible por incidencia activa'
                  : (espacioSeleccionado.es_accesible
                      ? 'Adaptat per movilitat reducida'
                      : 'Acceso no adaptado para movilidad reducida')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEspacioSeleccionado(null)}
              style={{
                background: 'transparent',
                color: 'var(--texto-atenuado)',
                border: '1px solid var(--borde-suave)',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cerrar
            </button>
          </aside>
        )}

        {/* Notificacion flotante de exito */}
        {mensajeNotificacion && (
          <aside
            role="status"
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 1100,
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid #10b981',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: '8px',
              boxShadow: 'var(--sombra-panel)',
              fontWeight: 600
            }}
          >
            {mensajeNotificacion}
          </aside>
        )}
      </main>

      {/* Modal para elegir tipo de incidencia */}
      <ModalReportar
        abierto={modalReportarAbierto}
        onCerrar={() => setModalReportarAbierto(false)}
        onSeleccionarTipo={seleccionarTipoIncidencia}
      />
    </div>
  );
}

export default App;
