import { useState, useEffect } from 'react';

export default function ModalReportar({ abierto, onCerrar, onSeleccionarTipo }) {
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!abierto) return;

    let cancelado = false;
    setCargando(true);

    fetch('http://localhost:3001/api/incidencias/tipos')
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('Error al cargar tipos de incidencia');
        return respuesta.json();
      })
      .then((datos) => {
        if (!cancelado) {
          setTipos(datos);
          setCargando(false);
        }
      })
      .catch((error) => {
        console.error('Error al obtener tipos de incidencia:', error);
        if (!cancelado) {
          // Tipos de reserva en caso de fallo temporal de red
          setTipos([
            { id: 'obstaculo', nombre: 'Obstáculo', color: '#ea580c' },
            { id: 'ascensor', nombre: 'Ascensor', color: '#8b5cf6' },
            { id: 'puerta', nombre: 'Puerta', color: '#10b981' },
            { id: 'rampa', nombre: 'Rampa', color: '#0284c7' },
            { id: 'paso_bloqueado', nombre: 'Paso Bloqueado', color: '#ef4444' },
            { id: 'otro', nombre: 'Otro', color: '#f59e0b' }
          ]);
          setCargando(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, [abierto]);

  if (!abierto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-reportar"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--fondo-superficie)',
          border: '2px solid var(--color-peligro)',
          borderRadius: 'var(--radio-borde)',
          width: '100%',
          maxWidth: '520px',
          boxShadow: 'var(--sombra-panel)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 id="titulo-modal-reportar" style={{ fontSize: '1.4rem', margin: 0, color: 'var(--texto-principal)' }}>
              Reportar Incidencia
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--texto-secundario)' }}>
              Selecciona el tipo y luego coloca el marcador con el dedo en el mapa
            </p>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar ventana de reporte"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--texto-atenuado)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            Cerrar
          </button>
        </div>

        {cargando ? (
          <div style={{ textAlign: 'center', padding: '24px', color: 'var(--texto-secundario)' }}>
            Cargando tipos de incidencia desde el servidor...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {tipos.map((tipo) => (
              <button
                key={tipo.id}
                type="button"
                onClick={() => onSeleccionarTipo(tipo.id)}
                className="boton-tactil"
                style={{
                  minHeight: '64px',
                  padding: '14px 18px',
                  backgroundColor: 'var(--fondo-elevado)',
                  border: `2px solid ${tipo.color || '#f59e0b'}`,
                  color: 'var(--texto-principal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '14px',
                  fontSize: '1.1rem',
                  borderRadius: '12px'
                }}
              >
                <span style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: tipo.color || '#f59e0b',
                  display: 'inline-block',
                  boxShadow: `0 0 8px ${tipo.color || '#f59e0b'}`
                }} aria-hidden="true" />
                <span style={{ fontWeight: 700 }}>{tipo.nombre}</span>
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onCerrar}
          style={{
            minHeight: '44px',
            backgroundColor: 'transparent',
            border: '1px solid var(--borde-suave)',
            color: 'var(--texto-atenuado)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
