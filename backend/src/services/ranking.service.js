import { supabase } from '../supabaseClient.js';
import {
  calcularPuntosEliminacion,
  calcularPuntosGrupos
} from './puntaje.service.js';
import {
  obtenerPronosticosEliminacionParticipantes,
  obtenerPronosticosGruposParticipantes
} from './pronosticos.service.js';
import { obtenerAuditoriaPuntos } from './auditoriaPuntos.service.js';

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

function tieneGolesValidos(partido) {
  return Number.isInteger(partido.goles_local_real) && Number.isInteger(partido.goles_visita_real);
}

function estaFinalizado(partido) {
  return String(partido?.estado || '').trim().toLowerCase() === 'finalizado';
}

export function obtenerResultadosGruposPorPartido(partidos) {
  const resultadosPorPartido = new Map();

  partidos.forEach((partido) => {
    if (!tieneGolesValidos(partido)) return;
    if (!estaFinalizado(partido)) return;

    resultadosPorPartido.set(partido.id, {
      golesLocal: partido.goles_local_real,
      golesVisita: partido.goles_visita_real
    });
  });

  return {
    resultadosPorPartido,
    incluyeEnVivo: false
  };
}

export function obtenerResultadosEliminacionPorPartido(partidos) {
  const resultadosPorPartido = new Map();

  partidos.forEach((partido) => {
    if (!tieneGolesValidos(partido)) return;

    const finalizado = estaFinalizado(partido);

    if (!finalizado) return;
    if (finalizado && !['local', 'visita'].includes(partido.clasificado_real_lado)) return;

    resultadosPorPartido.set(partido.id, {
      golesLocal: partido.goles_local_real,
      golesVisita: partido.goles_visita_real,
      clasificadoRealLado: partido.clasificado_real_lado
    });
  });

  return {
    resultadosPorPartido,
    incluyeEnVivo: false
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
  const resultado = await obtenerRankingPollaConMeta(pollaId);
  return resultado.ranking;
}

export async function obtenerRankingPollaConMeta(pollaId) {
  const participantes = await obtenerParticipantesActivosPolla(pollaId);
  const rankingPorParticipante = new Map(
    participantes.map((participante) => [participante.participanteId, participante])
  );
  const auditoria = await obtenerAuditoriaPuntos({ pollaId, tipo: 'todos' });

  auditoria.items.forEach((item) => {
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

  return {
    ranking: ordenarRanking(Array.from(rankingPorParticipante.values())),
    incluyeEnVivo: false
  };
}

export async function obtenerRanking(pollaId) {
  return obtenerRankingPolla(pollaId);
}
