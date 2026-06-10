import { supabase } from '../supabaseClient.js';
import {
  calcularPuntosEliminacion,
  calcularPuntosGrupos
} from './puntaje.service.js';
import { obtenerFechaHoraChile } from '../utils/fechas.js';

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

async function obtenerPronosticosGruposPorPartido(pollaId, partidoId) {
  const { data, error } = await supabase
    .from('pronosticos_grupos')
    .select('participante_id,goles_local,goles_visita')
    .eq('polla_id', pollaId)
    .eq('partido_id', partidoId);

  if (error) {
    throw new Error(error.message);
  }

  return new Map((data || []).map((fila) => [fila.participante_id, fila]));
}

async function obtenerPronosticosEliminacionPorPartido(pollaId, partidoId) {
  const { data, error } = await supabase
    .from('pronosticos_eliminacion')
    .select('participante_id,goles_local,goles_visita,clasificado_lado')
    .eq('polla_id', pollaId)
    .eq('partido_id', partidoId);

  if (error) {
    throw new Error(error.message);
  }

  return new Map((data || []).map((fila) => [fila.participante_id, fila]));
}

function ordenarDetalle(detalle, finalizado) {
  return detalle.sort((a, b) => {
    if (finalizado && b.puntos !== a.puntos) return b.puntos - a.puntos;
    return a.nombre.localeCompare(b.nombre);
  });
}

export async function obtenerDetallePartidoGrupos({ pollaId, partidoId }) {
  const [partido, participantes, pronosticosPorParticipante] = await Promise.all([
    obtenerPartidoGrupo(partidoId),
    obtenerParticipantesDePolla(pollaId),
    obtenerPronosticosGruposPorPartido(pollaId, partidoId)
  ]);

  if (!partido) return null;

  const finalizado = resultadoFinalizadoGrupo(partido);
  const resultado = {
    golesLocal: partido.goles_local_real,
    golesVisita: partido.goles_visita_real
  };

  const detalle = participantes.map((participante) => {
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
  const [partido, participantes, pronosticosPorParticipante] = await Promise.all([
    obtenerPartidoEliminacion(partidoId),
    obtenerParticipantesDePolla(pollaId),
    obtenerPronosticosEliminacionPorPartido(pollaId, partidoId)
  ]);

  if (!partido) return null;

  const finalizado = resultadoFinalizadoEliminacion(partido);
  const resultado = {
    golesLocal: partido.goles_local_real,
    golesVisita: partido.goles_visita_real,
    clasificadoRealLado: partido.clasificado_real_lado
  };

  const detalle = participantes.map((participante) => {
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

export async function obtenerDetallePartido({ pollaId, partidoId, tipo }) {
  if (tipo === 'grupos') {
    return obtenerDetallePartidoGrupos({ pollaId, partidoId });
  }

  if (tipo === 'eliminacion') {
    return obtenerDetallePartidoEliminacion({ pollaId, partidoId });
  }

  throw new Error('Tipo de detalle invalido');
}
