import { supabase } from '../supabaseClient.js';

function esValorVerdadero(valor) {
  return valor === true || valor === 'true' || valor === 1 || valor === '1';
}

export async function requerirAdmin(req, res, next) {
  const participanteId = req.sesion?.participanteId;

  if (!participanteId) {
    res.status(403).json({
      ok: false,
      error: 'No autorizado'
    });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('participantes')
      .select('id,activo,es_admin')
      .eq('id', participanteId)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!esValorVerdadero(data?.activo) || !esValorVerdadero(data?.es_admin)) {
      res.status(403).json({
        ok: false,
        error: 'No autorizado'
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}
