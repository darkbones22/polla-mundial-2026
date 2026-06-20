import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  calcularPuntosEliminacion,
  calcularPuntosGrupos,
  obtenerClasificadoPronosticado,
  obtenerDiferencia,
  obtenerGanador
} from '../src/services/puntaje.service.js';

describe('puntaje fase de grupos', () => {
  it('calcula resultado exacto como pleno de 10 puntos', () => {
    const detalle = calcularPuntosGrupos(
      { golesLocal: 2, golesVisita: 1 },
      { golesLocal: 2, golesVisita: 1 }
    );

    assert.equal(detalle.puntos, 10);
    assert.equal(detalle.total, 10);
    assert.equal(detalle.exacto, true);
    assert.equal(detalle.ganadorEmpate, false);
    assert.equal(detalle.golesLocal, false);
    assert.equal(detalle.golesVisita, false);
    assert.equal(detalle.diferencia, false);
  });

  it('suma ganador/empate y diferencia cuando acierta ganador sin exacto', () => {
    const detalle = calcularPuntosGrupos(
      { golesLocal: 2, golesVisita: 0 },
      { golesLocal: 3, golesVisita: 1 }
    );

    assert.equal(detalle.puntos, 6);
    assert.equal(detalle.ganadorEmpate, true);
    assert.equal(detalle.diferencia, true);
    assert.equal(detalle.golesLocal, false);
    assert.equal(detalle.golesVisita, false);
  });

  it('suma solo goles local si no acierta ganador, visita ni diferencia', () => {
    const detalle = calcularPuntosGrupos(
      { golesLocal: 2, golesVisita: 0 },
      { golesLocal: 2, golesVisita: 3 }
    );

    assert.equal(detalle.puntos, 2);
    assert.equal(detalle.golesLocal, true);
    assert.equal(detalle.ganadorEmpate, false);
    assert.equal(detalle.golesVisita, false);
    assert.equal(detalle.diferencia, false);
  });

  it('suma goles local y goles visita como 2 puntos cada uno si no es exacto', () => {
    const detalle = calcularPuntosGrupos(
      { golesLocal: 2, golesVisita: 1 },
      { golesLocal: 2, golesVisita: 1 }
    );

    assert.equal(detalle.puntos, 10);

    const noExacto = calcularPuntosGrupos(
      { golesLocal: 2, golesVisita: 1 },
      { golesLocal: 2, golesVisita: 4 }
    );

    assert.equal(noExacto.puntos, 2);
    assert.equal(noExacto.golesLocal, true);
    assert.equal(noExacto.golesVisita, false);

    const visita = calcularPuntosGrupos(
      { golesLocal: 5, golesVisita: 3 },
      { golesLocal: 2, golesVisita: 3 }
    );

    assert.equal(visita.puntos, 2);
    assert.equal(visita.golesLocal, false);
    assert.equal(visita.golesVisita, true);
  });

  it('calcula empate exacto como pleno de 10 puntos', () => {
    const detalle = calcularPuntosGrupos(
      { golesLocal: 1, golesVisita: 1 },
      { golesLocal: 1, golesVisita: 1 }
    );

    assert.equal(detalle.puntos, 10);
    assert.equal(detalle.exacto, true);
  });

  it('suma ganador/empate y diferencia cuando acierta empate sin exacto', () => {
    const detalle = calcularPuntosGrupos(
      { golesLocal: 2, golesVisita: 2 },
      { golesLocal: 1, golesVisita: 1 }
    );

    assert.equal(detalle.puntos, 6);
    assert.equal(detalle.ganadorEmpate, true);
    assert.equal(detalle.diferencia, true);
  });

  it('suma diferencia por margen absoluto aunque cambie el ganador', () => {
    const detalle = calcularPuntosGrupos(
      { golesLocal: 1, golesVisita: 2 },
      { golesLocal: 2, golesVisita: 1 }
    );

    assert.equal(detalle.puntos, 1);
    assert.equal(detalle.ganadorEmpate, false);
    assert.equal(detalle.golesLocal, false);
    assert.equal(detalle.golesVisita, false);
    assert.equal(detalle.diferencia, true);
  });

  it('suma ganador correcto y margen absoluto sin exacto', () => {
    const detalle = calcularPuntosGrupos(
      { golesLocal: 3, golesVisita: 2 },
      { golesLocal: 2, golesVisita: 1 }
    );

    assert.equal(detalle.puntos, 6);
    assert.equal(detalle.ganadorEmpate, true);
    assert.equal(detalle.diferencia, true);
  });

  it('suma empate correcto y margen absoluto en empates sin exacto', () => {
    const detalle = calcularPuntosGrupos(
      { golesLocal: 0, golesVisita: 0 },
      { golesLocal: 1, golesVisita: 1 }
    );

    assert.equal(detalle.puntos, 6);
    assert.equal(detalle.ganadorEmpate, true);
    assert.equal(detalle.diferencia, true);
  });
});

describe('puntaje fase de eliminacion', () => {
  it('calcula resultado exacto y clasificado correcto como 13 puntos', () => {
    const detalle = calcularPuntosEliminacion(
      { golesLocal: 2, golesVisita: 1 },
      { golesLocal: 2, golesVisita: 1, clasificadoRealLado: 'local' }
    );

    assert.equal(detalle.puntos, 13);
    assert.equal(detalle.exacto, true);
    assert.equal(detalle.clasificado, true);
    assert.equal(detalle.clasificadoPronosticado, 'local');
  });

  it('permite exacto con clasificado incorrecto en empates', () => {
    const detalle = calcularPuntosEliminacion(
      { golesLocal: 1, golesVisita: 1, clasificadoLado: 'local' },
      { golesLocal: 1, golesVisita: 1, clasificadoRealLado: 'visita' }
    );

    assert.equal(detalle.puntos, 10);
    assert.equal(detalle.exacto, true);
    assert.equal(detalle.clasificado, false);
  });

  it('calcula empate exacto y clasificado correcto como 13 puntos', () => {
    const detalle = calcularPuntosEliminacion(
      { golesLocal: 1, golesVisita: 1, clasificadoLado: 'local' },
      { golesLocal: 1, golesVisita: 1, clasificadoRealLado: 'local' }
    );

    assert.equal(detalle.puntos, 13);
    assert.equal(detalle.exacto, true);
    assert.equal(detalle.clasificado, true);
  });

  it('calcula empate exacto y clasificado incorrecto como 10 puntos', () => {
    const detalle = calcularPuntosEliminacion(
      { golesLocal: 1, golesVisita: 1, clasificadoLado: 'local' },
      { golesLocal: 1, golesVisita: 1, clasificadoRealLado: 'visita' }
    );

    assert.equal(detalle.puntos, 10);
    assert.equal(detalle.exacto, true);
    assert.equal(detalle.clasificado, false);
  });

  it('deriva el clasificado pronosticado desde un ganador claro', () => {
    const clasificado = obtenerClasificadoPronosticado({
      golesLocal: 2,
      golesVisita: 1
    });

    assert.equal(clasificado, 'local');
  });

  it('suma bonus de clasificado correcto aunque el resultado no sea exacto', () => {
    const detalle = calcularPuntosEliminacion(
      { golesLocal: 2, golesVisita: 1 },
      { golesLocal: 3, golesVisita: 1, clasificadoRealLado: 'local' }
    );

    assert.equal(detalle.puntos, 10);
    assert.equal(detalle.ganadorEmpate, true);
    assert.equal(detalle.golesVisita, true);
    assert.equal(detalle.clasificado, true);
  });

  it('suma empate, diferencia y clasificado correcto sin exacto', () => {
    const detalle = calcularPuntosEliminacion(
      { golesLocal: 0, golesVisita: 0, clasificadoLado: 'local' },
      { golesLocal: 1, golesVisita: 1, clasificadoRealLado: 'local' }
    );

    assert.equal(detalle.puntos, 9);
    assert.equal(detalle.ganadorEmpate, true);
    assert.equal(detalle.diferencia, true);
    assert.equal(detalle.clasificado, true);
  });

  it('suma margen absoluto y clasificado correcto aunque cambie el ganador', () => {
    const detalle = calcularPuntosEliminacion(
      { golesLocal: 1, golesVisita: 2, clasificadoLado: 'local' },
      { golesLocal: 2, golesVisita: 1, clasificadoRealLado: 'local' }
    );

    assert.equal(detalle.puntos, 4);
    assert.equal(detalle.ganadorEmpate, false);
    assert.equal(detalle.diferencia, true);
    assert.equal(detalle.clasificado, true);
  });
});

describe('validaciones y helpers de puntaje', () => {
  it('devuelve no calculable si falta resultado real', () => {
    const detalle = calcularPuntosGrupos(
      { golesLocal: 2, golesVisita: 1 },
      { golesLocal: null, golesVisita: null }
    );

    assert.equal(detalle.puntos, 0);
    assert.equal(detalle.calculable, false);
    assert.equal(detalle.motivo, 'resultado_pendiente');
  });

  it('rechaza goles negativos como pronostico invalido de forma controlada', () => {
    const detalle = calcularPuntosEliminacion(
      { golesLocal: -1, golesVisita: 0, clasificadoLado: 'visita' },
      { golesLocal: 0, golesVisita: 1, clasificadoRealLado: 'visita' }
    );

    assert.equal(detalle.puntos, 0);
    assert.equal(detalle.calculable, false);
    assert.equal(detalle.motivo, 'pronostico_invalido');
  });

  it('obtiene ganador y diferencia del marcador', () => {
    assert.equal(obtenerGanador(3, 1), 'local');
    assert.equal(obtenerGanador(1, 3), 'visita');
    assert.equal(obtenerGanador(2, 2), 'empate');
    assert.equal(obtenerDiferencia(3, 1), 2);
    assert.equal(obtenerDiferencia(1, 3), 2);
  });
});
