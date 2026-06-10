const ZONA_HORARIA_CHILE = 'America/Santiago';

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
