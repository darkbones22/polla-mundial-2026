import { supabase } from '../supabaseClient.js';
import {
  estaPartidoDisponibleParaPronosticar,
  obtenerClasificadoLadoPronosticado
} from '../utils/pronosticos.js';

function mapearPronosticoGrupo(fila) {
  return {
    partidoId: fila.partido_id,
    golesLocal: fila.goles_local,
    golesVisita: fila.goles_visita
  };
}

function esEnteroNoNegativo(valor) {
  return Number.isInteger(valor) && valor >= 0;
}

function crearErrorPronostico(partidoId, mensaje, motivo = 'validacion') {
  return {
    partidoId: partidoId || null,
    motivo,
    mensaje
  };
}

function validarGolesPronostico(pronostico) {
  if (!esEnteroNoNegativo(pronostico.golesLocal) || !esEnteroNoNegativo(pronostico.golesVisita)) {
    return 'Los goles deben ser enteros >= 0.';
  }

  return '';
}

async function obtenerPartidosGruposPorIds(ids) {
  if (ids.length === 0) return new Map();

  const { data, error } = await supabase
    .from('partidos_grupos')
    .select('id,fecha_hora,estado')
    .in('id', ids);

  if (error) {
    throw new Error(error.message);
  }

  return new Map((data || []).map((partido) => [partido.id, partido]));
}

async function obtenerPartidosEliminacionPorIds(ids) {
  if (ids.length === 0) return new Map();

  const { data, error } = await supabase
    .from('partidos_eliminacion')
    .select('id,fecha_hora,estado')
    .in('id', ids);

  if (error) {
    throw new Error(error.message);
  }

  return new Map((data || []).map((partido) => [partido.id, partido]));
}

function mapearPronosticoEliminacion(fila) {
  return {
    partidoId: fila.partido_id,
    golesLocal: fila.goles_local,
    golesVisita: fila.goles_visita,
    clasificadoLado: fila.clasificado_lado
  };
}

export async function obtenerPronosticosGrupos({ participanteId, pollaId }) {
  const { data, error } = await supabase
    .from('pronosticos_grupos')
    .select('partido_id,goles_local,goles_visita')
    .eq('participante_id', participanteId)
    .eq('polla_id', pollaId)
    .order('partido_id', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map(mapearPronosticoGrupo);
}

export async function guardarPronosticosGrupos({ participanteId, pollaId, pronosticos }) {
  const lista = Array.isArray(pronosticos) ? pronosticos : [];
  const errores = [];
  const registros = [];
  const partidoIds = [...new Set(lista.map((p) => String(p.partidoId || '').trim()).filter(Boolean))];
  const partidosPorId = await obtenerPartidosGruposPorIds(partidoIds);

  lista.forEach((pronostico, indice) => {
    const partidoId = String(pronostico.partidoId || '').trim();

    if (!partidoId) {
      errores.push(crearErrorPronostico(null, `Pronostico ${indice + 1}: falta partidoId.`));
      return;
    }

    const errorGoles = validarGolesPronostico(pronostico);
    if (errorGoles) {
      errores.push(crearErrorPronostico(partidoId, errorGoles));
      return;
    }

    const partido = partidosPorId.get(partidoId);
    if (!partido) {
      errores.push(crearErrorPronostico(partidoId, 'El partido no existe.', 'partido_inexistente'));
      return;
    }

    const disponibilidad = estaPartidoDisponibleParaPronosticar(partido, 'grupos');
    if (!disponibilidad.disponible) {
      errores.push(crearErrorPronostico(partidoId, disponibilidad.mensaje, disponibilidad.motivo));
      return;
    }

    registros.push({
      polla_id: pollaId,
      participante_id: participanteId,
      partido_id: partidoId,
      goles_local: pronostico.golesLocal,
      goles_visita: pronostico.golesVisita,
      actualizado_en: new Date().toISOString()
    });
  });

  if (registros.length > 0) {
    const { error } = await supabase
      .from('pronosticos_grupos')
      .upsert(registros, { onConflict: 'polla_id,participante_id,partido_id' });

    if (error) {
      throw new Error(error.message);
    }
  }

  return {
    ok: true,
    guardados: registros.length,
    omitidos: errores.length,
    errores
  };
}

export async function obtenerPronosticosEliminacion({ participanteId, pollaId }) {
  const { data, error } = await supabase
    .from('pronosticos_eliminacion')
    .select('partido_id,goles_local,goles_visita,clasificado_lado')
    .eq('participante_id', participanteId)
    .eq('polla_id', pollaId)
    .order('partido_id', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map(mapearPronosticoEliminacion);
}

export async function guardarPronosticosEliminacion({ participanteId, pollaId, pronosticos }) {
  const lista = Array.isArray(pronosticos) ? pronosticos : [];
  const errores = [];
  const registros = [];
  const partidoIds = [...new Set(lista.map((p) => String(p.partidoId || '').trim()).filter(Boolean))];
  const partidosPorId = await obtenerPartidosEliminacionPorIds(partidoIds);

  lista.forEach((pronostico, indice) => {
    const partidoId = String(pronostico.partidoId || '').trim();

    if (!partidoId) {
      errores.push(crearErrorPronostico(null, `Pronostico ${indice + 1}: falta partidoId.`));
      return;
    }

    const errorGoles = validarGolesPronostico(pronostico);
    if (errorGoles) {
      errores.push(crearErrorPronostico(partidoId, errorGoles));
      return;
    }

    const partido = partidosPorId.get(partidoId);
    if (!partido) {
      errores.push(crearErrorPronostico(partidoId, 'El partido no existe.', 'partido_inexistente'));
      return;
    }

    const disponibilidad = estaPartidoDisponibleParaPronosticar(partido, 'eliminacion');
    if (!disponibilidad.disponible) {
      errores.push(crearErrorPronostico(partidoId, disponibilidad.mensaje, disponibilidad.motivo));
      return;
    }

    const clasificadoLado = obtenerClasificadoLadoPronosticado(pronostico);
    if (!clasificadoLado) {
      errores.push(crearErrorPronostico(partidoId, 'Debes indicar clasificadoLado local o visita si el pronostico esta empatado.'));
      return;
    }

    registros.push({
      polla_id: pollaId,
      participante_id: participanteId,
      partido_id: partidoId,
      goles_local: pronostico.golesLocal,
      goles_visita: pronostico.golesVisita,
      clasificado_lado: clasificadoLado,
      actualizado_en: new Date().toISOString()
    });
  });

  if (registros.length > 0) {
    const { error } = await supabase
      .from('pronosticos_eliminacion')
      .upsert(registros, { onConflict: 'polla_id,participante_id,partido_id' });

    if (error) {
      throw new Error(error.message);
    }
  }

  return {
    ok: true,
    guardados: registros.length,
    omitidos: errores.length,
    errores
  };
}
