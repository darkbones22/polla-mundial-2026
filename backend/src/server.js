import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';

import { configurarCors } from './middleware/cors.js';
import { validarVariablesEntorno } from './utils/validarEntorno.js';
import apiRoutes from './routes/index.js';

validarVariablesEntorno();

const app = express();
const puerto = Number(process.env.PORT || 3001);

app.use(helmet());
app.use(configurarCors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: 'Ruta no encontrada'
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    ok: false,
    error: error.message || 'Error interno del servidor'
  });
});

app.listen(puerto, () => {
  console.log(`Backend Polla Mundial 2026 escuchando en http://localhost:${puerto}`);
});
