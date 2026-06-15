import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { crearLimitePeticiones } from '../src/middleware/limitePeticiones.js';

function crearRespuesta() {
  return {
    statusCode: 200,
    body: null,
    status(codigo) {
      this.statusCode = codigo;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };
}

function ejecutarLimite(limite, { ip = '1.1.1.1', codigo = 'demo-1' } = {}) {
  const req = {
    body: { codigo },
    headers: {},
    ip,
    socket: { remoteAddress: ip }
  };
  const res = crearRespuesta();
  let paso = false;

  limite(req, res, () => {
    paso = true;
  });

  return { req, res, paso };
}

describe('limite de login', () => {
  it('bloquea solo la combinacion ip y codigo despues de varios fallos', () => {
    const limite = crearLimitePeticiones({ ventanaMs: 5 * 60 * 1000, maximo: 10, bloqueoMs: 60 * 1000 });

    for (let i = 0; i < 10; i += 1) {
      const intento = ejecutarLimite(limite, { codigo: 'codigo-malo' });
      assert.equal(intento.paso, true);
      intento.req.limiteLogin.registrarFallo();
    }

    const bloqueado = ejecutarLimite(limite, { codigo: 'codigo-malo' });
    assert.equal(bloqueado.paso, false);
    assert.equal(bloqueado.res.statusCode, 429);

    const otroCodigo = ejecutarLimite(limite, { codigo: 'otro-codigo' });
    assert.equal(otroCodigo.paso, true);
  });

  it('resetea los fallos cuando el login es exitoso', () => {
    const limite = crearLimitePeticiones({ ventanaMs: 5 * 60 * 1000, maximo: 10, bloqueoMs: 60 * 1000 });

    for (let i = 0; i < 9; i += 1) {
      const intento = ejecutarLimite(limite, { codigo: 'codigo-bueno' });
      assert.equal(intento.paso, true);
      intento.req.limiteLogin.registrarFallo();
    }

    const exitoso = ejecutarLimite(limite, { codigo: 'codigo-bueno' });
    assert.equal(exitoso.paso, true);
    exitoso.req.limiteLogin.resetear();

    const siguiente = ejecutarLimite(limite, { codigo: 'codigo-bueno' });
    assert.equal(siguiente.paso, true);
    siguiente.req.limiteLogin.registrarFallo();
  });
});
