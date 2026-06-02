import { Router } from 'express';

import {
  obtenerPartidosEliminacion,
  obtenerPartidosGrupos
} from '../services/partidos.service.js';

const router = Router();

router.get('/grupos', async (req, res, next) => {
  try {
    const partidos = await obtenerPartidosGrupos();

    res.json({
      ok: true,
      partidos
    });
  } catch (error) {
    next(error);
  }
});

router.get('/eliminacion', async (req, res, next) => {
  try {
    const partidos = await obtenerPartidosEliminacion();

    res.json({
      ok: true,
      partidos
    });
  } catch (error) {
    next(error);
  }
});

export default router;
