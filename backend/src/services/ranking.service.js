import { supabase } from '../supabaseClient.js';
import { calcularBasePuntosDesdePronosticosYResultados } from './auditoriaPuntos.service.js';

function crearFilaRanking(fila) {
  return {
    participanteId: fila.participantes.id,
    codigoLegacy: fila.participantes.codigo_legacy,
    nombre: fila.participantes.nombre_visible,

    puntosGrupos: 0,
    puntosEliminacion: 0,
    puntosTotal: 0,

    exactosGrupos: 0,
    exactosEliminacion: 0,

    ganadorEmpateGrupos: 0,
    ganadorEmpateEliminacion: 0,

    golesLocalGrupos: 0,
    golesLocalEliminacion: 0,

    golesVisitaGrupos: 0,
    golesVisitaEliminacion: 0,

    diferenciaGrupos: 0,
    diferenciaEliminacion: 0,

    clasificados: 0,

    partidosGrupos: 0,
    partidosEliminacion: 0
  };
}

function crearFilaRankingDesdeParticipante(participante) {
  return {
    participanteId: participante.id,
    codigoLegacy: participante.codigo_legacy,
    nombre: participante.nombre_visible,

    puntosGrupos: 0,
    puntosEliminacion: 0,
    puntosTotal: 0,

    exactosGrupos: 0,
    exactosEliminacion: 0,

    ganadorEmpateGrupos: 0,
    ganadorEmpateEliminacion: 0,

    golesLocalGrupos: 0,
    golesLocalEliminacion: 0,

    golesVisitaGrupos: 0,
    golesVisitaEliminacion: 0,

    diferenciaGrupos: 0,
    diferenciaEliminacion: 0,

    clasificados: 0,

    partidosGrupos: 0,
    partidosEliminacion: 0
  };
}

function tieneGolesValidos(partido) {
  return Number.isInteger(partido.goles_local_real) && Number.isInteger(partido.goles_visita_real);
}

function estaFinalizado(partido) {
  return String(partido?.estado || '').trim().toLowerCase() === 'finalizado';
}

function estaEnVivo(partido) {
  return String(partido?.estado || '').trim().toLowerCase() === 'en vivo';
}

function esEstadoCalculable(partido) {
  return estaFinalizado(partido) || estaEnVivo(partido);
}

export function obtenerResultadosGruposPorPartido(partidos) {
  const resultadosPorPartido = new Map();
  let incluyeEnVivo = false;

  partidos.forEach((partido) => {
    if (!tieneGolesValidos(partido)) return;
    if (!esEstadoCalculable(partido)) return;
    if (estaEnVivo(partido)) incluyeEnVivo = true;

    resultadosPorPartido.set(partido.id, {
      golesLocal: partido.goles_local_real,
      golesVisita: partido.goles_visita_real
    });
  });

  return {
    resultadosPorPartido,
    incluyeEnVivo
  };
}

export function obtenerResultadosEliminacionPorPartido(partidos) {
  const resultadosPorPartido = new Map();
  let incluyeEnVivo = false;

  partidos.forEach((partido) => {
    if (!tieneGolesValidos(partido)) return;

    const finalizado = estaFinalizado(partido);
    const enVivo = estaEnVivo(partido);

    if (!finalizado && !enVivo) return;
    if (finalizado && !['local', 'visita'].includes(partido.clasificado_real_lado)) return;
    if (enVivo) incluyeEnVivo = true;

    resultadosPorPartido.set(partido.id, {
      golesLocal: partido.goles_local_real,
      golesVisita: partido.goles_visita_real,
      clasificadoRealLado: partido.clasificado_real_lado
    });
  });

  return {
    resultadosPorPartido,
    incluyeEnVivo
  };
}

async function obtenerParticipantesActivosPolla(pollaId) {
  const { data, error } = await supabase
    .from('participantes_pollas')
    .select('participante_id,participantes!inner(id,codigo_legacy,nombre_visible,activo)')
    .eq('polla_id', pollaId)
    .eq('activo', true)
    .eq('participantes.activo', true);

  if (error) {
    throw new Error(error.message);
  }

  return (data || [])
    .filter((fila) => fila.participantes?.activo)
    .map(crearFilaRanking);
}

function ordenarRanking(ranking) {
  ranking.forEach((participante) => {
    participante.puntosTotal = participante.puntosGrupos + participante.puntosEliminacion;
  });

  ranking.sort((a, b) => {
    if (b.puntosTotal !== a.puntosTotal) return b.puntosTotal - a.puntosTotal;
    if (b.puntosGrupos !== a.puntosGrupos) return b.puntosGrupos - a.puntosGrupos;
    if (b.puntosEliminacion !== a.puntosEliminacion) return b.puntosEliminacion - a.puntosEliminacion;
    return a.nombre.localeCompare(b.nombre);
  });

  ranking.forEach((participante, indice) => {
    participante.posicion = indice + 1;
  });

  return ranking;
}

export async function obtenerRankingPolla(pollaId) {
  const resultado = await obtenerRankingPollaConMeta(pollaId);
  return resultado.ranking;
}

export function armarRankingDesdeItemsCalculados(participantes, items) {
  const rankingPorParticipante = new Map(
    (participantes || []).map((participante) => {
      const fila = participante.participanteId
        ? participante
        : crearFilaRankingDesdeParticipante(participante);
      return [fila.participanteId, fila];
    })
  );

  (items || []).forEach((item) => {
    const participante = rankingPorParticipante.get(item.participante.id);

    if (!participante || !item.calculable) return;

    if (item.tipo === 'grupos') {
      participante.puntosGrupos += item.puntos;
      participante.partidosGrupos += 1;
      if (item.desglose.exacto.acierto) participante.exactosGrupos += 1;
      if (item.desglose.ganador.acierto) participante.ganadorEmpateGrupos += 1;
      if (item.desglose.golLocal.acierto) participante.golesLocalGrupos += 1;
      if (item.desglose.golVisita.acierto) participante.golesVisitaGrupos += 1;
      if (item.desglose.diferencia.acierto) participante.diferenciaGrupos += 1;
      return;
    }

    if (item.tipo === 'eliminacion') {
      participante.puntosEliminacion += item.puntos;
      participante.partidosEliminacion += 1;
      if (item.desglose.exacto.acierto) participante.exactosEliminacion += 1;
      if (item.desglose.ganador.acierto) participante.ganadorEmpateEliminacion += 1;
      if (item.desglose.golLocal.acierto) participante.golesLocalEliminacion += 1;
      if (item.desglose.golVisita.acierto) participante.golesVisitaEliminacion += 1;
      if (item.desglose.diferencia.acierto) participante.diferenciaEliminacion += 1;
      if (item.desglose.clasificado?.acierto) participante.clasificados += 1;
    }
  });

  return ordenarRanking(Array.from(rankingPorParticipante.values()));
}

export async function calcularRankingDesdePronosticosYResultados(pollaId) {
  const participantes = await obtenerParticipantesActivosPolla(pollaId);
  const base = await calcularBasePuntosDesdePronosticosYResultados(pollaId);

  return {
    ranking: armarRankingDesdeItemsCalculados(participantes, base.items),
    incluyeEnVivo: Boolean(base.resumen?.incluyeEnVivo),
    base
  };
}

export async function obtenerRankingPollaConMeta(pollaId) {
  const resultado = await calcularRankingDesdePronosticosYResultados(pollaId);

  return {
    ranking: resultado.ranking,
    incluyeEnVivo: resultado.incluyeEnVivo
  };
}

export async function obtenerRanking(pollaId) {
  return obtenerRankingPolla(pollaId);
}
