import { supabase } from '../supabaseClient.js';
import {
  calcularPuntosEliminacion,
  calcularPuntosGrupos
} from './puntaje.service.js';
import {
  obtenerPronosticosEliminacionParticipantes,
  obtenerPronosticosGruposParticipantes
} from './pronosticos.service.js';
import { obtenerEstadoHorarioPartido } from '../utils/fechas.js';

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
    partidosEliminacion: 0,
    partidosEnVivo: 0,
    puntosProvisorios: 0
  };
}

function tieneGolesValidos(partido) {
  return Number.isInteger(partido.goles_local_real) && Number.isInteger(partido.goles_visita_real);
}

function estaFinalizado(partido) {
  return String(partido?.estado || '').trim().toLowerCase() === 'finalizado';
}

function estaEnVivo(partido) {
  return obtenerEstadoHorarioPartido(partido?.fecha_hora, partido?.estado).estado === 'En vivo';
}

function obtenerResultadosGruposPorPartido(partidos) {
  const resultadosPorPartido = new Map();
  let incluyeEnVivo = false;

  partidos.forEach((partido) => {
    if (!tieneGolesValidos(partido)) return;

    const provisorio = !estaFinalizado(partido) && estaEnVivo(partido);

    if (!estaFinalizado(partido) && !provisorio) return;
    if (provisorio) incluyeEnVivo = true;

    resultadosPorPartido.set(partido.id, {
      golesLocal: partido.goles_local_real,
      golesVisita: partido.goles_visita_real,
      provisorio
    });
  });

  return {
    resultadosPorPartido,
    incluyeEnVivo
  };
}

function obtenerResultadosEliminacionPorPartido(partidos) {
  const resultadosPorPartido = new Map();
  let incluyeEnVivo = false;

  partidos.forEach((partido) => {
    if (!tieneGolesValidos(partido)) return;

    const finalizado = estaFinalizado(partido);
    const provisorio = !finalizado && estaEnVivo(partido);

    if (!finalizado && !provisorio) return;
    if (finalizado && !['local', 'visita'].includes(partido.clasificado_real_lado)) return;
    if (provisorio) incluyeEnVivo = true;

    resultadosPorPartido.set(partido.id, {
      golesLocal: partido.goles_local_real,
      golesVisita: partido.goles_visita_real,
      clasificadoRealLado: partido.clasificado_real_lado,
      provisorio
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

async function obtenerPartidosGruposRanking() {
  const { data, error } = await supabase
    .from('partidos_grupos')
    .select('id,fecha_hora,goles_local_real,goles_visita_real,estado');

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

async function obtenerPartidosEliminacionRanking() {
  const { data, error } = await supabase
    .from('partidos_eliminacion')
    .select('id,fecha_hora,goles_local_real,goles_visita_real,clasificado_real_lado,estado');

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

function aplicarRankingGrupos(rankingPorParticipante, pronosticos, resultadosPorPartido) {
  pronosticos.forEach((pronostico) => {
    const participante = rankingPorParticipante.get(pronostico.participante_id);
    const resultado = resultadosPorPartido.get(pronostico.partido_id);

    if (!participante || !resultado) return;

    const detalle = calcularPuntosGrupos(
      {
        golesLocal: pronostico.goles_local,
        golesVisita: pronostico.goles_visita
      },
      resultado
    );

    if (!detalle.calculable) return;

    participante.puntosGrupos += detalle.total;
    participante.partidosGrupos += 1;
    if (resultado.provisorio) {
      participante.partidosEnVivo += 1;
      participante.puntosProvisorios += detalle.total;
    }

    if (detalle.exacto) participante.exactosGrupos += 1;
    if (detalle.ganadorEmpate) participante.ganadorEmpateGrupos += 1;
    if (detalle.golesLocal) participante.golesLocalGrupos += 1;
    if (detalle.golesVisita) participante.golesVisitaGrupos += 1;
    if (detalle.diferencia) participante.diferenciaGrupos += 1;
  });
}

function aplicarRankingEliminacion(rankingPorParticipante, pronosticos, resultadosPorPartido) {
  pronosticos.forEach((pronostico) => {
    const participante = rankingPorParticipante.get(pronostico.participante_id);
    const resultado = resultadosPorPartido.get(pronostico.partido_id);

    if (!participante || !resultado) return;

    const detalle = calcularPuntosEliminacion(
      {
        golesLocal: pronostico.goles_local,
        golesVisita: pronostico.goles_visita,
        clasificadoLado: pronostico.clasificado_lado
      },
      resultado
    );

    if (!detalle.calculable) return;

    participante.puntosEliminacion += detalle.total;
    participante.partidosEliminacion += 1;
    if (resultado.provisorio) {
      participante.partidosEnVivo += 1;
      participante.puntosProvisorios += detalle.total;
    }

    if (detalle.exacto) participante.exactosEliminacion += 1;
    if (detalle.ganadorEmpate) participante.ganadorEmpateEliminacion += 1;
    if (detalle.golesLocal) participante.golesLocalEliminacion += 1;
    if (detalle.golesVisita) participante.golesVisitaEliminacion += 1;
    if (detalle.diferencia) participante.diferenciaEliminacion += 1;
    if (detalle.clasificado) participante.clasificados += 1;
  });
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
  const participantes = await obtenerParticipantesActivosPolla(pollaId);
  const participanteIds = participantes.map((participante) => participante.participanteId);

  const [
    pronosticosGrupos,
    pronosticosEliminacion,
    partidosGrupos,
    partidosEliminacion
  ] = await Promise.all([
    obtenerPronosticosGruposParticipantes(participanteIds),
    obtenerPronosticosEliminacionParticipantes(participanteIds),
    obtenerPartidosGruposRanking(),
    obtenerPartidosEliminacionRanking()
  ]);

  const rankingPorParticipante = new Map(
    participantes.map((participante) => [participante.participanteId, participante])
  );
  const resultadosGrupos = obtenerResultadosGruposPorPartido(partidosGrupos);
  const resultadosEliminacion = obtenerResultadosEliminacionPorPartido(partidosEliminacion);

  aplicarRankingGrupos(
    rankingPorParticipante,
    pronosticosGrupos,
    resultadosGrupos.resultadosPorPartido
  );

  aplicarRankingEliminacion(
    rankingPorParticipante,
    pronosticosEliminacion,
    resultadosEliminacion.resultadosPorPartido
  );

  return ordenarRanking(Array.from(rankingPorParticipante.values()));
}

export async function obtenerRankingPollaConMeta(pollaId) {
  const participantes = await obtenerParticipantesActivosPolla(pollaId);
  const participanteIds = participantes.map((participante) => participante.participanteId);

  const [
    pronosticosGrupos,
    pronosticosEliminacion,
    partidosGrupos,
    partidosEliminacion
  ] = await Promise.all([
    obtenerPronosticosGruposParticipantes(participanteIds),
    obtenerPronosticosEliminacionParticipantes(participanteIds),
    obtenerPartidosGruposRanking(),
    obtenerPartidosEliminacionRanking()
  ]);

  const rankingPorParticipante = new Map(
    participantes.map((participante) => [participante.participanteId, participante])
  );
  const resultadosGrupos = obtenerResultadosGruposPorPartido(partidosGrupos);
  const resultadosEliminacion = obtenerResultadosEliminacionPorPartido(partidosEliminacion);

  aplicarRankingGrupos(
    rankingPorParticipante,
    pronosticosGrupos,
    resultadosGrupos.resultadosPorPartido
  );

  aplicarRankingEliminacion(
    rankingPorParticipante,
    pronosticosEliminacion,
    resultadosEliminacion.resultadosPorPartido
  );

  return {
    ranking: ordenarRanking(Array.from(rankingPorParticipante.values())),
    incluyeEnVivo: resultadosGrupos.incluyeEnVivo || resultadosEliminacion.incluyeEnVivo
  };
}

export async function obtenerRanking(pollaId) {
  return obtenerRankingPolla(pollaId);
}
