import { supabase } from '../supabaseClient.js';
import { actualizarPartidoAdmin, obtenerPartidosAdmin } from './admin.service.js';
import { obtenerFechaHoraChile } from '../utils/fechas.js';
import {
  equiposEquivalentes,
  obtenerNombreEquipoCanonico,
  normalizarNombreEquipo
} from '../utils/espnEquipos.js';

const ESPN_SCOREBOARD_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';
const MILISEGUNDOS_HORA = 60 * 60 * 1000;
const TIPOS_VALIDOS = new Set(['grupos', 'eliminacion']);

function obtenerTablaPorTipo(tipo) {
  if (tipo === 'grupos') return 'partidos_grupos';
  if (tipo === 'eliminacion') return 'partidos_eliminacion';
  return null;
}

function obtenerCompetidor(competitors, homeAway) {
  return (competitors || []).find((competidor) => competidor.homeAway === homeAway) || null;
}

function normalizarScore(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

function normalizarEstadoEspn(status = {}) {
  const tipo = status.type || {};
  const state = tipo.state || '';
  const completed = Boolean(tipo.completed);

  if (state === 'in') {
    return {
      estadoEspn: 'in',
      estadoSugerido: 'En vivo'
    };
  }

  if (state === 'post' && completed) {
    return {
      estadoEspn: 'post',
      estadoSugerido: 'Finalizado'
    };
  }

  return {
    estadoEspn: state || 'pre',
    estadoSugerido: 'Pendiente'
  };
}

function crearConteoEquipo() {
  return {
    goles: 0,
    amarillas: 0,
    rojas: 0,
    fairPlayEstimado: 0
  };
}

function obtenerTeamIdDesdeDetalle(detalle) {
  return String(
    detalle?.team?.id ||
    detalle?.teamId ||
    detalle?.competitorId ||
    detalle?.athletesInvolved?.[0]?.team?.id ||
    detalle?.athletesInvolved?.[0]?.teamId ||
    ''
  );
}

function obtenerLadoEvento(detalle, idsEquipos) {
  const teamId = obtenerTeamIdDesdeDetalle(detalle);

  if (teamId && teamId === idsEquipos.local) return 'local';
  if (teamId && teamId === idsEquipos.visita) return 'visita';

  const nombreEquipo = detalle?.team?.displayName || detalle?.team?.name || detalle?.athletesInvolved?.[0]?.team?.displayName || '';

  if (nombreEquipo) {
    if (equiposEquivalentes(nombreEquipo, idsEquipos.nombreLocal)) return 'local';
    if (equiposEquivalentes(nombreEquipo, idsEquipos.nombreVisita)) return 'visita';
  }

  return 'sinEquipo';
}

function contarEventosPorEquipo(details = [], idsEquipos) {
  const acumulador = {
    local: crearConteoEquipo(),
    visita: crearConteoEquipo(),
    sinEquipo: crearConteoEquipo(),
    total: {
      goles: 0,
      amarillas: 0,
      rojas: 0
    }
  };

  details.forEach((detalle) => {
    const tipo = String(detalle?.type?.text || detalle?.type || '').toLowerCase();
    const lado = obtenerLadoEvento(detalle, idsEquipos);
    const bucket = acumulador[lado] || acumulador.sinEquipo;
    const esGol = Boolean(detalle?.scoringPlay) || tipo.includes('goal');
    const esAmarilla = Boolean(detalle?.yellowCard) || tipo.includes('yellow');
    const esRoja = Boolean(detalle?.redCard) || tipo.includes('red');

    if (esGol) {
      bucket.goles += 1;
      acumulador.total.goles += 1;
    }

    if (esAmarilla) {
      bucket.amarillas += 1;
      acumulador.total.amarillas += 1;
    }

    if (esRoja) {
      bucket.rojas += 1;
      acumulador.total.rojas += 1;
    }
  });

  ['local', 'visita', 'sinEquipo'].forEach((lado) => {
    acumulador[lado].fairPlayEstimado = (acumulador[lado].amarillas * -1) + (acumulador[lado].rojas * -4);
  });

  return acumulador;
}

function normalizarEventoEspn(evento) {
  const competencia = evento?.competitions?.[0] || {};
  const competitors = competencia.competitors || [];
  const local = obtenerCompetidor(competitors, 'home');
  const visita = obtenerCompetidor(competitors, 'away');
  const status = competencia.status || evento.status || {};
  const estado = normalizarEstadoEspn(status);
  const fechaHoraChile = obtenerFechaHoraChile(evento.date);
  const localEspn = local?.team?.displayName || local?.team?.shortDisplayName || '';
  const visitaEspn = visita?.team?.displayName || visita?.team?.shortDisplayName || '';
  const eventos = contarEventosPorEquipo(competencia.details || [], {
    local: String(local?.team?.id || ''),
    visita: String(visita?.team?.id || ''),
    nombreLocal: localEspn,
    nombreVisita: visitaEspn
  });

  return {
    eventId: String(evento.id || ''),
    fechaHora: evento.date || '',
    fecha: fechaHoraChile.fecha,
    hora: fechaHoraChile.hora,
    local: obtenerNombreEquipoCanonico(localEspn),
    visita: obtenerNombreEquipoCanonico(visitaEspn),
    localEspn,
    visitaEspn,
    espnTeamIdLocal: String(local?.team?.id || ''),
    espnTeamIdVisita: String(visita?.team?.id || ''),
    abreviaturaLocal: local?.team?.abbreviation || '',
    abreviaturaVisita: visita?.team?.abbreviation || '',
    logoLocal: local?.team?.logo || '',
    logoVisita: visita?.team?.logo || '',
    golesLocal: normalizarScore(local?.score),
    golesVisita: normalizarScore(visita?.score),
    estadoEspn: estado.estadoEspn,
    estadoSugerido: estado.estadoSugerido,
    detalleEstado: status.type?.detail || status.type?.description || '',
    reloj: status.displayClock || '',
    periodo: status.period || null,
    tieneEventos: (competencia.details || []).length > 0,
    eventos,
    eventosResumen: (competencia.details || []).slice(0, 8).map((detalle) => ({
      minuto: detalle.clock?.displayValue || '',
      tipo: detalle.type?.text || '',
      texto: detalle.displayName || detalle.text || '',
      equipo: detalle.team?.displayName || ''
    }))
  };
}

function obtenerNombrePartido(partido, lado) {
  if (lado === 'local') {
    return partido.equipoLocal || partido.local || partido.placeholderLocal || partido.localPlaceholder || '';
  }

  return partido.equipoVisita || partido.visita || partido.placeholderVisita || partido.visitaPlaceholder || '';
}

function calcularDiferenciaHoras(fechaA, fechaB) {
  const a = new Date(fechaA).getTime();
  const b = new Date(fechaB).getTime();

  if (Number.isNaN(a) || Number.isNaN(b)) return Number.POSITIVE_INFINITY;

  return Math.abs(a - b) / MILISEGUNDOS_HORA;
}

function crearPartidoMatch(partido, invertido = false) {
  return {
    id: partido.id,
    tipo: partido.tipo,
    fecha: partido.fecha,
    hora: partido.hora,
    local: obtenerNombrePartido(partido, 'local'),
    visita: obtenerNombrePartido(partido, 'visita'),
    estado: partido.estado,
    espnEventId: partido.espnEventId || '',
    invertido
  };
}

function crearMatch(confianza, partido, diferenciaHoras, origen, invertido = false) {
  return {
    confianza,
    origen,
    invertido,
    diferenciaHoras: Number.isFinite(diferenciaHoras) ? Number(diferenciaHoras.toFixed(2)) : null,
    partido: crearPartidoMatch(partido, invertido)
  };
}

function matchearEventoConPartidos(evento, partidos) {
  const matchDirecto = partidos.find((partido) => partido.espnEventId && String(partido.espnEventId) === String(evento.eventId));

  if (matchDirecto) {
    return crearMatch('Alta', matchDirecto, 0, 'espn_event_id', false);
  }

  let mejorMatch = null;

  partidos.forEach((partido) => {
    const localPartido = obtenerNombrePartido(partido, 'local');
    const visitaPartido = obtenerNombrePartido(partido, 'visita');
    const directo = equiposEquivalentes(evento.local, localPartido) && equiposEquivalentes(evento.visita, visitaPartido);
    const invertido = equiposEquivalentes(evento.local, visitaPartido) && equiposEquivalentes(evento.visita, localPartido);

    if (!directo && !invertido) return;

    const diferenciaHoras = calcularDiferenciaHoras(evento.fechaHora, partido.fechaHora || `${partido.fecha}T${partido.hora}:00-04:00`);
    const confianza = diferenciaHoras <= 3 ? 'Alta' : 'Media';
    const puntaje = (confianza === 'Alta' ? 4 : 2) - (invertido ? 0.5 : 0);

    if (!mejorMatch || puntaje > mejorMatch.puntaje || diferenciaHoras < mejorMatch.diferenciaHoras) {
      mejorMatch = {
        puntaje,
        diferenciaHoras,
        confianza,
        origen: invertido ? 'equipos_invertidos_fecha' : 'equipos_fecha',
        invertido,
        partido
      };
    }
  });

  if (!mejorMatch) {
    return {
      confianza: 'Baja',
      origen: 'sin_match',
      invertido: false,
      diferenciaHoras: null,
      partido: null
    };
  }

  return crearMatch(
    mejorMatch.confianza,
    mejorMatch.partido,
    mejorMatch.diferenciaHoras,
    mejorMatch.origen,
    mejorMatch.invertido
  );
}

async function obtenerPartidosLocalesParaMatch() {
  const [grupos, eliminacion] = await Promise.all([
    obtenerPartidosAdmin('grupos'),
    obtenerPartidosAdmin('eliminacion')
  ]);

  return [
    ...grupos.map((partido) => ({ ...partido, tipo: 'grupos' })),
    ...eliminacion.map((partido) => ({ ...partido, tipo: 'eliminacion' }))
  ];
}

export async function consultarScoreboardEspn() {
  const respuesta = await fetch(ESPN_SCOREBOARD_URL, {
    headers: {
      accept: 'application/json',
      'user-agent': 'polla-mundial-2026-admin-sync/1.0'
    }
  });

  if (!respuesta.ok) {
    const error = new Error(`ESPN respondio ${respuesta.status}`);
    error.status = 502;
    throw error;
  }

  const data = await respuesta.json();
  const partidosLocales = await obtenerPartidosLocalesParaMatch();
  const eventos = (data.events || []).map(normalizarEventoEspn);

  return {
    liga: {
      id: data.leagues?.[0]?.id || '',
      slug: data.leagues?.[0]?.slug || 'fifa.world',
      nombre: data.leagues?.[0]?.name || ''
    },
    consultadoEn: new Date().toISOString(),
    eventos: eventos.map((evento) => ({
      ...evento,
      match: matchearEventoConPartidos(evento, partidosLocales)
    }))
  };
}

export async function vincularEventoEspn(datos) {
  const partidoId = String(datos?.partidoId || '').trim();
  const tipo = String(datos?.tipo || '').trim().toLowerCase();
  const eventId = String(datos?.eventId || datos?.espnEventId || '').trim();
  const confianza = String(datos?.confianza || '').trim().toLowerCase();
  const tabla = obtenerTablaPorTipo(tipo);

  if (!partidoId || !tabla || !eventId) {
    const error = new Error('Debes indicar partidoId, tipo y eventId');
    error.status = 400;
    throw error;
  }

  if (confianza !== 'alta') {
    const error = new Error('Solo se puede vincular ESPN con confianza alta');
    error.status = 400;
    throw error;
  }

  const { error } = await supabase
    .from(tabla)
    .update({
      espn_event_id: eventId,
      actualizado_en: new Date().toISOString()
    })
    .eq('id', partidoId);

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: partidoId,
    tipo,
    espnEventId: eventId
  };
}

export async function aplicarResultadoEspn(datos) {
  const partidoId = String(datos?.partidoId || '').trim();
  const tipo = String(datos?.tipo || '').trim().toLowerCase();
  const estadoSugerido = String(datos?.estadoSugerido || datos?.estado || '').trim();
  const confianza = String(datos?.confianza || '').trim().toLowerCase();
  const invertido = datos?.invertido === true || datos?.invertido === 'true';
  const eventId = String(datos?.eventId || datos?.espnEventId || '').trim();
  let golesLocal = normalizarScore(datos?.golesLocal);
  let golesVisita = normalizarScore(datos?.golesVisita);

  if (!partidoId || !TIPOS_VALIDOS.has(tipo)) {
    const error = new Error('Debes indicar partidoId y tipo validos');
    error.status = 400;
    throw error;
  }

  if (confianza === 'baja') {
    const error = new Error('No se puede aplicar una coincidencia ESPN de baja confianza');
    error.status = 400;
    throw error;
  }

  if (!['En vivo', 'Finalizado'].includes(estadoSugerido)) {
    const error = new Error('Solo se puede aplicar ESPN si el estado sugerido es En vivo o Finalizado');
    error.status = 400;
    throw error;
  }

  if (golesLocal === null || golesVisita === null) {
    const error = new Error('ESPN no trae marcador completo para aplicar');
    error.status = 400;
    throw error;
  }

  if (invertido) {
    [golesLocal, golesVisita] = [golesVisita, golesLocal];
  }

  return actualizarPartidoAdmin(partidoId, {
    tipo,
    golesLocalReal: golesLocal,
    golesVisitaReal: golesVisita,
    estado: estadoSugerido,
    espnEventId: eventId || undefined
  });
}
