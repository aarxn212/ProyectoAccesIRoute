-- =====================================================
-- ESQUEMA DE BASE DE DATOS: ACCESSIROUTE (PostgreSQL)
-- Todo en español según las directrices del proyecto
-- =====================================================

-- 1. Tabla de Espacios del Centro
CREATE TABLE IF NOT EXISTS espacios (
    id VARCHAR(50) PRIMARY KEY,              -- Ejemplo: 'A-P0-ENTRADA', 'A-P1-AULA101', 'D-P0-GYM'
    nombre VARCHAR(100) NOT NULL,            -- Ejemplo: 'Aula 101', 'Recepción', 'Gimnasio'
    bloque CHAR(1) NOT NULL,                 -- 'A', 'B', 'C', 'D'
    planta INT NOT NULL,                     -- 0 (Planta baja), 1 (Primera planta)
    tipo VARCHAR(30) NOT NULL,              -- 'aula', 'pasillo', 'escalera', 'ascensor', 'rampa', 'bano', 'direccion', 'gimnasio', 'entrada'
    es_accesible BOOLEAN DEFAULT true,       -- Si el espacio en sí tiene acceso sin barreras
    coord_x FLOAT,                           -- Coordenada X relativa en el plano táctil
    coord_y FLOAT                            -- Coordenada Y relativa en el plano táctil
);

-- 2. Tabla de Conexiones entre Espacios (Grafo para rutas)
CREATE TABLE IF NOT EXISTS conexiones (
    id SERIAL PRIMARY KEY,
    id_espacio_origen VARCHAR(50) REFERENCES espacios(id) ON DELETE CASCADE,
    id_espacio_destino VARCHAR(50) REFERENCES espacios(id) ON DELETE CASCADE,
    tipo_conexion VARCHAR(30) NOT NULL,      -- 'pasillo', 'puerta', 'escalera', 'ascensor', 'rampa'
    es_accesible BOOLEAN DEFAULT true,       -- False si por ejemplo es una escalera tradicional
    CONSTRAINT conexion_unica UNIQUE (id_espacio_origen, id_espacio_destino)
);

-- 3. Tabla Maestra de Tipos de Incidencia
CREATE TABLE IF NOT EXISTS tipos_incidencia (
    id VARCHAR(30) PRIMARY KEY,              -- 'obstaculo', 'ascensor', 'puerta', 'rampa', 'paso_bloqueado', 'otro'
    nombre VARCHAR(50) NOT NULL,            -- Nombre legible para la interfaz
    descripcion TEXT,                        -- Detalle del tipo de problema
    color VARCHAR(20) DEFAULT '#f59e0b'      -- Color hexadecimal para la interfaz táctil
);

-- 4. Tabla de Incidencias Colaborativas (Tipo Waze)
CREATE TABLE IF NOT EXISTS incidencias (
    id SERIAL PRIMARY KEY,
    id_espacio VARCHAR(50) REFERENCES espacios(id) ON DELETE CASCADE,
    tipo VARCHAR(30) NOT NULL REFERENCES tipos_incidencia(id) ON UPDATE CASCADE,
    descripcion TEXT,                        -- Opcional
    estado VARCHAR(20) DEFAULT 'activa',     -- 'activa', 'resuelta'
    fecha_incidencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de Usuarios (Administración)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'admin',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
