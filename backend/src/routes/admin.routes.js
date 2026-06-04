import { Router } from 'express';

import { requerirAdmin } from '../middleware/admin.js';
import { requerirAutenticacion } from '../middleware/autenticacion.js';
import {
  actualizarPartidoAdmin,
  obtenerPartidosAdmin
} from '../services/admin.service.js';

const router = Router();

router.use(requerirAutenticacion);
router.use(requerirAdmin);

router.get('/partidos', async (req, res, next) => {
  try {
    const tipo = String(req.query.tipo || 'grupos').trim().toLowerCase();
    const partidos = await obtenerPartidosAdmin(tipo);

    res.json({
      ok: true,
      tipo,
      partidos
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/partidos/:id', async (req, res, next) => {
  try {
    const partido = await actualizarPartidoAdmin(req.params.id, req.body);

    res.json({
      ok: true,
      partido
    });
  } catch (error) {
    next(error);
  }
});

export default router;
