const LADOS_VALIDOS = new Set(['local', 'visita']);

function leerNumeroMarcador(objeto, claves) {
  for (const clave of claves) {
    if (objeto && objeto[clave] !== undefined && objeto[clave] !== null && objeto[clave] !== '') {
      return Number(objeto[clave]);
    }
  }

  return Number.NaN;
}

function esGolValido(valor) {
  return Number.isInteger(valor) && valor >= 0;
}

function marcadorDesde(objeto) {
  const golesLocal = leerNumeroMarcador(objeto, ['golesLocal', 'goles_local', 'local']);
  const golesVisita = leerNumeroMarcador(objeto, ['golesVisita', 'goles_visita', 'visita']);

  return {
    golesLocal,
    golesVisita,
    valido: esGolValido(golesLocal) && esGolValido(golesVisita)
  };
}

function respuestaNoCalculable(motivo, extra = {}) {
  return {
    puntos: 0,
    total: 0,
    calculable: false,
    motivo,
    exacto: false,
    ganadorEmpate: false,
    golesLocal: false,
    golesVisita: false,
    diferencia: false,
    ...extra
  };
}

export function obtenerGanador(golesLocal, golesVisita) {
  if (!esGolValido(golesLocal) || !esGolValido(golesVisita)) return '';
  if (golesLocal > golesVisita) return 'local';
  if (golesLocal < golesVisita) return 'visita';
  return 'empate';
}

export function obtenerDiferencia(golesLocal, golesVisita) {
  if (!esGolValido(golesLocal) || !esGolValido(golesVisita)) return null;
  return golesLocal - golesVisita;
}

export function obtenerClasificadoPronosticado(pronostico) {
  const { golesLocal, golesVisita, valido } = marcadorDesde(pronostico);

  if (!valido) return '';
  if (golesLocal > golesVisita) return 'local';
  if (golesVisita > golesLocal) return 'visita';

  const clasificadoLado = pronostico?.clasificadoLado || pronostico?.clasificado_lado || '';
  return LADOS_VALIDOS.has(clasificadoLado) ? clasificadoLado : '';
}

export function calcularPuntosGrupos(pronostico, resultado) {
  const pred = marcadorDesde(pronostico);
  const real = marcadorDesde(resultado);

  if (!pred.valido) return respuestaNoCalculable('pronostico_invalido');
  if (!real.valido) return respuestaNoCalculable('resultado_pendiente');

  const exacto = pred.golesLocal === real.golesLocal && pred.golesVisita === real.golesVisita;

  if (exacto) {
    return {
      puntos: 10,
      total: 10,
      calculable: true,
      exacto: true,
      ganadorEmpate: false,
      golesLocal: false,
      golesVisita: false,
      diferencia: false
    };
  }

  const ganadorEmpate =
    obtenerGanador(pred.golesLocal, pred.golesVisita) ===
    obtenerGanador(real.golesLocal, real.golesVisita);
  const golesLocal = pred.golesLocal === real.golesLocal;
  const golesVisita = pred.golesVisita === real.golesVisita;
  const diferencia =
    obtenerDiferencia(pred.golesLocal, pred.golesVisita) ===
    obtenerDiferencia(real.golesLocal, real.golesVisita);

  let puntos = 0;

  if (ganadorEmpate) puntos += 3;
  if (golesLocal) puntos += 2;
  if (golesVisita) puntos += 2;
  if (diferencia) puntos += 1;

  return {
    puntos,
    total: puntos,
    calculable: true,
    exacto: false,
    ganadorEmpate,
    golesLocal,
    golesVisita,
    diferencia
  };
}

export function calcularPuntosEliminacion(pronostico, resultado) {
  const pred = marcadorDesde(pronostico);
  const real = marcadorDesde(resultado);

  if (!pred.valido) {
    return respuestaNoCalculable('pronostico_invalido', { clasificado: false });
  }

  if (!real.valido) {
    return respuestaNoCalculable('resultado_pendiente', { clasificado: false });
  }

  const clasificadoPred = obtenerClasificadoPronosticado(pronostico);
  const clasificadoReal = resultado?.clasificadoRealLado || resultado?.clasificado_real_lado || '';
  const clasificado =
    LADOS_VALIDOS.has(clasificadoPred) &&
    LADOS_VALIDOS.has(clasificadoReal) &&
    clasificadoPred === clasificadoReal;
  const exacto = pred.golesLocal === real.golesLocal && pred.golesVisita === real.golesVisita;

  if (exacto) {
    const puntos = 10 + (clasificado ? 3 : 0);

    return {
      puntos,
      total: puntos,
      calculable: true,
      exacto: true,
      ganadorEmpate: false,
      golesLocal: false,
      golesVisita: false,
      diferencia: false,
      clasificado,
      clasificadoPronosticado: clasificadoPred
    };
  }

  const ganadorEmpate =
    obtenerGanador(pred.golesLocal, pred.golesVisita) ===
    obtenerGanador(real.golesLocal, real.golesVisita);
  const golesLocal = pred.golesLocal === real.golesLocal;
  const golesVisita = pred.golesVisita === real.golesVisita;
  const diferencia =
    obtenerDiferencia(pred.golesLocal, pred.golesVisita) ===
    obtenerDiferencia(real.golesLocal, real.golesVisita);

  let puntos = 0;

  if (ganadorEmpate) puntos += 3;
  if (golesLocal) puntos += 2;
  if (golesVisita) puntos += 2;
  if (diferencia) puntos += 1;
  if (clasificado) puntos += 3;

  return {
    puntos,
    total: puntos,
    calculable: true,
    exacto: false,
    ganadorEmpate,
    golesLocal,
    golesVisita,
    diferencia,
    clasificado,
    clasificadoPronosticado: clasificadoPred
  };
}
