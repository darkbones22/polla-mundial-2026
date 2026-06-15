import { Router } from 'express';

import { requerirAutenticacion } from '../middleware/autenticacion.js';
import { validarParticipanteEnPolla } from '../services/pollas.service.js';
import { obtenerRankingPollaConMeta } from '../services/ranking.service.js';

const router = Router();

router.get('/', requerirAutenticacion, async (req, res, next) => {
  try {
    const pollaId = String(req.query.pollaId || '').trim();

    if (!pollaId) {
      res.status(400).json({
        ok: false,
        error: 'Debes indicar pollaId'
      });
      return;
    }

    const pertenece = await validarParticipanteEnPolla(req.sesion.participanteId, pollaId);

    if (!pertenece) {
      res.status(403).json({
        ok: false,
        error: 'No tienes acceso a esta polla'
      });
      return;
    }

    const resultadoRanking = await obtenerRankingPollaConMeta(pollaId);

    res.json({
      ok: true,
      ranking: resultadoRanking.ranking,
      incluyeEnVivo: resultadoRanking.incluyeEnVivo
    });
  } catch (error) {
    next(error);
  }
});

export default router;
