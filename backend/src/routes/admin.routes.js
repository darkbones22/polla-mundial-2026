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
import { obtenerAuditoriaPuntos } from '../services/auditoriaPuntos.service.js';
import { calcularRankingDesdePronosticosYResultados } from '../services/ranking.service.js';

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

router.get('/auditoria-puntos', async (req, res, next) => {
  try {
    const codigo = String(req.query.codigo || '').trim();
    const pollaId = String(req.query.pollaId || '').trim();
    const busqueda = String(req.query.busqueda || '').trim();

    if (busqueda) {
      const error = new Error('La auditoría solo permite código exacto.');
      error.status = 400;
      throw error;
    }

    if (!codigo) {
      const error = new Error('Debes indicar código');
      error.status = 400;
      throw error;
    }

    if (!pollaId) {
      const error = new Error('Debes indicar pollaId');
      error.status = 400;
      throw error;
    }

    const resultado = await obtenerAuditoriaPuntos({
      tipo: req.query.tipo,
      partidoId: req.query.partidoId,
      codigo,
      pollaId
    });

    res.json({
      ok: true,
      ...resultado
    });
  } catch (error) {
    next(error);
  }
});

router.get('/auditoria-ranking', async (req, res, next) => {
  try {
    const codigo = String(req.query.codigo || '').trim();
    const pollaId = String(req.query.pollaId || '').trim();

    if (!codigo) {
      const error = new Error('Debes indicar código');
      error.status = 400;
      throw error;
    }

    if (!pollaId) {
      const error = new Error('Debes indicar pollaId');
      error.status = 400;
      throw error;
    }

    const [rankingRespuesta, auditoria] = await Promise.all([
      calcularRankingDesdePronosticosYResultados(pollaId),
      obtenerAuditoriaPuntos({ pollaId, codigo, tipo: 'todos' })
    ]);
    const rankingParticipante = rankingRespuesta.ranking.find((item) =>
      String(item.codigoLegacy || '').toLowerCase() === codigo.toLowerCase()
    );
    const itemsAuditoria = auditoria.items;
    const partidosAuditoria = itemsAuditoria.map((item) => ({
      partidoId: item.partidoId,
      tipo: item.tipo,
      estado: item.estado,
      puntos: item.puntos,
      resultadoReal: item.resultadoReal,
      pronostico: item.pronostico,
      observacion: item.observacion,
      alertas: item.alertas
    }));
    const puntosGruposAuditoria = itemsAuditoria
      .filter((item) => item.tipo === 'grupos')
      .reduce((suma, item) => suma + item.puntos, 0);
    const puntosEliminacionAuditoria = itemsAuditoria
      .filter((item) => item.tipo === 'eliminacion')
      .reduce((suma, item) => suma + item.puntos, 0);
    const totalAuditoria = puntosGruposAuditoria + puntosEliminacionAuditoria;
    const totalRanking = rankingParticipante?.puntosTotal || 0;
    const diferencias = [];

    if (totalRanking !== totalAuditoria) {
      diferencias.push({
        partidoId: '__total__',
        motivo: 'Diferencia en total agregado',
        puntosRanking: totalRanking,
        puntosAuditoria: totalAuditoria,
        estado: '',
        resultadoReal: null,
        pronostico: null
      });
    }

    res.json({
      ok: true,
      codigo,
      participante: rankingParticipante
        ? {
          id: rankingParticipante.participanteId,
          nombre: rankingParticipante.nombre
        }
        : null,
      ranking: {
        puntosTotal: totalRanking,
        puntosGrupos: rankingParticipante?.puntosGrupos || 0,
        puntosEliminacion: rankingParticipante?.puntosEliminacion || 0,
        partidosIncluidos: partidosAuditoria.filter((item) => item.puntos > 0 || item.estado === 'Finalizado')
      },
      auditoria: {
        puntosTotal: totalAuditoria,
        puntosGrupos: puntosGruposAuditoria,
        puntosEliminacion: puntosEliminacionAuditoria,
        partidosIncluidos: partidosAuditoria
      },
      diferencias
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
