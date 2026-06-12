import { supabase } from '../supabaseClient.js';

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

    if (!data?.activo || data.es_admin !== true) {
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
