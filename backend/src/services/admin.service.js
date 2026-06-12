import { supabase } from '../supabaseClient.js';
import { normalizarCodigoLegacy } from '../utils/codigos.js';
import { obtenerFechaHoraChile } from '../utils/fechas.js';

const ESTADOS_VALIDOS = new Set(['Pendiente', 'Abierto', 'Cerrado', 'Finalizado']);
const TIPOS_VALIDOS = new Set(['grupos', 'eliminacion']);

function mapearPartidoGrupo(fila) {
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
    estado: fila.estado
  };
}

function mapearPartidoEliminacion(fila) {
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

function crearErrorValidacion(mensaje, status = 400) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}

function normalizarTextoObligatorio(valor, campo) {
  const texto = String(valor || '').trim();

  if (!texto) {
    throw crearErrorValidacion(`${campo} es obligatorio`);
  }

  return texto;
}

function normalizarBooleano(valor) {
  return valor === false ? false : true;
}

function normalizarIdsPollas(pollas) {
  if (!Array.isArray(pollas)) return [];

  return [...new Set(
    pollas
      .map((id) => String(id || '').trim())
      .filter(Boolean)
  )];
}

function mapearPollaAdmin(fila, cantidades = new Map()) {
  return {
    id: fila.id,
    idLegacy: fila.id_legacy,
    nombre: fila.nombre,
    activa: Boolean(fila.activa),
    cantidadParticipantes: cantidades.get(fila.id) || 0
  };
}

function mapearParticipanteAdmin(fila, pollasPorParticipante = new Map()) {
  return {
    id: fila.id,
    nombre: fila.nombre_visible,
    codigoLegacy: fila.codigo_legacy,
    activo: Boolean(fila.activo),
    esAdmin: Boolean(fila.es_admin),
    pollas: pollasPorParticipante.get(fila.id) || []
  };
}

async function obtenerPollasPorParticipante() {
  const { data, error } = await supabase
    .from('participantes_pollas')
    .select('participante_id,pollas!inner(id,id_legacy,nombre,activa)')
    .eq('activo', true)
    .order('creado_en', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const mapa = new Map();

  (data || []).forEach((fila) => {
    if (!fila.participantes && !fila.participante_id) return;
    if (!fila.pollas) return;

    const lista = mapa.get(fila.participante_id) || [];
    lista.push({
      id: fila.pollas.id,
      idLegacy: fila.pollas.id_legacy,
      nombre: fila.pollas.nombre,
      activa: Boolean(fila.pollas.activa)
    });
    mapa.set(fila.participante_id, lista);
  });

  return mapa;
}

async function obtenerCantidadesParticipantesPorPolla() {
  const { data, error } = await supabase
    .from('participantes_pollas')
    .select('polla_id')
    .eq('activo', true);

  if (error) {
    throw new Error(error.message);
  }

  const cantidades = new Map();

  (data || []).forEach((fila) => {
    cantidades.set(fila.polla_id, (cantidades.get(fila.polla_id) || 0) + 1);
  });

  return cantidades;
}

async function validarPollasExistentes(pollasIds) {
  if (pollasIds.length === 0) return;

  const { data, error } = await supabase
    .from('pollas')
    .select('id')
    .in('id', pollasIds);

  if (error) {
    throw new Error(error.message);
  }

  const existentes = new Set((data || []).map((polla) => polla.id));
  const faltantes = pollasIds.filter((id) => !existentes.has(id));

  if (faltantes.length > 0) {
    throw crearErrorValidacion('Una o más pollas no existen');
  }
}

async function validarCodigoDuplicado(codigoLegacy, participanteIdActual = '') {
  const { data, error } = await supabase
    .from('participantes')
    .select('id')
    .eq('codigo_legacy', codigoLegacy);

  if (error) {
    throw new Error(error.message);
  }

  const duplicado = (data || []).some((fila) => fila.id !== participanteIdActual);

  if (duplicado) {
    throw crearErrorValidacion('Código ya existe', 409);
  }
}

async function validarIdLegacyPollaDuplicado(idLegacy, pollaIdActual = '') {
  const { data, error } = await supabase
    .from('pollas')
    .select('id')
    .eq('id_legacy', idLegacy);

  if (error) {
    throw new Error(error.message);
  }

  const duplicado = (data || []).some((fila) => fila.id !== pollaIdActual);

  if (duplicado) {
    throw crearErrorValidacion('idLegacy ya existe', 409);
  }
}

export async function obtenerParticipantesAdmin() {
  const [participantesRespuesta, pollasPorParticipante] = await Promise.all([
    supabase
      .from('participantes')
      .select('id,codigo_legacy,nombre_visible,activo,es_admin')
      .order('nombre_visible', { ascending: true }),
    obtenerPollasPorParticipante()
  ]);

  if (participantesRespuesta.error) {
    throw new Error(participantesRespuesta.error.message);
  }

  return (participantesRespuesta.data || []).map((fila) =>
    mapearParticipanteAdmin(fila, pollasPorParticipante)
  );
}

export async function crearParticipanteAdmin(datos) {
  const nombre = normalizarTextoObligatorio(datos?.nombre, 'Nombre');
  const codigoLegacy = normalizarCodigoLegacy(datos?.codigoLegacy);
  const pollas = normalizarIdsPollas(datos?.pollas);

  if (!codigoLegacy) {
    throw crearErrorValidacion('Código es obligatorio');
  }

  await validarCodigoDuplicado(codigoLegacy);
  await validarPollasExistentes(pollas);

  const { data, error } = await supabase
    .from('participantes')
    .insert({
      nombre_visible: nombre,
      codigo_legacy: codigoLegacy,
      codigo_hash: `legacy:${codigoLegacy}`,
      activo: normalizarBooleano(datos?.activo)
    })
    .select('id,codigo_legacy,nombre_visible,activo,es_admin')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (pollas.length > 0) {
    await actualizarPollasParticipanteAdmin(data.id, pollas);
  }

  const pollasPorParticipante = await obtenerPollasPorParticipante();
  return mapearParticipanteAdmin(data, pollasPorParticipante);
}

export async function actualizarParticipanteAdmin(id, datos) {
  const participanteId = String(id || '').trim();

  if (!participanteId) {
    throw crearErrorValidacion('Debes indicar participante id');
  }

  const cambios = {};

  if (Object.prototype.hasOwnProperty.call(datos || {}, 'nombre')) {
    cambios.nombre_visible = normalizarTextoObligatorio(datos.nombre, 'Nombre');
  }

  if (Object.prototype.hasOwnProperty.call(datos || {}, 'codigoLegacy')) {
    const codigoLegacy = normalizarCodigoLegacy(datos.codigoLegacy);

    if (!codigoLegacy) {
      throw crearErrorValidacion('Código es obligatorio');
    }

    await validarCodigoDuplicado(codigoLegacy, participanteId);
    cambios.codigo_legacy = codigoLegacy;
    cambios.codigo_hash = `legacy:${codigoLegacy}`;
  }

  if (Object.prototype.hasOwnProperty.call(datos || {}, 'activo')) {
    cambios.activo = Boolean(datos.activo);
  }

  if (Object.keys(cambios).length === 0) {
    throw crearErrorValidacion('No hay cambios para guardar');
  }

  const { data, error } = await supabase
    .from('participantes')
    .update(cambios)
    .eq('id', participanteId)
    .select('id,codigo_legacy,nombre_visible,activo,es_admin')
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw crearErrorValidacion('Participante no encontrado', 404);
  }

  const pollasPorParticipante = await obtenerPollasPorParticipante();
  return mapearParticipanteAdmin(data, pollasPorParticipante);
}

export async function actualizarPollasParticipanteAdmin(id, pollas) {
  const participanteId = String(id || '').trim();
  const pollasNormalizadas = normalizarIdsPollas(pollas);

  if (!participanteId) {
    throw crearErrorValidacion('Debes indicar participante id');
  }

  await validarPollasExistentes(pollasNormalizadas);

  const { data: relacionesActuales, error: errorRelaciones } = await supabase
    .from('participantes_pollas')
    .select('polla_id')
    .eq('participante_id', participanteId);

  if (errorRelaciones) {
    throw new Error(errorRelaciones.message);
  }

  const { error: errorDesactivar } = await supabase
    .from('participantes_pollas')
    .update({ activo: false })
    .eq('participante_id', participanteId);

  if (errorDesactivar) {
    throw new Error(errorDesactivar.message);
  }

  const existentes = new Set((relacionesActuales || []).map((fila) => fila.polla_id));
  const paraActualizar = pollasNormalizadas.filter((pollaId) => existentes.has(pollaId));
  const paraInsertar = pollasNormalizadas.filter((pollaId) => !existentes.has(pollaId));

  if (paraActualizar.length > 0) {
    const { error } = await supabase
      .from('participantes_pollas')
      .update({ activo: true })
      .eq('participante_id', participanteId)
      .in('polla_id', paraActualizar);

    if (error) {
      throw new Error(error.message);
    }
  }

  if (paraInsertar.length > 0) {
    const { error } = await supabase
      .from('participantes_pollas')
      .insert(paraInsertar.map((pollaId) => ({
        participante_id: participanteId,
        polla_id: pollaId,
        activo: true
      })));

    if (error) {
      throw new Error(error.message);
    }
  }

  const { data: participante, error: errorParticipante } = await supabase
    .from('participantes')
    .select('id,codigo_legacy,nombre_visible,activo,es_admin')
    .eq('id', participanteId)
    .maybeSingle();

  if (errorParticipante) {
    throw new Error(errorParticipante.message);
  }

  if (!participante) {
    throw crearErrorValidacion('Participante no encontrado', 404);
  }

  const pollasPorParticipante = await obtenerPollasPorParticipante();
  return mapearParticipanteAdmin(participante, pollasPorParticipante);
}

export async function actualizarPermisoAdminParticipanteAdmin(id, esAdmin, adminActualId) {
  const participanteId = String(id || '').trim();

  if (!participanteId) {
    throw crearErrorValidacion('Debes indicar participante id');
  }

  if (typeof esAdmin !== 'boolean') {
    throw crearErrorValidacion('esAdmin debe ser true o false');
  }

  if (!esAdmin) {
    if (participanteId === adminActualId) {
      throw crearErrorValidacion('No puedes quitarte el permiso de administrador a ti mismo');
    }

    const { data: otrosAdmins, error: errorAdmins } = await supabase
      .from('participantes')
      .select('id')
      .eq('activo', true)
      .eq('es_admin', true)
      .neq('id', participanteId)
      .limit(1);

    if (errorAdmins) {
      throw new Error(errorAdmins.message);
    }

    if ((otrosAdmins || []).length === 0) {
      throw crearErrorValidacion('Debe quedar al menos un administrador activo');
    }
  }

  const { data, error } = await supabase
    .from('participantes')
    .update({ es_admin: esAdmin })
    .eq('id', participanteId)
    .select('id,codigo_legacy,nombre_visible,activo,es_admin')
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw crearErrorValidacion('Participante no encontrado', 404);
  }

  const pollasPorParticipante = await obtenerPollasPorParticipante();
  return mapearParticipanteAdmin(data, pollasPorParticipante);
}

export async function obtenerPollasAdmin() {
  const [pollasRespuesta, cantidades] = await Promise.all([
    supabase
      .from('pollas')
      .select('id,id_legacy,nombre,activa')
      .order('nombre', { ascending: true }),
    obtenerCantidadesParticipantesPorPolla()
  ]);

  if (pollasRespuesta.error) {
    throw new Error(pollasRespuesta.error.message);
  }

  return (pollasRespuesta.data || []).map((fila) => mapearPollaAdmin(fila, cantidades));
}

export async function crearPollaAdmin(datos) {
  const nombre = normalizarTextoObligatorio(datos?.nombre, 'Nombre');
  const idLegacy = normalizarCodigoLegacy(datos?.idLegacy);

  if (!idLegacy) {
    throw crearErrorValidacion('idLegacy es obligatorio');
  }

  await validarIdLegacyPollaDuplicado(idLegacy);

  const { data, error } = await supabase
    .from('pollas')
    .insert({
      nombre,
      id_legacy: idLegacy,
      activa: normalizarBooleano(datos?.activa)
    })
    .select('id,id_legacy,nombre,activa')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapearPollaAdmin(data);
}

export async function actualizarPollaAdmin(id, datos) {
  const pollaId = String(id || '').trim();
  const cambios = {};

  if (!pollaId) {
    throw crearErrorValidacion('Debes indicar polla id');
  }

  if (Object.prototype.hasOwnProperty.call(datos || {}, 'nombre')) {
    cambios.nombre = normalizarTextoObligatorio(datos.nombre, 'Nombre');
  }

  if (Object.prototype.hasOwnProperty.call(datos || {}, 'idLegacy')) {
    const idLegacy = normalizarCodigoLegacy(datos.idLegacy);

    if (!idLegacy) {
      throw crearErrorValidacion('idLegacy es obligatorio');
    }

    await validarIdLegacyPollaDuplicado(idLegacy, pollaId);
    cambios.id_legacy = idLegacy;
  }

  if (Object.prototype.hasOwnProperty.call(datos || {}, 'activa')) {
    cambios.activa = Boolean(datos.activa);
  }

  if (Object.keys(cambios).length === 0) {
    throw crearErrorValidacion('No hay cambios para guardar');
  }

  const { data, error } = await supabase
    .from('pollas')
    .update(cambios)
    .eq('id', pollaId)
    .select('id,id_legacy,nombre,activa')
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw crearErrorValidacion('Polla no encontrada', 404);
  }

  const cantidades = await obtenerCantidadesParticipantesPorPolla();
  return mapearPollaAdmin(data, cantidades);
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
