import { Router } from 'express';

import { requerirAdmin } from '../middleware/admin.js';
import { requerirAutenticacion } from '../middleware/autenticacion.js';
import {
  actualizarPartidoAdmin,
  actualizarPermisoAdminParticipanteAdmin,
  actualizarParticipanteAdmin,
  actualizarPollaAdmin,
  actualizarPollasParticipanteAdmin,
  crearParticipanteAdmin,
  crearPollaAdmin,
  obtenerParticipantesAdmin,
  obtenerPollasAdmin,
  obtenerPartidosAdmin
} from '../services/admin.service.js';
import {
  aplicarResultadoEspn,
  consultarScoreboardEspn,
  sincronizarPartidosVinculadosEspn,
  vincularEventosEspnBulk,
  vincularEventoEspn
} from '../services/espn.service.js';

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

router.get('/espn/scoreboard', async (req, res, next) => {
  try {
    const dates = String(req.query.dates || '')
      .split(',')
      .map((fecha) => fecha.trim())
      .filter(Boolean);
    const resultado = await consultarScoreboardEspn({ dates });

    res.json({
      ok: true,
      ...resultado
    });
  } catch (error) {
    next(error);
  }
});

router.post('/espn/apply', async (req, res, next) => {
  try {
    const partido = await aplicarResultadoEspn(req.body);

    res.json({
      ok: true,
      partido
    });
  } catch (error) {
    next(error);
  }
});

router.post('/espn/link', async (req, res, next) => {
  try {
    const partido = await vincularEventoEspn(req.body);

    res.json({
      ok: true,
      partido
    });
  } catch (error) {
    next(error);
  }
});

router.post('/espn/link-bulk', async (req, res, next) => {
  try {
    const resumen = await vincularEventosEspnBulk(req.body);

    res.json({
      ok: true,
      resumen
    });
  } catch (error) {
    next(error);
  }
});

router.post('/espn/sync-linked', async (req, res, next) => {
  try {
    const resumen = await sincronizarPartidosVinculadosEspn();

    res.json({
      ok: true,
      resumen
    });
  } catch (error) {
    next(error);
  }
});

router.get('/participantes', async (req, res, next) => {
  try {
    const participantes = await obtenerParticipantesAdmin();

    res.json({
      ok: true,
      participantes
    });
  } catch (error) {
    next(error);
  }
});

router.post('/participantes', async (req, res, next) => {
  try {
    const participante = await crearParticipanteAdmin(req.body);

    res.status(201).json({
      ok: true,
      participante
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/participantes/:id', async (req, res, next) => {
  try {
    const participante = await actualizarParticipanteAdmin(req.params.id, req.body);

    res.json({
      ok: true,
      participante
    });
  } catch (error) {
    next(error);
  }
});

router.put('/participantes/:id/pollas', async (req, res, next) => {
  try {
    const participante = await actualizarPollasParticipanteAdmin(req.params.id, req.body?.pollas);

    res.json({
      ok: true,
      participante
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/participantes/:id/admin', async (req, res, next) => {
  try {
    const valorAdmin = Object.prototype.hasOwnProperty.call(req.body || {}, 'esAdmin')
      ? req.body.esAdmin
      : req.body?.es_admin;
    const participante = await actualizarPermisoAdminParticipanteAdmin(
      req.params.id,
      valorAdmin,
      req.sesion.participanteId
    );

    res.json({
      ok: true,
      participante
    });
  } catch (error) {
    next(error);
  }
});

router.get('/pollas', async (req, res, next) => {
  try {
    const pollas = await obtenerPollasAdmin();

    res.json({
      ok: true,
      pollas
    });
  } catch (error) {
    next(error);
  }
});

router.post('/pollas', async (req, res, next) => {
  try {
    const polla = await crearPollaAdmin(req.body);

    res.status(201).json({
      ok: true,
      polla
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/pollas/:id', async (req, res, next) => {
  try {
    const polla = await actualizarPollaAdmin(req.params.id, req.body);

    res.json({
      ok: true,
      polla
    });
  } catch (error) {
    next(error);
  }
});

export default router;
