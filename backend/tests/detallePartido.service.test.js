import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

process.env.SUPABASE_URL ||= 'https://example.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY ||= 'test-service-role-key';

const { calcularPuntosDetallePartido } = await import('../src/services/detallePartido.service.js');

function partidoGrupo({ estado = 'Finalizado', local = 2, visita = 1 } = {}) {
  return {
    id: 'GD4',
    fecha_hora: '2099-06-20T03:00:00+00:00',
    estado,
    goles_local_real: local,
    goles_visita_real: visita
  };
}

function pronosticoGrupo({ local = 1, visita = 2 } = {}) {
  return {
    golesLocal: local,
    golesVisita: visita
  };
}

describe('detalle de partido', () => {
  it('muestra puntos definitivos para partidos Finalizado', () => {
    const calculo = calcularPuntosDetallePartido({
      tipo: 'grupos',
      partido: partidoGrupo({ estado: 'Finalizado', local: 2, visita: 1 }),
      pronostico: pronosticoGrupo({ local: 3, visita: 1 })
    });

    assert.equal(calculo.detallePuntos.puntos, 7);
    assert.equal(calculo.definitivo, true);
    assert.equal(calculo.provisorio, false);
  });

  it('muestra puntos provisorios para partidos En vivo', () => {
    const calculo = calcularPuntosDetallePartido({
      tipo: 'grupos',
      partido: partidoGrupo({ estado: 'En vivo', local: 0, visita: 1 }),
      pronostico: pronosticoGrupo({ local: 1, visita: 2 })
    });

    assert.equal(calculo.detallePuntos.puntos, 6);
    assert.equal(calculo.provisorio, true);
    assert.equal(calculo.definitivo, false);
  });

  it('no calcula puntos para partidos Cerrado', () => {
    const calculo = calcularPuntosDetallePartido({
      tipo: 'grupos',
      partido: partidoGrupo({ estado: 'Cerrado', local: 0, visita: 1 }),
      pronostico: pronosticoGrupo({ local: 1, visita: 2 })
    });

    assert.equal(calculo.detallePuntos, null);
    assert.equal(calculo.calculable, false);
    assert.equal(calculo.provisorio, false);
  });

  it('usa la misma regla de exacto en vivo = 10 provisorios', () => {
    const calculo = calcularPuntosDetallePartido({
      tipo: 'grupos',
      partido: partidoGrupo({ estado: 'En vivo', local: 1, visita: 0 }),
      pronostico: pronosticoGrupo({ local: 1, visita: 0 })
    });

    assert.equal(calculo.detallePuntos.puntos, 10);
    assert.equal(calculo.detallePuntos.exacto, true);
    assert.equal(calculo.provisorio, true);
  });

  it('usa la misma regla de ganador en vivo = 5', () => {
    const calculo = calcularPuntosDetallePartido({
      tipo: 'grupos',
      partido: partidoGrupo({ estado: 'En vivo', local: 2, visita: 0 }),
      pronostico: pronosticoGrupo({ local: 3, visita: 1 })
    });

    assert.equal(calculo.detallePuntos.ganadorEmpate, true);
    assert.equal(calculo.detallePuntos.puntos, 6);
    assert.equal(calculo.provisorio, true);
  });
});
