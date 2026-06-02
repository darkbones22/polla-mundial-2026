const intentosPorIp = new Map();

export function crearLimitePeticiones({ ventanaMs = 15 * 60 * 1000, maximo = 20 } = {}) {
  return (req, res, next) => {
    const ahora = Date.now();
    const clave = req.ip || req.socket?.remoteAddress || 'desconocido';
    const registro = intentosPorIp.get(clave);

    if (!registro || ahora > registro.reiniciaEn) {
      intentosPorIp.set(clave, {
        cantidad: 1,
        reiniciaEn: ahora + ventanaMs
      });
      next();
      return;
    }

    if (registro.cantidad >= maximo) {
      res.status(429).json({
        ok: false,
        error: 'Demasiados intentos. Intenta nuevamente en unos minutos.'
      });
      return;
    }

    registro.cantidad += 1;
    next();
  };
}

export const limiteLogin = crearLimitePeticiones();
