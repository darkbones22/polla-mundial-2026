import { supabase } from '../supabaseClient.js';
import { obtenerFechaHoraChile } from '../utils/fechas.js';

function tieneGolesValidos(fila) {
  return Number.isInteger(fila.goles_local_real) && Number.isInteger(fila.goles_visita_real);
}

function esResultadoRelevante(fila) {
  return tieneGolesValidos(fila) || ['Cerrado', 'Finalizado'].includes(fila.estado);
}

function mapearResultadoGrupo(fila) {
  const fechaHoraChile = obtenerFechaHoraChile(fila.fecha_hora);

  return {
    id: fila.id,
    grupo: fila.grupo,
    fechaHora: fila.fecha_hora,
    fecha: fechaHoraChile.fecha,
    hora: fechaHoraChile.hora,
    equipoLocal: fila.equipo_local,
    equipoVisita: fila.equipo_visita,
    golesLocalReal: fila.goles_local_real,
    golesVisitaReal: fila.goles_visita_real,
    estado: fila.estado,
    resultadoFinalizado: fila.estado === 'Finalizado' && tieneGolesValidos(fila)
  };
}

function mapearResultadoEliminacion(fila) {
  const fechaHoraChile = obtenerFechaHoraChile(fila.fecha_hora);

  return {
    id: fila.id,
    ronda: fila.ronda,
    fechaHora: fila.fecha_hora,
    fecha: fechaHoraChile.fecha,
    hora: fechaHoraChile.hora,
    placeholderLocal: fila.placeholder_local,
    equipoLocal: fila.equipo_local,
    placeholderVisita: fila.placeholder_visita,
    equipoVisita: fila.equipo_visita,
    golesLocalReal: fila.goles_local_real,
    golesVisitaReal: fila.goles_visita_real,
    clasificadoRealLado: fila.clasificado_real_lado,
    estado: fila.estado,
    resultadoFinalizado: fila.estado === 'Finalizado' && tieneGolesValidos(fila)
  };
}

export async function obtenerResultadosGrupos() {
  const { data, error } = await supabase
    .from('partidos_grupos')
    .select('id,grupo,fecha_hora,equipo_local,equipo_visita,goles_local_real,goles_visita_real,estado')
    .order('fecha_hora', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data || [])
    .filter(esResultadoRelevante)
    .map(mapearResultadoGrupo);
}

export async function obtenerResultadosEliminacion() {
  const { data, error } = await supabase
    .from('partidos_eliminacion')
    .select('id,ronda,fecha_hora,placeholder_local,equipo_local,placeholder_visita,equipo_visita,goles_local_real,goles_visita_real,clasificado_real_lado,estado')
    .order('fecha_hora', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data || [])
    .filter(esResultadoRelevante)
    .map(mapearResultadoEliminacion);
}

export async function obtenerResultados(tipo) {
  if (tipo === 'grupos') return obtenerResultadosGrupos();
  if (tipo === 'eliminacion') return obtenerResultadosEliminacion();
  throw new Error('Tipo de resultados invalido');
}

export async function obtenerDetallePartido() {
  throw new Error('obtenerDetallePartido pendiente de implementar');
}
