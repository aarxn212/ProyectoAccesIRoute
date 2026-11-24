-- =====================================================
-- ESQUEMA DE BASE DE DATOS: ACCESSIROUTE (PostgreSQL)
-- =====================================================

-- 1. Tabla de Espacios del Centro (nodos del grafo)
CREATE TABLE IF NOT EXISTS espacios (
    id VARCHAR(50) PRIMARY KEY,              -- Ejemplo: 'A-P1-ENTRADA', 'A-P1-AULA-01', 'D-P1-GIMNASIO'
    nombre VARCHAR(100) NOT NULL,            -- Ejemplo: 'Aula A-01', 'Entrada Principal Bloque A'
    bloque CHAR(1) NOT NULL,                 -- 'A', 'B', 'C', 'D'
    planta INT NOT NULL,                     -- 1 (Planta baja), 2 (Planta alta)
    tipo VARCHAR(30) NOT NULL,               -- 'aula', 'pasillo', 'escalera', 'ascensor', 'rampa', 'bano', 'direccion', 'gimnasio', 'entrada'
    es_accesible BOOLEAN DEFAULT true,       -- Si el espacio tiene acceso sin barreras arquitectonicas
    coord_x DOUBLE PRECISION,                -- Coordenada X en el plano tactil
    coord_y DOUBLE PRECISION                 -- Coordenada Y en el plano tactil
);

-- 2. Tabla de Conexiones entre Espacios (aristas del grafo)
CREATE TABLE IF NOT EXISTS conexiones (
    id SERIAL PRIMARY KEY,
    id_espacio_origen VARCHAR(50) REFERENCES espacios(id) ON DELETE CASCADE,
    id_espacio_destino VARCHAR(50) REFERENCES espacios(id) ON DELETE CASCADE,
    tipo_conexion VARCHAR(30) NOT NULL,      -- 'pasillo', 'puerta', 'escalera', 'ascensor', 'rampa'
    es_accesible BOOLEAN DEFAULT true,       -- False si es un tramo con escaleras
    CONSTRAINT conexion_unica UNIQUE (id_espacio_origen, id_espacio_destino)
);

-- 3. Tabla Maestra de Tipos de Incidencia
CREATE TABLE IF NOT EXISTS tipos_incidencia (
    id VARCHAR(30) PRIMARY KEY,              -- 'obstaculo', 'ascensor', 'puerta', 'rampa', 'paso_bloqueado', 'otro'
    nombre VARCHAR(50) NOT NULL,             -- Nombre legible para la interfaz
    descripcion TEXT,                        -- Detalle del tipo de problema
    color VARCHAR(20) DEFAULT '#f59e0b'      -- Color hexadecimal para la interfaz tactil
);

-- 4. Tabla de Incidencias Colaborativas
CREATE TABLE IF NOT EXISTS incidencias (
    id SERIAL PRIMARY KEY,
    id_espacio VARCHAR(50) REFERENCES espacios(id) ON DELETE CASCADE,
    tipo VARCHAR(30) NOT NULL,
    descripcion TEXT,                        -- Opcional
    estado VARCHAR(20) DEFAULT 'activa',     -- 'activa', 'resuelta'
    fecha_incidencia TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_incidencias_tipo
        FOREIGN KEY (tipo) REFERENCES tipos_incidencia(id) ON UPDATE CASCADE
);

-- 5. Tabla de Usuarios (Administracion)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'admin',
    creado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
