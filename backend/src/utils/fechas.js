const ZONA_HORARIA_CHILE = 'America/Santiago';
const MS_MINUTO = 60 * 1000;

export const MINUTOS_CIERRE_POR_HORARIO = 30;

export function obtenerFechaHoraChile(fechaHora) {
  if (!fechaHora) {
    return {
      fecha: '',
      hora: ''
    };
  }

  const fecha = new Date(fechaHora);

  if (Number.isNaN(fecha.getTime())) {
    return {
      fecha: '',
      hora: ''
    };
  }

  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: ZONA_HORARIA_CHILE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(fecha);
  const mapa = Object.fromEntries(partes.map((parte) => [parte.type, parte.value]));

  return {
    fecha: `${mapa.year}-${mapa.month}-${mapa.day}`,
    hora: `${mapa.hour}:${mapa.minute}`
  };
}

export function estaEnVentanaDeCierrePorHorario(fechaHora, minutos = MINUTOS_CIERRE_POR_HORARIO) {
  const inicio = new Date(fechaHora).getTime();

  if (Number.isNaN(inicio)) return false;

  return Date.now() >= inicio - minutos * MS_MINUTO;
}

export function obtenerEstadoHorarioPartido(fechaHora, estadoBase = 'Pendiente') {
  const estadoOriginal = estadoBase || 'Pendiente';
  const estadoNormalizado = String(estadoOriginal).trim().toLowerCase();

  if (estadoNormalizado === 'finalizado') {
    return {
      estado: 'Finalizado',
      estadoBase: estadoOriginal,
      cerradoPorHorario: false,
      enVivo: false
    };
  }

  const inicio = new Date(fechaHora).getTime();

  if (Number.isNaN(inicio)) {
    return {
      estado: estadoOriginal,
      estadoBase: estadoOriginal,
      cerradoPorHorario: false,
      enVivo: false
    };
  }

  const ahora = Date.now();
  const enVivo = ahora >= inicio;
  const cerradoPorHorario = !enVivo && ahora >= inicio - MINUTOS_CIERRE_POR_HORARIO * MS_MINUTO;

  if (enVivo) {
    return {
      estado: 'En vivo',
      estadoBase: estadoOriginal,
      cerradoPorHorario: false,
      enVivo: true
    };
  }

  if (cerradoPorHorario) {
    return {
      estado: 'Cerrado',
      estadoBase: estadoOriginal,
      cerradoPorHorario: true,
      enVivo: false
    };
  }

  return {
    estado: estadoOriginal,
    estadoBase: estadoOriginal,
    cerradoPorHorario: false,
    enVivo: estadoNormalizado === 'en vivo'
  };
}
