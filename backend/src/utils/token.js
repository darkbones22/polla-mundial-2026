import crypto from 'node:crypto';

function codificarBase64Url(valor) {
  return Buffer.from(JSON.stringify(valor))
    .toString('base64url');
}

function firmar(payloadCodificado) {
  return crypto
    .createHmac('sha256', process.env.JWT_SECRET)
    .update(payloadCodificado)
    .digest('base64url');
}

export function crearTokenSesion(payload, duracionSegundos = 60 * 60 * 8) {
  const ahora = Math.floor(Date.now() / 1000);
  const encabezado = codificarBase64Url({ alg: 'HS256', typ: 'JWT' });
  const cuerpo = codificarBase64Url({
    ...payload,
    iat: ahora,
    exp: ahora + duracionSegundos
  });
  const contenido = `${encabezado}.${cuerpo}`;
  const firma = firmar(contenido);

  return `${contenido}.${firma}`;
}

export function verificarTokenSesion(token) {
  const partes = String(token || '').split('.');
  if (partes.length !== 3) return null;

  const [encabezado, cuerpo, firma] = partes;
  const contenido = `${encabezado}.${cuerpo}`;
  const firmaEsperada = firmar(contenido);
  const firmaBuffer = Buffer.from(firma);
  const firmaEsperadaBuffer = Buffer.from(firmaEsperada);

  if (
    firmaBuffer.length !== firmaEsperadaBuffer.length ||
    !crypto.timingSafeEqual(firmaBuffer, firmaEsperadaBuffer)
  ) {
    return null;
  }

  let payload;

  try {
    payload = JSON.parse(Buffer.from(cuerpo, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  const ahora = Math.floor(Date.now() / 1000);

  if (payload.exp && payload.exp < ahora) return null;

  return payload;
}
