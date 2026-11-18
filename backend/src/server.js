import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rutasEspacios from './rutas/espacios.js';
import rutasIncidencias from './rutas/incidencias.js';

dotenv.config();

const app = express();
const puerto = process.env.PUERTO || process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoints principales
app.use('/api/espacios', rutasEspacios);
app.use('/api/incidencias', rutasIncidencias);

// Health check para saber si la api responde
app.get('/api/health', (req, res) => {
  res.json({ estado: 'ok', fecha: new Date() });
});

app.listen(puerto, () => {
  console.log(`Servidor iniciado en http://localhost:${puerto}`);
});
