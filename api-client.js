// Capa API preparada para alternar entre Apps Script y Node/Supabase.
// Por defecto queda en Apps Script para no alterar la app productiva.
(function crearApiClient(global) {
  const API_MODE = "node";
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw0LDbeRCQxYDp18grZApWUPQJDYEpBBODYorhPl7FeACkpytoytAVcRx0P7Szx580V2g/exec";
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

  function llamarAppsScript(action, parametros = {}) {
    return new Promise((resolve, reject) => {
      const callbackName = `apiClient_${action}_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}`;
      const script = document.createElement("script");

      const limpiar = () => {
        delete global[callbackName];
        script.remove();
      };

      const timeout = setTimeout(() => {
        limpiar();
        reject(new Error("No hubo respuesta de Apps Script."));
      }, 20000);

      global[callbackName] = (respuesta) => {
        clearTimeout(timeout);
        limpiar();
        resolve(respuesta);
      };

      const query = new URLSearchParams({
        action,
        callback: callbackName,
        ...parametros
      });

      script.onerror = () => {
        clearTimeout(timeout);
        limpiar();
        reject(new Error("No se pudo conectar con Apps Script."));
      };

      script.src = `${APPS_SCRIPT_URL}?${query.toString()}`;
      document.body.appendChild(script);
    });
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
    const data = await respuesta.json();

    if (!respuesta.ok) {
      return {
        ok: false,
        error: data.error || "Error al conectar con Node API."
      };
    }

    return data;
  }

  function adaptarLoginNode(respuesta) {
    if (!respuesta.ok) return respuesta;

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

  function adaptarPartidoGrupoNode(partido) {
    return {
      id: partido.id,
      grupo: partido.grupo,
      fechaHora: partido.fechaHora,
      fecha: partido.fechaHora,
      hora: partido.fechaHora,
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
    return {
      id: partido.id,
      ronda: partido.ronda,
      fechaHora: partido.fechaHora,
      fecha: partido.fechaHora,
      hora: partido.fechaHora,
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

  async function apiLogin(codigo) {
    if (API_MODE === "node") {
      const respuesta = await llamarNodeApi("/api/login", {
        method: "POST",
        body: { codigo }
      });
      return adaptarLoginNode(respuesta);
    }

    return llamarAppsScript("validarCodigo", { codigo });
  }

  async function apiObtenerPollas() {
    if (API_MODE === "node") {
      return llamarNodeApi("/api/pollas");
    }

    return {
      ok: false,
      error: "Apps Script entrega las pollas dentro del login actual."
    };
  }

  async function apiObtenerPartidosGrupos() {
    if (API_MODE === "node") {
      const respuesta = await llamarNodeApi("/api/partidos/grupos");
      return {
        ...respuesta,
        partidos: (respuesta.partidos || []).map(adaptarPartidoGrupoNode)
      };
    }

    return llamarAppsScript("partidos");
  }

  async function apiObtenerPartidosEliminacion() {
    if (API_MODE === "node") {
      const respuesta = await llamarNodeApi("/api/partidos/eliminacion");
      return {
        ...respuesta,
        llaves: (respuesta.partidos || []).map(adaptarPartidoEliminacionNode),
        partidos: (respuesta.partidos || []).map(adaptarPartidoEliminacionNode)
      };
    }

    return llamarAppsScript("llaves");
  }

  async function apiObtenerPronosticosGrupos(pollaId) {
    if (API_MODE === "node") {
      return llamarNodeApi(`/api/pronosticos/grupos?pollaId=${encodeURIComponent(pollaId)}`);
    }

    return {
      ok: false,
      error: "Apps Script carga pronosticos existentes por codigo con pronosticosUsuario."
    };
  }

  async function apiObtenerPronosticosEliminacion(pollaId) {
    if (API_MODE === "node") {
      return llamarNodeApi(`/api/pronosticos/eliminacion?pollaId=${encodeURIComponent(pollaId)}`);
    }

    return {
      ok: false,
      error: "Apps Script carga pronosticos existentes por codigo con pronosticosUsuario."
    };
  }

  async function apiGuardarPronosticosGrupos(pollaId, pronosticos) {
    if (API_MODE === "node") {
      return llamarNodeApi("/api/pronosticos/grupos", {
        method: "POST",
        body: {
          pollaId,
          pronosticos: (pronosticos || []).map(adaptarPronosticoGrupoParaNode)
        }
      });
    }

    return llamarAppsScript("guardarPronosticos", {
      data: JSON.stringify({ tipo: "grupos", pronosticos })
    });
  }

  async function apiGuardarPronosticosEliminacion(pollaId, pronosticos) {
    if (API_MODE === "node") {
      return llamarNodeApi("/api/pronosticos/eliminacion", {
        method: "POST",
        body: {
          pollaId,
          pronosticos: (pronosticos || []).map(adaptarPronosticoEliminacionParaNode)
        }
      });
    }

    return llamarAppsScript("guardarPronosticos", {
      data: JSON.stringify({ tipo: "eliminacion", pronosticos })
    });
  }

  async function apiObtenerResultados(tipo) {
    if (API_MODE === "node") {
      const respuesta = await llamarNodeApi(`/api/resultados?tipo=${encodeURIComponent(tipo)}`);
      return {
        ...respuesta,
        resultados: (respuesta.resultados || []).map((resultado) => adaptarResultadoNode(resultado, tipo))
      };
    }

    return llamarAppsScript("resultados", { tipo });
  }

  async function apiObtenerRanking(pollaId) {
    if (API_MODE === "node") {
      return llamarNodeApi(`/api/ranking?pollaId=${encodeURIComponent(pollaId)}`);
    }

    return llamarAppsScript("ranking", { polla: pollaId });
  }

  async function apiObtenerDetallePartido(pollaId, partidoId, tipo) {
    if (API_MODE === "node") {
      return llamarNodeApi(
        `/api/detalle-partido?pollaId=${encodeURIComponent(pollaId)}&partidoId=${encodeURIComponent(partidoId)}&tipo=${encodeURIComponent(tipo)}`
      );
    }

    return llamarAppsScript("detallePartido", {
      idPolla: pollaId,
      partidoId,
      tipo
    });
  }

  global.PollaApiClient = {
    API_MODE,
    NODE_API_BASE_URL,
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
