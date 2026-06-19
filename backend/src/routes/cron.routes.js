import { Router } from 'express';

import { sincronizarPartidosVinculadosEspn } from '../services/espn.service.js';

const router = Router();

function validarSecretoEspnSync(req) {
  const secretoConfigurado = String(process.env.ESPN_SYNC_SECRET || '').trim();
  const secretoRecibido = String(req.get('x-espn-sync-secret') || '').trim();

  if (!secretoConfigurado) {
    const error = new Error('ESPN_SYNC_SECRET no configurado');
    error.status = 503;
    throw error;
  }

  if (!secretoRecibido || secretoRecibido !== secretoConfigurado) {
    const error = new Error('No autorizado');
    error.status = 401;
    throw error;
  }
}

router.post('/espn/sync-linked', async (req, res, next) => {
  try {
    validarSecretoEspnSync(req);
    const resumen = await sincronizarPartidosVinculadosEspn();

    res.json({
      ok: true,
      resumen
    });
  } catch (error) {
    next(error);
  }
});

export default router;
