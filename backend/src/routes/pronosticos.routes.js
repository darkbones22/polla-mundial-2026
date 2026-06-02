import { Router } from 'express';

import { requerirAutenticacion } from '../middleware/autenticacion.js';
import { validarParticipanteEnPolla } from '../services/pollas.service.js';
import {
  guardarPronosticosEliminacion,
  guardarPronosticosGrupos,
  obtenerPronosticosEliminacion,
  obtenerPronosticosGrupos
} from '../services/pronosticos.service.js';

const router = Router();

async function validarAccesoPolla(req, res) {
  const pollaId = String(req.query.pollaId || req.body?.pollaId || '').trim();

  if (!pollaId) {
    res.status(400).json({
      ok: false,
      error: 'Debes indicar pollaId'
    });
    return null;
  }

  const pertenece = await validarParticipanteEnPolla(req.sesion.participanteId, pollaId);

  if (!pertenece) {
    res.status(403).json({
      ok: false,
      error: 'No tienes acceso a esta polla'
    });
    return null;
  }

  return pollaId;
}

router.get('/grupos', requerirAutenticacion, async (req, res, next) => {
  try {
    const pollaId = await validarAccesoPolla(req, res);
    if (!pollaId) return;

    const pronosticos = await obtenerPronosticosGrupos({
      participanteId: req.sesion.participanteId,
      pollaId
    });

    res.json({
      ok: true,
      pronosticos
    });
  } catch (error) {
    next(error);
  }
});

router.post('/grupos', requerirAutenticacion, async (req, res, next) => {
  try {
    const pollaId = await validarAccesoPolla(req, res);
    if (!pollaId) return;

    const resultado = await guardarPronosticosGrupos({
      participanteId: req.sesion.participanteId,
      pollaId,
      pronosticos: req.body?.pronosticos
    });

    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

router.get('/eliminacion', requerirAutenticacion, async (req, res, next) => {
  try {
    const pollaId = await validarAccesoPolla(req, res);
    if (!pollaId) return;

    const pronosticos = await obtenerPronosticosEliminacion({
      participanteId: req.sesion.participanteId,
      pollaId
    });

    res.json({
      ok: true,
      pronosticos
    });
  } catch (error) {
    next(error);
  }
});

router.post('/eliminacion', requerirAutenticacion, async (req, res, next) => {
  try {
    const pollaId = await validarAccesoPolla(req, res);
    if (!pollaId) return;

    const resultado = await guardarPronosticosEliminacion({
      participanteId: req.sesion.participanteId,
      pollaId,
      pronosticos: req.body?.pronosticos
    });

    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

export default router;
