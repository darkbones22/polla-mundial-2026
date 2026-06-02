import { supabase } from '../supabaseClient.js';

function mapearPolla(fila) {
  return {
    id: fila.pollas.id,
    idLegacy: fila.pollas.id_legacy,
    nombre: fila.pollas.nombre
  };
}

export async function obtenerPollasParticipante(participanteId) {
  const { data, error } = await supabase
    .from('participantes_pollas')
    .select('pollas!inner(id,id_legacy,nombre,activa)')
    .eq('participante_id', participanteId)
    .eq('activo', true)
    .eq('pollas.activa', true)
    .order('creado_en', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data || [])
    .filter((fila) => fila.pollas?.activa)
    .map(mapearPolla);
}

export async function validarParticipanteEnPolla(participanteId, pollaId) {
  if (!participanteId || !pollaId) return false;

  const { data, error } = await supabase
    .from('participantes_pollas')
    .select('polla_id,pollas!inner(activa)')
    .eq('participante_id', participanteId)
    .eq('polla_id', pollaId)
    .eq('activo', true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data?.pollas?.activa);
}
