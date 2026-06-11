const MS_MINUTO = 60 * 1000;
export const MINUTOS_BLOQUEO_ANTES_PARTIDO = 30;
const LADOS_VALIDOS = new Set(['local', 'visita']);

function normalizarEstado(estado) {
  return String(estado || '').trim().toLowerCase();
}

function estaBloqueadoPorHorario(fechaHora) {
  const inicio = new Date(fechaHora).getTime();

  if (Number.isNaN(inicio)) return true;

  return Date.now() >= inicio - MINUTOS_BLOQUEO_ANTES_PARTIDO * MS_MINUTO;
}

export function estaPartidoDisponibleParaPronosticar(partido, tipo) {
  const estado = normalizarEstado(partido?.estado);
  const estadoPermiteGuardar = tipo === 'grupos'
    ? (!estado || estado === 'abierto' || estado === 'pendiente')
    : estado === 'abierto';

  if (!estadoPermiteGuardar) {
    return {
      disponible: false,
      motivo: 'estado',
      mensaje: 'El partido esta cerrado por estado.'
    };
  }

  if (estaBloqueadoPorHorario(partido.fecha_hora)) {
    return {
      disponible: false,
      motivo: 'horario',
      mensaje: 'El partido esta bloqueado por horario.'
    };
  }

  return {
    disponible: true,
    motivo: '',
    mensaje: ''
  };
}

export function obtenerClasificadoLadoPronosticado(pronostico) {
  if (pronostico.golesLocal > pronostico.golesVisita) return 'local';
  if (pronostico.golesVisita > pronostico.golesLocal) return 'visita';

  const clasificadoLado = String(pronostico.clasificadoLado || '').trim().toLowerCase();
  return LADOS_VALIDOS.has(clasificadoLado) ? clasificadoLado : '';
}
