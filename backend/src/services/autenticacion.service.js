import { supabase } from '../supabaseClient.js';
import { normalizarCodigoLegacy } from '../utils/codigos.js';
import { crearTokenSesion } from '../utils/token.js';
import { obtenerPollasParticipante } from './pollas.service.js';

function mapearParticipante(fila) {
  return {
    id: fila.id,
    codigoLegacy: fila.codigo_legacy,
    nombre: fila.nombre_visible
  };
}

export async function validarCodigoParticipante(codigo) {
  const codigoNormalizado = normalizarCodigoLegacy(codigo);

  if (!codigoNormalizado) {
    return {
      ok: false,
      error: 'Debes ingresar un codigo'
    };
  }

  const { data, error } = await supabase
    .from('participantes')
    .select('id,codigo_legacy,nombre_visible,activo,codigo_hash')
    .eq('codigo_legacy', codigoNormalizado)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const codigoHashTemporal = data?.codigo_hash === `legacy:${codigoNormalizado}`;

  if (!data || !data.activo || !codigoHashTemporal) {
    return {
      ok: false,
      error: 'Codigo invalido'
    };
  }

  const participante = mapearParticipante(data);
  const pollas = await obtenerPollasParticipante(data.id);
  const token = crearTokenSesion({
    participanteId: data.id,
    codigoLegacy: data.codigo_legacy
  });

  return {
    ok: true,
    participante,
    pollas,
    token
  };
}
