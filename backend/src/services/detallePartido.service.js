import { supabase } from '../supabaseClient.js';
import {
  calcularPuntosEliminacion,
  calcularPuntosGrupos
} from './puntaje.service.js';
import { obtenerFechaHoraChile } from '../utils/fechas.js';
import {
  obtenerPronosticosEliminacionPartidoParticipantes,
  obtenerPronosticosGruposPartidoParticipantes
} from './pronosticos.service.js';
import { estaPartidoDisponibleParaPronosticar } from '../utils/pronosticos.js';

function tieneGolesValidos(partido) {
  return Number.isInteger(partido.goles_local_real) && Number.isInteger(partido.goles_visita_real);
}

function resultadoFinalizadoGrupo(partido) {
  return partido.estado === 'Finalizado' && tieneGolesValidos(partido);
}

function resultadoFinalizadoEliminacion(partido) {
  return (
    partido.estado === 'Finalizado' &&
    tieneGolesValidos(partido) &&
    ['local', 'visita'].includes(partido.clasificado_real_lado)
  );
}

function mapearPartidoGrupo(partido) {
  const fechaHoraChile = obtenerFechaHoraChile(partido.fecha_hora);

  return {
    id: partido.id,
    grupo: partido.grupo,
    fechaHora: partido.fecha_hora,
    fecha: fechaHoraChile.fecha,
    hora: fechaHoraChile.hora,
    equipoLocal: partido.equipo_local,
    equipoVisita: partido.equipo_visita,
    golesLocalReal: partido.goles_local_real,
    golesVisitaReal: partido.goles_visita_real,
    estado: partido.estado
  };
}

function mapearPartidoEliminacion(partido) {
  const fechaHoraChile = obtenerFechaHoraChile(partido.fecha_hora);

  return {
    id: partido.id,
    ronda: partido.ronda,
    fechaHora: partido.fecha_hora,
    fecha: fechaHoraChile.fecha,
    hora: fechaHoraChile.hora,
    placeholderLocal: partido.placeholder_local,
    equipoLocal: partido.equipo_local,
    placeholderVisita: partido.placeholder_visita,
    equipoVisita: partido.equipo_visita,
    golesLocalReal: partido.goles_local_real,
    golesVisitaReal: partido.goles_visita_real,
    clasificadoRealLado: partido.clasificado_real_lado,
    estado: partido.estado
  };
}

async function obtenerParticipantesDePolla(pollaId) {
  const { data, error } = await supabase
    .from('participantes_pollas')
    .select('participante_id,participantes!inner(id,nombre_visible,activo)')
    .eq('polla_id', pollaId)
    .eq('activo', true)
    .eq('participantes.activo', true);

  if (error) {
    throw new Error(error.message);
  }

  return (data || [])
    .filter((fila) => fila.participantes?.activo)
    .map((fila) => ({
      participanteId: fila.participantes.id,
      nombre: fila.participantes.nombre_visible
    }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
}

async function obtenerPartidoGrupo(partidoId) {
  const { data, error } = await supabase
    .from('partidos_grupos')
    .select('id,grupo,fecha_hora,equipo_local,equipo_visita,goles_local_real,goles_visita_real,estado')
    .eq('id', partidoId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function obtenerPartidoEliminacion(partidoId) {
  const { data, error } = await supabase
    .from('partidos_eliminacion')
    .select('id,ronda,fecha_hora,placeholder_local,equipo_local,placeholder_visita,equipo_visita,goles_local_real,goles_visita_real,clasificado_real_lado,estado')
    .eq('id', partidoId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

function ordenarDetalle(detalle, finalizado) {
  return detalle.sort((a, b) => {
    if (finalizado && b.puntos !== a.puntos) return b.puntos - a.puntos;
    return a.nombre.localeCompare(b.nombre);
  });
}

export async function obtenerDetallePartidoGrupos({ pollaId, partidoId }) {
  return obtenerDetallePartidoGruposSeguro({ pollaId, partidoId, participanteActualId: '' });
}

export async function obtenerDetallePartidoGruposSeguro({ pollaId, partidoId, participanteActualId }) {
  const partido = await obtenerPartidoGrupo(partidoId);

  if (!partido) return null;

  const disponibilidad = estaPartidoDisponibleParaPronosticar(partido, 'grupos');
  const finalizado = resultadoFinalizadoGrupo(partido);
  const resultado = {
    golesLocal: partido.goles_local_real,
    golesVisita: partido.goles_visita_real
  };

  if (disponibilidad.disponible) {
    const pronosticoPropioPorParticipante = await obtenerPronosticosGruposPartidoParticipantes(
      partidoId,
      participanteActualId ? [participanteActualId] : []
    );
    const pronosticoPropio = pronosticoPropioPorParticipante.get(participanteActualId);

    return {
      ok: true,
      tipo: 'grupos',
      partido: mapearPartidoGrupo(partido),
      resultadoFinalizado: finalizado,
      estadoDetalle: 'abierto',
      pronosticosOcultos: true,
      mensajeOculto: 'Este partido aun esta abierto para pronosticar. Los pronosticos de otros participantes se mostraran cuando se cierre el plazo.',
      pronosticoPropio: pronosticoPropio
        ? {
          golesLocal: pronosticoPropio.goles_local,
          golesVisita: pronosticoPropio.goles_visita
        }
        : null,
      detalle: []
    };
  }

  const participantesPolla = await obtenerParticipantesDePolla(pollaId);
  const participanteIds = participantesPolla.map((participante) => participante.participanteId);
  const pronosticosPorParticipante = await obtenerPronosticosGruposPartidoParticipantes(partidoId, participanteIds);

  const detalle = participantesPolla.map((participante) => {
    const pronostico = pronosticosPorParticipante.get(participante.participanteId);
    const pronosticoMapeado = pronostico
      ? {
        golesLocal: pronostico.goles_local,
        golesVisita: pronostico.goles_visita
      }
      : null;
    const detallePuntos = finalizado && pronosticoMapeado
      ? calcularPuntosGrupos(pronosticoMapeado, resultado)
      : null;

    return {
      participanteId: participante.participanteId,
      nombre: participante.nombre,
      pronostico: pronosticoMapeado,
      puntos: detallePuntos?.puntos || 0,
      detallePuntos
    };
  });

  return {
    ok: true,
    tipo: 'grupos',
    partido: mapearPartidoGrupo(partido),
    resultadoFinalizado: finalizado,
    estadoDetalle: finalizado ? 'finalizado' : 'pendiente',
    detalle: ordenarDetalle(detalle, finalizado)
  };
}

export async function obtenerDetallePartidoEliminacion({ pollaId, partidoId }) {
  return obtenerDetallePartidoEliminacionSeguro({ pollaId, partidoId, participanteActualId: '' });
}

export async function obtenerDetallePartidoEliminacionSeguro({ pollaId, partidoId, participanteActualId }) {
  const partido = await obtenerPartidoEliminacion(partidoId);

  if (!partido) return null;

  const disponibilidad = estaPartidoDisponibleParaPronosticar(partido, 'eliminacion');
  const finalizado = resultadoFinalizadoEliminacion(partido);
  const resultado = {
    golesLocal: partido.goles_local_real,
    golesVisita: partido.goles_visita_real,
    clasificadoRealLado: partido.clasificado_real_lado
  };

  if (disponibilidad.disponible) {
    const pronosticoPropioPorParticipante = await obtenerPronosticosEliminacionPartidoParticipantes(
      partidoId,
      participanteActualId ? [participanteActualId] : []
    );
    const pronosticoPropio = pronosticoPropioPorParticipante.get(participanteActualId);

    return {
      ok: true,
      tipo: 'eliminacion',
      partido: mapearPartidoEliminacion(partido),
      resultadoFinalizado: finalizado,
      estadoDetalle: 'abierto',
      pronosticosOcultos: true,
      mensajeOculto: 'Este partido aun esta abierto para pronosticar. Los pronosticos de otros participantes se mostraran cuando se cierre el plazo.',
      pronosticoPropio: pronosticoPropio
        ? {
          golesLocal: pronosticoPropio.goles_local,
          golesVisita: pronosticoPropio.goles_visita,
          clasificadoLado: pronosticoPropio.clasificado_lado
        }
        : null,
      detalle: []
    };
  }

  const participantesPolla = await obtenerParticipantesDePolla(pollaId);
  const participanteIds = participantesPolla.map((participante) => participante.participanteId);
  const pronosticosPorParticipante = await obtenerPronosticosEliminacionPartidoParticipantes(partidoId, participanteIds);

  const detalle = participantesPolla.map((participante) => {
    const pronostico = pronosticosPorParticipante.get(participante.participanteId);
    const pronosticoMapeado = pronostico
      ? {
        golesLocal: pronostico.goles_local,
        golesVisita: pronostico.goles_visita,
        clasificadoLado: pronostico.clasificado_lado
      }
      : null;
    const detallePuntos = finalizado && pronosticoMapeado
      ? calcularPuntosEliminacion(pronosticoMapeado, resultado)
      : null;

    return {
      participanteId: participante.participanteId,
      nombre: participante.nombre,
      pronostico: pronosticoMapeado,
      puntos: detallePuntos?.puntos || 0,
      detallePuntos
    };
  });

  return {
    ok: true,
    tipo: 'eliminacion',
    partido: mapearPartidoEliminacion(partido),
    resultadoFinalizado: finalizado,
    estadoDetalle: finalizado ? 'finalizado' : 'pendiente',
    detalle: ordenarDetalle(detalle, finalizado)
  };
}

export async function obtenerDetallePartido({ pollaId, partidoId, tipo, participanteActualId }) {
  if (tipo === 'grupos') {
    return obtenerDetallePartidoGruposSeguro({ pollaId, partidoId, participanteActualId });
  }

  if (tipo === 'eliminacion') {
    return obtenerDetallePartidoEliminacionSeguro({ pollaId, partidoId, participanteActualId });
  }

  throw new Error('Tipo de detalle invalido');
}
