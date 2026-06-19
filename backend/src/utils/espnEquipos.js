const ALIAS_ESPN_EQUIPOS = new Map([
  ['bosnia-herzegovina', 'Bosnia y Herzegovina'],
  ['bosnia herzegovina', 'Bosnia y Herzegovina'],
  ['bosnia and herzegovina', 'Bosnia y Herzegovina'],
  ['jordan', 'Jordania'],
  ['congo dr', 'RD Congo'],
  ['dr congo', 'RD Congo'],
  ['congo democratic republic', 'RD Congo'],
  ['democratic republic of congo', 'RD Congo'],
  ['united states', 'EE.UU.'],
  ['usa', 'EE.UU.'],
  ['u s a', 'EE.UU.'],
  ['netherlands', 'Países Bajos'],
  ['south korea', 'Corea del Sur'],
  ['korea republic', 'Corea del Sur'],
  ['czechia', 'República Checa'],
  ['czech republic', 'República Checa'],
  ['ivory coast', 'Costa de Marfil'],
  ["cote d ivoire", 'Costa de Marfil'],
  ['saudi arabia', 'Arabia Saudí'],
  ['cape verde', 'Cabo Verde'],
  ['curacao', 'Curazao'],
  ['turkiye', 'Turquía'],
  ['türkiye', 'Turquía'],
  ['turkey', 'Turquía'],
  ['morocco', 'Marruecos'],
  ['tunisia', 'Túnez'],
  ['south africa', 'Sudáfrica'],
  ['new zealand', 'Nueva Zelanda'],
  ['mexico', 'México'],
  ['canada', 'Canadá'],
  ['japan', 'Japón'],
  ['iran', 'Irán'],
  ['spain', 'España'],
  ['belgium', 'Bélgica'],
  ['panama', 'Panamá'],
  ['uzbekistan', 'Uzbekistán'],
  ['qatar', 'Catar'],
  ['switzerland', 'Suiza'],
  ['scotland', 'Escocia'],
  ['sweden', 'Suecia'],
  ['egypt', 'Egipto'],
  ['iraq', 'Irak'],
  ['norway', 'Noruega'],
  ['algeria', 'Argelia'],
  ['croatia', 'Croacia'],
  ['germany', 'Alemania'],
  ['england', 'Inglaterra'],
  ['haiti', 'Haití']
]);

export function normalizarNombreEquipo(valor) {
  return String(valor || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function obtenerNombreEquipoCanonico(nombre) {
  const normalizado = normalizarNombreEquipo(nombre);
  return ALIAS_ESPN_EQUIPOS.get(normalizado) || String(nombre || '').trim();
}

export function equiposEquivalentes(nombreA, nombreB) {
  return normalizarNombreEquipo(obtenerNombreEquipoCanonico(nombreA)) ===
    normalizarNombreEquipo(obtenerNombreEquipoCanonico(nombreB));
}
