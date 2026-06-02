import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(__dirname, '..');
const csvDir = path.join(backendDir, 'data', 'csv');
const modoDryRun = process.argv.includes('--dry-run') || !process.argv.includes('--import');
const estadosValidos = new Set(['Pendiente', 'Abierto', 'Cerrado', 'Finalizado']);
const ladosValidos = new Set(['local', 'visita']);

const archivos = {
  participantes: 'participantes.csv',
  pollas: 'pollas.csv',
  participantesPollas: 'participantes_pollas.csv',
  partidos: 'partidos.csv',
  llaves: 'llaves.csv',
  pronosticos: 'pronosticos.csv',
  pronosticosEliminacion: 'pronosticos_eliminacion.csv'
};

const resumen = {
  participantes: 0,
  pollas: 0,
  participantesPollas: 0,
  partidosGrupos: 0,
  partidosEliminacion: 0,
  pronosticosGrupos: 0,
  pronosticosEliminacion: 0
};
const errores = [];
const advertencias = [];

function normalizarClave(valor) {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function normalizarTexto(valor) {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function normalizarCodigoLegacy(valor, contexto) {
  const original = String(valor || '').trim();
  const normalizado = original.toLowerCase();

  if (original && original !== normalizado) {
    advertencias.push(`${contexto}: codigo_legacy normalizado de ${original} a ${normalizado}`);
  }

  return normalizado;
}

function leerCsv(nombreArchivo) {
  const ruta = path.join(csvDir, nombreArchivo);

  if (!fs.existsSync(ruta)) {
    advertencias.push(`CSV no encontrado, se omite: ${nombreArchivo}`);
    return [];
  }

  const contenido = fs.readFileSync(ruta, 'utf8').replace(/^\uFEFF/, '');
  const filas = parsearCsv(contenido);

  if (filas.length === 0) return [];

  const encabezados = filas[0].map((encabezado) => String(encabezado || '').trim());
  const claves = encabezados.map(normalizarClave);

  return filas.slice(1)
    .filter((fila) => fila.some((valor) => String(valor || '').trim() !== ''))
    .map((fila, indice) => {
      const registro = { __fila: indice + 2 };
      claves.forEach((clave, posicion) => {
        registro[clave] = String(fila[posicion] ?? '').trim();
      });
      return registro;
    });
}

function parsearCsv(contenido) {
  const filas = [];
  let fila = [];
  let celda = '';
  let dentroComillas = false;

  for (let i = 0; i < contenido.length; i += 1) {
    const caracter = contenido[i];
    const siguiente = contenido[i + 1];

    if (caracter === '"') {
      if (dentroComillas && siguiente === '"') {
        celda += '"';
        i += 1;
      } else {
        dentroComillas = !dentroComillas;
      }
      continue;
    }

    if (caracter === ',' && !dentroComillas) {
      fila.push(celda);
      celda = '';
      continue;
    }

    if ((caracter === '\n' || caracter === '\r') && !dentroComillas) {
      if (caracter === '\r' && siguiente === '\n') i += 1;
      fila.push(celda);
      filas.push(fila);
      fila = [];
      celda = '';
      continue;
    }

    celda += caracter;
  }

  if (celda || fila.length > 0) {
    fila.push(celda);
    filas.push(fila);
  }

  return filas;
}

function obtener(registro, aliases) {
  for (const alias of aliases) {
    const clave = normalizarClave(alias);
    if (registro[clave] !== undefined && registro[clave] !== '') {
      return registro[clave];
    }
  }
  return '';
}

function requerir(valor, contexto, campo) {
  if (valor === '' || valor === null || valor === undefined) {
    errores.push(`${contexto}: falta ${campo}`);
    return false;
  }
  return true;
}

function parsearBooleano(valor, defecto = true) {
  if (valor === '' || valor === undefined || valor === null) return defecto;
  const normalizado = normalizarTexto(valor);
  return ['true', 'si', 's', '1', 'activo', 'activa'].includes(normalizado);
}

function parsearEntero(valor, contexto, campo, requerido = false) {
  if (valor === '' || valor === undefined || valor === null) {
    if (requerido) errores.push(`${contexto}: falta ${campo}`);
    return null;
  }

  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero < 0) {
    errores.push(`${contexto}: ${campo} debe ser entero >= 0`);
    return null;
  }

  return numero;
}

function normalizarEstado(valor, contexto) {
  const estado = String(valor || 'Pendiente').trim() || 'Pendiente';
  const encontrado = Array.from(estadosValidos).find(
    (candidato) => normalizarTexto(candidato) === normalizarTexto(estado)
  );

  if (!encontrado) {
    errores.push(`${contexto}: estado invalido "${estado}"`);
    return 'Pendiente';
  }

  return encontrado;
}

function parsearFechaHora(fechaValor, horaValor, contexto) {
  const fechaTexto = String(fechaValor || '').trim();
  const horaTexto = String(horaValor || '').trim();

  if (!fechaTexto) {
    errores.push(`${contexto}: falta fecha`);
    return null;
  }

  const partesFecha = fechaTexto.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  const partesHora = horaTexto.match(/^(\d{1,2}):(\d{2})/);

  if (partesFecha) {
    const dia = Number(partesFecha[1]);
    const mes = Number(partesFecha[2]);
    const anio = Number(partesFecha[3].length === 2 ? `20${partesFecha[3]}` : partesFecha[3]);
    const hora = partesHora ? Number(partesHora[1]) : 0;
    const minuto = partesHora ? Number(partesHora[2]) : 0;
    const fecha = new Date(Date.UTC(anio, mes - 1, dia, hora, minuto));

    if (!Number.isNaN(fecha.getTime())) return fecha.toISOString();
  }

  const fechaHoraDirecta = horaTexto ? `${fechaTexto} ${horaTexto}` : fechaTexto;
  const isoDirecto = Date.parse(fechaHoraDirecta);
  if (!Number.isNaN(isoDirecto)) return new Date(isoDirecto).toISOString();

  errores.push(`${contexto}: fecha/hora invalida "${fechaHoraDirecta}"`);
  return null;
}

function idLegacyPolla(nombre, idLegacy, contexto) {
  if (idLegacy) return idLegacy;
  const generado = `nombre:${normalizarClave(nombre)}`;
  advertencias.push(`${contexto}: id_legacy ausente, se usa temporalmente ${generado}`);
  return generado;
}

function transformarParticipantes() {
  return leerCsv(archivos.participantes).map((registro) => {
    const contexto = `participantes fila ${registro.__fila}`;
    const codigo = normalizarCodigoLegacy(
      obtener(registro, ['codigo', 'codigo legacy', 'codigo_legacy', 'codigo participante']),
      contexto
    );
    const nombre = obtener(registro, ['nombre', 'nombre visible', 'nombre_visible', 'participante']);
    const codigoHash = obtener(registro, ['codigo_hash', 'codigo hash']);

    requerir(codigo, contexto, 'codigo_legacy');
    requerir(nombre, contexto, 'nombre_visible');

    if (!codigoHash && codigo) {
      advertencias.push(`${contexto}: codigo_hash ausente, se usa valor temporal legacy:${codigo}`);
    }

    return {
      codigo_legacy: codigo,
      nombre_visible: nombre,
      codigo_hash: codigoHash || `legacy:${codigo}`,
      activo: parsearBooleano(obtener(registro, ['activo', 'activa', 'estado']), true)
    };
  });
}

function transformarPollas() {
  return leerCsv(archivos.pollas).map((registro) => {
    const contexto = `pollas fila ${registro.__fila}`;
    const nombre = obtener(registro, ['nombre', 'polla', 'nombre polla', 'nombre_polla']);
    const idLegacy = obtener(registro, ['id legacy', 'id_legacy', 'id polla', 'id_polla', 'polla id']);

    requerir(nombre, contexto, 'nombre');

    return {
      id_legacy: idLegacyPolla(nombre, idLegacy, contexto),
      nombre,
      activa: parsearBooleano(obtener(registro, ['activa', 'activo', 'estado']), true)
    };
  });
}

function transformarParticipantesPollas(pollasPorLegacyONombre, participantesPorCodigo) {
  return leerCsv(archivos.participantesPollas).map((registro) => {
    const contexto = `participantes_pollas fila ${registro.__fila}`;
    const codigo = normalizarCodigoLegacy(
      obtener(registro, ['codigo', 'codigo participante', 'codigo_legacy']),
      contexto
    );
    const pollaRef = obtener(registro, ['id polla', 'id_polla', 'id legacy', 'id_legacy', 'polla id', 'polla', 'nombre polla', 'nombre_polla']);

    requerir(codigo, contexto, 'codigo participante');
    requerir(pollaRef, contexto, 'polla');

    const participante = participantesPorCodigo.get(codigo);
    const polla = pollasPorLegacyONombre.get(pollaRef) || pollasPorLegacyONombre.get(normalizarTexto(pollaRef));

    if (!participante) errores.push(`${contexto}: participante no existe (${codigo})`);
    if (!polla) errores.push(`${contexto}: polla no existe (${pollaRef})`);

    return {
      codigo_legacy: codigo,
      id_legacy_polla: polla?.id_legacy || '',
      activo: parsearBooleano(obtener(registro, ['activo', 'activa', 'estado']), true)
    };
  });
}

function transformarPartidosGrupos() {
  return leerCsv(archivos.partidos).map((registro) => {
    const contexto = `partidos fila ${registro.__fila}`;
    const id = obtener(registro, ['partido id', 'partido_id', 'id']);
    const grupo = obtener(registro, ['grupo']);
    const fecha = obtener(registro, ['fecha', 'fecha_hora', 'fecha hora']);
    const hora = obtener(registro, ['hora']);
    const local = obtener(registro, ['local', 'equipo local', 'equipo_local']);
    const visita = obtener(registro, ['visita', 'equipo visita', 'equipo_visita']);

    requerir(id, contexto, 'partido_id');
    requerir(grupo, contexto, 'grupo');
    requerir(local, contexto, 'equipo_local');
    requerir(visita, contexto, 'equipo_visita');

    return {
      id,
      grupo,
      fecha_hora: parsearFechaHora(fecha, hora, contexto),
      equipo_local: local,
      equipo_visita: visita,
      goles_local_real: parsearEntero(obtener(registro, ['goles local real', 'goles_local_real']), contexto, 'goles_local_real'),
      goles_visita_real: parsearEntero(obtener(registro, ['goles visita real', 'goles_visita_real']), contexto, 'goles_visita_real'),
      estado: normalizarEstado(obtener(registro, ['estado']), contexto)
    };
  });
}

function resolverLadoClasificado(valor, partido, contexto, campo) {
  const texto = String(valor || '').trim();
  if (!texto) return null;

  const normalizado = normalizarTexto(texto);
  if (ladosValidos.has(normalizado)) return normalizado;

  const opciones = [
    ['local', partido.equipo_local],
    ['local', partido.placeholder_local],
    ['visita', partido.equipo_visita],
    ['visita', partido.placeholder_visita]
  ];
  const encontrado = opciones.find(([, nombre]) => nombre && normalizarTexto(nombre) === normalizado);

  if (encontrado) return encontrado[0];

  errores.push(`${contexto}: no se pudo resolver ${campo} "${texto}" como local/visita`);
  return null;
}

function transformarPartidosEliminacion() {
  return leerCsv(archivos.llaves).map((registro) => {
    const contexto = `llaves fila ${registro.__fila}`;
    const id = obtener(registro, ['partido id', 'partido_id', 'id']);
    const ronda = obtener(registro, ['ronda']);
    const fecha = obtener(registro, ['fecha', 'fecha_hora', 'fecha hora']);
    const hora = obtener(registro, ['hora']);
    const partido = {
      id,
      ronda,
      fecha_hora: parsearFechaHora(fecha, hora, contexto),
      placeholder_local: obtener(registro, ['local placeholder', 'local_placeholder', 'placeholder local']),
      equipo_local: obtener(registro, ['local', 'equipo local', 'equipo_local']),
      placeholder_visita: obtener(registro, ['visita placeholder', 'visita_placeholder', 'placeholder visita']),
      equipo_visita: obtener(registro, ['visita', 'equipo visita', 'equipo_visita']),
      goles_local_real: parsearEntero(obtener(registro, ['goles local real', 'goles_local_real']), contexto, 'goles_local_real'),
      goles_visita_real: parsearEntero(obtener(registro, ['goles visita real', 'goles_visita_real']), contexto, 'goles_visita_real'),
      estado: normalizarEstado(obtener(registro, ['estado']), contexto)
    };

    requerir(id, contexto, 'partido_id');
    requerir(ronda, contexto, 'ronda');

    partido.clasificado_real_lado = resolverLadoClasificado(
      obtener(registro, ['clasifica real', 'clasifica_real', 'clasificado real', 'clasificado_real', 'clasificado_real_lado']),
      partido,
      contexto,
      'clasificado_real_lado'
    );

    return partido;
  });
}

function buscarPollaPorReferencia(referencia, pollasPorLegacyONombre) {
  if (!referencia) return null;
  return pollasPorLegacyONombre.get(referencia) || pollasPorLegacyONombre.get(normalizarTexto(referencia));
}

function obtenerPollasParaPronostico(registro, contexto, relacionesPorCodigo, pollasPorLegacyONombre, codigoNormalizado = '') {
  const pollaRef = obtener(registro, ['id polla', 'id_polla', 'id legacy', 'id_legacy', 'polla', 'nombre polla', 'nombre_polla']);

  if (pollaRef) {
    const polla = buscarPollaPorReferencia(pollaRef, pollasPorLegacyONombre);
    if (!polla) {
      errores.push(`${contexto}: polla no existe (${pollaRef})`);
      return [];
    }
    return [polla.id_legacy];
  }

  const codigo = codigoNormalizado || normalizarCodigoLegacy(
    obtener(registro, ['codigo', 'codigo participante', 'codigo_legacy']),
    contexto
  );
  const relaciones = relacionesPorCodigo.get(codigo) || [];
  if (relaciones.length === 0) {
    errores.push(`${contexto}: no hay polla explicita ni relacion participante-polla para ${codigo}`);
  }
  return relaciones;
}

function transformarPronosticosGrupos(contextoBase) {
  return leerCsv(archivos.pronosticos).flatMap((registro) => {
    const contexto = `pronosticos fila ${registro.__fila}`;
    const codigo = normalizarCodigoLegacy(
      obtener(registro, ['codigo', 'codigo participante', 'codigo_legacy']),
      contexto
    );
    const partidoId = obtener(registro, ['partido id', 'partido_id', 'id']);
    const golesLocal = parsearEntero(obtener(registro, ['goles local', 'goles_local']), contexto, 'goles_local', true);
    const golesVisita = parsearEntero(obtener(registro, ['goles visita', 'goles_visita']), contexto, 'goles_visita', true);

    requerir(codigo, contexto, 'codigo participante');
    requerir(partidoId, contexto, 'partido_id');

    if (!contextoBase.participantesPorCodigo.has(codigo)) errores.push(`${contexto}: participante no existe (${codigo})`);
    if (!contextoBase.partidosGruposPorId.has(partidoId)) errores.push(`${contexto}: partido de grupos no existe (${partidoId})`);

    return obtenerPollasParaPronostico(
      registro,
      contexto,
      contextoBase.relacionesPorCodigo,
      contextoBase.pollasPorLegacyONombre,
      codigo
    ).map((idLegacyPolla) => ({
      id_legacy_polla: idLegacyPolla,
      codigo_legacy: codigo,
      partido_id: partidoId,
      goles_local: golesLocal,
      goles_visita: golesVisita
    }));
  });
}

function transformarPronosticosEliminacion(contextoBase) {
  return leerCsv(archivos.pronosticosEliminacion).flatMap((registro) => {
    const contexto = `pronosticos_eliminacion fila ${registro.__fila}`;
    const codigo = normalizarCodigoLegacy(
      obtener(registro, ['codigo', 'codigo participante', 'codigo_legacy']),
      contexto
    );
    const partidoId = obtener(registro, ['partido id', 'partido_id', 'id']);
    const partido = contextoBase.partidosEliminacionPorId.get(partidoId);
    const golesLocal = parsearEntero(obtener(registro, ['goles local', 'goles_local']), contexto, 'goles_local', true);
    const golesVisita = parsearEntero(obtener(registro, ['goles visita', 'goles_visita']), contexto, 'goles_visita', true);

    requerir(codigo, contexto, 'codigo participante');
    requerir(partidoId, contexto, 'partido_id');

    if (!contextoBase.participantesPorCodigo.has(codigo)) errores.push(`${contexto}: participante no existe (${codigo})`);
    if (!partido) errores.push(`${contexto}: partido de eliminacion no existe (${partidoId})`);

    const clasificadoLado = partido
      ? resolverLadoClasificado(
        obtener(registro, ['clasifica', 'clasificado', 'clasificado_lado', 'clasificado lado']),
        partido,
        contexto,
        'clasificado_lado'
      )
      : null;

    return obtenerPollasParaPronostico(
      registro,
      contexto,
      contextoBase.relacionesPorCodigo,
      contextoBase.pollasPorLegacyONombre,
      codigo
    ).map((idLegacyPolla) => ({
      id_legacy_polla: idLegacyPolla,
      codigo_legacy: codigo,
      partido_id: partidoId,
      goles_local: golesLocal,
      goles_visita: golesVisita,
      clasificado_lado: clasificadoLado
    }));
  });
}

function crearContexto(participantes, pollas, relaciones, partidosGrupos, partidosEliminacion) {
  const participantesPorCodigo = new Map(participantes.map((p) => [p.codigo_legacy, p]));
  const pollasPorLegacyONombre = new Map();
  const relacionesPorCodigo = new Map();

  pollas.forEach((polla) => {
    pollasPorLegacyONombre.set(polla.id_legacy, polla);
    pollasPorLegacyONombre.set(normalizarTexto(polla.nombre), polla);
  });

  relaciones.forEach((relacion) => {
    if (!relacionesPorCodigo.has(relacion.codigo_legacy)) {
      relacionesPorCodigo.set(relacion.codigo_legacy, []);
    }
    relacionesPorCodigo.get(relacion.codigo_legacy).push(relacion.id_legacy_polla);
  });

  return {
    participantesPorCodigo,
    pollasPorLegacyONombre,
    relacionesPorCodigo,
    partidosGruposPorId: new Map(partidosGrupos.map((p) => [p.id, p])),
    partidosEliminacionPorId: new Map(partidosEliminacion.map((p) => [p.id, p]))
  };
}

async function upsertTabla(supabase, nombreTabla, registros, onConflict) {
  if (registros.length === 0) return;

  const { error } = await supabase
    .from(nombreTabla)
    .upsert(registros, { onConflict });

  if (error) throw new Error(`${nombreTabla}: ${error.message}`);
}

async function obtenerMapaDb(supabase, tabla, columnas, clave) {
  const { data, error } = await supabase.from(tabla).select(columnas);
  if (error) throw new Error(`${tabla}: ${error.message}`);
  return new Map(data.map((fila) => [fila[clave], fila]));
}

async function importarReal(datos) {
  const { supabase } = await import('../src/supabaseClient.js');

  await upsertTabla(supabase, 'participantes', datos.participantes, 'codigo_legacy');
  await upsertTabla(supabase, 'pollas', datos.pollas, 'id_legacy');
  await upsertTabla(supabase, 'partidos_grupos', datos.partidosGrupos, 'id');
  await upsertTabla(supabase, 'partidos_eliminacion', datos.partidosEliminacion, 'id');

  const participantesDb = await obtenerMapaDb(supabase, 'participantes', 'id,codigo_legacy', 'codigo_legacy');
  const pollasDb = await obtenerMapaDb(supabase, 'pollas', 'id,id_legacy,nombre', 'id_legacy');

  const relacionesDb = datos.relaciones.map((relacion) => ({
    polla_id: pollasDb.get(relacion.id_legacy_polla)?.id,
    participante_id: participantesDb.get(relacion.codigo_legacy)?.id,
    activo: relacion.activo
  })).filter((relacion) => relacion.polla_id && relacion.participante_id);

  await upsertTabla(supabase, 'participantes_pollas', relacionesDb, 'polla_id,participante_id');

  const pronosticosGruposDb = datos.pronosticosGrupos.map((pronostico) => ({
    polla_id: pollasDb.get(pronostico.id_legacy_polla)?.id,
    participante_id: participantesDb.get(pronostico.codigo_legacy)?.id,
    partido_id: pronostico.partido_id,
    goles_local: pronostico.goles_local,
    goles_visita: pronostico.goles_visita
  })).filter((pronostico) => pronostico.polla_id && pronostico.participante_id);

  const pronosticosEliminacionDb = datos.pronosticosEliminacion.map((pronostico) => ({
    polla_id: pollasDb.get(pronostico.id_legacy_polla)?.id,
    participante_id: participantesDb.get(pronostico.codigo_legacy)?.id,
    partido_id: pronostico.partido_id,
    goles_local: pronostico.goles_local,
    goles_visita: pronostico.goles_visita,
    clasificado_lado: pronostico.clasificado_lado
  })).filter((pronostico) => pronostico.polla_id && pronostico.participante_id);

  await upsertTabla(supabase, 'pronosticos_grupos', pronosticosGruposDb, 'polla_id,participante_id,partido_id');
  await upsertTabla(supabase, 'pronosticos_eliminacion', pronosticosEliminacionDb, 'polla_id,participante_id,partido_id');
}

function imprimirResumen() {
  console.log(`Modo: ${modoDryRun ? 'dry-run' : 'import real'}`);
  console.table(resumen);

  if (advertencias.length > 0) {
    console.log('\nAdvertencias:');
    advertencias.forEach((mensaje) => console.log(`- ${mensaje}`));
  }

  if (errores.length > 0) {
    console.log('\nErrores:');
    errores.forEach((mensaje) => console.log(`- ${mensaje}`));
  }
}

async function main() {
  const participantes = transformarParticipantes();
  const pollas = transformarPollas();
  const contextoBaseParcial = crearContexto(participantes, pollas, [], [], []);
  const relaciones = transformarParticipantesPollas(
    contextoBaseParcial.pollasPorLegacyONombre,
    contextoBaseParcial.participantesPorCodigo
  );
  const partidosGrupos = transformarPartidosGrupos();
  const partidosEliminacion = transformarPartidosEliminacion();
  const contexto = crearContexto(participantes, pollas, relaciones, partidosGrupos, partidosEliminacion);
  const pronosticosGrupos = transformarPronosticosGrupos(contexto);
  const pronosticosEliminacion = transformarPronosticosEliminacion(contexto);

  resumen.participantes = participantes.length;
  resumen.pollas = pollas.length;
  resumen.participantesPollas = relaciones.length;
  resumen.partidosGrupos = partidosGrupos.length;
  resumen.partidosEliminacion = partidosEliminacion.length;
  resumen.pronosticosGrupos = pronosticosGrupos.length;
  resumen.pronosticosEliminacion = pronosticosEliminacion.length;

  imprimirResumen();

  if (errores.length > 0) {
    process.exitCode = 1;
    return;
  }

  if (modoDryRun) {
    console.log('\nDry-run completado. No se escribio en Supabase.');
    return;
  }

  await importarReal({
    participantes,
    pollas,
    relaciones,
    partidosGrupos,
    partidosEliminacion,
    pronosticosGrupos,
    pronosticosEliminacion
  });

  console.log('\nImport real completado. No se borro ningun dato automaticamente.');
}

main().catch((error) => {
  console.error(`Error de importacion: ${error.message}`);
  process.exitCode = 1;
});
