import { supabase } from '../supabaseClient.js';

function mapearPartidoGrupo(fila) {
  return {
    id: fila.id,
    grupo: fila.grupo,
    fechaHora: fila.fecha_hora,
    equipoLocal: fila.equipo_local,
    equipoVisita: fila.equipo_visita,
    golesLocalReal: fila.goles_local_real,
    golesVisitaReal: fila.goles_visita_real,
    estado: fila.estado
  };
}

function mapearPartidoEliminacion(fila) {
  return {
    id: fila.id,
    ronda: fila.ronda,
    fechaHora: fila.fecha_hora,
    placeholderLocal: fila.placeholder_local,
    equipoLocal: fila.equipo_local,
    placeholderVisita: fila.placeholder_visita,
    equipoVisita: fila.equipo_visita,
    golesLocalReal: fila.goles_local_real,
    golesVisitaReal: fila.goles_visita_real,
    clasificadoRealLado: fila.clasificado_real_lado,
    estado: fila.estado
  };
}

export async function obtenerPartidosGrupos() {
  const { data, error } = await supabase
    .from('partidos_grupos')
    .select('id,grupo,fecha_hora,equipo_local,equipo_visita,goles_local_real,goles_visita_real,estado')
    .order('fecha_hora', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map(mapearPartidoGrupo);
}

export async function obtenerPartidosEliminacion() {
  const { data, error } = await supabase
    .from('partidos_eliminacion')
    .select('id,ronda,fecha_hora,placeholder_local,equipo_local,placeholder_visita,equipo_visita,goles_local_real,goles_visita_real,clasificado_real_lado,estado')
    .order('fecha_hora', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map(mapearPartidoEliminacion);
}
