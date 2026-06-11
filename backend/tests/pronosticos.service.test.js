import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  estaPartidoDisponibleParaPronosticar,
  obtenerClasificadoLadoPronosticado
} from '../src/utils/pronosticos.js';

describe('pronosticos eliminacion', () => {
  it('deriva clasificado local cuando el pronostico tiene ganador local', () => {
    const clasificado = obtenerClasificadoLadoPronosticado({
      golesLocal: 2,
      golesVisita: 1
    });

    assert.equal(clasificado, 'local');
  });

  it('deriva clasificado visita cuando el pronostico tiene ganador visita', () => {
    const clasificado = obtenerClasificadoLadoPronosticado({
      golesLocal: 0,
      golesVisita: 1
    });

    assert.equal(clasificado, 'visita');
  });

  it('usa clasificado manual cuando el pronostico esta empatado', () => {
    const clasificado = obtenerClasificadoLadoPronosticado({
      golesLocal: 1,
      golesVisita: 1,
      clasificadoLado: 'local'
    });

    assert.equal(clasificado, 'local');
  });

  it('rechaza clasificado manual invalido cuando el pronostico esta empatado', () => {
    const clasificado = obtenerClasificadoLadoPronosticado({
      golesLocal: 1,
      golesVisita: 1,
      clasificadoLado: 'mexico'
    });

    assert.equal(clasificado, '');
  });
});

describe('disponibilidad de partidos', () => {
  it('permite grupos en estado Pendiente si faltan mas de 30 minutos', () => {
    const disponibilidad = estaPartidoDisponibleParaPronosticar({
      estado: 'Pendiente',
      fecha_hora: new Date(Date.now() + 31 * 60 * 1000).toISOString()
    }, 'grupos');

    assert.equal(disponibilidad.disponible, true);
  });

  it('bloquea eliminacion en estado Pendiente', () => {
    const disponibilidad = estaPartidoDisponibleParaPronosticar({
      estado: 'Pendiente',
      fecha_hora: new Date(Date.now() + 31 * 60 * 1000).toISOString()
    }, 'eliminacion');

    assert.equal(disponibilidad.disponible, false);
    assert.equal(disponibilidad.motivo, 'estado');
  });

  it('bloquea por horario si faltan 30 minutos o menos', () => {
    const disponibilidad = estaPartidoDisponibleParaPronosticar({
      estado: 'Abierto',
      fecha_hora: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    }, 'grupos');

    assert.equal(disponibilidad.disponible, false);
    assert.equal(disponibilidad.motivo, 'horario');
  });
});
