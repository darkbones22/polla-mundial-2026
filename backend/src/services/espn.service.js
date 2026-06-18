import { actualizarPartidoAdmin, obtenerPartidosAdmin } from './admin.service.js';
import { obtenerFechaHoraChile } from '../utils/fechas.js';

const ESPN_SCOREBOARD_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';
const MILISEGUNDOS_HORA = 60 * 60 * 1000;

const MAPEO_NOMBRES_ESPN = new Map([
  ['congo dr', 'RD Congo'],
  ['dr congo', 'RD Congo'],
  ['united states', 'EE.UU.'],
  ['usa', 'EE.UU.'],
  ['south korea', 'Corea del Sur'],
  ['czechia', 'República Checa'],
  ['czech republic', 'República Checa'],
  ['ivory coast', 'Costa de Marfil'],
  ['netherlands', 'Países Bajos'],
  ['saudi arabia', 'Arabia Saudí'],
  ['new zealand', 'Nueva Zelanda'],
  ['cape verde', 'Cabo Verde'],
  ['turkiye', 'Turquía'],
  ['turkey', 'Turquía'],
  ['curacao', 'Curazao'],
  ['mexico', 'México'],
  ['south africa', 'Sudáfrica'],
  ['tunisia', 'Túnez'],
  ['iran', 'Irán'],
  ['japan', 'Japón'],
  ['spain', 'España'],
  ['belgium', 'Bélgica'],
  ['canada', 'Canadá'],
  ['panama', 'Panamá'],
  ['uzbekistan', 'Uzbekistán'],
  ['bosnia and herzegovina', 'Bosnia y Herzegovina'],
  ['morocco', 'Marruecos'],
  ['qatar', 'Catar'],
  ['switzerland', 'Suiza'],
  ['scotland', 'Escocia'],
  ['sweden', 'Suecia'],
  ['egypt', 'Egipto'],
  ['iraq', 'Irak'],
  ['norway', 'Noruega'],
  ['algeria', 'Argelia'],
  ['croatia', 'Croacia'],
  ['germany', 'Alemania'],
  ['england', 'Inglaterra']
]);

function normalizarTexto(valor) {
  return String(valor || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function mapearNombreEspn(nombre) {
  const nombreNormalizado = normalizarTexto(nombre);
  return MAPEO_NOMBRES_ESPN.get(nombreNormalizado) || nombre || '';
}

function obtenerCompetidor(competitors, homeAway) {
  return (competitors || []).find((competidor) => competidor.homeAway === homeAway) || null;
}

function normalizarScore(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

function contarEventos(details = []) {
  return details.reduce((acumulador, evento) => {
    const tipo = String(evento?.type?.text || evento?.type || '').toLowerCase();

    if (evento?.scoringPlay || tipo.includes('goal')) {
      acumulador.goles += 1;
    }

    if (evento?.yellowCard || tipo.includes('yellow')) {
      acumulador.amarillas += 1;
    }

    if (evento?.redCard || tipo.includes('red')) {
      acumulador.rojas += 1;
    }

    return acumulador;
  }, {
    goles: 0,
    amarillas: 0,
    rojas: 0
  });
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

function normalizarEventoEspn(evento) {
  const competencia = evento?.competitions?.[0] || {};
  const competitors = competencia.competitors || [];
  const local = obtenerCompetidor(competitors, 'home');
  const visita = obtenerCompetidor(competitors, 'away');
  const status = competencia.status || evento.status || {};
  const estado = normalizarEstadoEspn(status);
  const fechaHoraChile = obtenerFechaHoraChile(evento.date);
  const conteoEventos = contarEventos(competencia.details || []);

  return {
    eventId: String(evento.id || ''),
    fechaHora: evento.date || '',
    fecha: fechaHoraChile.fecha,
    hora: fechaHoraChile.hora,
    local: mapearNombreEspn(local?.team?.displayName || local?.team?.shortDisplayName || ''),
    visita: mapearNombreEspn(visita?.team?.displayName || visita?.team?.shortDisplayName || ''),
    localEspn: local?.team?.displayName || '',
    visitaEspn: visita?.team?.displayName || '',
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
    eventos: conteoEventos,
    eventosResumen: (competencia.details || []).slice(0, 8).map((detalle) => ({
      minuto: detalle.clock?.displayValue || '',
      tipo: detalle.type?.text || '',
      texto: detalle.displayName || detalle.text || ''
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

function matchearEventoConPartidos(evento, partidos) {
  const localEspn = normalizarTexto(evento.local);
  const visitaEspn = normalizarTexto(evento.visita);
  let mejorMatch = null;

  partidos.forEach((partido) => {
    const localPartido = normalizarTexto(obtenerNombrePartido(partido, 'local'));
    const visitaPartido = normalizarTexto(obtenerNombrePartido(partido, 'visita'));
    const equiposCoinciden = localEspn && visitaEspn && localEspn === localPartido && visitaEspn === visitaPartido;

    if (!equiposCoinciden) return;

    const diferenciaHoras = calcularDiferenciaHoras(evento.fechaHora, partido.fechaHora || `${partido.fecha}T${partido.hora}:00-04:00`);
    const confianza = diferenciaHoras <= 3 ? 'Alta' : 'Media';
    const puntaje = confianza === 'Alta' ? 2 : 1;

    if (!mejorMatch || puntaje > mejorMatch.puntaje || diferenciaHoras < mejorMatch.diferenciaHoras) {
      mejorMatch = {
        puntaje,
        diferenciaHoras,
        confianza,
        partido: {
          id: partido.id,
          tipo: partido.tipo,
          fecha: partido.fecha,
          hora: partido.hora,
          local: obtenerNombrePartido(partido, 'local'),
          visita: obtenerNombrePartido(partido, 'visita'),
          estado: partido.estado
        }
      };
    }
  });

  if (!mejorMatch) {
    return {
      confianza: 'Baja',
      diferenciaHoras: null,
      partido: null
    };
  }

  return {
    confianza: mejorMatch.confianza,
    diferenciaHoras: Number(mejorMatch.diferenciaHoras.toFixed(2)),
    partido: mejorMatch.partido
  };
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

export async function aplicarResultadoEspn(datos) {
  const partidoId = String(datos?.partidoId || '').trim();
  const tipo = String(datos?.tipo || '').trim().toLowerCase();
  const estadoSugerido = String(datos?.estadoSugerido || datos?.estado || '').trim();
  const confianza = String(datos?.confianza || '').trim().toLowerCase();
  const golesLocal = normalizarScore(datos?.golesLocal);
  const golesVisita = normalizarScore(datos?.golesVisita);

  if (!partidoId || !['grupos', 'eliminacion'].includes(tipo)) {
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

  return actualizarPartidoAdmin(partidoId, {
    tipo,
    golesLocalReal: golesLocal,
    golesVisitaReal: golesVisita,
    estado: estadoSugerido,
    equipoLocal: datos?.equipoLocal,
    equipoVisita: datos?.equipoVisita
  });
}
