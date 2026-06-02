import { Router } from 'express';

import { supabase } from '../supabaseClient.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
    servicio: 'polla-mundial-2026-backend',
    estado: 'operativo',
    timestamp: new Date().toISOString()
  });
});

router.get('/supabase', async (req, res) => {
  try {
    const { error } = await supabase
      .from('configuracion_app')
      .select('clave')
      .limit(1);

    if (error) {
      res.status(503).json({
        ok: false,
        error: 'No se pudo conectar con Supabase o falta ejecutar el esquema inicial.'
      });
      return;
    }

    res.json({
      ok: true,
      supabase: 'conectado'
    });
  } catch (error) {
    res.status(503).json({
      ok: false,
      error: 'No se pudo validar la conexion con Supabase.'
    });
  }
});

export default router;
