// Capa API del frontend hacia Render + Supabase.
(function crearApiClient(global) {
  const API_MODE = "node";
  const NODE_API_BASE_URL = "https://polla-mundial-2026-backend.onrender.com";
  const TOKEN_STORAGE_KEY = "polla_mundial_node_token";

  function obtenerTokenNode() {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY) || "";
  }

  function guardarTokenNode(token) {
    if (token) {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  }

  function limpiarTokenNode() {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  function tieneTokenNode() {
    return Boolean(obtenerTokenNode());
  }

  async function llamarNodeApi(ruta, opciones = {}) {
    const headers = {
      ...(opciones.headers || {})
    };
    const token = obtenerTokenNode();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (opciones.body && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    const respuesta = await fetch(`${NODE_API_BASE_URL}${ruta}`, {
      ...opciones,
      headers,
      body: opciones.body ? JSON.stringify(opciones.body) : undefined
    });
    let data = {};

    try {
      data = await respuesta.json();
    } catch (error) {
      data = {};
    }

    if (!respuesta.ok) {
      return {
        ok: false,
        status: respuesta.status,
        error: data.error || "Error al conectar con Node API."
      };
    }

    return data;
  }

  function adaptarLoginNode(respuesta) {
    if (!respuesta.ok) {
      limpiarTokenNode();
      return respuesta;
    }

    guardarTokenNode(respuesta.token);

    return {
      ok: true,
      nombre: respuesta.participante?.nombre || "",
      participante: respuesta.participante || null,
      pollas: (respuesta.pollas || []).map((polla) => ({
        id: polla.id,
        idLegacy: polla.idLegacy,
        nombre: polla.nombre
      })),
      token: respuesta.token
    };
  }

  function separarFechaHora(fechaHora) {
    const texto = String(fechaHora || "");
    const partes = texto.includes("T")
      ? texto.split("T")
      : texto.split(" ");
    const fecha = partes[0] || "";
    const hora = (partes[1] || "").slice(0, 5);

    return { fecha, hora };
  }

  function obtenerIdPartido(partido) {
    return partido.id || partido.partidoId || partido.partido_id || "";
  }

  function obtenerFechaHoraPartidoNode(partido) {
    const desdeFechaHora = separarFechaHora(partido.fechaHora || partido.fecha_hora);

    return {
      fecha: partido.fecha || desdeFechaHora.fecha,
      hora: partido.hora || desdeFechaHora.hora,
      fechaHora: partido.fechaHora || partido.fecha_hora || [
        partido.fecha || desdeFechaHora.fecha,
        partido.hora || desdeFechaHora.hora
      ].filter(Boolean).join("T")
    };
  }

  function adaptarPartidoGrupoNode(partido) {
    const { fecha, hora, fechaHora } = obtenerFechaHoraPartidoNode(partido);
    const local = partido.local || partido.equipoLocal || partido.equipo_local || partido.placeholderLocal;
    const visita = partido.visita || partido.equipoVisita || partido.equipo_visita || partido.placeholderVisita;

    return {
      id: obtenerIdPartido(partido),
      grupo: partido.grupo,
      fechaHora,
      fecha,
      hora,
      local,
      visita,
      equipoLocal: local,
      equipoVisita: visita,
      golesLocalReal: partido.golesLocalReal ?? partido.goles_local_real,
      golesVisitaReal: partido.golesVisitaReal ?? partido.goles_visita_real,
      estado: partido.estado
    };
  }

  function adaptarPartidoEliminacionNode(partido) {
    const { fecha, hora, fechaHora } = obtenerFechaHoraPartidoNode(partido);
    const equipoLocalReal = partido.equipoLocal || partido.equipo_local || partido.local || "";
    const equipoVisitaReal = partido.equipoVisita || partido.equipo_visita || partido.visita || "";
    const placeholderLocal = partido.placeholderLocal || partido.placeholder_local || partido.localPlaceholder || "";
    const placeholderVisita = partido.placeholderVisita || partido.placeholder_visita || partido.visitaPlaceholder || "";
    const local = equipoLocalReal || placeholderLocal;
    const visita = equipoVisitaReal || placeholderVisita;
    const clasifica = partido.clasificadoRealLado === "local"
      ? local
      : partido.clasificadoRealLado === "visita"
        ? visita
        : "";

    return {
      id: obtenerIdPartido(partido),
      ronda: partido.ronda,
      fechaHora,
      fecha,
      hora,
      localPlaceholder: placeholderLocal,
      local,
      visitaPlaceholder: placeholderVisita,
      visita,
      placeholderLocal,
      equipoLocal: equipoLocalReal,
      placeholderVisita,
      equipoVisita: equipoVisitaReal,
      golesLocalReal: partido.golesLocalReal ?? partido.goles_local_real,
      golesVisitaReal: partido.golesVisitaReal ?? partido.goles_visita_real,
      clasifica,
      clasificadoRealLado: partido.clasificadoRealLado,
      estado: partido.estado
    };
  }

  function adaptarResultadoNode(resultado, tipo) {
    if (tipo === "eliminacion") {
      return adaptarPartidoEliminacionNode(resultado);
    }
    return adaptarPartidoGrupoNode(resultado);
  }

  function adaptarPronosticoEliminacionParaNode(pronostico) {
    return {
      partidoId: pronostico.partidoId || pronostico.id,
      golesLocal: pronostico.golesLocal,
      golesVisita: pronostico.golesVisita,
      clasificadoLado: pronostico.clasificadoLado
    };
  }

  function adaptarPronosticoGrupoParaNode(pronostico) {
    return {
      partidoId: pronostico.partidoId || pronostico.id,
      golesLocal: pronostico.golesLocal,
      golesVisita: pronostico.golesVisita
    };
  }

  function adaptarParticipanteDetalle(participante, partido) {
    const pronosticoOriginal = participante.pronostico || null;
    const sinPronostico = !pronosticoOriginal;
    const clasifica = pronosticoOriginal?.clasifica || (
      pronosticoOriginal?.clasificadoLado === "local"
        ? partido.local || partido.localPlaceholder || ""
        : pronosticoOriginal?.clasificadoLado === "visita"
          ? partido.visita || partido.visitaPlaceholder || ""
          : ""
    );

    return {
      ...participante,
      sinPronostico,
      pronostico: pronosticoOriginal
        ? {
          ...pronosticoOriginal,
          clasifica
        }
        : null,
      detalle: participante.detalle || participante.detallePuntos || null,
      detallePuntos: participante.detallePuntos || participante.detalle || null,
      puntos: participante.puntos || 0
    };
  }

  async function apiLogin(codigo) {
    const respuesta = await llamarNodeApi("/api/login", {
      method: "POST",
      body: { codigo }
    });
    return adaptarLoginNode(respuesta);
  }

  async function apiObtenerPollas() {
    return llamarNodeApi("/api/pollas");
  }

  async function apiObtenerPartidosGrupos() {
    const respuesta = await llamarNodeApi("/api/partidos/grupos");
    return {
      ...respuesta,
      partidos: (respuesta.partidos || []).map(adaptarPartidoGrupoNode)
    };
  }

  async function apiObtenerPartidosEliminacion() {
    const respuesta = await llamarNodeApi("/api/partidos/eliminacion");
    return {
      ...respuesta,
      llaves: (respuesta.partidos || []).map(adaptarPartidoEliminacionNode),
      partidos: (respuesta.partidos || []).map(adaptarPartidoEliminacionNode)
    };
  }

  async function apiObtenerPronosticosGrupos(pollaId) {
    return llamarNodeApi(`/api/pronosticos/grupos?pollaId=${encodeURIComponent(pollaId)}`);
  }

  async function apiObtenerPronosticosEliminacion(pollaId) {
    return llamarNodeApi(`/api/pronosticos/eliminacion?pollaId=${encodeURIComponent(pollaId)}`);
  }

  async function apiGuardarPronosticosGrupos(pollaId, pronosticos) {
    return llamarNodeApi("/api/pronosticos/grupos", {
      method: "POST",
      body: {
        pollaId,
        pronosticos: (pronosticos || []).map(adaptarPronosticoGrupoParaNode)
      }
    });
  }

  async function apiGuardarPronosticosEliminacion(pollaId, pronosticos) {
    return llamarNodeApi("/api/pronosticos/eliminacion", {
      method: "POST",
      body: {
        pollaId,
        pronosticos: (pronosticos || []).map(adaptarPronosticoEliminacionParaNode)
      }
    });
  }

  async function apiObtenerResultados(tipo) {
    const respuesta = await llamarNodeApi(`/api/resultados?tipo=${encodeURIComponent(tipo)}`);
    return {
      ...respuesta,
      resultados: (respuesta.resultados || []).map((resultado) => adaptarResultadoNode(resultado, tipo))
    };
  }

  async function apiObtenerRanking(pollaId) {
    return llamarNodeApi(`/api/ranking?pollaId=${encodeURIComponent(pollaId)}`);
  }

  async function apiObtenerDetallePartido(pollaId, partidoId, tipo) {
    const respuesta = await llamarNodeApi(
      `/api/detalle-partido?pollaId=${encodeURIComponent(pollaId)}&partidoId=${encodeURIComponent(partidoId)}&tipo=${encodeURIComponent(tipo)}`
    );

    if (!respuesta.ok || !respuesta.partido) {
      return respuesta;
    }

    const partido = adaptarResultadoNode(respuesta.partido, tipo);
    const participantes = respuesta.participantes || respuesta.detalle || [];

    return {
      ...respuesta,
      partido,
      participantes: participantes.map((participante) => adaptarParticipanteDetalle(participante, partido))
    };
  }

  async function apiAdminObtenerPartidos(tipo) {
    const respuesta = await llamarNodeApi(`/api/admin/partidos?tipo=${encodeURIComponent(tipo)}`);
    return {
      ...respuesta,
      partidos: (respuesta.partidos || []).map((partido) => adaptarResultadoNode(partido, tipo))
    };
  }

  async function apiAdminActualizarPartido(id, datos) {
    const tipo = datos?.tipo || "grupos";
    const respuesta = await llamarNodeApi(`/api/admin/partidos/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: datos
    });

    return {
      ...respuesta,
      partido: respuesta.partido ? adaptarResultadoNode(respuesta.partido, tipo) : null
    };
  }

  async function apiAdminObtenerParticipantes() {
    return llamarNodeApi("/api/admin/participantes");
  }

  async function apiAdminCrearParticipante(datos) {
    return llamarNodeApi("/api/admin/participantes", {
      method: "POST",
      body: datos
    });
  }

  async function apiAdminActualizarParticipante(id, datos) {
    return llamarNodeApi(`/api/admin/participantes/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: datos
    });
  }

  async function apiAdminActualizarPollasParticipante(id, pollas) {
    return llamarNodeApi(`/api/admin/participantes/${encodeURIComponent(id)}/pollas`, {
      method: "PUT",
      body: { pollas }
    });
  }

  async function apiAdminObtenerPollas() {
    return llamarNodeApi("/api/admin/pollas");
  }

  async function apiAdminCrearPolla(datos) {
    return llamarNodeApi("/api/admin/pollas", {
      method: "POST",
      body: datos
    });
  }

  async function apiAdminActualizarPolla(id, datos) {
    return llamarNodeApi(`/api/admin/pollas/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: datos
    });
  }

  global.PollaApiClient = {
    API_MODE,
    NODE_API_BASE_URL,
    tieneTokenNode,
    limpiarTokenNode,
    apiLogin,
    apiObtenerPollas,
    apiObtenerPartidosGrupos,
    apiObtenerPartidosEliminacion,
    apiObtenerPronosticosGrupos,
    apiObtenerPronosticosEliminacion,
    apiGuardarPronosticosGrupos,
    apiGuardarPronosticosEliminacion,
    apiObtenerResultados,
    apiObtenerRanking,
    apiObtenerDetallePartido,
    apiAdminObtenerPartidos,
    apiAdminActualizarPartido,
    apiAdminObtenerParticipantes,
    apiAdminCrearParticipante,
    apiAdminActualizarParticipante,
    apiAdminActualizarPollasParticipante,
    apiAdminObtenerPollas,
    apiAdminCrearPolla,
    apiAdminActualizarPolla
  };
})(window);
