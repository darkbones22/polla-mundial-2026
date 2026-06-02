export function normalizarCodigoLegacy(codigo) {
  return String(codigo || '').trim().toLowerCase();
}
