import { Router } from 'express';

import { requerirAutenticacion } from '../middleware/autenticacion.js';
import { obtenerDetallePartido } from '../services/detallePartido.service.js';
import { validarParticipanteEnPolla } from '../services/pollas.service.js';
import { obtenerResultados } from '../services/resultados.service.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const tipo = String(req.query.tipo || 'grupos').trim().toLowerCase();

    if (!['grupos', 'eliminacion'].includes(tipo)) {
      res.status(400).json({
        ok: false,
        error: 'Tipo de resultados invalido'
      });
      return;
    }

    const resultados = await obtenerResultados(tipo);

    res.json({
      ok: true,
      tipo,
      resultados
    });
  } catch (error) {
    next(error);
  }
});

router.get('/detalle-partido', requerirAutenticacion, async (req, res, next) => {
  try {
    const pollaId = String(req.query.pollaId || '').trim();
    const partidoId = String(req.query.partidoId || '').trim();
    const tipo = String(req.query.tipo || '').trim().toLowerCase();

    if (!pollaId || !partidoId || !['grupos', 'eliminacion'].includes(tipo)) {
      res.status(400).json({
        ok: false,
        error: 'Debes indicar pollaId, partidoId y tipo valido'
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
