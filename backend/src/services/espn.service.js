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
const MILISEGUNDOS_DIA = 24 * MILISEGUNDOS_HORA;
const TIPOS_VALIDOS = new Set(['grupos', 'eliminacion']);

function obtenerTablaPorTipo(tipo) {
  if (tipo === 'grupos') return 'partidos_grupos';
  if (tipo === 'eliminacion') return 'partidos_eliminacion';
  return null;
}

function normalizarFechaEspn(valor) {
  const texto = String(valor || '').trim();
  const soloDigitos = texto.replace(/\D/g, '');

  return soloDigitos.length === 8 ? soloDigitos : '';
}

function obtenerFechaEspnDesdeFechaHora(fechaHora) {
  const fechaChile = obtenerFechaHoraChile(fechaHora).fecha;
  return fechaChile ? fechaChile.replace(/-/g, '') : '';
}

function obtenerFechasEspnUnicas(fechas) {
  return [...new Set((fechas || []).map(normalizarFechaEspn).filter(Boolean))].sort();
}

function obtenerFechaEspnDesdeDate(fecha) {
  return obtenerFechaEspnDesdeFechaHora(fecha.toISOString());
}

function obtenerFechasProximosDias(cantidadDias = 7) {
  const hoy = new Date();

  return Array.from({ length: cantidadDias }, (_, indice) => {
    const fecha = new Date(hoy.getTime() + indice * MILISEGUNDOS_DIA);
    return obtenerFechaEspnDesdeDate(fecha);
  }).filter(Boolean);
}

function crearUrlScoreboardEspn(fechaEspn = '') {
  if (!fechaEspn) return ESPN_SCOREBOARD_URL;

  const url = new URL(ESPN_SCOREBOARD_URL);
  url.searchParams.set('dates', fechaEspn);
  return url.toString();
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

async function consultarScoreboardEspnPorFecha(fechaEspn = '') {
  const respuesta = await fetch(crearUrlScoreboardEspn(fechaEspn), {
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

  return respuesta.json();
}

async function consultarEventosEspn(fechas = []) {
  const fechasUnicas = obtenerFechasEspnUnicas(fechas);
  const respuestas = fechasUnicas.length
    ? await Promise.all(fechasUnicas.map((fecha) => consultarScoreboardEspnPorFecha(fecha)))
    : [await consultarScoreboardEspnPorFecha()];
  const eventosPorId = new Map();
  let liga = null;

  respuestas.forEach((data) => {
    if (!liga) {
      liga = {
        id: data.leagues?.[0]?.id || '',
        slug: data.leagues?.[0]?.slug || 'fifa.world',
        nombre: data.leagues?.[0]?.name || ''
      };
    }

    (data.events || []).forEach((evento) => {
      const id = String(evento.id || '');
      if (id && !eventosPorId.has(id)) {
        eventosPorId.set(id, evento);
      }
    });
  });

  return {
    liga: liga || {
      id: '',
      slug: 'fifa.world',
      nombre: ''
    },
    eventos: [...eventosPorId.values()].map(normalizarEventoEspn),
    fechas: fechasUnicas
  };
}

export async function consultarScoreboardEspn(opciones = {}) {
  const { liga, eventos, fechas } = await consultarEventosEspn(opciones.dates || opciones.fechas || []);
  const partidosLocales = await obtenerPartidosLocalesParaMatch();

  return {
    liga,
    fechas,
    consultadoEn: new Date().toISOString(),
    eventos: eventos.map((evento) => ({
      ...evento,
      match: matchearEventoConPartidos(evento, partidosLocales)
    }))
  };
}

function obtenerFechasParaVinculacion(datos, partidosLocales) {
  const fechasPayload = obtenerFechasEspnUnicas(datos?.dates || datos?.fechas || []);

  if (fechasPayload.length) return fechasPayload;

  const modo = String(datos?.mode || '').trim().toLowerCase();

  if (modo === 'next7days' || modo === 'proximos7dias') {
    return obtenerFechasProximosDias(7);
  }

  if (modo === 'allunlinked' || modo === 'todos-sin-espn' || modo === 'todos') {
    return obtenerFechasEspnUnicas(
      partidosLocales
        .filter((partido) => !partido.espnEventId)
        .map((partido) => obtenerFechaEspnDesdeFechaHora(partido.fechaHora))
    );
  }

  return obtenerFechasProximosDias(1);
}

export async function vincularEventosEspnBulk(datos = {}) {
  const partidosLocales = await obtenerPartidosLocalesParaMatch();
  const fechas = obtenerFechasParaVinculacion(datos, partidosLocales);
  const { eventos } = await consultarEventosEspn(fechas);
  const vinculadosIds = new Set(partidosLocales.filter((partido) => partido.espnEventId).map((partido) => `${partido.tipo}:${partido.id}`));
  const resumen = {
    fechas,
    revisados: eventos.length,
    vinculados: 0,
    yaVinculados: 0,
    sinMatch: 0,
    bajaConfianza: 0,
    errores: 0,
    detalles: []
  };

  for (const evento of eventos) {
    const match = matchearEventoConPartidos(evento, partidosLocales);
    const clavePartido = match.partido ? `${match.partido.tipo}:${match.partido.id}` : '';

    if (!match.partido) {
      resumen.sinMatch += 1;
      resumen.detalles.push({
        eventId: evento.eventId,
        estado: 'sin_match',
        local: evento.local,
        visita: evento.visita
      });
      continue;
    }

    if (match.partido.espnEventId || vinculadosIds.has(clavePartido)) {
      resumen.yaVinculados += 1;
      resumen.detalles.push({
        eventId: evento.eventId,
        estado: 'ya_vinculado',
        partidoId: match.partido.id,
        tipo: match.partido.tipo
      });
      continue;
    }

    if (match.confianza !== 'Alta') {
      resumen.bajaConfianza += 1;
      resumen.detalles.push({
        eventId: evento.eventId,
        estado: 'baja_confianza',
        confianza: match.confianza,
        partidoId: match.partido.id,
        tipo: match.partido.tipo
      });
      continue;
    }

    try {
      await vincularEventoEspn({
        eventId: evento.eventId,
        partidoId: match.partido.id,
        tipo: match.partido.tipo,
        confianza: match.confianza
      });

      vinculadosIds.add(clavePartido);
      resumen.vinculados += 1;
      resumen.detalles.push({
        eventId: evento.eventId,
        estado: 'vinculado',
        partidoId: match.partido.id,
        tipo: match.partido.tipo
      });
    } catch (error) {
      resumen.errores += 1;
      resumen.detalles.push({
        eventId: evento.eventId,
        estado: 'error',
        partidoId: match.partido.id,
        tipo: match.partido.tipo,
        error: error.message
      });
    }
  }

  return resumen;
}

async function validarEspnEventIdDisponible(eventId, partidoId, tipo) {
  const consultas = await Promise.all([
    supabase
      .from('partidos_grupos')
      .select('id')
      .eq('espn_event_id', eventId),
    supabase
      .from('partidos_eliminacion')
      .select('id')
      .eq('espn_event_id', eventId)
  ]);

  consultas.forEach(({ error }) => {
    if (error) {
      throw new Error(error.message);
    }
  });

  const duplicado = consultas
    .flatMap(({ data }, indice) => (data || []).map((fila) => ({
      id: fila.id,
      tipo: indice === 0 ? 'grupos' : 'eliminacion'
    })))
    .find((fila) => fila.id !== partidoId || fila.tipo !== tipo);

  if (duplicado) {
    const error = new Error(`ESPN event ${eventId} ya esta vinculado a ${duplicado.tipo}:${duplicado.id}`);
    error.status = 409;
    throw error;
  }
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

  await validarEspnEventIdDisponible(eventId, partidoId, tipo);

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

async function consultarPartidosVinculados(tabla, tipo) {
  const { data, error } = await supabase
    .from(tabla)
    .select('id,fecha_hora,estado,goles_local_real,goles_visita_real,espn_event_id')
    .not('espn_event_id', 'is', null);

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((fila) => ({
    id: fila.id,
    tipo,
    fechaHora: fila.fecha_hora,
    estado: fila.estado || 'Pendiente',
    golesLocalReal: fila.goles_local_real,
    golesVisitaReal: fila.goles_visita_real,
    espnEventId: fila.espn_event_id
  }));
}

function estaEnVentanaSync(partido) {
  const estado = String(partido.estado || '').trim().toLowerCase();

  if (estado === 'finalizado') return false;
  if (estado === 'en vivo') return true;

  const inicio = new Date(partido.fechaHora).getTime();
  if (Number.isNaN(inicio)) return false;

  const ahora = Date.now();
  return inicio >= ahora - 12 * MILISEGUNDOS_HORA && inicio <= ahora + 4 * MILISEGUNDOS_HORA;
}

function obtenerEstadoAplicableDesdeEspn(evento) {
  if (evento.estadoSugerido === 'En vivo') return 'En vivo';
  if (evento.estadoSugerido === 'Finalizado') return 'Finalizado';
  return '';
}

export async function sincronizarPartidosVinculadosEspn() {
  const [grupos, eliminacion] = await Promise.all([
    consultarPartidosVinculados('partidos_grupos', 'grupos'),
    consultarPartidosVinculados('partidos_eliminacion', 'eliminacion')
  ]);
  const candidatos = [...grupos, ...eliminacion].filter((partido) => partido.espnEventId && estaEnVentanaSync(partido));
  const fechas = obtenerFechasEspnUnicas(candidatos.map((partido) => obtenerFechaEspnDesdeFechaHora(partido.fechaHora)));
  const { eventos } = fechas.length ? await consultarEventosEspn(fechas) : { eventos: [] };
  const eventosPorId = new Map(eventos.map((evento) => [String(evento.eventId), evento]));
  const resumen = {
    revisados: candidatos.length,
    actualizados: 0,
    omitidos: 0,
    errores: 0,
    detalles: []
  };

  for (const partido of candidatos) {
    const evento = eventosPorId.get(String(partido.espnEventId));

    if (!evento) {
      resumen.omitidos += 1;
      resumen.detalles.push({
        partidoId: partido.id,
        tipo: partido.tipo,
        estado: 'evento_no_encontrado'
      });
      continue;
    }

    const estadoAplicable = obtenerEstadoAplicableDesdeEspn(evento);

    if (!estadoAplicable) {
      resumen.omitidos += 1;
      resumen.detalles.push({
        partidoId: partido.id,
        tipo: partido.tipo,
        eventId: evento.eventId,
        estado: 'sin_estado_aplicable'
      });
      continue;
    }

    if (evento.golesLocal === null || evento.golesVisita === null) {
      resumen.omitidos += 1;
      resumen.detalles.push({
        partidoId: partido.id,
        tipo: partido.tipo,
        eventId: evento.eventId,
        estado: 'sin_marcador'
      });
      continue;
    }

    try {
      const actualizado = await actualizarPartidoAdmin(partido.id, {
        tipo: partido.tipo,
        golesLocalReal: evento.golesLocal,
        golesVisitaReal: evento.golesVisita,
        estado: estadoAplicable,
        espnEventId: partido.espnEventId
      });

      resumen.actualizados += 1;
      resumen.detalles.push({
        partidoId: partido.id,
        tipo: partido.tipo,
        eventId: evento.eventId,
        estado: 'actualizado',
        estadoAplicado: actualizado.estado,
        marcador: `${evento.golesLocal}-${evento.golesVisita}`
      });
    } catch (error) {
      resumen.errores += 1;
      resumen.detalles.push({
        partidoId: partido.id,
        tipo: partido.tipo,
        eventId: evento.eventId,
        estado: 'error',
        error: error.message
      });
    }
  }

  return resumen;
}
