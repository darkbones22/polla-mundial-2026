import { supabase } from '../supabaseClient.js';

const ESTADOS_VALIDOS = new Set(['Pendiente', 'Abierto', 'Cerrado', 'Finalizado']);
const TIPOS_VALIDOS = new Set(['grupos', 'eliminacion']);

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

function obtenerConfigTipo(tipo) {
  if (tipo === 'grupos') {
    return {
      tabla: 'partidos_grupos',
      columnas: 'id,grupo,fecha_hora,equipo_local,equipo_visita,goles_local_real,goles_visita_real,estado',
      mapear: mapearPartidoGrupo
    };
  }

  if (tipo === 'eliminacion') {
    return {
      tabla: 'partidos_eliminacion',
      columnas: 'id,ronda,fecha_hora,placeholder_local,equipo_local,placeholder_visita,equipo_visita,goles_local_real,goles_visita_real,clasificado_real_lado,estado',
      mapear: mapearPartidoEliminacion
    };
  }

  return null;
}

function normalizarGoles(valor, campo) {
  if (valor === null || valor === undefined || valor === '') return null;

  const numero = Number(valor);

  if (!Number.isInteger(numero) || numero < 0) {
    const error = new Error(`${campo} debe ser entero mayor o igual a 0, o null`);
    error.status = 400;
    throw error;
  }

  return numero;
}

function normalizarEstado(valor) {
  const estado = String(valor || '').trim();

  if (!ESTADOS_VALIDOS.has(estado)) {
    const error = new Error('Estado invalido');
    error.status = 400;
    throw error;
  }

  return estado;
}

function normalizarClasificado(valor) {
  if (valor === null || valor === undefined || valor === '') return null;

  const clasificado = String(valor).trim().toLowerCase();

  if (!['local', 'visita'].includes(clasificado)) {
    const error = new Error('clasificadoRealLado debe ser local, visita o null');
    error.status = 400;
    throw error;
  }

  return clasificado;
}

function normalizarEquipoReal(valor) {
  if (valor === null || valor === undefined) return null;

  const texto = String(valor).trim();
  return texto === '' ? null : texto;
}

function validarTipo(tipo) {
  const tipoNormalizado = String(tipo || '').trim().toLowerCase();

  if (!TIPOS_VALIDOS.has(tipoNormalizado)) {
    const error = new Error('Tipo invalido');
    error.status = 400;
    throw error;
  }

  return tipoNormalizado;
}

export async function obtenerPartidosAdmin(tipo) {
  const tipoNormalizado = validarTipo(tipo);
  const config = obtenerConfigTipo(tipoNormalizado);
  const { data, error } = await supabase
    .from(config.tabla)
    .select(config.columnas)
    .order('fecha_hora', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map(config.mapear);
}

export async function actualizarPartidoAdmin(id, datos) {
  const partidoId = String(id || '').trim();
  const tipo = validarTipo(datos?.tipo);
  const config = obtenerConfigTipo(tipo);
  const estado = normalizarEstado(datos?.estado);
  const golesLocalReal = normalizarGoles(datos?.golesLocalReal, 'golesLocalReal');
  const golesVisitaReal = normalizarGoles(datos?.golesVisitaReal, 'golesVisitaReal');
  const cambios = {
    goles_local_real: golesLocalReal,
    goles_visita_real: golesVisitaReal,
    estado,
    actualizado_en: new Date().toISOString()
  };

  if (!partidoId) {
    const error = new Error('Debes indicar partido id');
    error.status = 400;
    throw error;
  }

  if (estado === 'Finalizado' && (golesLocalReal === null || golesVisitaReal === null)) {
    const error = new Error('Un partido finalizado debe tener goles reales completos');
    error.status = 400;
    throw error;
  }

  if (tipo === 'eliminacion') {
    cambios.clasificado_real_lado = normalizarClasificado(datos?.clasificadoRealLado);
    cambios.equipo_local = normalizarEquipoReal(datos?.equipoLocal);
    cambios.equipo_visita = normalizarEquipoReal(datos?.equipoVisita);
  }

  const { data, error } = await supabase
    .from(config.tabla)
    .update(cambios)
    .eq('id', partidoId)
    .select(config.columnas)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    const errorNoEncontrado = new Error('Partido no encontrado');
    errorNoEncontrado.status = 404;
    throw errorNoEncontrado;
  }

  return config.mapear(data);
}
