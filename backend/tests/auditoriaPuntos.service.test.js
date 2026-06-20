import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

process.env.SUPABASE_URL ||= 'https://example.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY ||= 'test-service-role-key';

const { auditarTipo } = await import('../src/services/auditoriaPuntos.service.js');

const participantes = [
  {
    id: 'p1',
    codigo_legacy: 'usuario1',
    nombre_visible: 'Usuario Uno'
  }
];

function auditarGrupo(partido, pronostico) {
  return auditarTipo({
    tipo: 'grupos',
    partidos: [partido],
    pronosticos: [pronostico],
    duplicados: new Map(),
    participantes,
    filtros: {}
  }).items[0];
}

function auditarEliminacion(partido, pronostico) {
  return auditarTipo({
    tipo: 'eliminacion',
    partidos: [partido],
    pronosticos: [pronostico],
    duplicados: new Map(),
    participantes,
    filtros: {}
  }).items[0];
}

function partidoGrupo({ estado = 'Finalizado', local = 2, visita = 1 } = {}) {
  return {
    id: 'GA1',
    grupo: 'A',
    fecha_hora: '2026-06-11T15:00:00-04:00',
    equipo_local: 'México',
    equipo_visita: 'Sudáfrica',
    goles_local_real: local,
    goles_visita_real: visita,
    estado
  };
}

function pronosticoGrupo({ local, visita }) {
  return {
    participante_id: 'p1',
    partido_id: 'GA1',
    goles_local: local,
    goles_visita: visita
  };
}

describe('auditoria de puntos', () => {
  it('usa exacto grupos = 10 sin extras', () => {
    const item = auditarGrupo(partidoGrupo(), pronosticoGrupo({ local: 2, visita: 1 }));

    assert.equal(item.puntos, 10);
    assert.equal(item.desglose.exacto.puntos, 10);
    assert.equal(item.desglose.ganador.puntos, 0);
    assert.equal(item.desglose.golLocal.puntos, 0);
    assert.equal(item.desglose.golVisita.puntos, 0);
    assert.equal(item.desglose.diferencia.puntos, 0);
  });

  it('usa ganador grupos = 5 y gol visita = 2', () => {
    const item = auditarGrupo(partidoGrupo({ local: 2, visita: 1 }), pronosticoGrupo({ local: 3, visita: 1 }));

    assert.equal(item.puntos, 7);
    assert.equal(item.desglose.ganador.puntos, 5);
    assert.equal(item.desglose.golVisita.puntos, 2);
  });

  it('usa diferencia absoluta aunque cambie ganador', () => {
    const item = auditarGrupo(partidoGrupo({ local: 2, visita: 1 }), pronosticoGrupo({ local: 1, visita: 2 }));

    assert.equal(item.puntos, 1);
    assert.equal(item.desglose.diferencia.puntos, 1);
  });

  it('no suma partidos En vivo', () => {
    const item = auditarGrupo(partidoGrupo({ estado: 'En vivo' }), pronosticoGrupo({ local: 2, visita: 1 }));

    assert.equal(item.puntos, 0);
    assert.equal(item.calculable, false);
    assert.equal(item.alertas.includes('No suma: partido no finalizado.'), true);
  });

  it('usa eliminacion exacto + clasificado = 13', () => {
    const item = auditarEliminacion(
      {
        id: 'R16-1',
        ronda: 'Octavos',
        fecha_hora: '2026-07-04T15:00:00-04:00',
        placeholder_local: '',
        equipo_local: 'Brasil',
        placeholder_visita: '',
        equipo_visita: 'Uruguay',
        goles_local_real: 2,
        goles_visita_real: 1,
        clasificado_real_lado: 'local',
        estado: 'Finalizado'
      },
      {
        participante_id: 'p1',
        partido_id: 'R16-1',
        goles_local: 2,
        goles_visita: 1,
        clasificado_lado: 'local'
      }
    );

    assert.equal(item.puntos, 13);
    assert.equal(item.desglose.exacto.puntos, 10);
    assert.equal(item.desglose.clasificado.puntos, 3);
  });
});
