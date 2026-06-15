const intentosLogin = new Map();

function obtenerIpCliente(req) {
  const reenviado = String(req.headers['x-forwarded-for'] || '')
    .split(',')[0]
    .trim();

  return reenviado || req.ip || req.socket?.remoteAddress || 'desconocido';
}

function normalizarCodigoIntento(codigo) {
  return String(codigo || '').trim().toLowerCase().replace(/\s+/g, '') || 'sin_codigo';
}

function obtenerRegistro(clave, ahora, ventanaMs) {
  const registro = intentosLogin.get(clave);

  if (!registro || ahora > registro.reiniciaEn) {
    const nuevoRegistro = {
      cantidad: 0,
      reiniciaEn: ahora + ventanaMs,
      bloqueadoHasta: 0
    };
    intentosLogin.set(clave, nuevoRegistro);
    return nuevoRegistro;
  }

  return registro;
}

export function crearLimitePeticiones({ ventanaMs = 5 * 60 * 1000, maximo = 10, bloqueoMs = 60 * 1000 } = {}) {
  return (req, res, next) => {
    const ahora = Date.now();
    const ip = obtenerIpCliente(req);
    const codigo = normalizarCodigoIntento(req.body?.codigo);
    const clave = `${ip}:${codigo}`;
    const registro = obtenerRegistro(clave, ahora, ventanaMs);

    if (registro.bloqueadoHasta && ahora < registro.bloqueadoHasta) {
      res.status(429).json({
        ok: false,
        error: 'Demasiados intentos. Espera 1 minuto e intenta nuevamente.'
      });
      return;
    }

    req.limiteLogin = {
      registrarFallo() {
        const registroActual = obtenerRegistro(clave, Date.now(), ventanaMs);

        registroActual.cantidad += 1;

        if (registroActual.cantidad >= maximo) {
          registroActual.bloqueadoHasta = Date.now() + bloqueoMs;
        }
      },
      resetear() {
        intentosLogin.delete(clave);
      }
    };

    next();
  };
}

export const limiteLogin = crearLimitePeticiones();
