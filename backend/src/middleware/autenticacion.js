import { verificarTokenSesion } from '../utils/token.js';

export function requerirAutenticacion(req, res, next) {
  const encabezado = req.headers.authorization || '';
  const token = encabezado.startsWith('Bearer ')
    ? encabezado.slice('Bearer '.length)
    : '';

  const sesion = verificarTokenSesion(token);

  if (!sesion?.participanteId) {
    res.status(401).json({
      ok: false,
      error: 'Sesion invalida o expirada'
    });
    return;
  }

  req.sesion = sesion;
  next();
}
