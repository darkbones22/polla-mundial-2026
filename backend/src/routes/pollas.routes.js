import { Router } from 'express';

import { requerirAutenticacion } from '../middleware/autenticacion.js';
import { obtenerPollasParticipante } from '../services/pollas.service.js';

const router = Router();

router.get('/', requerirAutenticacion, async (req, res, next) => {
  try {
    const pollas = await obtenerPollasParticipante(req.sesion.participanteId);

    res.json({
      ok: true,
      pollas
    });
  } catch (error) {
    next(error);
  }
});

export default router;
