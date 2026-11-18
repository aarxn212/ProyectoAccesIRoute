-- =====================================================
-- DATOS REALES DEL INSTITUTO (SEMILLAS) - ACCESSIROUTE
-- =====================================================

-- 1. INSERTAR ESPACIOS
INSERT INTO espacios (id, nombre, bloque, planta, tipo, es_accesible, coord_x, coord_y) VALUES
-- =====================================================
-- BLOQUE A - PLANTA 1 (Baja)
-- =====================================================
('A-P1-ENTRADA',      'Entrada Principal Bloque A',          'A', 1, 'entrada',   true,  802, 439),
('A-P1-SECRETARIA',   'Secretaría Bloque A',                 'A', 1, 'direccion', true,  805, 484),
('A-P1-ACTOS',        'Sala de Actos',                       'A', 1, 'aula',      true,  849, 468),
('A-P1-PASILLO-IZQ',  'Pasillo Izquierda (Planta 1)',        'A', 1, 'pasillo',   true,  742, 477),
('A-P1-AULA-01',      'Aula A-01',                          'A', 1, 'aula',      true,  686, 482),
('A-P1-AULA-02',      'Aula A-02',                          'A', 1, 'aula',      true,  683, 518),
('A-P1-AULA-03',      'Aula A-03',                          'A', 1, 'aula',      true,  692, 558),
('A-P1-AULA-04',      'Aula A-04',                          'A', 1, 'aula',      true,  704, 624),
('A-P1-AULA-05',      'Aula A-05',                          'A', 1, 'aula',      true,  817, 624),
('A-P1-PASILLO-DER',  'Pasillo Derecha al Fondo (Planta 1)', 'A', 1, 'pasillo',   true,  806, 601),
('A-P1-AULA-06',      'Aula A-06',                          'A', 1, 'aula',      true,  850, 632),
('A-P1-AULA-07',      'Aula A-07',                          'A', 1, 'aula',      true,  948, 633),
('A-P1-AULA-08',      'Aula A-08',                          'A', 1, 'aula',      true,  934, 573),
('A-P1-AULA-09',      'Aula A-09',                          'A', 1, 'aula',      true,  922, 508),
('A-P1-AULA-10',      'Aula A-10',                          'A', 1, 'aula',      true,  982, 508),
('A-P1-ESCALERA',     'Escalera Bloque A (Planta 1)',        'A', 1, 'escalera',  false, 795, 528),
('A-P1-ASCENSOR',     'Ascensor Bloque A (Planta 1)',        'A', 1, 'ascensor',  true,  820, 522),
('A-P1-BANO-H',       'Baño Hombres Bloque A (Planta 1)',    'A', 1, 'bano',      true,  870, 600),
('A-P1-BANO-M',       'Baño Mujeres Bloque A (Planta 1)',    'A', 1, 'bano',      true,  897, 600),

-- =====================================================
-- BLOQUE A - PLANTA 2 (Alta)
-- =====================================================
('A-P2-HALL',         'Distribuidor Central Bloque A (Planta 2)', 'A', 2, 'pasillo',  true,  808, 501),
('A-P2-ESCALERA',     'Escalera Bloque A (Planta 2)',             'A', 2, 'escalera', false, 797, 548),
('A-P2-ASCENSOR',     'Ascensor Bloque A (Planta 2)',             'A', 2, 'ascensor', true,  826, 533),
('A-P2-PASILLO-IZQ',  'Pasillo Izquierda (Planta 2)',            'A', 2, 'pasillo',  true,  759, 596),
('A-P2-AULA-11',      'Aula A-11',                               'A', 2, 'aula',     true,  693, 609),
('A-P2-AULA-12',      'Aula A-12',                               'A', 2, 'aula',     true,  667, 613),
('A-P2-AULA-13',      'Aula A-13',                               'A', 2, 'aula',     true,  669, 552),
('A-P2-AULA-14',      'Aula A-14',                               'A', 2, 'aula',     true,  669, 492),
('A-P2-AULA-15',      'Aula A-15',                               'A', 2, 'aula',     true,  678, 467),
('A-P2-PASILLO-DER',  'Pasillo Derecha (Planta 2)',               'A', 2, 'pasillo',  true,  828, 605),
('A-P2-BANO-H',       'Baño Hombres Bloque A (Planta 2)',        'A', 2, 'bano',     true,  858, 594),
('A-P2-BANO-M',       'Baño Mujeres Bloque A (Planta 2)',        'A', 2, 'bano',     true,  846, 596),
('A-P2-AULA-16',      'Aula A-16',                               'A', 2, 'aula',     true,  798, 624),
('A-P2-AULA-17',      'Aula A-17',                               'A', 2, 'aula',     true,  861, 628),
('A-P2-AULA-18',      'Aula A-18',                               'A', 2, 'aula',     true,  913, 639),
('A-P2-AULA-19',      'Aula A-19',                               'A', 2, 'aula',     true,  949, 606),
('A-P2-AULA-20',      'Aula A-20',                               'A', 2, 'aula',     true,  924, 492),

-- =====================================================
-- BLOQUE B - PLANTA 1 Y 2
-- =====================================================
('B-P1-ENTRADA',      'Entrada Bloque B',               'B', 1, 'entrada',  true,  971, 215),
('B-P1-PASILLO',      'Pasillo Bloque B (Planta 1)',     'B', 1, 'pasillo',  true,  970, 124),
('B-P1-AULA-01',      'Aula B-01',                     'B', 1, 'aula',     true,  911, 192),
('B-P1-AULA-02',      'Aula B-02',                     'B', 1, 'aula',     true, 1039, 191),
('B-P1-AULA-03',      'Aula B-03',                     'B', 1, 'aula',     true,  908,  84),
('B-P1-AULA-04',      'Aula B-04',                     'B', 1, 'aula',     true, 1027,  60),
('B-P1-BANO',         'Baño Bloque B (Planta 1)',        'B', 1, 'bano',     true,  920,  62),
('B-P1-ESCALERA',     'Escalera Bloque B (Planta 1)',    'B', 1, 'escalera', false,  996,  80),
('B-P1-ASCENSOR',     'Ascensor Bloque B (Planta 1)',    'B', 1, 'ascensor', true,  620, 650),

('B-P2-PASILLO',      'Pasillo Bloque B (Planta 2)',     'B', 2, 'pasillo',  true,  982, 109),
('B-P2-ESCALERA',     'Escalera Bloque B (Planta 2)',    'B', 2, 'escalera', false, 1021,  45),
('B-P2-ASCENSOR',     'Ascensor Bloque B (Planta 2)',    'B', 2, 'ascensor', true,  980, 189),
('B-P2-AULA-05',      'Aula B-05',                     'B', 2, 'aula',     true, 1014,  67),
('B-P2-AULA-06',      'Aula B-06',                     'B', 2, 'aula',     true,  913,  46),
('B-P2-AULA-07',      'Aula B-07',                     'B', 2, 'aula',     true,  914,  99),
('B-P2-AULA-08',      'Aula B-08',                     'B', 2, 'aula',     true,  926, 146),
('B-P2-AULA-09',      'Aula B-09',                     'B', 2, 'aula',     true,  907, 189),
('B-P2-AULA-10',      'Aula B-10',                     'B', 2, 'aula',     true, 1017, 187),

-- =====================================================
-- BLOQUE C - DIRECCIÓN / SECRETARÍA (PLANTA ÚNICA)
-- =====================================================
('C-P1-ENTRADA',      'Entrada Bloque C (Dirección)',   'C', 1, 'entrada',   true,  951, 379),
('C-P1-DIRECCION',    'Despacho de Dirección',          'C', 1, 'direccion', true,  807, 310),
('C-P1-SECRETARIA',   'Secretaría General',             'C', 1, 'direccion', true,  756, 312),

-- =====================================================
-- BLOQUE D - GIMNASIO (PLANTA ÚNICA)
-- =====================================================
('D-P1-ENTRADA',      'Entrada Gimnasio',                      'D', 1, 'entrada',  true,  656, 169),
('D-P1-GIMNASIO',     'Pabellón Deportivo / Gimnasio',         'D', 1, 'gimnasio', true,  737, 167),

-- =====================================================
-- ZONA EXTERIOR - PATIO CENTRAL (Conecta los 4 bloques)
-- =====================================================
('EXT-PATIO',         'Patio Central del Instituto',           'A', 1, 'pasillo',  true,  953, 308)
ON CONFLICT (id) DO UPDATE SET coord_x = EXCLUDED.coord_x, coord_y = EXCLUDED.coord_y;


-- =====================================================
-- 2. INSERTAR CONEXIONES (GRAFO DE RUTAS)
-- =====================================================
DELETE FROM conexiones;

-- Conexiones exteriores entre Bloques a cota cero (Patio accesible)
INSERT INTO conexiones (id_espacio_origen, id_espacio_destino, tipo_conexion, es_accesible) VALUES
('EXT-PATIO', 'A-P1-ENTRADA', 'pasillo', true),
('A-P1-ENTRADA', 'EXT-PATIO', 'pasillo', true),
('EXT-PATIO', 'B-P1-ENTRADA', 'pasillo', true),
('B-P1-ENTRADA', 'EXT-PATIO', 'pasillo', true),
('EXT-PATIO', 'C-P1-ENTRADA', 'pasillo', true),
('C-P1-ENTRADA', 'EXT-PATIO', 'pasillo', true),
('EXT-PATIO', 'D-P1-ENTRADA', 'pasillo', true),
('D-P1-ENTRADA', 'EXT-PATIO', 'pasillo', true),

-- Bloque A - Planta 1 (Distribución en cruz)
('A-P1-ENTRADA', 'A-P1-SECRETARIA', 'puerta', true),
('A-P1-SECRETARIA', 'A-P1-ENTRADA', 'puerta', true),
('A-P1-ENTRADA', 'A-P1-ACTOS', 'puerta', true),
('A-P1-ACTOS', 'A-P1-ENTRADA', 'puerta', true),
('A-P1-ENTRADA', 'A-P1-ESCALERA', 'pasillo', true),
('A-P1-ESCALERA', 'A-P1-ENTRADA', 'pasillo', true),
('A-P1-ENTRADA', 'A-P1-ASCENSOR', 'pasillo', true),
('A-P1-ASCENSOR', 'A-P1-ENTRADA', 'pasillo', true),

-- Bloque A - Pasillo Izquierda PB (Aulas 1 a 5)
('A-P1-ENTRADA', 'A-P1-PASILLO-IZQ', 'pasillo', true),
('A-P1-PASILLO-IZQ', 'A-P1-ENTRADA', 'pasillo', true),
('A-P1-PASILLO-IZQ', 'A-P1-AULA-01', 'puerta', true),
('A-P1-AULA-01', 'A-P1-PASILLO-IZQ', 'puerta', true),
('A-P1-PASILLO-IZQ', 'A-P1-AULA-02', 'puerta', true),
('A-P1-AULA-02', 'A-P1-PASILLO-IZQ', 'puerta', true),
('A-P1-PASILLO-IZQ', 'A-P1-AULA-03', 'puerta', true),
('A-P1-AULA-03', 'A-P1-PASILLO-IZQ', 'puerta', true),
('A-P1-PASILLO-IZQ', 'A-P1-AULA-04', 'puerta', true),
('A-P1-AULA-04', 'A-P1-PASILLO-IZQ', 'puerta', true),
('A-P1-PASILLO-IZQ', 'A-P1-AULA-05', 'puerta', true),
('A-P1-AULA-05', 'A-P1-PASILLO-IZQ', 'puerta', true),

-- Bloque A - Pasillo Derecha PB (Aulas 6 a 10)
('A-P1-ENTRADA', 'A-P1-PASILLO-DER', 'pasillo', true),
('A-P1-PASILLO-DER', 'A-P1-ENTRADA', 'pasillo', true),
('A-P1-PASILLO-DER', 'A-P1-AULA-06', 'puerta', true),
('A-P1-AULA-06', 'A-P1-PASILLO-DER', 'puerta', true),
('A-P1-PASILLO-DER', 'A-P1-AULA-07', 'puerta', true),
('A-P1-AULA-07', 'A-P1-PASILLO-DER', 'puerta', true),
('A-P1-PASILLO-DER', 'A-P1-AULA-08', 'puerta', true),
('A-P1-AULA-08', 'A-P1-PASILLO-DER', 'puerta', true),
('A-P1-PASILLO-DER', 'A-P1-AULA-09', 'puerta', true),
('A-P1-AULA-09', 'A-P1-PASILLO-DER', 'puerta', true),
('A-P1-PASILLO-DER', 'A-P1-AULA-10', 'puerta', true),
('A-P1-AULA-10', 'A-P1-PASILLO-DER', 'puerta', true),
('A-P1-PASILLO-DER', 'A-P1-BANO-H', 'puerta', true),
('A-P1-BANO-H', 'A-P1-PASILLO-DER', 'puerta', true),
('A-P1-PASILLO-DER', 'A-P1-BANO-M', 'puerta', true),
('A-P1-BANO-M', 'A-P1-PASILLO-DER', 'puerta', true),

-- Bloque A - Conexiones Verticales (P1 <-> P2)
('A-P1-ESCALERA', 'A-P2-ESCALERA', 'escalera', false), -- ¡Barrera para silla de ruedas!
('A-P2-ESCALERA', 'A-P1-ESCALERA', 'escalera', false),
('A-P1-ASCENSOR', 'A-P2-ASCENSOR', 'ascensor', true),  -- ¡Accesible!
('A-P2-ASCENSOR', 'A-P1-ASCENSOR', 'ascensor', true),

-- Bloque A - Planta 2 (Distribuidor central con escaleras/ascensor)
('A-P2-ESCALERA', 'A-P2-HALL', 'pasillo', true),
('A-P2-HALL', 'A-P2-ESCALERA', 'pasillo', true),
('A-P2-ASCENSOR', 'A-P2-HALL', 'pasillo', true),
('A-P2-HALL', 'A-P2-ASCENSOR', 'pasillo', true),

-- Bloque A - Pasillo Izquierda P2 (Aulas 11 a 15)
('A-P2-HALL', 'A-P2-PASILLO-IZQ', 'pasillo', true),
('A-P2-PASILLO-IZQ', 'A-P2-HALL', 'pasillo', true),
('A-P2-PASILLO-IZQ', 'A-P2-AULA-11', 'puerta', true),
('A-P2-AULA-11', 'A-P2-PASILLO-IZQ', 'puerta', true),
('A-P2-PASILLO-IZQ', 'A-P2-AULA-12', 'puerta', true),
('A-P2-AULA-12', 'A-P2-PASILLO-IZQ', 'puerta', true),
('A-P2-PASILLO-IZQ', 'A-P2-AULA-13', 'puerta', true),
('A-P2-AULA-13', 'A-P2-PASILLO-IZQ', 'puerta', true),
('A-P2-PASILLO-IZQ', 'A-P2-AULA-14', 'puerta', true),
('A-P2-AULA-14', 'A-P2-PASILLO-IZQ', 'puerta', true),
('A-P2-PASILLO-IZQ', 'A-P2-AULA-15', 'puerta', true),
('A-P2-AULA-15', 'A-P2-PASILLO-IZQ', 'puerta', true),

-- Bloque A - Pasillo Derecha P2 (Aulas 16 a 20)
('A-P2-HALL', 'A-P2-PASILLO-DER', 'pasillo', true),
('A-P2-PASILLO-DER', 'A-P2-HALL', 'pasillo', true),
('A-P2-PASILLO-DER', 'A-P2-AULA-16', 'puerta', true),
('A-P2-AULA-16', 'A-P2-PASILLO-DER', 'puerta', true),
('A-P2-PASILLO-DER', 'A-P2-AULA-17', 'puerta', true),
('A-P2-AULA-17', 'A-P2-PASILLO-DER', 'puerta', true),
('A-P2-PASILLO-DER', 'A-P2-AULA-18', 'puerta', true),
('A-P2-AULA-18', 'A-P2-PASILLO-DER', 'puerta', true),
('A-P2-PASILLO-DER', 'A-P2-AULA-19', 'puerta', true),
('A-P2-AULA-19', 'A-P2-PASILLO-DER', 'puerta', true),
('A-P2-PASILLO-DER', 'A-P2-AULA-20', 'puerta', true),
('A-P2-AULA-20', 'A-P2-PASILLO-DER', 'puerta', true),
('A-P2-PASILLO-DER', 'A-P2-BANO-H', 'puerta', true),
('A-P2-BANO-H', 'A-P2-PASILLO-DER', 'puerta', true),
('A-P2-PASILLO-DER', 'A-P2-BANO-M', 'puerta', true),
('A-P2-BANO-M', 'A-P2-PASILLO-DER', 'puerta', true),

-- Bloque B - Planta 1
('B-P1-ENTRADA', 'B-P1-PASILLO', 'puerta', true),
('B-P1-PASILLO', 'B-P1-ENTRADA', 'puerta', true),
('B-P1-PASILLO', 'B-P1-AULA-01', 'puerta', true),
('B-P1-AULA-01', 'B-P1-PASILLO', 'puerta', true),
('B-P1-PASILLO', 'B-P1-AULA-02', 'puerta', true),
('B-P1-AULA-02', 'B-P1-PASILLO', 'puerta', true),
('B-P1-PASILLO', 'B-P1-AULA-03', 'puerta', true),
('B-P1-AULA-03', 'B-P1-PASILLO', 'puerta', true),
('B-P1-PASILLO', 'B-P1-AULA-04', 'puerta', true),
('B-P1-AULA-04', 'B-P1-PASILLO', 'puerta', true),
('B-P1-PASILLO', 'B-P1-BANO', 'puerta', true),
('B-P1-BANO', 'B-P1-PASILLO', 'puerta', true),
('B-P1-PASILLO', 'B-P1-ESCALERA', 'pasillo', true),
('B-P1-ESCALERA', 'B-P1-PASILLO', 'pasillo', true),
('B-P1-PASILLO', 'B-P1-ASCENSOR', 'pasillo', true),
('B-P1-ASCENSOR', 'B-P1-PASILLO', 'pasillo', true),

-- Bloque B - Conexión vertical
('B-P1-ESCALERA', 'B-P2-ESCALERA', 'escalera', false),
('B-P2-ESCALERA', 'B-P1-ESCALERA', 'escalera', false),
('B-P1-ASCENSOR', 'B-P2-ASCENSOR', 'ascensor', true),
('B-P2-ASCENSOR', 'B-P1-ASCENSOR', 'ascensor', true),

-- Bloque B - Planta 2
('B-P2-ESCALERA', 'B-P2-PASILLO', 'pasillo', true),
('B-P2-PASILLO', 'B-P2-ESCALERA', 'pasillo', true),
('B-P2-ASCENSOR', 'B-P2-PASILLO', 'pasillo', true),
('B-P2-PASILLO', 'B-P2-ASCENSOR', 'pasillo', true),
('B-P2-PASILLO', 'B-P2-AULA-05', 'puerta', true),
('B-P2-AULA-05', 'B-P2-PASILLO', 'puerta', true),
('B-P2-PASILLO', 'B-P2-AULA-06', 'puerta', true),
('B-P2-AULA-06', 'B-P2-PASILLO', 'puerta', true),
('B-P2-PASILLO', 'B-P2-AULA-07', 'puerta', true),
('B-P2-AULA-07', 'B-P2-PASILLO', 'puerta', true),
('B-P2-PASILLO', 'B-P2-AULA-08', 'puerta', true),
('B-P2-AULA-08', 'B-P2-PASILLO', 'puerta', true),
('B-P2-PASILLO', 'B-P2-AULA-09', 'puerta', true),
('B-P2-AULA-09', 'B-P2-PASILLO', 'puerta', true),
('B-P2-PASILLO', 'B-P2-AULA-10', 'puerta', true),
('B-P2-AULA-10', 'B-P2-PASILLO', 'puerta', true),

-- Bloque C - Dirección / Secretaría
('C-P1-ENTRADA', 'C-P1-DIRECCION', 'puerta', true),
('C-P1-DIRECCION', 'C-P1-ENTRADA', 'puerta', true),
('C-P1-ENTRADA', 'C-P1-SECRETARIA', 'puerta', true),
('C-P1-SECRETARIA', 'C-P1-ENTRADA', 'puerta', true),

-- Bloque D - Gimnasio
('D-P1-ENTRADA', 'D-P1-GIMNASIO', 'puerta', true),
('D-P1-GIMNASIO', 'D-P1-ENTRADA', 'puerta', true)
ON CONFLICT DO NOTHING;


-- =====================================================
-- 3. INSERTAR TIPOS DE INCIDENCIA
-- =====================================================
INSERT INTO tipos_incidencia (id, nombre, descripcion, color) VALUES
('obstaculo', 'Obstáculo', 'Obstáculo físico en la vía de paso', '#ea580c'),
('ascensor', 'Ascensor', 'Avería o parada técnica del ascensor', '#8b5cf6'),
('puerta', 'Puerta', 'Puerta bloqueada, cerrada o averiada', '#10b981'),
('rampa', 'Rampa', 'Rampa inaccesible o en mantenimiento', '#0284c7'),
('paso_bloqueado', 'Paso Bloqueado', 'Pasillo cerrado o zona clausurada', '#ef4444'),
('otro', 'Otro', 'Otra incidencia o barrera no clasificada', '#f59e0b')
ON CONFLICT (id) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  descripcion = EXCLUDED.descripcion,
  color = EXCLUDED.color;

