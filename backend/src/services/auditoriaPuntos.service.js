import { supabase } from '../supabaseClient.js';
import {
  calcularPuntosEliminacion,
  calcularPuntosGrupos
} from './puntaje.service.js';
import { obtenerFechaHoraChile } from '../utils/fechas.js';
import { normalizarCodigoLegacy } from '../utils/codigos.js';

const TIPOS_VALIDOS = new Set(['grupos', 'eliminacion', 'todos']);

function normalizarTipo(tipo) {
  const valor = String(tipo || 'todos').trim().toLowerCase();
  return TIPOS_VALIDOS.has(valor) ? valor : 'todos';
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

function crearDesglose(detalle, tipo) {
  return {
    exacto: {
      acierto: Boolean(detalle?.exacto),
      puntos: detalle?.exacto ? 10 : 0
    },
    ganador: {
      acierto: Boolean(detalle?.ganadorEmpate),
      puntos: detalle?.ganadorEmpate ? 5 : 0
    },
    golLocal: {
      acierto: Boolean(detalle?.golesLocal),
      puntos: detalle?.golesLocal ? 2 : 0
    },
    golVisita: {
      acierto: Boolean(detalle?.golesVisita),
      puntos: detalle?.golesVisita ? 2 : 0
    },
    diferencia: {
      acierto: Boolean(detalle?.diferencia),
      puntos: detalle?.diferencia ? 1 : 0
    },
    clasificado: tipo === 'eliminacion'
      ? {
        acierto: Boolean(detalle?.clasificado),
        puntos: detalle?.clasificado ? 3 : 0
      }
      : null
  };
}

function crearObservacion(desglose, detalle, tipo) {
  if (!detalle?.calculable) return 'No suma.';
  if (desglose.exacto.acierto) {
    return tipo === 'eliminacion' && desglose.clasificado?.acierto
      ? 'Exacto: +10, clasificado correcto: +3'
      : 'Exacto: +10';
  }

  const partes = [];
  if (desglose.ganador.acierto) partes.push('ganador/empate correcto: +5');
  if (desglose.golLocal.acierto) partes.push('gol local correcto: +2');
  if (desglose.golVisita.acierto) partes.push('gol visita correcto: +2');
  if (desglose.diferencia.acierto) partes.push('diferencia absoluta correcta: +1');
  if (tipo === 'eliminacion' && desglose.clasificado?.acierto) partes.push('clasificado correcto: +3');

  return partes.length ? partes.join(', ') : 'Sin aciertos.';
}

function crearItemBase({ tipo, partido, participante, pronostico, detalle, alertas = [] }) {
  const fechaHoraChile = obtenerFechaHoraChile(partido.fecha_hora);
  const desglose = crearDesglose(detalle, tipo);
  const provisorio = estaEnVivo(partido) && Boolean(detalle?.calculable);
  const local = tipo === 'grupos'
    ? partido.equipo_local
    : partido.equipo_local || partido.placeholder_local;
  const visita = tipo === 'grupos'
    ? partido.equipo_visita
    : partido.equipo_visita || partido.placeholder_visita;

  return {
    participante: {
      id: participante.id,
      nombre: participante.nombre_visible,
      codigo: participante.codigo_legacy
    },
    partidoId: partido.id,
    tipo,
    grupoORonda: tipo === 'grupos' ? partido.grupo : partido.ronda,
    fecha: fechaHoraChile.fecha,
    hora: fechaHoraChile.hora,
    local,
    visita,
    resultadoReal: {
      golesLocal: partido.goles_local_real,
      golesVisita: partido.goles_visita_real,
      clasificadoLado: tipo === 'eliminacion' ? partido.clasificado_real_lado : null
    },
    pronostico: pronostico
      ? {
        golesLocal: pronostico.goles_local,
        golesVisita: pronostico.goles_visita,
        clasificadoLado: tipo === 'eliminacion' ? pronostico.clasificado_lado : null
      }
      : null,
    estado: partido.estado,
    provisorio,
    definitivo: estaFinalizado(partido) && Boolean(detalle?.calculable),
    puntos: detalle?.puntos || 0,
    calculable: Boolean(detalle?.calculable),
    motivo: detalle?.motivo || '',
    desglose,
    observacion: crearObservacion(desglose, detalle, tipo),
    alertas
  };
}

function obtenerUltimosPronosticos(filas) {
  const ordenadas = [...(filas || [])].sort((a, b) => {
    const fechaA = new Date(a.actualizado_en || a.enviado_en || 0).getTime() || 0;
    const fechaB = new Date(b.actualizado_en || b.enviado_en || 0).getTime() || 0;
    if (fechaB !== fechaA) return fechaB - fechaA;
    return String(b.id || '').localeCompare(String(a.id || ''));
  });
  const ultimos = new Map();
  const duplicados = new Map();

  ordenadas.forEach((fila) => {
    const clave = `${fila.participante_id}|${fila.partido_id}`;
    duplicados.set(clave, (duplicados.get(clave) || 0) + 1);
    if (!ultimos.has(clave)) {
      ultimos.set(clave, fila);
    }
  });

  return {
    pronosticos: [...ultimos.values()],
    duplicados
  };
}

async function obtenerParticipantesPolla(pollaId) {
  const query = supabase
    .from('participantes_pollas')
    .select('participante_id,participantes!inner(id,codigo_legacy,nombre_visible,activo)')
    .eq('activo', true)
    .eq('participantes.activo', true);

  if (pollaId) {
    query.eq('polla_id', pollaId);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data || []).map((fila) => fila.participantes).filter(Boolean);
}

async function obtenerPartidosGrupos() {
  const { data, error } = await supabase
    .from('partidos_grupos')
    .select('id,grupo,fecha_hora,equipo_local,equipo_visita,goles_local_real,goles_visita_real,estado')
    .order('fecha_hora', { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

async function obtenerPartidosEliminacion() {
  const { data, error } = await supabase
    .from('partidos_eliminacion')
    .select('id,ronda,fecha_hora,placeholder_local,equipo_local,placeholder_visita,equipo_visita,goles_local_real,goles_visita_real,clasificado_real_lado,estado')
    .order('fecha_hora', { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function consultarTodasLasPaginas(crearQuery, tamanoPagina = 1000) {
  const filas = [];
  let desde = 0;

  while (true) {
    const hasta = desde + tamanoPagina - 1;
    const { data, error } = await crearQuery().range(desde, hasta);

    if (error) throw new Error(error.message);

    const pagina = data || [];
    filas.push(...pagina);

    if (pagina.length < tamanoPagina) break;
    desde += tamanoPagina;
  }

  return filas;
}

async function obtenerPronosticosGrupos(participanteIds) {
  if (!participanteIds.length) return { pronosticos: [], duplicados: new Map() };

  const data = await consultarTodasLasPaginas(() => supabase
    .from('pronosticos_grupos')
    .select('id,participante_id,partido_id,goles_local,goles_visita,enviado_en,actualizado_en')
    .in('participante_id', participanteIds));

  return obtenerUltimosPronosticos(data);
}

async function obtenerPronosticosEliminacion(participanteIds) {
  if (!participanteIds.length) return { pronosticos: [], duplicados: new Map() };

  const data = await consultarTodasLasPaginas(() => supabase
    .from('pronosticos_eliminacion')
    .select('id,participante_id,partido_id,goles_local,goles_visita,clasificado_lado,enviado_en,actualizado_en')
    .in('participante_id', participanteIds));

  return obtenerUltimosPronosticos(data);
}

function filtrarParticipantes(participantes, filtros) {
  const participanteId = String(filtros.participanteId || '').trim();
  const codigo = String(filtros.codigo || '').trim().toLowerCase();

  return participantes.filter((participante) => {
    if (participanteId && participante.id !== participanteId) return false;
    if (codigo && String(participante.codigo_legacy || '').toLowerCase() !== codigo) return false;
    return true;
  });
}

function filtrarPartidos(partidos, filtros) {
  const partidoId = String(filtros.partidoId || '').trim();
  if (!partidoId) return partidos;
  return partidos.filter((partido) => partido.id === partidoId);
}

function deduplicarParticipantes(participantes) {
  return [...new Map((participantes || []).map((participante) => [participante.id, participante])).values()];
}

function crearErrorAuditoria(mensaje, status = 400) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}

async function obtenerPollaPorId(pollaId) {
  if (!pollaId) return null;

  const { data, error } = await supabase
    .from('pollas')
    .select('id,id_legacy,nombre,activa')
    .eq('id', pollaId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

async function resolverParticipantePorCodigoExacto({ codigo, pollaId }) {
  const codigoNormalizado = normalizarCodigoLegacy(codigo);

  if (!codigoNormalizado) {
    throw crearErrorAuditoria('Debes indicar código');
  }

  const { data: participantes, error } = await supabase
    .from('participantes')
    .select('id,codigo_legacy,nombre_visible,activo')
    .eq('codigo_legacy', codigoNormalizado);

  if (error) throw new Error(error.message);

  if (!participantes?.length) {
    throw crearErrorAuditoria('No existe un participante con ese código.', 404);
  }

  if (participantes.length > 1) {
    throw crearErrorAuditoria('Código duplicado en participantes.', 409);
  }

  const participante = participantes[0];

  if (!participante.activo) {
    throw crearErrorAuditoria('No existe un participante activo con ese código.', 404);
  }

  if (pollaId) {
    const { data: relacion, error: errorRelacion } = await supabase
      .from('participantes_pollas')
      .select('participante_id,polla_id,activo')
      .eq('participante_id', participante.id)
      .eq('polla_id', pollaId)
      .eq('activo', true)
      .maybeSingle();

    if (errorRelacion) throw new Error(errorRelacion.message);

    if (!relacion) {
      throw crearErrorAuditoria('Este participante no pertenece a la polla seleccionada.', 403);
    }
  }

  return participante;
}

export function calcularItemsAuditoriaTipo({ tipo, partidos, pronosticos, duplicados, participantes, filtros = {} }) {
  const participantesUnicos = deduplicarParticipantes(participantes);
  const partidosFiltrados = filtrarPartidos(partidos, filtros);
  const participantesFiltrados = filtrarParticipantes(participantesUnicos, filtros);
  const participantesPorId = new Map(participantesFiltrados.map((participante) => [participante.id, participante]));
  const partidosPorId = new Map(partidosFiltrados.map((partido) => [partido.id, partido]));
  const items = [];
  let partidosFinalizadosConsiderados = 0;
  let partidosEnVivoConsiderados = 0;
  let partidosOmitidosNoFinalizados = 0;

  partidosFiltrados.forEach((partido) => {
    if (estaFinalizado(partido)) {
      partidosFinalizadosConsiderados += 1;
    } else if (estaEnVivo(partido)) {
      partidosEnVivoConsiderados += 1;
    } else {
      partidosOmitidosNoFinalizados += 1;
    }
  });

  pronosticos.forEach((pronostico) => {
    const participante = participantesPorId.get(pronostico.participante_id);
    const partido = partidosPorId.get(pronostico.partido_id);
    if (!participante || !partido) return;

    const alertas = [];
    const clave = `${pronostico.participante_id}|${pronostico.partido_id}`;
    if ((duplicados.get(clave) || 0) > 1) alertas.push('Pronostico duplicado: se usa el mas reciente.');
    if (!esEstadoCalculable(partido)) alertas.push('No suma: partido no finalizado ni en vivo.');
    if (estaEnVivo(partido)) alertas.push('Puntaje provisorio: partido en vivo.');
    if (!tieneGolesValidos(partido)) alertas.push('No suma: resultado real incompleto.');
    if (tipo === 'eliminacion' && estaFinalizado(partido) && !['local', 'visita'].includes(partido.clasificado_real_lado)) {
      alertas.push('No suma: falta clasificado real.');
    }

    const resultado = tipo === 'eliminacion'
      ? {
        golesLocal: partido.goles_local_real,
        golesVisita: partido.goles_visita_real,
        clasificadoRealLado: partido.clasificado_real_lado
      }
      : {
        golesLocal: partido.goles_local_real,
        golesVisita: partido.goles_visita_real
      };
    const pronosticoPuntos = tipo === 'eliminacion'
      ? {
        golesLocal: pronostico.goles_local,
        golesVisita: pronostico.goles_visita,
        clasificadoLado: pronostico.clasificado_lado
      }
      : {
        golesLocal: pronostico.goles_local,
        golesVisita: pronostico.goles_visita
      };
    const puedeCalcular = esEstadoCalculable(partido) &&
      tieneGolesValidos(partido) &&
      (tipo !== 'eliminacion' || estaEnVivo(partido) || ['local', 'visita'].includes(partido.clasificado_real_lado));
    const detalle = puedeCalcular
      ? (tipo === 'eliminacion'
        ? calcularPuntosEliminacion(pronosticoPuntos, resultado)
        : calcularPuntosGrupos(pronosticoPuntos, resultado))
      : { puntos: 0, total: 0, calculable: false, motivo: 'partido_no_finalizado' };

    items.push(crearItemBase({
      tipo,
      partido,
      participante,
      pronostico,
      detalle,
      alertas
    }));
  });

  return {
    items,
    partidosFinalizadosConsiderados,
    partidosEnVivoConsiderados,
    partidosOmitidosNoFinalizados
  };
}

export const auditarTipo = calcularItemsAuditoriaTipo;

export async function obtenerAuditoriaPuntos(filtros = {}) {
  const tipo = normalizarTipo(filtros.tipo);
  const participanteExacto = filtros.codigo
    ? await resolverParticipantePorCodigoExacto({ codigo: filtros.codigo, pollaId: filtros.pollaId })
    : null;
  const participantes = participanteExacto
    ? [participanteExacto]
    : deduplicarParticipantes(await obtenerParticipantesPolla(filtros.pollaId));
  const participanteIds = participantes.map((participante) => participante.id);
  const filtrosCalculo = {
    ...filtros,
    participanteId: participanteExacto?.id || filtros.participanteId,
    codigo: participanteExacto?.codigo_legacy || filtros.codigo
  };
  const tareas = [];

  if (tipo === 'grupos' || tipo === 'todos') {
    tareas.push(Promise.all([
      obtenerPartidosGrupos(),
      obtenerPronosticosGrupos(participanteIds)
    ]).then(([partidos, pronosticos]) => calcularItemsAuditoriaTipo({
      tipo: 'grupos',
      partidos,
      pronosticos: pronosticos.pronosticos,
      duplicados: pronosticos.duplicados,
      participantes,
      filtros: filtrosCalculo
    })));
  }

  if (tipo === 'eliminacion' || tipo === 'todos') {
    tareas.push(Promise.all([
      obtenerPartidosEliminacion(),
      obtenerPronosticosEliminacion(participanteIds)
    ]).then(([partidos, pronosticos]) => calcularItemsAuditoriaTipo({
      tipo: 'eliminacion',
      partidos,
      pronosticos: pronosticos.pronosticos,
      duplicados: pronosticos.duplicados,
      participantes,
      filtros: filtrosCalculo
    })));
  }

  const resultados = await Promise.all(tareas);
  const items = resultados.flatMap((resultado) => resultado.items);
  const totalPuntos = items.reduce((suma, item) => suma + item.puntos, 0);
  const totalesPorParticipante = [...items.reduce((mapa, item) => {
    const actual = mapa.get(item.participante.id) || {
      id: item.participante.id,
      nombre: item.participante.nombre,
      codigo: item.participante.codigo,
      puntosGrupos: 0,
      puntosEliminacion: 0,
      puntosTotal: 0
    };

    if (item.tipo === 'grupos') actual.puntosGrupos += item.puntos;
    if (item.tipo === 'eliminacion') actual.puntosEliminacion += item.puntos;
    actual.puntosTotal = actual.puntosGrupos + actual.puntosEliminacion;
    mapa.set(item.participante.id, actual);
    return mapa;
  }, new Map()).values()].sort((a, b) => b.puntosTotal - a.puntosTotal || a.nombre.localeCompare(b.nombre));
  const duplicadosDetectados = items.filter((item) =>
    (item.alertas || []).some((alerta) => alerta.toLowerCase().includes('duplicado'))
  ).length;
  const totalPuntosProvisorios = items
    .filter((item) => item.provisorio)
    .reduce((suma, item) => suma + item.puntos, 0);
  const totalPuntosGrupos = items
    .filter((item) => item.tipo === 'grupos')
    .reduce((suma, item) => suma + item.puntos, 0);
  const totalPuntosEliminacion = items
    .filter((item) => item.tipo === 'eliminacion')
    .reduce((suma, item) => suma + item.puntos, 0);
  const totalPlenosGrupos = items
    .filter((item) => item.tipo === 'grupos' && item.desglose?.exacto?.acierto)
    .length;
  const totalPlenosEliminacion = items
    .filter((item) => item.tipo === 'eliminacion' && item.desglose?.exacto?.acierto)
    .length;
  const totalPartidosCalculados = items.filter((item) => item.calculable).length;
  const polla = await obtenerPollaPorId(filtros.pollaId);

  return {
    resumen: {
      participante: participanteExacto
        ? {
          id: participanteExacto.id,
          nombre: participanteExacto.nombre_visible,
          codigo: participanteExacto.codigo_legacy
        }
        : null,
      polla: polla
        ? {
          id: polla.id,
          idLegacy: polla.id_legacy,
          nombre: polla.nombre
        }
        : null,
      totalParticipantes: new Set(items.map((item) => item.participante.id)).size,
      totalPartidosFinalizados: resultados.reduce((suma, item) => suma + item.partidosFinalizadosConsiderados, 0),
      totalPartidosEnVivo: resultados.reduce((suma, item) => suma + item.partidosEnVivoConsiderados, 0),
      totalPartidosOmitidosNoFinalizados: resultados.reduce((suma, item) => suma + item.partidosOmitidosNoFinalizados, 0),
      totalPartidosCalculados,
      totalPronosticosAuditados: items.length,
      totalPuntos,
      totalPuntosGrupos,
      totalPuntosEliminacion,
      totalPuntosProvisorios,
      totalPlenosGrupos,
      totalPlenosEliminacion,
      incluyeEnVivo: items.some((item) => item.provisorio),
      duplicadosDetectados,
      totalesPorParticipante
    },
    items: items.sort((a, b) => {
      if (a.partidoId !== b.partidoId) return a.partidoId.localeCompare(b.partidoId);
      return a.participante.nombre.localeCompare(b.participante.nombre);
    })
  };
}

export async function calcularBasePuntosDesdePronosticosYResultados(pollaId) {
  return obtenerAuditoriaPuntos({ pollaId, tipo: 'todos' });
}
