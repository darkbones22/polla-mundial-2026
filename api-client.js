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

  function adaptarPartidoGrupoNode(partido) {
    const { fecha, hora } = separarFechaHora(partido.fechaHora);

    return {
      id: partido.id,
      grupo: partido.grupo,
      fechaHora: partido.fechaHora,
      fecha,
      hora,
      local: partido.equipoLocal,
      visita: partido.equipoVisita,
      equipoLocal: partido.equipoLocal,
      equipoVisita: partido.equipoVisita,
      golesLocalReal: partido.golesLocalReal,
      golesVisitaReal: partido.golesVisitaReal,
      estado: partido.estado
    };
  }

  function adaptarPartidoEliminacionNode(partido) {
    const { fecha, hora } = separarFechaHora(partido.fechaHora);
    const local = partido.equipoLocal || partido.placeholderLocal;
    const visita = partido.equipoVisita || partido.placeholderVisita;
    const clasifica = partido.clasificadoRealLado === "local"
      ? local
      : partido.clasificadoRealLado === "visita"
        ? visita
        : "";

    return {
      id: partido.id,
      ronda: partido.ronda,
      fechaHora: partido.fechaHora,
      fecha,
      hora,
      localPlaceholder: partido.placeholderLocal,
      local: partido.equipoLocal,
      visitaPlaceholder: partido.placeholderVisita,
      visita: partido.equipoVisita,
      placeholderLocal: partido.placeholderLocal,
      equipoLocal: partido.equipoLocal,
      placeholderVisita: partido.placeholderVisita,
      equipoVisita: partido.equipoVisita,
      golesLocalReal: partido.golesLocalReal,
      golesVisitaReal: partido.golesVisitaReal,
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
    apiObtenerDetallePartido
  };
})(window);
