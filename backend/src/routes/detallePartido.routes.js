import { Router } from 'express';

import { requerirAutenticacion } from '../middleware/autenticacion.js';
import { obtenerDetallePartido } from '../services/detallePartido.service.js';
import { validarParticipanteEnPolla } from '../services/pollas.service.js';

const router = Router();

router.get('/', requerirAutenticacion, async (req, res, next) => {
  try {
    const pollaId = String(req.query.pollaId || '').trim();
    const partidoId = String(req.query.partidoId || '').trim();
    const tipo = String(req.query.tipo || '').trim().toLowerCase();

    if (!pollaId) {
      res.status(400).json({ ok: false, error: 'Debes indicar pollaId' });
      return;
    }

    if (!partidoId) {
      res.status(400).json({ ok: false, error: 'Debes indicar partidoId' });
      return;
    }

    if (!['grupos', 'eliminacion'].includes(tipo)) {
      res.status(400).json({ ok: false, error: 'Tipo de detalle invalido' });
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

    const detalle = await obtenerDetallePartido({ pollaId, partidoId, tipo });

    if (!detalle) {
      res.status(404).json({
        ok: false,
        error: 'Partido no encontrado'
      });
      return;
    }

    res.json(detalle);
  } catch (error) {
    next(error);
  }
});

export default router;
