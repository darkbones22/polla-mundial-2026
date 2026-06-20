import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

process.env.SUPABASE_URL ||= 'https://example.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY ||= 'test-service-role-key';

const {
  obtenerResultadosEliminacionPorPartido,
  obtenerResultadosGruposPorPartido
} = await import('../src/services/ranking.service.js');

function partidoGrupo(estado) {
  return {
    id: `G-${estado}`,
    fecha_hora: '2026-06-18T15:00:00-04:00',
    goles_local_real: 2,
    goles_visita_real: 1,
    estado
  };
}

function partidoEliminacion(estado, clasificado = 'local') {
  return {
    id: `E-${estado}`,
    fecha_hora: '2026-06-18T15:00:00-04:00',
    goles_local_real: 2,
    goles_visita_real: 1,
    clasificado_real_lado: clasificado,
    estado
  };
}

describe('ranking oficial por estado de partido', () => {
  it('incluye grupos solo si el partido esta Finalizado', () => {
    const partidos = [
      partidoGrupo('Finalizado'),
      partidoGrupo('En vivo'),
      partidoGrupo('Cerrado'),
      partidoGrupo('Pendiente'),
      partidoGrupo('Abierto')
    ];

    const { resultadosPorPartido, incluyeEnVivo } = obtenerResultadosGruposPorPartido(partidos);

    assert.equal(resultadosPorPartido.size, 1);
    assert.equal(resultadosPorPartido.has('G-Finalizado'), true);
    assert.equal(resultadosPorPartido.has('G-En vivo'), false);
    assert.equal(resultadosPorPartido.has('G-Cerrado'), false);
    assert.equal(resultadosPorPartido.has('G-Pendiente'), false);
    assert.equal(resultadosPorPartido.has('G-Abierto'), false);
    assert.equal(incluyeEnVivo, false);
  });

  it('incluye eliminacion solo si esta Finalizado y tiene clasificado real', () => {
    const partidos = [
      partidoEliminacion('Finalizado'),
      partidoEliminacion('Finalizado', null),
      partidoEliminacion('En vivo'),
      partidoEliminacion('Cerrado'),
      partidoEliminacion('Pendiente'),
      partidoEliminacion('Abierto')
    ];

    const { resultadosPorPartido, incluyeEnVivo } = obtenerResultadosEliminacionPorPartido(partidos);

    assert.equal(resultadosPorPartido.size, 1);
    assert.equal(resultadosPorPartido.has('E-Finalizado'), true);
    assert.equal(resultadosPorPartido.has('E-En vivo'), false);
    assert.equal(resultadosPorPartido.has('E-Cerrado'), false);
    assert.equal(resultadosPorPartido.has('E-Pendiente'), false);
    assert.equal(resultadosPorPartido.has('E-Abierto'), false);
    assert.equal(incluyeEnVivo, false);
  });
});
