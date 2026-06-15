import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { obtenerEstadoHorarioPartido } from '../src/utils/fechas.js';

function conAhoraFijo(isoAhora, prueba) {
  const dateNowOriginal = Date.now;
  Date.now = () => new Date(isoAhora).getTime();

  try {
    prueba();
  } finally {
    Date.now = dateNowOriginal;
  }
}

describe('obtenerEstadoHorarioPartido', () => {
  it('mantiene el estado base si faltan mas de 30 minutos', () => {
    conAhoraFijo('2026-06-14T17:00:00-04:00', () => {
      const estado = obtenerEstadoHorarioPartido('2026-06-14T18:00:00-04:00', 'Pendiente');

      assert.equal(estado.estado, 'Pendiente');
      assert.equal(estado.cerradoPorHorario, false);
      assert.equal(estado.enVivo, false);
    });
  });

  it('calcula Cerrado dentro de los 30 minutos previos', () => {
    conAhoraFijo('2026-06-14T17:40:00-04:00', () => {
      const estado = obtenerEstadoHorarioPartido('2026-06-14T18:00:00-04:00', 'Pendiente');

      assert.equal(estado.estado, 'Cerrado');
      assert.equal(estado.cerradoPorHorario, true);
      assert.equal(estado.enVivo, false);
    });
  });

  it('calcula En vivo si el partido ya comenzo y no esta finalizado', () => {
    conAhoraFijo('2026-06-14T18:05:00-04:00', () => {
      const estado = obtenerEstadoHorarioPartido('2026-06-14T18:00:00-04:00', 'Cerrado');

      assert.equal(estado.estado, 'En vivo');
      assert.equal(estado.cerradoPorHorario, false);
      assert.equal(estado.enVivo, true);
    });
  });

  it('respeta Finalizado por sobre el horario', () => {
    conAhoraFijo('2026-06-14T18:05:00-04:00', () => {
      const estado = obtenerEstadoHorarioPartido('2026-06-14T18:00:00-04:00', 'Finalizado');

      assert.equal(estado.estado, 'Finalizado');
      assert.equal(estado.cerradoPorHorario, false);
      assert.equal(estado.enVivo, false);
    });
  });
});
