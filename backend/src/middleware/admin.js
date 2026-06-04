const CODIGO_ADMIN = 'agu-1111';

export function requerirAdmin(req, res, next) {
  const codigoLegacy = String(req.sesion?.codigoLegacy || '').trim().toLowerCase();

  if (codigoLegacy !== CODIGO_ADMIN) {
    res.status(403).json({
      ok: false,
      error: 'No autorizado'
    });
    return;
  }

  next();
}
