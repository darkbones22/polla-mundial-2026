// =======================
// CONFIGURACI?N GENERAL
// =======================

const equipos = {
  // Grupo A
  A1: "México", 
  A2: "Sudáfrica", 
  A3: "Corea del Sur", 
  A4: "República Checa",

  // Grupo B
  B1: "Canadá", 
  B2: "Bosnia y Herzegovina", 
  B3: "Catar", 
  B4: "Suiza",

  // Grupo C
  C1: "Brasil", 
  C2: "Marruecos", 
  C3: "Haití", 
  C4: "Escocia",

  // Grupo D
  D1: "EE.UU.", 
  D2: "Paraguay", 
  D3: "Australia", 
  D4: "Turquía",

  // Grupo E
  E1: "Alemania", 
  E2: "Curazao", 
  E3: "Costa de Marfil", 
  E4: "Ecuador",

  // Grupo F
  F1: "Países Bajos", 
  F2: "Japón", 
  F3: "Suecia", 
  F4: "Túnez",

  // Grupo G
  G1: "Bélgica", 
  G2: "Egipto", 
  G3: "Irán", 
  G4: "Nueva Zelanda",

  // Grupo H
  H1: "España", 
  H2: "Cabo Verde", 
  H3: "Arabia Saudí", 
  H4: "Uruguay",

  // Grupo I
  I1: "Francia", 
  I2: "Senegal", 
  I3: "Irak", 
  I4: "Noruega",

  // Grupo J
  J1: "Argentina", 
  J2: "Argelia", 
  J3: "Austria", 
  J4: "Jordania",

  // Grupo K
  K1: "Portugal", 
  K2: "RD Congo", 
  K3: "Uzbekistán", 
  K4: "Colombia",

  // Grupo L
  L1: "Inglaterra", 
  L2: "Croacia", 
  L3: "Ghana", 
  L4: "Panamá",
};

let partidos = [
  // Grupo A
  { id: "GA1", grupo: "A", fecha: "2026-06-11", hora: "15:00", local: "A1", visita: "A2" },
  { id: "GA2", grupo: "A", fecha: "2026-06-11", hora: "22:00", local: "A3", visita: "A4" },
  { id: "GA3", grupo: "A", fecha: "2026-06-18", hora: "12:00", local: "A4", visita: "A2" },
  { id: "GA4", grupo: "A", fecha: "2026-06-18", hora: "21:00", local: "A1", visita: "A3" },
  { id: "GA5", grupo: "A", fecha: "2026-06-24", hora: "21:00", local: "A4", visita: "A1" },
  { id: "GA6", grupo: "A", fecha: "2026-06-24", hora: "21:00", local: "A2", visita: "A3" },

  // Grupo B
  { id: "GB1", grupo: "B", fecha: "2026-06-12", hora: "15:00", local: "B1", visita: "B2" },
  { id: "GB2", grupo: "B", fecha: "2026-06-13", hora: "15:00", local: "B3", visita: "B4" },
  { id: "GB3", grupo: "B", fecha: "2026-06-18", hora: "15:00", local: "B4", visita: "B2" },
  { id: "GB4", grupo: "B", fecha: "2026-06-18", hora: "18:00", local: "B1", visita: "B3" },
  { id: "GB5", grupo: "B", fecha: "2026-06-24", hora: "15:00", local: "B4", visita: "B1" },
  { id: "GB6", grupo: "B", fecha: "2026-06-24", hora: "15:00", local: "B2", visita: "B3" },

  // Grupo C
  { id: "GC1", grupo: "C", fecha: "2026-06-13", hora: "18:00", local: "C1", visita: "C2" },
  { id: "GC2", grupo: "C", fecha: "2026-06-13", hora: "21:00", local: "C3", visita: "C4" },
  { id: "GC3", grupo: "C", fecha: "2026-06-19", hora: "18:00", local: "C4", visita: "C2" },
  { id: "GC4", grupo: "C", fecha: "2026-06-19", hora: "21:00", local: "C1", visita: "C3" },
  { id: "GC5", grupo: "C", fecha: "2026-06-24", hora: "18:00", local: "C1", visita: "C4" },
  { id: "GC6", grupo: "C", fecha: "2026-06-24", hora: "18:00", local: "C2", visita: "C3" },

  // Grupo D
  { id: "GD1", grupo: "D", fecha: "2026-06-12", hora: "21:00", local: "D1", visita: "D2" },
  { id: "GD2", grupo: "D", fecha: "2026-06-13", hora: "00:00", local: "D3", visita: "D4" },
  { id: "GD3", grupo: "D", fecha: "2026-06-19", hora: "15:00", local: "D1", visita: "D3" },
  { id: "GD4", grupo: "D", fecha: "2026-06-19", hora: "00:00", local: "D4", visita: "D2" },
  { id: "GD5", grupo: "D", fecha: "2026-06-25", hora: "22:00", local: "D4", visita: "D1" },
  { id: "GD6", grupo: "D", fecha: "2026-06-25", hora: "22:00", local: "D2", visita: "D3" },

  // Grupo E
  { id: "GE1", grupo: "E", fecha: "2026-06-14", hora: "13:00", local: "E1", visita: "E2" },
  { id: "GE2", grupo: "E", fecha: "2026-06-14", hora: "19:00", local: "E3", visita: "E4" },
  { id: "GE3", grupo: "E", fecha: "2026-06-20", hora: "16:00", local: "E1", visita: "E3" },
  { id: "GE4", grupo: "E", fecha: "2026-06-20", hora: "22:00", local: "E4", visita: "E2" },
  { id: "GE5", grupo: "E", fecha: "2026-06-25", hora: "16:00", local: "E2", visita: "E3" },
  { id: "GE6", grupo: "E", fecha: "2026-06-25", hora: "16:00", local: "E4", visita: "E1" },

  // Grupo F
  { id: "GF1", grupo: "F", fecha: "2026-06-14", hora: "16:00", local: "F1", visita: "F2" },
  { id: "GF2", grupo: "F", fecha: "2026-06-14", hora: "22:00", local: "F3", visita: "F4" },
  { id: "GF3", grupo: "F", fecha: "2026-06-20", hora: "13:00", local: "F1", visita: "F3" },
  { id: "GF4", grupo: "F", fecha: "2026-06-20", hora: "00:00", local: "F4", visita: "F2" },
  { id: "GF5", grupo: "F", fecha: "2026-06-25", hora: "19:00", local: "F2", visita: "F3" },
  { id: "GF6", grupo: "F", fecha: "2026-06-25", hora: "19:00", local: "F4", visita: "F1" },

  // Grupo G
  { id: "GG1", grupo: "G", fecha: "2026-06-15", hora: "15:00", local: "G1", visita: "G2" },
  { id: "GG2", grupo: "G", fecha: "2026-06-15", hora: "21:00", local: "G3", visita: "G4" },
  { id: "GG3", grupo: "G", fecha: "2026-06-21", hora: "15:00", local: "G1", visita: "G3" },
  { id: "GG4", grupo: "G", fecha: "2026-06-21", hora: "21:00", local: "G4", visita: "G2" },
  { id: "GG5", grupo: "G", fecha: "2026-06-26", hora: "23:00", local: "G2", visita: "G3" },
  { id: "GG6", grupo: "G", fecha: "2026-06-26", hora: "23:00", local: "G4", visita: "G1" },

  // Grupo H
  { id: "GH1", grupo: "H", fecha: "2026-06-15", hora: "12:00", local: "H1", visita: "H2" },
  { id: "GH2", grupo: "H", fecha: "2026-06-15", hora: "18:00", local: "H3", visita: "H4" },
  { id: "GH3", grupo: "H", fecha: "2026-06-21", hora: "12:00", local: "H1", visita: "H3" },
  { id: "GH4", grupo: "H", fecha: "2026-06-21", hora: "18:00", local: "H4", visita: "H2" },
  { id: "GH5", grupo: "H", fecha: "2026-06-26", hora: "20:00", local: "H2", visita: "H3" },
  { id: "GH6", grupo: "H", fecha: "2026-06-26", hora: "20:00", local: "H4", visita: "H1" },

  // Grupo I
  { id: "GI1", grupo: "I", fecha: "2026-06-16", hora: "15:00", local: "I1", visita: "I2" },
  { id: "GI2", grupo: "I", fecha: "2026-06-16", hora: "18:00", local: "I3", visita: "I4" },
  { id: "GI3", grupo: "I", fecha: "2026-06-22", hora: "17:00", local: "I1", visita: "I3" },
  { id: "GI4", grupo: "I", fecha: "2026-06-22", hora: "20:00", local: "I4", visita: "I2" },
  { id: "GI5", grupo: "I", fecha: "2026-06-26", hora: "15:00", local: "I2", visita: "I3" },
  { id: "GI6", grupo: "I", fecha: "2026-06-26", hora: "15:00", local: "I4", visita: "I1" },

  // Grupo J
  { id: "GJ1", grupo: "J", fecha: "2026-06-16", hora: "21:00", local: "J1", visita: "J2" },
  { id: "GJ2", grupo: "J", fecha: "2026-06-16", hora: "00:00", local: "J3", visita: "J4" },
  { id: "GJ3", grupo: "J", fecha: "2026-06-22", hora: "13:00", local: "J1", visita: "J3" },
  { id: "GJ4", grupo: "J", fecha: "2026-06-22", hora: "23:00", local: "J4", visita: "J2" },
  { id: "GJ5", grupo: "J", fecha: "2026-06-27", hora: "22:00", local: "J2", visita: "J3" },
  { id: "GJ6", grupo: "J", fecha: "2026-06-27", hora: "22:00", local: "J4", visita: "J1" },

  // Grupo K
  { id: "GK1", grupo: "K", fecha: "2026-06-17", hora: "13:00", local: "K1", visita: "K2" },
  { id: "GK2", grupo: "K", fecha: "2026-06-17", hora: "22:00", local: "K3", visita: "K4" },
  { id: "GK3", grupo: "K", fecha: "2026-06-23", hora: "13:00", local: "K1", visita: "K3" },
  { id: "GK4", grupo: "K", fecha: "2026-06-23", hora: "22:00", local: "K4", visita: "K2" },
  { id: "GK5", grupo: "K", fecha: "2026-06-27", hora: "19:30", local: "K2", visita: "K3" },
  { id: "GK6", grupo: "K", fecha: "2026-06-27", hora: "19:30", local: "K4", visita: "K1" },

  // Grupo L
  { id: "GL1", grupo: "L", fecha: "2026-06-17", hora: "16:00", local: "L1", visita: "L2" },
  { id: "GL2", grupo: "L", fecha: "2026-06-17", hora: "19:00", local: "L3", visita: "L4" },
  { id: "GL3", grupo: "L", fecha: "2026-06-23", hora: "16:00", local: "L1", visita: "L3" },
  { id: "GL4", grupo: "L", fecha: "2026-06-23", hora: "19:00", local: "L4", visita: "L2" },
  { id: "GL5", grupo: "L", fecha: "2026-06-27", hora: "17:00", local: "L2", visita: "L3" },
  { id: "GL6", grupo: "L", fecha: "2026-06-27", hora: "17:00", local: "L4", visita: "L1" },
];


// =======================
// REGLAS DE LA POLLA
// =======================

const MINUTOS_BLOQUEO_ANTES_PARTIDO = 30;
const HORAS_VISIBLES_PRONOSTICOS_GRUPOS = 24;
const TOTAL_PARTIDOS_GRUPOS = 72;
const TOTAL_PRONOSTICOS_ELIMINACION = 32;
const CLAVE_SESION_USUARIO = "usuario";
const CLAVE_SESION_CODIGO = "codigoUsuario";
const CLAVE_SESION_ACTIVA = "sesionIniciada";
const CLAVES_SESION_ANTIGUAS_LOCALSTORAGE = [
  "usuario",
  "codigoUsuario",
  "codigo",
  "participante",
  "usuarioActual",
  "currentUser",
  "activeUser"
];
let mostrarPartidosAnterioresGrupos = false;

function limpiarClavesSesionAntiguasLocalStorage() {
  CLAVES_SESION_ANTIGUAS_LOCALSTORAGE.forEach((clave) => {
    localStorage.removeItem(clave);
  });
}

function guardarSesionActual(usuario, codigoUsuario) {
  sessionStorage.setItem(CLAVE_SESION_USUARIO, usuario);
  sessionStorage.setItem(CLAVE_SESION_CODIGO, codigoUsuario);
  sessionStorage.setItem(CLAVE_SESION_ACTIVA, "true");
  limpiarClavesSesionAntiguasLocalStorage();
}

function obtenerNombreParticipanteValidado(validacionCodigo) {
  return validacionCodigo?.participante?.nombre || validacionCodigo?.nombre || "Participante";
}

function obtenerParticipanteActual() {
  return sessionStorage.getItem(CLAVE_SESION_USUARIO) || "Participante";
}

function normalizarCodigoUsuario(codigo) {
  return String(codigo || "").trim().toLowerCase().replace(/\s+/g, "");
}

function limpiarSesionActual() {
  sessionStorage.removeItem(CLAVE_SESION_USUARIO);
  sessionStorage.removeItem(CLAVE_SESION_CODIGO);
  sessionStorage.removeItem(CLAVE_SESION_ACTIVA);
  window.PollaApiClient?.limpiarTokenNode?.();
  limpiarClavesSesionAntiguasLocalStorage();
}

function apiClientEnModoNode() {
  return window.PollaApiClient?.API_MODE === "node";
}

function tieneTokenNode() {
  const tokenPresente = Boolean(sessionStorage.getItem("polla_mundial_node_token"));

  console.info("[Sesión Node] token presente:", tokenPresente);

  return window.PollaApiClient?.tieneTokenNode
    ? window.PollaApiClient.tieneTokenNode()
    : tokenPresente;
}

function esRespuestaSesionNodeInvalida(respuesta) {
  if (!apiClientEnModoNode() || !respuesta || respuesta.ok !== false) return false;

  const error = String(respuesta.error || respuesta.mensaje || "").toLowerCase();

  return respuesta.status === 401 ||
    error.includes("401") ||
    error.includes("unauthorized") ||
    error.includes("token") ||
    error.includes("sesion invalid") ||
    error.includes("sesión inválid") ||
    error.includes("expirad");
}

function manejarSesionNodeInvalida() {
  limpiarSesionActual();
  usuarioAdminActual = false;
  actualizarVisibilidadAdmin(null);

  document.getElementById("appView")?.classList.add("hidden");
  document.getElementById("loginView")?.classList.remove("hidden");
  document.getElementById("codigoUsuario").value = "";
  limpiarInfoPollas();

  alert("Sesión inválida o expirada. Vuelve a iniciar sesión.");
}

function escapeHTML(texto) {
  return String(texto ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function esBanderaVerdadera(valor) {
  return valor === true || valor === "true" || valor === 1 || valor === "1";
}

function estaBloqueado(partido) {
  const inicioPartido = new Date(`${partido.fecha}T${partido.hora}:00`);
  const limiteEdicion = new Date(
    inicioPartido.getTime() - MINUTOS_BLOQUEO_ANTES_PARTIDO * 60 * 1000
  );

  return new Date() >= limiteEdicion;
}

// =======================
// MOSTRAR PARTIDOS
// =======================

const contenedorPartidos = document.getElementById("partidos");
const contenedorResultados = document.getElementById("resultadosGrupos");
let resultadosGrupos = {};
let resultadosEliminacion = {};
let detalleResultadoAbierto = "";
let mostrarResultadosAnteriores = false;

function obtenerFechaISO(valor) {
  const texto = String(valor || "").trim();

  if (!texto) return "";

  return texto.includes("T")
    ? texto.split("T")[0]
    : texto.split(" ")[0];
}

function obtenerHoraISO(valor) {
  const texto = String(valor || "").trim();

  if (!texto) return "";

  const parteHora = texto.includes("T")
    ? texto.split("T")[1]
    : texto.includes(" ")
      ? texto.split(" ")[1]
      : texto;

  return String(parteHora || "").slice(0, 5);
}

function crearFechaLocal(fecha) {
  const fechaLimpia = obtenerFechaISO(fecha);

  if (!fechaLimpia) return null;

  const fechaObj = new Date(`${fechaLimpia}T00:00:00`);

  return Number.isNaN(fechaObj.getTime()) ? null : fechaObj;
}

function obtenerFechaHoraPartido(partido) {
  if (partido.fecha && partido.hora) {
    return new Date(`${obtenerFechaISO(partido.fecha)}T${obtenerHoraISO(partido.hora) || "00:00"}:00`);
  }

  if (partido.fechaHora) {
    const fecha = obtenerFechaISO(partido.fechaHora);
    const hora = obtenerHoraISO(partido.fechaHora) || "00:00";

    return new Date(`${fecha}T${hora}:00`);
  }

  return new Date(`${obtenerFechaISO(partido.fecha)}T${obtenerHoraISO(partido.hora) || "00:00"}:00`);
}

function obtenerAhoraChile() {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date());
  const mapa = Object.fromEntries(partes.map((parte) => [parte.type, parte.value]));

  return new Date(`${mapa.year}-${mapa.month}-${mapa.day}T${mapa.hour}:${mapa.minute}:${mapa.second}`);
}

function esPartidoAnteriorGrupo(partido) {
  const fechaPartido = obtenerFechaHoraPartido(partido);

  if (Number.isNaN(fechaPartido.getTime())) return false;

  const horasDesdeInicio = (obtenerAhoraChile().getTime() - fechaPartido.getTime()) / (1000 * 60 * 60);

  return horasDesdeInicio >= HORAS_VISIBLES_PRONOSTICOS_GRUPOS;
}

function separarPartidosActualesYAnteriores(partidosOrdenados) {
  return partidosOrdenados.reduce((acumulador, partido) => {
    if (esPartidoAnteriorGrupo(partido)) {
      acumulador.anteriores.push(partido);
    } else {
      acumulador.visibles.push(partido);
    }

    return acumulador;
  }, {
    visibles: [],
    anteriores: []
  });
}

function formatearFechaEncabezado(fecha) {
  const fechaObj = crearFechaLocal(fecha);

  if (!fechaObj) return "";

  const fechaTexto = fechaObj.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const fechaSinComa = fechaTexto.replace(",", "");

  return fechaSinComa.charAt(0).toUpperCase() + fechaSinComa.slice(1);
}

function obtenerEstadoVisualGrupo(partido) {
  const estado = String(partido.estado || "").trim().toLowerCase();
  const tieneResultadoFinal = resultadoGrupoFinalizadoValido(partido.id);

  if (tieneResultadoFinal) {
    return {
      bloqueado: true,
      motivo: "estado",
      clase: "finalizado",
      texto: "\uD83C\uDFC1 Finalizado"
    };
  }

  if (estado === "en vivo" || partido.enVivo) {
    return {
      bloqueado: true,
      motivo: "en-vivo",
      clase: "en-vivo",
      texto: "\uD83D\uDD34 En vivo"
    };
  }

  if (estado === "cerrado" || estado === "finalizado" || estaBloqueado(partido)) {
    return {
      bloqueado: true,
      motivo: estado === "cerrado" || estado === "finalizado" ? "estado" : "horario",
      clase: "bloqueado",
      texto: "\uD83D\uDD12 Cerrado"
    };
  }

  return {
    bloqueado: false,
    motivo: "disponible",
    clase: "disponible",
    texto: "\u2705 Disponible"
  };
}

function obtenerEstadoVisualEliminacion(partido, bloqueadoPorHora) {
  const estado = String(partido.estado || "").trim().toLowerCase();
  const resultadoFinalizado = resultadoEliminacionFinalizadoValido(partido.id);

  if (resultadoFinalizado) {
    return {
      bloqueado: true,
      clase: "finalizado",
      texto: "\uD83C\uDFC1 Finalizado"
    };
  }

  if (estado === "en vivo" || partido.enVivo) {
    return {
      bloqueado: true,
      clase: "en-vivo",
      texto: "\uD83D\uDD34 En vivo"
    };
  }

  if (estado === "pendiente") {
    return {
      bloqueado: true,
      clase: "pendiente",
      texto: "\u23F3 Pendiente"
    };
  }

  if (estado === "cerrado" || estado === "finalizado" || bloqueadoPorHora) {
    return {
      bloqueado: true,
      clase: "bloqueado",
      texto: "\uD83D\uDD12 Cerrado"
    };
  }

  return {
    bloqueado: false,
    clase: "disponible",
    texto: "\u2705 Disponible"
  };
}

function obtenerNombreEquipo(referenciaEquipo) {
  return equipos[referenciaEquipo] || referenciaEquipo || "";
}

function guardarResultadosEnMemoria(resultados) {
  resultadosGrupos = {};

  resultados.forEach((resultado) => {
    if (!resultado.id) return;

    resultadosGrupos[resultado.id] = resultado;
  });
}

function guardarResultadosEliminacionEnMemoria(resultados) {
  resultadosEliminacion = {};

  resultados.forEach((resultado) => {
    if (!resultado.id) return;

    resultadosEliminacion[resultado.id] = resultado;
  });
}

function resultadoGrupoFinalizadoValido(partidoId) {
  const resultado = resultadosGrupos[partidoId];

  return Boolean(
    resultado &&
    String(resultado.estado || "").trim().toLowerCase() === "finalizado" &&
    resultado.golesLocalReal !== "" &&
    resultado.golesLocalReal !== null &&
    resultado.golesLocalReal !== undefined &&
    resultado.golesVisitaReal !== "" &&
    resultado.golesVisitaReal !== null &&
    resultado.golesVisitaReal !== undefined
  );
}

function resultadoEliminacionFinalizadoValido(partidoId) {
  const resultado = resultadosEliminacion[partidoId];

  return Boolean(
    resultado &&
    String(resultado.estado || "").trim().toLowerCase() === "finalizado" &&
    resultado.golesLocalReal !== "" &&
    resultado.golesLocalReal !== null &&
    resultado.golesLocalReal !== undefined &&
    resultado.golesVisitaReal !== "" &&
    resultado.golesVisitaReal !== null &&
    resultado.golesVisitaReal !== undefined
  );
}

function tieneMarcadorRealValido(partido) {
  return partido &&
    partido.golesLocalReal !== "" &&
    partido.golesLocalReal !== null &&
    partido.golesLocalReal !== undefined &&
    partido.golesVisitaReal !== "" &&
    partido.golesVisitaReal !== null &&
    partido.golesVisitaReal !== undefined;
}

function obtenerMarcadorRealPartido(partido) {
  if (!tieneMarcadorRealValido(partido)) return "";

  return `${partido.golesLocalReal} - ${partido.golesVisitaReal}`;
}

function partidoDisponibleParaPronosticar(partido) {
  return !obtenerEstadoVisualGrupo(partido).bloqueado;
}

function obtenerEstadoResultadoPartido(partido, tipo = "grupos") {
  if (!partido || !partido.id) {
    return {
      clave: "pending",
      texto: "Pendiente",
      descripcion: "El partido a\u00fan no est\u00e1 disponible o falta informaci\u00f3n.",
      accion: "Ver detalle"
    };
  }

  if (tipo === "eliminacion") {
    const resultadoFinalizado = resultadoEliminacionFinalizadoValido(partido.id);

    if (resultadoFinalizado) {
      return {
        clave: "final",
        texto: "Finalizado",
        descripcion: "El resultado real ya fue ingresado.",
        accion: "Ver detalle de puntos"
      };
    }

    if (String(partido.estado || "").trim().toLowerCase() === "en vivo" || partido.enVivo) {
      return {
        clave: "live",
        texto: "\uD83D\uDD34 En vivo",
        marcador: obtenerMarcadorRealPartido(partido),
        descripcion: "Partido en vivo. El marcador puede ser parcial.",
        accion: "Ver pron\u00f3sticos registrados"
      };
    }

    const bloqueadoPorHora = estaBloqueado({
      fecha: partido.fecha,
      hora: partido.hora
    });
    const estadoVisual = obtenerEstadoVisualEliminacion(partido, bloqueadoPorHora);

    if (!estadoVisual.bloqueado) {
      return {
        clave: "available",
        texto: "Disponible",
        descripcion: "Puedes editar tu pron\u00f3stico.",
        accion: "Ver detalle"
      };
    }

    if (String(partido.estado || "").trim().toLowerCase() === "pendiente") {
      return {
        clave: "pending",
        texto: "Pendiente",
        descripcion: "El partido a\u00fan no est\u00e1 disponible o falta informaci\u00f3n.",
        accion: "Ver detalle"
      };
    }

    return {
      clave: "closed",
      texto: "Cerrado",
      descripcion: "El partido ya no se puede editar.",
      accion: "Ver pron\u00f3sticos registrados"
    };
  }

  const resultadoFinalizado = resultadoGrupoFinalizadoValido(partido.id);

  if (resultadoFinalizado) {
    return {
      clave: "final",
      texto: "Finalizado",
      descripcion: "El resultado real ya fue ingresado.",
      accion: "Ver detalle de puntos"
    };
  }

  if (String(partido.estado || "").trim().toLowerCase() === "en vivo" || partido.enVivo) {
    return {
      clave: "live",
      texto: "\uD83D\uDD34 En vivo",
      marcador: obtenerMarcadorRealPartido(partido),
      descripcion: "Partido en vivo. El marcador puede ser parcial.",
      accion: "Ver pron\u00f3sticos registrados"
    };
  }

  if (partidoDisponibleParaPronosticar(partido)) {
    return {
      clave: "available",
      texto: "Disponible",
      descripcion: "Puedes editar tu pron\u00f3stico.",
      accion: "Ver detalle"
    };
  }

  return {
    clave: "closed",
    texto: "Cerrado",
    descripcion: "El partido ya no se puede editar.",
    accion: "Ver pron\u00f3sticos registrados"
  };
}

function obtenerClaseMarcadorResultado(resultadoFinalizado, estadoResultado) {
  if (resultadoFinalizado) return "result-score";

  if (estadoResultado.clave === "live" && estadoResultado.marcador) {
    return "result-score result-score--live";
  }

  return `result-status result-status--${estadoResultado.clave}`;
}

function obtenerPartidoResultadoCombinado(partido, tipo) {
  const resultado = tipo === "eliminacion"
    ? resultadosEliminacion[partido.id]
    : resultadosGrupos[partido.id];

  return {
    ...partido,
    ...(resultado || {})
  };
}

function obtenerEstadoItemResultado(item) {
  return obtenerEstadoResultadoPartido(
    obtenerPartidoResultadoCombinado(item.partido, item.tipo),
    item.tipo
  );
}

function crearItemsResultados(partidosGrupos, partidosEliminacion) {
  return [
    ...partidosGrupos.map((partido) => ({
      tipo: "grupos",
      partido
    })),
    ...partidosEliminacion.map((partido) => ({
      tipo: "eliminacion",
      partido
    }))
  ].sort((a, b) => {
    const diferencia = obtenerFechaHoraPartido(a.partido) - obtenerFechaHoraPartido(b.partido);

    if (diferencia !== 0) return diferencia;

    return String(a.partido.id || "").localeCompare(String(b.partido.id || ""));
  });
}

function separarResultadosActualesYAnteriores(itemsResultados) {
  const ahora = obtenerAhoraChile().getTime();
  const candidatosRecientes = [];
  const visiblesFijos = [];

  itemsResultados.forEach((item) => {
    const fechaPartido = obtenerFechaHoraPartido(item.partido);
    const estadoResultado = obtenerEstadoItemResultado(item);
    const fechaValida = !Number.isNaN(fechaPartido.getTime());
    const esFuturo = fechaValida && fechaPartido.getTime() > ahora;
    const visibleFijo = estadoResultado.clave === "live" ||
      estadoResultado.clave === "available" ||
      esFuturo;

    if (visibleFijo) {
      visiblesFijos.push(item);
      return;
    }

    candidatosRecientes.push(item);
  });

  const recientes = [...candidatosRecientes]
    .sort((a, b) => obtenerFechaHoraPartido(b.partido) - obtenerFechaHoraPartido(a.partido))
    .slice(0, 3);
  const clavesRecientes = new Set(recientes.map((item) => `${item.tipo}:${item.partido.id}`));

  return itemsResultados.reduce((acumulador, item) => {
    const clave = `${item.tipo}:${item.partido.id}`;

    if (clavesRecientes.has(clave) || visiblesFijos.includes(item)) {
      acumulador.visibles.push(item);
    } else {
      acumulador.anteriores.push(item);
    }

    return acumulador;
  }, {
    visibles: [],
    anteriores: []
  });
}

function ordenarPartidosPorFechaHora(listaPartidos) {
  return [...listaPartidos].sort((a, b) => {
    const fechaA = obtenerFechaHoraPartido(a);
    const fechaB = obtenerFechaHoraPartido(b);
    const diferenciaFechaHora = fechaA - fechaB;

    if (diferenciaFechaHora !== 0) return diferenciaFechaHora;

    return String(a.id || "").localeCompare(String(b.id || ""));
  });
}

function renderizarListaPartidosGrupos(listaPartidos, contenedor) {
  let fechaActual = "";

  listaPartidos.forEach((partido) => {
    if (!partido || !partido.id) {
      console.warn("[Grupos] partido sin id, omitido:", partido);
      return;
    }

    if (partido.fecha !== fechaActual) {
      fechaActual = partido.fecha;

      const tituloFecha = document.createElement("h2");
      tituloFecha.className = "date-title";
      tituloFecha.textContent = formatearFechaEncabezado(fechaActual);
      contenedor.appendChild(tituloFecha);
    }

    const estadoVisual = obtenerEstadoVisualGrupo(partido);
    const bloqueado = estadoVisual.bloqueado;
    const fechaSegura = escapeHTML(formatearFecha(partido.fecha));
    const horaSegura = escapeHTML(partido.hora);
    const grupoSeguro = escapeHTML(partido.grupo);
    const localSeguro = escapeHTML(obtenerNombreEquipo(partido.local));
    const visitaSeguro = escapeHTML(obtenerNombreEquipo(partido.visita));
    const partidoIdSeguro = escapeHTML(partido.id);

    const tarjeta = document.createElement("article");
    tarjeta.className = bloqueado
      ? "match-card group-prediction-card locked partido-bloqueado"
      : "match-card group-prediction-card";

    tarjeta.innerHTML = `
      <div class="match-info">
        <span class="group-badge">Grupo ${grupoSeguro}</span>
        ${fechaSegura} &middot; ${horaSegura} hrs
      </div>

      <div class="match-row">
        <div class="team local">${localSeguro}</div>

        <input 
          class="score-input" 
          type="number" 
          min="0" 
          data-score="local"
          id="${partidoIdSeguro}_local"
          placeholder="0"
          ${bloqueado ? "disabled" : ""}
        />

        <div class="separator">-</div>

        <input 
          class="score-input" 
          type="number" 
          min="0" 
          data-score="visita"
          id="${partidoIdSeguro}_visita"
          placeholder="0"
          ${bloqueado ? "disabled" : ""}
        />

        <div class="team visitante">${visitaSeguro}</div>
      </div>

      <div class="match-status ${estadoVisual.clase}">
        ${escapeHTML(estadoVisual.texto)}
      </div>
    `;

    const inputLocal = tarjeta.querySelector('[data-score="local"]');
    const inputVisita = tarjeta.querySelector('[data-score="visita"]');

    if (!inputLocal || !inputVisita) {
      console.warn("[Grupos] no se pudieron crear inputs para partido:", partido);
      return;
    }

    inputLocal.value = localStorage.getItem(crearClavePronostico(partido.id, "local")) || "";
    inputVisita.value = localStorage.getItem(crearClavePronostico(partido.id, "visita")) || "";

    if (!bloqueado) {
        inputLocal.addEventListener("input", () => {
            localStorage.setItem(crearClavePronostico(partido.id, "local"), inputLocal.value);
            actualizarContadorPronosticos();
        });

        inputVisita.addEventListener("input", () => {
            localStorage.setItem(crearClavePronostico(partido.id, "visita"), inputVisita.value);
            actualizarContadorPronosticos();
        });
    }

    contenedor.appendChild(tarjeta);
  });
}

function renderizarPartidosAnterioresGrupos(partidosAnteriores) {
  if (partidosAnteriores.length === 0) return;

  const seccion = document.createElement("section");
  seccion.className = "previous-matches-section";

  const boton = document.createElement("button");
  boton.className = "previous-matches-toggle";
  boton.type = "button";
  boton.setAttribute("aria-expanded", mostrarPartidosAnterioresGrupos ? "true" : "false");
  boton.textContent = `${mostrarPartidosAnterioresGrupos ? "Ocultar" : "Ver"} partidos anteriores (${partidosAnteriores.length})`;

  const panel = document.createElement("div");
  panel.className = "previous-matches-panel";
  panel.classList.toggle("hidden", !mostrarPartidosAnterioresGrupos);

  if (mostrarPartidosAnterioresGrupos) {
    renderizarListaPartidosGrupos(partidosAnteriores, panel);
  }

  boton.addEventListener("click", () => {
    mostrarPartidosAnterioresGrupos = !mostrarPartidosAnterioresGrupos;
    renderizarPartidos();
  });

  seccion.appendChild(boton);
  seccion.appendChild(panel);
  contenedorPartidos.appendChild(seccion);
}

function renderizarPartidos() {
  if (!contenedorPartidos) {
    console.error("[Grupos] No existe el contenedor #partidos.");
    return;
  }

  contenedorPartidos.innerHTML = "";

  const partidosOrdenados = ordenarPartidosPorFechaHora(partidos);

  if (partidosOrdenados.length === 0) {
    contenedorPartidos.innerHTML = `
      <div class="empty-state">
        No hay partidos cargados por ahora.
      </div>
    `;
    return;
  }

  const { visibles, anteriores } = separarPartidosActualesYAnteriores(partidosOrdenados);

  if (visibles.length === 0) {
    contenedorPartidos.innerHTML = `
      <div class="empty-state">
        No hay partidos actuales o proximos para mostrar.
      </div>
    `;
  } else {
    renderizarListaPartidosGrupos(visibles, contenedorPartidos);
  }

  renderizarPartidosAnterioresGrupos(anteriores);
}

function renderizarResultadosGruposLegacy() {
  if (!contenedorResultados) return;

  contenedorResultados.innerHTML = "";

  const partidosResultados = ordenarPartidosPorFechaHora(partidos);
  const llavesResultados = obtenerLlavesEliminacionParaResultados();

  if (partidosResultados.length === 0 && llavesResultados.length === 0) {
    contenedorResultados.innerHTML = `
      <div class="empty-state">
        Todavía no hay resultados disponibles.
      </div>
    `;
    return;
  }

  partidosResultados.forEach((partido) => {
    const resultado = resultadosGrupos[partido.id];
    const partidoResultado = {
      ...partido,
      ...(resultado || {})
    };
    const resultadoFinalizado = resultadoGrupoFinalizadoValido(partido.id);
    const estadoResultado = obtenerEstadoResultadoPartido(partidoResultado, "grupos");

    const marcador = resultadoFinalizado
      ? `${escapeHTML(resultado.golesLocalReal)} - ${escapeHTML(resultado.golesVisitaReal)}`
      : estadoResultado.marcador || estadoResultado.texto;

    const grupoSeguro = escapeHTML(partido.grupo);
    const fechaSegura = escapeHTML(formatearFecha(partido.fecha));
    const horaSegura = escapeHTML(partido.hora);
    const localSeguro = escapeHTML(obtenerNombreEquipo(partido.local));
    const visitaSeguro = escapeHTML(obtenerNombreEquipo(partido.visita));

    const tarjeta = document.createElement("article");
    tarjeta.className = "match-card result-card partido-bloqueado";
    tarjeta.setAttribute("role", "button");
    tarjeta.setAttribute("tabindex", "0");
    tarjeta.setAttribute("aria-expanded", detalleResultadoAbierto === obtenerClaveDetalleResultado(partido.id, "grupos") ? "true" : "false");

    tarjeta.innerHTML = `
      <div class="match-info">
        <span class="group-badge">Grupo ${grupoSeguro}</span>
        ${fechaSegura} &middot; ${horaSegura} hrs
      </div>

      <div class="result-row">
        <div class="team local">${localSeguro}</div>
        <div
          class="${obtenerClaseMarcadorResultado(resultadoFinalizado, estadoResultado)}"
          title="${escapeHTML(estadoResultado.descripcion)}"
        >${escapeHTML(marcador)}</div>
        <div class="team visitante">${visitaSeguro}</div>
      </div>

      <div class="result-hint">
        ${estadoResultado.accion}
      </div>
    `;

    contenedorResultados.appendChild(tarjeta);

    const panelDetalle = document.createElement("section");
    panelDetalle.className = "result-detail-panel hidden";
    panelDetalle.id = obtenerIdPanelDetalleResultado(partido.id, "grupos");
    contenedorResultados.appendChild(panelDetalle);

    const alternarDetalle = () => {
      manejarClickDetalleResultado(partido, "grupos");
    };

    tarjeta.addEventListener("click", alternarDetalle);
    tarjeta.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        alternarDetalle();
      }
    });
  });

  renderizarResultadosEliminacion(llavesResultados);
}

function renderizarItemResultado(item, destino = contenedorResultados) {
  if (item.tipo === "eliminacion") {
    renderizarTarjetaResultadoEliminacion(item.partido, destino);
    return;
  }

  renderizarTarjetaResultadoGrupo(item.partido, destino);
}

function renderizarItemsResultados(itemsResultados, destino = contenedorResultados) {
  let rondaActual = "";

  itemsResultados.forEach((item) => {
    try {
      if (item.tipo === "eliminacion" && item.partido.ronda !== rondaActual) {
        rondaActual = item.partido.ronda;

        const tituloRonda = document.createElement("h2");
        tituloRonda.className = "group-title";
        tituloRonda.textContent = rondaActual;
        destino.appendChild(tituloRonda);
      }

      renderizarItemResultado(item, destino);
    } catch (error) {
      console.error("[Resultados] error al renderizar partido:", item, error);
    }
  });
}

function renderizarResultadosAnteriores(itemsAnteriores) {
  if (!contenedorResultados || itemsAnteriores.length === 0) return;

  const seccion = document.createElement("section");
  seccion.className = "previous-matches-section previous-results-section";

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "previous-matches-toggle previous-results-toggle";
  boton.textContent = `${mostrarResultadosAnteriores ? "Ocultar" : "Ver"} resultados anteriores (${itemsAnteriores.length})`;

  const panel = document.createElement("div");
  panel.className = "previous-matches-panel previous-results-panel";
  panel.classList.toggle("hidden", !mostrarResultadosAnteriores);

  if (mostrarResultadosAnteriores) {
    renderizarItemsResultados(itemsAnteriores, panel);
  }

  boton.addEventListener("click", () => {
    mostrarResultadosAnteriores = !mostrarResultadosAnteriores;
    renderizarResultadosGrupos();
  });

  seccion.appendChild(boton);
  seccion.appendChild(panel);
  contenedorResultados.appendChild(seccion);
}

function renderizarResultadosGrupos() {
  if (!contenedorResultados) return;

  try {
    contenedorResultados.innerHTML = "";

    const partidosResultados = ordenarPartidosPorFechaHora(Array.isArray(partidos) ? partidos : []);
    const llavesResultados = obtenerLlavesEliminacionParaResultados();
    const itemsResultados = crearItemsResultados(partidosResultados, llavesResultados);

    if (itemsResultados.length === 0) {
      contenedorResultados.innerHTML = `
        <div class="empty-state">
          Todavía no hay resultados disponibles.
        </div>
      `;
      return;
    }

    const { visibles, anteriores } = separarResultadosActualesYAnteriores(itemsResultados);

    renderizarResultadosAnteriores(anteriores);
    renderizarItemsResultados(visibles);
  } catch (error) {
    console.error("[Resultados] error al renderizar:", error);
    contenedorResultados.innerHTML = `
      <div class="empty-state">
        No se pudieron mostrar los resultados. Intenta recargar la página.
      </div>
    `;
  }
}

function renderizarTarjetaResultadoGrupo(partido, destino = contenedorResultados) {
  if (!partido || !partido.id) {
    console.warn("[Resultados] partido de grupos omitido por datos incompletos:", partido);
    return;
  }

  const resultado = resultadosGrupos[partido.id];
  const partidoResultado = {
    ...partido,
    ...(resultado || {})
  };
  const resultadoFinalizado = resultadoGrupoFinalizadoValido(partido.id);
  const estadoResultado = obtenerEstadoResultadoPartido(partidoResultado, "grupos");
  const marcador = resultadoFinalizado
    ? `${escapeHTML(resultado.golesLocalReal)} - ${escapeHTML(resultado.golesVisitaReal)}`
    : estadoResultado.marcador || estadoResultado.texto;
  const grupoSeguro = escapeHTML(partido.grupo);
  const fechaSegura = escapeHTML(formatearFecha(partido.fecha));
  const horaSegura = escapeHTML(partido.hora);
  const localSeguro = escapeHTML(obtenerNombreEquipo(partido.local));
  const visitaSeguro = escapeHTML(obtenerNombreEquipo(partido.visita));

  const tarjeta = document.createElement("article");
  tarjeta.className = "match-card result-card partido-bloqueado";
  tarjeta.setAttribute("role", "button");
  tarjeta.setAttribute("tabindex", "0");
  tarjeta.setAttribute("aria-expanded", detalleResultadoAbierto === obtenerClaveDetalleResultado(partido.id, "grupos") ? "true" : "false");

  tarjeta.innerHTML = `
    <div class="match-info">
      <span class="group-badge">Grupo ${grupoSeguro}</span>
      ${fechaSegura} &middot; ${horaSegura} hrs
    </div>

    <div class="result-row">
      <div class="team local">${localSeguro}</div>
      <div
        class="${obtenerClaseMarcadorResultado(resultadoFinalizado, estadoResultado)}"
        title="${escapeHTML(estadoResultado.descripcion)}"
      >${escapeHTML(marcador)}</div>
      <div class="team visitante">${visitaSeguro}</div>
    </div>

    <div class="result-hint">
      ${estadoResultado.accion}
    </div>
  `;

  destino.appendChild(tarjeta);

  const panelDetalle = document.createElement("section");
  panelDetalle.className = "result-detail-panel hidden";
  panelDetalle.id = obtenerIdPanelDetalleResultado(partido.id, "grupos");
  destino.appendChild(panelDetalle);

  const alternarDetalle = () => {
    manejarClickDetalleResultado(partido, "grupos");
  };

  tarjeta.addEventListener("click", alternarDetalle);
  tarjeta.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      alternarDetalle();
    }
  });
}

function cerrarDetallesResultado() {
  document.querySelectorAll(".result-detail-panel").forEach((panel) => {
    panel.classList.add("hidden");
    panel.innerHTML = "";
  });

  document.querySelectorAll(".result-card").forEach((tarjeta) => {
    tarjeta.classList.remove("active");
    tarjeta.setAttribute("aria-expanded", "false");
  });
}

function obtenerClaveDetalleResultado(partidoId, tipo = "grupos") {
  return `${tipo}_${partidoId}`;
}

function obtenerIdPanelDetalleResultado(partidoId, tipo = "grupos") {
  return `detalle_${tipo}_${partidoId}`;
}

function obtenerPanelDetalleResultado(partidoId, tipo = "grupos") {
  return document.getElementById(obtenerIdPanelDetalleResultado(partidoId, tipo));
}

function marcarTarjetaResultadoActiva(partidoId, tipo = "grupos") {
  document.querySelectorAll(".result-card").forEach((tarjeta) => {
    tarjeta.classList.remove("active");
    tarjeta.setAttribute("aria-expanded", "false");
  });

  const panel = obtenerPanelDetalleResultado(partidoId, tipo);
  const tarjeta = panel ? panel.previousElementSibling : null;

  if (tarjeta) {
    tarjeta.classList.add("active");
    tarjeta.setAttribute("aria-expanded", "true");
  }
}

async function manejarClickDetalleResultado(partido, tipo = "grupos") {
  const panel = obtenerPanelDetalleResultado(partido.id, tipo);
  const claveDetalle = obtenerClaveDetalleResultado(partido.id, tipo);

  if (!panel) return;

  if (detalleResultadoAbierto === claveDetalle && !panel.classList.contains("hidden")) {
    detalleResultadoAbierto = "";
    cerrarDetallesResultado();
    return;
  }

  detalleResultadoAbierto = claveDetalle;
  cerrarDetallesResultado();
  marcarTarjetaResultadoActiva(partido.id, tipo);
  panel.classList.remove("hidden");

  const idPolla = obtenerPollaGlobalSeleccionada();

  if (!idPolla) {
    panel.innerHTML = `
      <div class="result-detail-message">
        Selecciona una polla para ver el detalle de puntos.
      </div>
    `;
    return;
  }

  panel.innerHTML = `
    <div class="result-detail-message">
      Cargando detalle de puntos...
    </div>
  `;

  try {
    const respuesta = await cargarDetallePartidoConServidor(partido.id, tipo);

    if (!respuesta.ok) {
      panel.innerHTML = `
        <div class="result-detail-message error">
          ${escapeHTML(respuesta.error || "No se pudo cargar el detalle.")}
        </div>
      `;
      return;
    }

    respuesta.partido = {
      ...(respuesta.partido || {}),
      local: (respuesta.partido && respuesta.partido.local) || partido.local,
      visita: (respuesta.partido && respuesta.partido.visita) || partido.visita,
      localPlaceholder: (respuesta.partido && respuesta.partido.localPlaceholder) || partido.localPlaceholder,
      visitaPlaceholder: (respuesta.partido && respuesta.partido.visitaPlaceholder) || partido.visitaPlaceholder,
      grupo: (respuesta.partido && respuesta.partido.grupo) || partido.grupo,
      ronda: (respuesta.partido && respuesta.partido.ronda) || partido.ronda,
      fecha: (respuesta.partido && respuesta.partido.fecha) || partido.fecha,
      hora: (respuesta.partido && respuesta.partido.hora) || partido.hora
    };

    mostrarDetallePartido(panel, respuesta);
  } catch (error) {
    panel.innerHTML = `
      <div class="result-detail-message error">
        ${escapeHTML(error.message || "No se pudo cargar el detalle.")}
      </div>
    `;
  }
}

function obtenerTextoDetallePuntos(participante) {
  if (participante.sinPronostico) {
    return "Sin pron\u00f3stico";
  }

  const pronostico = participante.pronostico || {};
  const golesLocal = pronostico.golesLocal ?? "";
  const golesVisita = pronostico.golesVisita ?? "";
  const clasifica = pronostico.clasifica ? ` \u00b7 Clasifica: ${pronostico.clasifica}` : "";

  return `Pron\u00f3stico: ${golesLocal} - ${golesVisita}${clasifica}`;
}

function obtenerTextoPronosticoPropio(pronostico, partido) {
  if (!pronostico) {
    return "A\u00fan no has ingresado tu pron\u00f3stico para este partido.";
  }

  const golesLocal = pronostico.golesLocal ?? "";
  const golesVisita = pronostico.golesVisita ?? "";
  const clasifica = pronostico.clasifica || (
    pronostico.clasificadoLado === "local"
      ? partido.local || partido.localPlaceholder || ""
      : pronostico.clasificadoLado === "visita"
        ? partido.visita || partido.visitaPlaceholder || ""
        : ""
  );
  const textoClasifica = clasifica ? ` \u00b7 Clasifica: ${clasifica}` : "";

  return `Tu pron\u00f3stico: ${golesLocal} - ${golesVisita}${textoClasifica}`;
}

function mostrarDetallePartido(panel, respuesta) {
  const partido = respuesta.partido || {};
  const participantes = respuesta.participantes || [];
  const resultadoFinalizado = respuesta.resultadoFinalizado !== false;
  const puntajeProvisorio = Boolean(respuesta.puntajeProvisorio);
  const estadoDetalle = String(respuesta.estadoDetalle || "").toLowerCase();
  const avisoPendiente = resultadoFinalizado
    ? ""
    : puntajeProvisorio
      ? `
        <p class="result-detail-note match-detail--live">
          Puntaje provisorio. Puede cambiar cuando finalice el partido.
        </p>
      `
      : `
        <p class="result-detail-note match-detail--closed">
          Pron\u00f3sticos registrados. Los puntos se calcular\u00e1n cuando el resultado sea final.
        </p>
      `;

  if (respuesta.pronosticosOcultos) {
    const esPendiente = estadoDetalle === "pendiente";

    panel.innerHTML = `
      <button class="result-detail-close" type="button" aria-label="Cerrar detalle">&times;</button>
      <div class="result-detail-private ${esPendiente ? "match-detail--pending" : "match-detail--available"}">
        <strong>${esPendiente
          ? "Este partido a\u00fan no est\u00e1 disponible o falta informaci\u00f3n."
          : "Este partido a\u00fan est\u00e1 abierto para pronosticar."}</strong>
        ${esPendiente
          ? ""
          : "<span>Los pron\u00f3sticos de otros participantes se mostrar\u00e1n cuando se cierre el plazo.</span>"}
        ${esPendiente
          ? ""
          : `<em>${escapeHTML(obtenerTextoPronosticoPropio(respuesta.pronosticoPropio, partido))}</em>`}
      </div>
    `;

    const botonCerrarPrivado = panel.querySelector(".result-detail-close");

    if (botonCerrarPrivado) {
      botonCerrarPrivado.addEventListener("click", (event) => {
        event.stopPropagation();
        detalleResultadoAbierto = "";
        cerrarDetallesResultado();
      });
    }

    return;
  }

  const filas = participantes.length
    ? participantes.map((participante, index) => `
        <li class="result-detail-row">
          <span class="result-detail-position">${index + 1}.</span>
          <span class="result-detail-main">
            <strong class="result-detail-name">${escapeHTML(participante.nombre)}</strong>
            <span class="result-detail-prediction">${escapeHTML(obtenerTextoDetallePuntos(participante))}</span>
          </span>
          <strong class="result-detail-points">${escapeHTML(participante.puntos || 0)} pts</strong>
        </li>`).join("")
    : `<li class="result-detail-row empty">No hay participantes activos en esta polla.</li>`;

  panel.innerHTML = `
    <button class="result-detail-close" type="button" aria-label="Cerrar detalle">&times;</button>
    ${avisoPendiente}

    <ul class="result-detail-list">
      ${filas}
    </ul>
  `;

  const botonCerrar = panel.querySelector(".result-detail-close");

  if (botonCerrar) {
    botonCerrar.addEventListener("click", (event) => {
      event.stopPropagation();
      detalleResultadoAbierto = "";
      cerrarDetallesResultado();
    });
  }
}

function formatearFecha(fecha) {
  const fechaObj = crearFechaLocal(fecha);

  if (!fechaObj) return "";

  return fechaObj.toLocaleDateString("es-CL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

// =======================
// ENVIAR PRON?STICOS
// =======================

let llavesEliminacion = [];
let tipoRankingActual = "total";
let ultimoRankingCargado = [];
let rankingIncluyeEnVivo = false;
let pollasUsuarioActual = [];
let usuarioAdminActual = false;
let adminTipoActual = "grupos";
let adminSubtabActual = "resultados";
let adminPartidosActuales = [];
let adminParticipantesActuales = [];
let adminPollasActuales = [];
let adminSubtabsInicializadas = false;
let adminCargaSubtabActual = 0;
let adminResultadoAbiertoId = "";
let mostrarAdminResultadosAnteriores = false;
let usuarioAdminExpandidoId = "";
let pollaAdminExpandidaId = "";
let mostrarFormularioCrearUsuario = false;
let mostrarFormularioCrearPolla = false;
let textoBusquedaAdminUsuarios = "";
let filtroAdminUsuarios = "";
let textoBusquedaAdminPollas = "";
let filtroAdminPollas = "";

const ESTADOS_ADMIN = ["Pendiente", "Abierto", "Cerrado", "En vivo", "Finalizado"];

function cargarPartidosConServidor() {
  return window.PollaApiClient.apiObtenerPartidosGrupos();
}

function cargarResultadosConServidor() {
  return cargarResultadosPorTipoConServidor("grupos");
}

function cargarResultadosEliminacionConServidor() {
  return cargarResultadosPorTipoConServidor("eliminacion");
}

async function cargarResultadosPorTipoConServidor(tipo) {
  console.info("[Resultados] tipo:", tipo);

  const respuesta = await window.PollaApiClient.apiObtenerResultados(tipo);

  console.info("[Resultados] respuesta:", respuesta);

  return respuesta;
}

function cargarDetallePartidoConServidor(partidoId, tipo) {
  const idPolla = obtenerPollaGlobalSeleccionada();

  if (!idPolla) {
    return Promise.reject(new Error("Selecciona una polla para ver el detalle."));
  }

  console.info("[Detalle partido] tipo:", tipo, "partidoId:", partidoId, "pollaId:", idPolla);

  return window.PollaApiClient.apiObtenerDetallePartido(idPolla, partidoId, tipo);
}

function validarCodigoConServidor(codigoUsuario) {
  return window.PollaApiClient.apiLogin(codigoUsuario);
}

async function cargarPronosticosUsuarioConServidor() {
  const idPolla = obtenerPollaGlobalSeleccionada();

  console.info("[Pronósticos] cargando pronósticos globales del usuario");

  if (!idPolla) {
    return {
      ok: false,
      error: "Selecciona una polla para cargar pronósticos."
    };
  }

  const [grupos, eliminacion] = await Promise.all([
    window.PollaApiClient.apiObtenerPronosticosGrupos(idPolla),
    window.PollaApiClient.apiObtenerPronosticosEliminacion(idPolla)
  ]);

  if (!grupos.ok) return grupos;
  if (!eliminacion.ok) return eliminacion;

  return {
    ok: true,
    pronosticos: {
      grupos: (grupos.pronosticos || []).map((pronostico) => ({
        ...pronostico,
        id: pronostico.id || pronostico.partidoId
      })),
      eliminacion: (eliminacion.pronosticos || []).map((pronostico) => {
        const partido = llavesEliminacion.find((item) => item.id === pronostico.partidoId);
        const clasifica = pronostico.clasifica || (
          pronostico.clasificadoLado === "local"
            ? partido?.local || partido?.localPlaceholder || ""
            : pronostico.clasificadoLado === "visita"
              ? partido?.visita || partido?.visitaPlaceholder || ""
              : ""
        );

        return {
          ...pronostico,
          id: pronostico.id || pronostico.partidoId,
          clasifica
        };
      })
    }
  };
}

async function guardarPronosticosConServidor(datosGuardado) {
  const tipo = datosGuardado.tipo || "grupos";
  const idPolla = obtenerPollaGlobalSeleccionada();
  const pronosticos = datosGuardado.pronosticos || [];

  console.info("[Pronósticos] guardando pronósticos globales del usuario");

  console.info("[Guardar pronósticos] usando Node/Supabase");
  console.info("[Guardar pronósticos] tipo:", tipo);

  if (!idPolla) {
    return {
      ok: false,
      error: "Selecciona una polla antes de guardar."
    };
  }

  if (tipo === "eliminacion") {
    const pronosticosEliminacion = pronosticos.map((pronostico) => ({
      ...pronostico,
      clasificadoLado: pronostico.clasificadoLado || (
        pronostico.clasifica === pronostico.local
          ? "local"
          : pronostico.clasifica === pronostico.visita
            ? "visita"
            : undefined
      )
    }));

    return window.PollaApiClient.apiGuardarPronosticosEliminacion(idPolla, pronosticosEliminacion);
  }

  return window.PollaApiClient.apiGuardarPronosticosGrupos(idPolla, pronosticos);
}
function mostrarPollasDelParticipante(validacionCodigo) {
  const infoPollas = document.getElementById("infoPollas");

  if (!infoPollas) return;

  infoPollas.classList.remove("hidden", "error");

  const listaPollas = validacionCodigo.pollas
    .map((polla) => `<li>${escapeHTML(polla.nombre)}</li>`)
    .join("");

  infoPollas.innerHTML = `
    <strong>Código validado</strong>
    <div>Participas en:</div>
    <ul>${listaPollas}</ul>
  `;
}

function mostrarErrorCodigo(mensaje) {
  const infoPollas = document.getElementById("infoPollas");

  if (!infoPollas) return;

  infoPollas.classList.remove("hidden");
  infoPollas.classList.add("error");

  infoPollas.innerHTML = `
    <strong>Código no válido</strong>
    <div>${escapeHTML(mensaje)}</div>
  `;
}

function limpiarInfoPollas() {
  const infoPollas = document.getElementById("infoPollas");

  if (!infoPollas) return;

  infoPollas.classList.add("hidden");
  infoPollas.classList.remove("error");
  infoPollas.innerHTML = "";
}

async function sincronizarPronosticosUsuarioDesdeServidor(codigoUsuario) {
  try {
    const pronosticosUsuario = await cargarPronosticosUsuarioConServidor(codigoUsuario);

    if (pronosticosUsuario.ok) {
      aplicarPronosticosServidorEnLocalStorage(
        pronosticosUsuario.pronosticos,
        codigoUsuario
      );

      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
}

async function iniciarSesion() {
  console.info("[Login] usando solo código");

  const btnIngresar = document.getElementById("btnIngresar");

  if (btnIngresar?.disabled) {
    return;
  }

  const codigoUsuario = normalizarCodigoUsuario(document.getElementById("codigoUsuario").value);

  console.info("[Login] código ingresado:", codigoUsuario);

  if (!codigoUsuario) {
    alert("Ingresa tu código de participante.");
    return;
  }

  btnIngresar.disabled = true;
  btnIngresar.textContent = "Validando código...";

  let validacionCodigo;

  try {
    validacionCodigo = await validarCodigoConServidor(codigoUsuario);
  } catch (error) {
    mostrarErrorCodigo("No se pudo validar el código. Intenta nuevamente.");
    btnIngresar.disabled = false;
    btnIngresar.textContent = "Ingresar";
    return;
  }

  if (!validacionCodigo.ok) {
    mostrarErrorCodigo(validacionCodigo.error);
    btnIngresar.disabled = false;
    btnIngresar.textContent = "Ingresar";
    return;
  }

  const usuario = obtenerNombreParticipanteValidado(validacionCodigo);

  guardarSesionActual(usuario, codigoUsuario);

  btnIngresar.textContent = "Cargando pronósticos... ⏳";

  mostrarPollasDelParticipante(validacionCodigo);
  abrirApp(validacionCodigo);
  await sincronizarPronosticosUsuarioDesdeServidor(codigoUsuario);
  recargarPronosticosGruposDesdeLocalStorage();
  recargarPronosticosEliminacionDesdeLocalStorage();
  actualizarContadorPronosticos();
  actualizarContadorEliminacion();

  btnIngresar.disabled = false;
  btnIngresar.textContent = "Ingresar";
}

function abrirApp(validacionCodigo) {
  const usuario = obtenerNombreParticipanteValidado(validacionCodigo);
  const codigoUsuario = normalizarCodigoUsuario(document.getElementById("codigoUsuario").value);

  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("appView").classList.remove("hidden");

  guardarSesionActual(usuario, codigoUsuario);
  document.getElementById("usuarioActivo").textContent = `Hola, ${usuario} · Código: ${codigoUsuario}`;

  mostrarResumenPollas(validacionCodigo.pollas);
  llenarSelectorPollaGlobal(validacionCodigo.pollas);
  llenarSelectorRanking(validacionCodigo.pollas);
  actualizarVisibilidadAdmin(validacionCodigo);
  mostrarSeccion("pronosticos");
  recargarPronosticosGruposDesdeLocalStorage();
  recargarPronosticosEliminacionDesdeLocalStorage();
  actualizarContadorPronosticos();
}

function obtenerSesionGuardada() {
  const sesionActiva = sessionStorage.getItem(CLAVE_SESION_ACTIVA) === "true";
  const usuarioGuardado = sessionStorage.getItem(CLAVE_SESION_USUARIO) || "";
  const codigoGuardado = sessionStorage.getItem(CLAVE_SESION_CODIGO) || "";

  if (!sesionActiva || !codigoGuardado.trim()) return null;

  if (apiClientEnModoNode() && !tieneTokenNode()) {
    console.warn("[Sesión Node] sesión local sin token Node, se requiere login nuevamente");
    limpiarSesionActual();
    return null;
  }

  return {
    usuario: usuarioGuardado.trim(),
    codigo: normalizarCodigoUsuario(codigoGuardado)
  };
}

async function iniciarSesionGuardada() {
  const sesionGuardada = obtenerSesionGuardada();

  if (!sesionGuardada) return false;

  const btnIngresar = document.getElementById("btnIngresar");
  const inputCodigoUsuario = document.getElementById("codigoUsuario");

  inputCodigoUsuario.value = sesionGuardada.codigo;

  btnIngresar.disabled = true;
  btnIngresar.textContent = "Cargando pronósticos... ⏳";

  try {
    const validacionCodigo = await validarCodigoConServidor(sesionGuardada.codigo);

    if (!validacionCodigo.ok) {
      limpiarSesionActual();
      inputCodigoUsuario.value = "";
      document.getElementById("loginView").classList.remove("hidden");
      btnIngresar.disabled = false;
      btnIngresar.textContent = "Ingresar";
      return false;
    }

    mostrarPollasDelParticipante(validacionCodigo);
    abrirApp(validacionCodigo);
    await sincronizarPronosticosUsuarioDesdeServidor(sesionGuardada.codigo);
    recargarPronosticosGruposDesdeLocalStorage();
    recargarPronosticosEliminacionDesdeLocalStorage();
    actualizarContadorPronosticos();
    actualizarContadorEliminacion();

    return true;
  } catch (error) {
    console.error(error);
    inputCodigoUsuario.value = "";
    document.getElementById("loginView").classList.remove("hidden");
  }

  btnIngresar.disabled = false;
  btnIngresar.textContent = "Ingresar";
  return false;
}

function mostrarResumenPollas(pollas) {
  const box = document.getElementById("pollasActivasBox");

  if (!box) return;

  const lista = pollas
    .map((polla) => `<li>${escapeHTML(polla.nombre)}</li>`)
    .join("");

  box.innerHTML = `
    <strong>Participas en:</strong>
    <ul>${lista}</ul>
  `;
}

function obtenerClavePollaGlobal() {
  const codigo = obtenerCodigoActual();

  if (!codigo) {
    return "pollaSeleccionada";
  }

  return `pollaSeleccionada_${codigo}`;
}

function obtenerPollaGlobalSeleccionada() {
  const selectorGlobal = document.getElementById("selectorPollaGlobal");

  return selectorGlobal ? selectorGlobal.value : "";
}

function sincronizarSelectorRankingConGlobal() {
  const selectorRanking = document.getElementById("selectorPollaRanking");
  const idPolla = obtenerPollaGlobalSeleccionada();

  if (selectorRanking) {
    selectorRanking.value = idPolla;
  }
}

function obtenerNombrePollaPorId(idPolla) {
  const polla = pollasUsuarioActual.find((item) => item.id === idPolla);

  return polla ? polla.nombre : "Selecciona una polla";
}

function cerrarDropdownPollaGlobal() {
  const box = document.getElementById("selectorPollaGlobalBox");
  const boton = document.getElementById("selectorPollaGlobalButton");
  const menu = document.getElementById("selectorPollaGlobalMenu");

  if (box) {
    box.classList.remove("open");
  }

  if (boton) {
    boton.setAttribute("aria-expanded", "false");
  }

  if (menu) {
    menu.classList.add("hidden");
  }
}

function actualizarDropdownPollaGlobal() {
  const idPolla = obtenerPollaGlobalSeleccionada();
  const texto = document.getElementById("selectorPollaGlobalTexto");
  const opciones = document.querySelectorAll(".global-polla-option");

  if (texto) {
    texto.textContent = obtenerNombrePollaPorId(idPolla);
  }

  opciones.forEach((opcion) => {
    const seleccionada = opcion.dataset.value === idPolla;
    opcion.classList.toggle("selected", seleccionada);
    opcion.setAttribute("aria-selected", seleccionada ? "true" : "false");
  });
}

function toggleDropdownPollaGlobal(event) {
  if (event) {
    event.stopPropagation();
  }

  const box = document.getElementById("selectorPollaGlobalBox");
  const boton = document.getElementById("selectorPollaGlobalButton");
  const menu = document.getElementById("selectorPollaGlobalMenu");

  if (!box || !boton || !menu) return;

  const abrir = menu.classList.contains("hidden");

  box.classList.toggle("open", abrir);
  menu.classList.toggle("hidden", !abrir);
  boton.setAttribute("aria-expanded", abrir ? "true" : "false");
}

function seleccionarPollaGlobal(idPolla) {
  const selectorGlobal = document.getElementById("selectorPollaGlobal");

  if (!selectorGlobal) return;

  selectorGlobal.value = idPolla;
  actualizarDropdownPollaGlobal();
  cerrarDropdownPollaGlobal();
  cambiarPollaGlobal();
}

function enfocarOpcionDropdownPollaGlobal(direccion) {
  const opciones = Array.from(document.querySelectorAll(".global-polla-option"));

  if (opciones.length === 0) return;

  const indiceActual = opciones.indexOf(document.activeElement);
  const siguienteIndice = indiceActual === -1
    ? 0
    : (indiceActual + direccion + opciones.length) % opciones.length;

  opciones[siguienteIndice].focus();
}

function manejarTecladoDropdownPollaGlobal(event) {
  if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();

    const menu = document.getElementById("selectorPollaGlobalMenu");
    const estaCerrado = !menu || menu.classList.contains("hidden");

    if (estaCerrado) {
      toggleDropdownPollaGlobal(event);
    }

    const opcionActiva = document.querySelector(".global-polla-option.selected");
    const primeraOpcion = document.querySelector(".global-polla-option");
    const opcionParaEnfocar = opcionActiva || primeraOpcion;

    if (opcionParaEnfocar) {
      opcionParaEnfocar.focus();
    }
  }

  if (event.key === "Escape") {
    cerrarDropdownPollaGlobal();
  }
}

function manejarTecladoOpcionPollaGlobal(event) {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    enfocarOpcionDropdownPollaGlobal(1);
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    enfocarOpcionDropdownPollaGlobal(-1);
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    seleccionarPollaGlobal(event.currentTarget.dataset.value);
  }

  if (event.key === "Escape") {
    cerrarDropdownPollaGlobal();

    const boton = document.getElementById("selectorPollaGlobalButton");

    if (boton) {
      boton.focus();
    }
  }
}

function llenarSelectorPollaGlobal(pollas) {
  pollasUsuarioActual = pollas || [];

  const box = document.getElementById("selectorPollaGlobalBox");
  const selectorGlobal = document.getElementById("selectorPollaGlobal");
  const menu = document.getElementById("selectorPollaGlobalMenu");

  if (!box || !selectorGlobal || !menu) return;

  selectorGlobal.innerHTML = `<option value="">Selecciona una polla</option>`;
  menu.innerHTML = "";

  pollasUsuarioActual.forEach((polla) => {
    const option = document.createElement("option");
    option.value = polla.id;
    option.textContent = polla.nombre;
    selectorGlobal.appendChild(option);

    const botonOpcion = document.createElement("button");
    botonOpcion.type = "button";
    botonOpcion.className = "global-polla-option";
    botonOpcion.dataset.value = polla.id;
    botonOpcion.textContent = polla.nombre;
    botonOpcion.setAttribute("role", "option");
    botonOpcion.setAttribute("aria-selected", "false");
    botonOpcion.addEventListener("click", (event) => {
      event.stopPropagation();
      seleccionarPollaGlobal(polla.id);
    });
    botonOpcion.addEventListener("keydown", manejarTecladoOpcionPollaGlobal);
    menu.appendChild(botonOpcion);
  });

  const pollaGuardada = localStorage.getItem(obtenerClavePollaGlobal());
  const existeGuardada = pollasUsuarioActual.some((polla) => polla.id === pollaGuardada);
  const pollaInicial = existeGuardada
    ? pollaGuardada
    : (pollasUsuarioActual[0] && pollasUsuarioActual[0].id) || "";

  selectorGlobal.value = pollaInicial;

  if (pollaInicial) {
    localStorage.setItem(obtenerClavePollaGlobal(), pollaInicial);
  }

  const ocultarSelector = pollasUsuarioActual.length === 0;

  box.classList.toggle("hidden", ocultarSelector);
  box.hidden = ocultarSelector;
  box.setAttribute("aria-hidden", ocultarSelector ? "true" : "false");

  sincronizarSelectorRankingConGlobal();
  actualizarDropdownPollaGlobal();
  cerrarDropdownPollaGlobal();
}

function cambiarPollaGlobal() {
  const idPolla = obtenerPollaGlobalSeleccionada();

  console.info("[Polla] cambio de polla: solo cambia ranking/participantes, no pronósticos");

  if (idPolla) {
    localStorage.setItem(obtenerClavePollaGlobal(), idPolla);
  }

  actualizarDropdownPollaGlobal();
  sincronizarSelectorRankingConGlobal();

  const seccionRanking = document.getElementById("seccionRanking");

  if (seccionRanking && !seccionRanking.classList.contains("hidden")) {
    cargarRankingSeleccionado();
  }

  const seccionResultados = document.getElementById("seccionResultados");

  if (seccionResultados && !seccionResultados.classList.contains("hidden")) {
    detalleResultadoAbierto = "";
    renderizarResultadosGrupos();
  }
}

function esAdminValidado(validacionCodigo) {
  return esBanderaVerdadera(validacionCodigo?.participante?.esAdmin) ||
    esBanderaVerdadera(validacionCodigo?.participante?.es_admin);
}

function actualizarVisibilidadAdmin(validacionCodigo) {
  usuarioAdminActual = esAdminValidado(validacionCodigo);

  console.info("[Admin] participante:", validacionCodigo?.participante || null);
  console.info("[Admin] esAdmin:", usuarioAdminActual);

  const tabAdmin = document.getElementById("tabAdmin");
  const menuPrincipal = document.querySelector(".main-menu");
  const seccionAdmin = document.getElementById("seccionAdmin");

  if (tabAdmin) {
    tabAdmin.classList.toggle("hidden", !usuarioAdminActual);
    tabAdmin.setAttribute("aria-hidden", usuarioAdminActual ? "false" : "true");
  }

  if (menuPrincipal) {
    menuPrincipal.classList.toggle("admin-visible", usuarioAdminActual);
  }

  if (!usuarioAdminActual) {
    tabAdmin?.classList.remove("active");
    seccionAdmin?.classList.add("hidden");
  }
}

function mostrarFeedbackAdmin(mensaje, tipo = "info") {
  const feedback = document.getElementById("adminFeedback");

  if (!feedback) return;

  feedback.textContent = mensaje;
  feedback.className = `admin-feedback ${tipo}`;
  feedback.classList.toggle("hidden", !mensaje);
}

function manejarErrorAdmin(respuesta) {
  if (esRespuestaSesionNodeInvalida(respuesta)) {
    mostrarFeedbackAdmin("Sesión expirada. Vuelve a iniciar sesión.", "error");
    manejarSesionNodeInvalida();
    return true;
  }

  if (respuesta?.status === 403) {
    usuarioAdminActual = false;
    actualizarVisibilidadAdmin(null);
    mostrarFeedbackAdmin("No autorizado.", "error");
    mostrarSeccion("pronosticos");
    return true;
  }

  if (respuesta?.status === 404) {
    console.warn("[Admin] ruta no encontrada. Es probable que Render no haya redeployado las rutas admin nuevas.", respuesta);
    mostrarFeedbackAdmin("No se encontró la ruta admin. Revisa si Render ya redeployó el backend.", "error");
    return true;
  }

  return false;
}

function obtenerPollasSeleccionadasAdmin(contenedor) {
  return Array.from(contenedor.querySelectorAll(".admin-polla-check:checked"))
    .map((checkbox) => checkbox.value);
}

function obtenerOpcionesPollasAdmin(pollasSeleccionadas = []) {
  const seleccionadas = new Set(pollasSeleccionadas);

  if (adminPollasActuales.length === 0) {
    return `<p class="admin-muted">No hay pollas disponibles.</p>`;
  }

  return adminPollasActuales.map((polla) => `
    <label class="admin-checkbox-option">
      <input
        class="admin-polla-check"
        type="checkbox"
        value="${escapeHTML(polla.id)}"
        ${seleccionadas.has(polla.id) ? "checked" : ""}
      />
      <span>${escapeHTML(polla.nombre)}</span>
    </label>
  `).join("");
}

function normalizarSubseccionAdmin(seccion) {
  return ["resultados", "usuarios", "pollas"].includes(seccion) ? seccion : "resultados";
}

function obtenerConfigSubseccionesAdmin() {
  return {
    resultados: {
      boton: document.getElementById("adminSubtabResultados"),
      panel: document.getElementById("adminPanelResultados")
    },
    usuarios: {
      boton: document.getElementById("adminSubtabUsuarios"),
      panel: document.getElementById("adminPanelUsuarios")
    },
    pollas: {
      boton: document.getElementById("adminSubtabPollas"),
      panel: document.getElementById("adminPanelPollas")
    }
  };
}

function mostrarPanelAdmin(subtab) {
  const subtabNormalizada = normalizarSubseccionAdmin(subtab);
  const config = obtenerConfigSubseccionesAdmin();

  Object.entries(config).forEach(([item, elementos]) => {
    const activo = item === subtabNormalizada;

    elementos.boton?.classList.toggle("active", activo);
    elementos.boton?.setAttribute("aria-selected", activo ? "true" : "false");
    elementos.panel?.classList.toggle("hidden", !activo);
  });
}

async function cambiarSubseccionAdmin(seccion) {
  const subtab = normalizarSubseccionAdmin(seccion);
  const idCarga = adminCargaSubtabActual + 1;
  adminCargaSubtabActual = idCarga;

  console.info("[Admin] subtab:", subtab);
  console.info("[Admin] renderizando subtab:", subtab);

  if (!usuarioAdminActual) {
    mostrarFeedbackAdmin("No autorizado.", "error");
    return;
  }

  adminSubtabActual = subtab;
  mostrarPanelAdmin(subtab);

  try {
    if (subtab === "resultados") {
      await cargarAdminPartidos();
      return;
    }

    if (subtab === "usuarios") {
      await cargarAdminUsuarios();
      return;
    }

    if (subtab === "pollas") {
      await cargarAdminPollas();
    }
  } catch (error) {
    if (idCarga === adminCargaSubtabActual) {
      console.error(error);
      mostrarFeedbackAdmin("No se pudieron cargar los datos.", "error");
    }
  }
}

async function cambiarSubtabAdmin(subtab) {
  return cambiarSubseccionAdmin(subtab);
}

function inicializarSubtabsAdmin() {
  if (adminSubtabsInicializadas) return;

  const contenedor = document.querySelector(".admin-subtabs");

  if (!contenedor) return;

  adminSubtabsInicializadas = true;

  contenedor.addEventListener("click", (event) => {
    const boton = event.target.closest("[data-admin-subtab]");

    if (!boton || !contenedor.contains(boton)) return;

    event.preventDefault();

    const seccion = boton.dataset.adminSubtab;

    console.info("[Admin] click subtab:", seccion);
    cambiarSubseccionAdmin(seccion);
  });
}

async function recargarAdminUsuariosDatos() {
  const [respuestaParticipantes, respuestaPollas] = await Promise.all([
    window.PollaApiClient.apiAdminObtenerParticipantes(),
    window.PollaApiClient.apiAdminObtenerPollas()
  ]);

  console.info("[Admin Usuarios] participantes:", respuestaParticipantes);
  console.info("[Admin Usuarios] pollas:", respuestaPollas);

  if (!respuestaParticipantes.ok) {
    return {
      ok: false,
      respuesta: respuestaParticipantes,
      mensaje: "No se pudieron cargar los usuarios."
    };
  }

  if (!respuestaPollas.ok) {
    return {
      ok: false,
      respuesta: respuestaPollas,
      mensaje: "No se pudieron cargar las pollas para asignar usuarios."
    };
  }

  adminParticipantesActuales = respuestaParticipantes.participantes || [];
  adminPollasActuales = respuestaPollas.pollas || [];

  return { ok: true };
}

async function refrescarPollasUsuarioActualDesdeAdmin() {
  try {
    const respuesta = await window.PollaApiClient.apiObtenerPollas();

    if (respuesta.ok) {
      const pollas = respuesta.pollas || [];
      mostrarResumenPollas(pollas);
      llenarSelectorPollaGlobal(pollas);
      llenarSelectorRanking(pollas);
    }
  } catch (error) {
    console.error(error);
  }
}

function renderizarAdminUsuariosFormulario() {
  const contenedor = document.getElementById("adminUsuariosForm");

  if (!contenedor) return;

  const formularioCrear = mostrarFormularioCrearUsuario
    ? `
      <article class="admin-form-card" data-admin-user-id="nuevo">
        <div class="admin-form-heading compact">
          <h3>Crear usuario</h3>
          <p>El código se normaliza en minúsculas.</p>
        </div>

        <div class="admin-edit-panel">
          <div class="admin-form-grid">
            <label>
              Nombre visible
              <input class="admin-user-nombre" type="text" placeholder="Nombre Apellido" />
            </label>
            <label>
              Código
              <input class="admin-user-codigo" type="text" placeholder="codigo-1234" />
            </label>
            <label class="admin-switch">
              <input class="admin-user-activo" type="checkbox" checked />
              <span>Activo</span>
            </label>
          </div>

          <div class="admin-checkbox-group">
            <strong>Pollas asignadas</strong>
            <div class="admin-checkbox-grid">${obtenerOpcionesPollasAdmin()}</div>
          </div>

          <button class="admin-save-button" type="button" onclick="guardarAdminUsuario('nuevo')">
            Crear usuario
          </button>
        </div>
      </article>
    `
    : "";

  contenedor.innerHTML = `
    <div class="admin-list-toolbar">
      <input
        class="admin-search-input"
        type="search"
        placeholder="Buscar usuario por nombre o código"
        value="${escapeHTML(textoBusquedaAdminUsuarios)}"
        oninput="actualizarTextoBusquedaAdminUsuarios(this.value)"
        onkeydown="manejarTecladoBusquedaAdminUsuarios(event)"
      />
      <button class="admin-secondary-button" type="button" onclick="buscarAdminUsuarios()">
        Buscar
      </button>
      <button class="admin-secondary-button subtle" type="button" onclick="limpiarBusquedaAdminUsuarios()">
        Limpiar
      </button>
      <button class="admin-secondary-button" type="button" onclick="toggleCrearAdminUsuario()">
        ${mostrarFormularioCrearUsuario ? "Cerrar" : "+ Crear usuario"}
      </button>
    </div>
    ${formularioCrear}
  `;
}

function obtenerUsuariosAdminFiltrados() {
  const filtro = filtroAdminUsuarios.trim().toLowerCase();

  if (!filtro) return adminParticipantesActuales;

  return adminParticipantesActuales.filter((participante) => {
    const nombre = String(participante.nombre || "").toLowerCase();
    const codigo = String(participante.codigoLegacy || "").toLowerCase();

    return nombre.includes(filtro) || codigo.includes(filtro);
  });
}

function actualizarTextoBusquedaAdminUsuarios(valor) {
  textoBusquedaAdminUsuarios = valor || "";
}

function buscarAdminUsuarios() {
  filtroAdminUsuarios = textoBusquedaAdminUsuarios || "";
  usuarioAdminExpandidoId = "";
  renderizarAdminUsuarios();
}

function limpiarBusquedaAdminUsuarios() {
  textoBusquedaAdminUsuarios = "";
  filtroAdminUsuarios = "";
  usuarioAdminExpandidoId = "";
  renderizarAdminUsuarios();
}

function manejarTecladoBusquedaAdminUsuarios(event) {
  if (event.key !== "Enter") return;

  event.preventDefault();
  buscarAdminUsuarios();
}

function actualizarFiltroAdminUsuarios(valor) {
  textoBusquedaAdminUsuarios = valor || "";
  filtroAdminUsuarios = valor || "";
  renderizarAdminUsuarios();
}

function toggleCrearAdminUsuario() {
  mostrarFormularioCrearUsuario = !mostrarFormularioCrearUsuario;
  usuarioAdminExpandidoId = "";
  renderizarAdminUsuarios();
}

function toggleEditarAdminUsuario(id) {
  usuarioAdminExpandidoId = usuarioAdminExpandidoId === id ? "" : id;
  mostrarFormularioCrearUsuario = false;
  renderizarAdminUsuarios();
}

function renderizarAdminUsuarios() {
  renderizarAdminUsuariosFormulario();

  const contenedor = document.getElementById("adminUsuariosLista");

  if (!contenedor) return;

  if (!usuarioAdminActual) {
    contenedor.innerHTML = `<div class="admin-empty">No autorizado.</div>`;
    return;
  }

  const participantesFiltrados = obtenerUsuariosAdminFiltrados();

  if (adminParticipantesActuales.length === 0) {
    contenedor.innerHTML = `<div class="admin-empty">No hay participantes.</div>`;
    return;
  }

  if (participantesFiltrados.length === 0) {
    contenedor.innerHTML = `<div class="admin-empty">No se encontraron usuarios.</div>`;
    return;
  }

  contenedor.innerHTML = participantesFiltrados.map((participante) => {
    const pollas = participante.pollas || [];
    const pollasIds = pollas.map((polla) => polla.id);
    const expandido = usuarioAdminExpandidoId === participante.id;
    return `
      <article class="admin-entity-card compact ${expandido ? "expanded" : ""}" data-admin-user-id="${escapeHTML(participante.id)}">
        <button class="admin-entity-summary" type="button" onclick="toggleEditarAdminUsuario('${escapeHTML(participante.id)}')">
          <strong>${escapeHTML(participante.nombre || "")}</strong>
          <span class="admin-code">${escapeHTML(participante.codigoLegacy || "")}</span>
          <span class="admin-status ${participante.activo ? "active" : "inactive"}">
            ${participante.activo ? "Activo" : "Inactivo"}
          </span>
          <span class="admin-status admin-role ${participante.esAdmin ? "active" : "inactive"}">
            ${participante.esAdmin ? "Admin" : "Usuario"}
          </span>
          <span class="admin-count">${pollas.length} ${pollas.length === 1 ? "polla" : "pollas"}</span>
          <span class="admin-edit-label">${expandido ? "Cerrar" : "Editar"}</span>
        </button>

        ${expandido ? `
          <div class="admin-edit-panel">
            <div class="admin-form-grid">
              <label>
                Nombre visible
                <input class="admin-user-nombre" type="text" value="${escapeHTML(participante.nombre || "")}" />
              </label>
              <label>
                Código
                <input class="admin-user-codigo" type="text" value="${escapeHTML(participante.codigoLegacy || "")}" />
              </label>
              <label class="admin-switch">
                <input class="admin-user-activo" type="checkbox" ${participante.activo ? "checked" : ""} />
                <span>Activo</span>
              </label>
              <label class="admin-switch">
                <input
                  class="admin-user-admin"
                  type="checkbox"
                  ${participante.esAdmin ? "checked" : ""}
                  onchange="cambiarPermisoAdminUsuario('${escapeHTML(participante.id)}', this.checked)"
                />
                <span>Administrador</span>
              </label>
            </div>

            <div class="admin-checkbox-group">
              <strong>Pollas asignadas</strong>
              <div class="admin-checkbox-grid">${obtenerOpcionesPollasAdmin(pollasIds)}</div>
            </div>

            <button class="admin-save-button compact" type="button" onclick="guardarAdminUsuario('${escapeHTML(participante.id)}')">
              Guardar cambios
            </button>
          </div>
        ` : ""}
      </article>
    `;
  }).join("");
}

async function cargarAdminUsuarios() {
  if (!usuarioAdminActual) {
    mostrarFeedbackAdmin("No autorizado.", "error");
    return;
  }

  const contenedor = document.getElementById("adminUsuariosLista");

  mostrarFeedbackAdmin("Cargando usuarios...", "info");
  renderizarAdminUsuariosFormulario();
  if (contenedor) {
    contenedor.innerHTML = `<div class="admin-empty">Cargando usuarios...</div>`;
  }

  try {
    const resultadoCarga = await recargarAdminUsuariosDatos();

    if (!resultadoCarga.ok) {
      if (!manejarErrorAdmin(resultadoCarga.respuesta)) {
        mostrarFeedbackAdmin(resultadoCarga.respuesta?.error || resultadoCarga.mensaje || "No se pudieron cargar los datos.", "error");
      }
      if (contenedor) {
        contenedor.innerHTML = `<div class="admin-empty">${escapeHTML(resultadoCarga.mensaje || "No se pudieron cargar los datos.")}</div>`;
      }
      return;
    }

    mostrarFeedbackAdmin("", "info");
    renderizarAdminUsuarios();
  } catch (error) {
    console.error(error);
    mostrarFeedbackAdmin("Error al cargar usuarios.", "error");
    if (contenedor) {
      contenedor.innerHTML = `<div class="admin-empty">No se pudieron cargar los usuarios.</div>`;
    }
  }
}

async function guardarAdminUsuario(id) {
  const tarjeta = document.querySelector(`[data-admin-user-id="${CSS.escape(id)}"]`);

  if (!tarjeta) return;

  const datos = {
    nombre: tarjeta.querySelector(".admin-user-nombre")?.value || "",
    codigoLegacy: tarjeta.querySelector(".admin-user-codigo")?.value || "",
    activo: Boolean(tarjeta.querySelector(".admin-user-activo")?.checked)
  };
  const pollas = obtenerPollasSeleccionadasAdmin(tarjeta);
  const esNuevo = id === "nuevo";
  const participanteActual = adminParticipantesActuales.find((participante) => participante.id === id);
  const pollasActuales = new Set((participanteActual?.pollas || []).map((polla) => polla.id));
  const pollasNuevas = new Set(pollas);
  const cambiaronPollas = esNuevo || pollas.length !== pollasActuales.size ||
    pollas.some((pollaId) => !pollasActuales.has(pollaId)) ||
    Array.from(pollasActuales).some((pollaId) => !pollasNuevas.has(pollaId));

  mostrarFeedbackAdmin(esNuevo ? "Creando usuario..." : "Guardando usuario...", "info");

  try {
    const respuesta = esNuevo
      ? await window.PollaApiClient.apiAdminCrearParticipante({ ...datos, pollas })
      : await window.PollaApiClient.apiAdminActualizarParticipante(id, datos);

    if (!respuesta.ok) {
      if (!manejarErrorAdmin(respuesta)) {
        mostrarFeedbackAdmin(respuesta.error || "Error al guardar usuario.", "error");
      }
      return;
    }

    if (!esNuevo) {
      const respuestaPollas = await window.PollaApiClient.apiAdminActualizarPollasParticipante(id, pollas);

      if (!respuestaPollas.ok) {
        if (!manejarErrorAdmin(respuestaPollas)) {
          mostrarFeedbackAdmin(respuestaPollas.error || "Usuario guardado, pero falló la asignación de pollas.", "error");
        }
        return;
      }
    }

    mostrarFeedbackAdmin("Actualizando lista de usuarios...", "info");

    const resultadoCarga = await recargarAdminUsuariosDatos();

    if (!resultadoCarga.ok) {
      if (!manejarErrorAdmin(resultadoCarga.respuesta)) {
        mostrarFeedbackAdmin(resultadoCarga.respuesta?.error || resultadoCarga.mensaje || "No se pudieron cargar los datos.", "error");
      }
      return;
    }

    adminSubtabActual = "usuarios";
    mostrarFormularioCrearUsuario = false;
    usuarioAdminExpandidoId = esNuevo ? "" : id;
    mostrarPanelAdmin("usuarios");
    renderizarAdminUsuarios();
    await refrescarPollasUsuarioActualDesdeAdmin();

    if (esNuevo) {
      mostrarFeedbackAdmin("Usuario creado.", "success");
    } else {
      mostrarFeedbackAdmin("Usuario actualizado.", "success");
    }
  } catch (error) {
    console.error(error);
    mostrarFeedbackAdmin("Error al guardar usuario.", "error");
  }
}

async function cambiarPermisoAdminUsuario(id, esAdmin) {
  const tarjeta = document.querySelector(`[data-admin-user-id="${CSS.escape(id)}"]`);
  const control = tarjeta?.querySelector(".admin-user-admin");
  const participante = adminParticipantesActuales.find((usuario) => usuario.id === id);
  const estadoAnterior = Boolean(participante?.esAdmin);

  if (!tarjeta || !control || !participante) return;

  if (!esAdmin) {
    const confirmado = confirm(`Quitar permiso de administrador a ${participante.nombre || participante.codigoLegacy}?`);

    if (!confirmado) {
      control.checked = estadoAnterior;
      return;
    }
  }

  control.disabled = true;
  mostrarFeedbackAdmin(esAdmin ? "Activando administrador..." : "Quitando administrador...", "info");

  try {
    const respuesta = await window.PollaApiClient.apiAdminActualizarPermisoAdminParticipante(id, esAdmin);

    if (!respuesta.ok) {
      control.checked = estadoAnterior;

      if (!manejarErrorAdmin(respuesta)) {
        mostrarFeedbackAdmin(respuesta.error || "No se pudo actualizar el permiso de administrador.", "error");
      }
      return;
    }

    const resultadoCarga = await recargarAdminUsuariosDatos();

    if (!resultadoCarga.ok) {
      if (!manejarErrorAdmin(resultadoCarga.respuesta)) {
        mostrarFeedbackAdmin(resultadoCarga.respuesta?.error || resultadoCarga.mensaje || "Permiso actualizado, pero no se pudo recargar la lista.", "error");
      }
      return;
    }

    usuarioAdminExpandidoId = id;
    renderizarAdminUsuarios();
    mostrarFeedbackAdmin(esAdmin ? "Administrador activado." : "Administrador desactivado.", "success");
  } catch (error) {
    console.error(error);
    control.checked = estadoAnterior;
    mostrarFeedbackAdmin("Error al actualizar el permiso de administrador.", "error");
  } finally {
    control.disabled = false;
  }
}

function renderizarAdminPollasFormulario() {
  const contenedor = document.getElementById("adminPollasForm");

  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="admin-list-toolbar">
      <input
        class="admin-search-input"
        type="search"
        placeholder="Buscar polla por nombre o ID"
        value="${escapeHTML(textoBusquedaAdminPollas)}"
        oninput="actualizarTextoBusquedaAdminPollas(this.value)"
        onkeydown="manejarTecladoBusquedaAdminPollas(event)"
      />
      <button class="admin-secondary-button" type="button" onclick="buscarAdminPollas()">
        Buscar
      </button>
      <button class="admin-secondary-button subtle" type="button" onclick="limpiarBusquedaAdminPollas()">
        Limpiar
      </button>
      <button class="admin-secondary-button" type="button" onclick="toggleCrearAdminPolla()">
        ${mostrarFormularioCrearPolla ? "Cerrar" : "+ Crear polla"}
      </button>
    </div>

    <article class="admin-form-card ${mostrarFormularioCrearPolla ? "" : "hidden"}" data-admin-polla-id="nueva">
      <div class="admin-form-heading compact">
        <h3>Crear polla</h3>
        <p>El idLegacy se normaliza en minúsculas.</p>
      </div>

      <div class="admin-edit-panel">
        <div class="admin-form-grid">
          <label>
            Nombre
            <input class="admin-polla-nombre" type="text" placeholder="Polla nueva" />
          </label>
          <label>
            ID / idLegacy
            <input class="admin-polla-legacy" type="text" placeholder="polla-nueva-2026" />
          </label>
          <label class="admin-switch">
            <input class="admin-polla-activa" type="checkbox" checked />
            <span>Activa</span>
          </label>
        </div>

        <button class="admin-save-button compact" type="button" onclick="guardarAdminPolla('nueva')">
          Crear polla
        </button>
      </div>
    </article>
  `;
}

function obtenerPollasAdminFiltradas() {
  const filtro = filtroAdminPollas.trim().toLowerCase();

  if (!filtro) return adminPollasActuales;

  return adminPollasActuales.filter((polla) => {
    const nombre = String(polla.nombre || "").toLowerCase();
    const idLegacy = String(polla.idLegacy || "").toLowerCase();

    return nombre.includes(filtro) || idLegacy.includes(filtro);
  });
}

function actualizarFiltroAdminPollas(valor) {
  textoBusquedaAdminPollas = valor || "";
  filtroAdminPollas = valor || "";
  renderizarAdminPollas();
}

function actualizarTextoBusquedaAdminPollas(valor) {
  textoBusquedaAdminPollas = valor || "";
}

function buscarAdminPollas() {
  filtroAdminPollas = textoBusquedaAdminPollas || "";
  pollaAdminExpandidaId = "";
  renderizarAdminPollas();
}

function limpiarBusquedaAdminPollas() {
  textoBusquedaAdminPollas = "";
  filtroAdminPollas = "";
  pollaAdminExpandidaId = "";
  renderizarAdminPollas();
}

function manejarTecladoBusquedaAdminPollas(event) {
  if (event.key !== "Enter") return;

  event.preventDefault();
  buscarAdminPollas();
}

function toggleCrearAdminPolla() {
  mostrarFormularioCrearPolla = !mostrarFormularioCrearPolla;
  pollaAdminExpandidaId = "";
  renderizarAdminPollas();
}

function toggleEditarAdminPolla(id) {
  pollaAdminExpandidaId = pollaAdminExpandidaId === id ? "" : id;
  mostrarFormularioCrearPolla = false;
  renderizarAdminPollas();
}

function renderizarAdminPollas() {
  renderizarAdminPollasFormulario();

  const contenedor = document.getElementById("adminPollasLista");

  if (!contenedor) return;

  if (!usuarioAdminActual) {
    contenedor.innerHTML = `<div class="admin-empty">No autorizado.</div>`;
    return;
  }

  const pollasFiltradas = obtenerPollasAdminFiltradas();

  if (adminPollasActuales.length === 0) {
    contenedor.innerHTML = `<div class="admin-empty">No hay pollas.</div>`;
    return;
  }

  if (pollasFiltradas.length === 0) {
    contenedor.innerHTML = `<div class="admin-empty">No se encontraron pollas.</div>`;
    return;
  }

  contenedor.innerHTML = pollasFiltradas.map((polla) => {
    const expandida = pollaAdminExpandidaId === polla.id;

    return `
    <article class="admin-entity-card compact ${expandida ? "expanded" : ""}" data-admin-polla-id="${escapeHTML(polla.id)}">
      <button class="admin-entity-summary" type="button" onclick="toggleEditarAdminPolla('${escapeHTML(polla.id)}')">
        <strong>${escapeHTML(polla.nombre || "")}</strong>
        <span class="admin-code">${escapeHTML(polla.idLegacy || "")}</span>
        <span class="admin-status ${polla.activa ? "active" : "inactive"}">
          ${polla.activa ? "Activa" : "Inactiva"}
        </span>
        <span class="admin-count">${escapeHTML(polla.cantidadParticipantes || 0)} participantes</span>
        <span class="admin-edit-label">${expandida ? "Cerrar" : "Editar"}</span>
      </button>

      ${expandida ? `
        <div class="admin-edit-panel">
          <div class="admin-form-grid">
            <label>
              Nombre
              <input class="admin-polla-nombre" type="text" value="${escapeHTML(polla.nombre || "")}" />
            </label>
            <label>
              ID / idLegacy
              <input class="admin-polla-legacy" type="text" value="${escapeHTML(polla.idLegacy || "")}" />
            </label>
            <label class="admin-switch">
              <input class="admin-polla-activa" type="checkbox" ${polla.activa ? "checked" : ""} />
              <span>Activa</span>
            </label>
          </div>

          <button class="admin-save-button compact" type="button" onclick="guardarAdminPolla('${escapeHTML(polla.id)}')">
            Guardar cambios
          </button>
        </div>
      ` : ""}
    </article>
  `;
  }).join("");
}

async function cargarAdminPollas() {
  if (!usuarioAdminActual) {
    mostrarFeedbackAdmin("No autorizado.", "error");
    return;
  }

  const contenedor = document.getElementById("adminPollasLista");

  mostrarFeedbackAdmin("Cargando pollas...", "info");
  renderizarAdminPollasFormulario();
  if (contenedor) {
    contenedor.innerHTML = `<div class="admin-empty">Cargando pollas...</div>`;
  }

  try {
    const respuesta = await window.PollaApiClient.apiAdminObtenerPollas();

    console.info("[Admin Pollas] respuesta:", respuesta);

    if (!respuesta.ok) {
      if (!manejarErrorAdmin(respuesta)) {
        mostrarFeedbackAdmin(respuesta.error || "Error al cargar pollas.", "error");
      }
      if (contenedor) {
        contenedor.innerHTML = `<div class="admin-empty">No se pudieron cargar las pollas.</div>`;
      }
      return;
    }

    adminPollasActuales = respuesta.pollas || [];
    mostrarFeedbackAdmin("", "info");
    renderizarAdminPollas();
  } catch (error) {
    console.error(error);
    mostrarFeedbackAdmin("Error al cargar pollas.", "error");
    if (contenedor) {
      contenedor.innerHTML = `<div class="admin-empty">No se pudieron cargar las pollas.</div>`;
    }
  }
}

async function guardarAdminPolla(id) {
  const tarjeta = document.querySelector(`[data-admin-polla-id="${CSS.escape(id)}"]`);

  if (!tarjeta) return;

  const datos = {
    nombre: tarjeta.querySelector(".admin-polla-nombre")?.value || "",
    idLegacy: tarjeta.querySelector(".admin-polla-legacy")?.value || "",
    activa: Boolean(tarjeta.querySelector(".admin-polla-activa")?.checked)
  };
  const esNueva = id === "nueva";

  mostrarFeedbackAdmin(esNueva ? "Creando polla..." : "Guardando polla...", "info");

  try {
    const respuesta = esNueva
      ? await window.PollaApiClient.apiAdminCrearPolla(datos)
      : await window.PollaApiClient.apiAdminActualizarPolla(id, datos);

    if (!respuesta.ok) {
      if (!manejarErrorAdmin(respuesta)) {
        mostrarFeedbackAdmin(respuesta.error || "Error al guardar polla.", "error");
      }
      return;
    }

    adminSubtabActual = "pollas";
    mostrarFormularioCrearPolla = false;
    pollaAdminExpandidaId = esNueva ? "" : id;
    mostrarPanelAdmin("pollas");
    await cargarAdminPollas();
    await refrescarPollasUsuarioActualDesdeAdmin();
    mostrarFeedbackAdmin(esNueva ? "Polla creada." : "Polla actualizada.", "success");
  } catch (error) {
    console.error(error);
    mostrarFeedbackAdmin("Error al guardar polla.", "error");
  }
}

function obtenerNombreAdminPartido(partido, lado) {
  if (lado === "local") {
    return partido.equipoLocal || partido.local || partido.placeholderLocal || partido.localPlaceholder || "Local";
  }

  return partido.equipoVisita || partido.visita || partido.placeholderVisita || partido.visitaPlaceholder || "Visita";
}

function obtenerFechaAdminPartido(partido) {
  const fecha = formatearFecha(partido.fecha || partido.fechaHora);
  const hora = partido.hora || obtenerHoraISO(partido.fechaHora) || "";

  return [fecha, hora ? `${hora} hrs` : ""].filter(Boolean).join(" · ");
}

function obtenerAdminPartidosFiltrados() {
  const filtroEstado = document.getElementById("adminFiltroEstado")?.value || "";

  return adminPartidosActuales.filter((partido) => !filtroEstado || partido.estado === filtroEstado);
}

function obtenerClaseEstadoAdmin(estado) {
  return String(estado || "Pendiente").trim().toLowerCase().replace(/\s+/g, "-");
}

function obtenerOpcionesEstadoAdmin(partido) {
  const estado = partido.estado || "Pendiente";
  const cerradoPorHorario = Boolean(partido.cerradoPorHorario);
  const enVivo = Boolean(partido.enVivo) || String(estado).trim().toLowerCase() === "en vivo";

  return ESTADOS_ADMIN.map((opcion) => {
    const deshabilitado = (enVivo && ["Pendiente", "Abierto"].includes(opcion)) ||
      (cerradoPorHorario && ["Pendiente", "Abierto"].includes(opcion));
    const texto = enVivo && opcion === "En vivo"
      ? "En vivo"
      : cerradoPorHorario && opcion === "Cerrado"
        ? "Cerrado por horario"
        : opcion;

    return `
      <option value="${opcion}" ${opcion === estado ? "selected" : ""} ${deshabilitado ? "disabled" : ""}>
        ${texto}
      </option>
    `;
  }).join("");
}

function tieneMarcadorAdmin(partido) {
  return partido.golesLocalReal !== null &&
    partido.golesLocalReal !== undefined &&
    partido.golesLocalReal !== "" &&
    partido.golesVisitaReal !== null &&
    partido.golesVisitaReal !== undefined &&
    partido.golesVisitaReal !== "";
}

function obtenerClaseTarjetaResultadoAdmin(partido) {
  const estado = obtenerClaseEstadoAdmin(partido.estado);

  if (estado === "finalizado") return "admin-result-card--finalizado";
  if (estado === "en-vivo" || partido.enVivo) return "admin-result-card--en-vivo";
  if (estado === "cerrado" || partido.cerradoPorHorario) return "admin-result-card--cerrado";
  return "admin-result-card--pendiente";
}

function toggleAdminResultado(partidoId) {
  adminResultadoAbiertoId = adminResultadoAbiertoId === partidoId ? "" : partidoId;
  renderizarAdminPartidos();
}

function esAdminPartidoVisibleFijo(partido) {
  const fechaPartido = obtenerFechaHoraPartido(partido);
  const fechaValida = !Number.isNaN(fechaPartido.getTime());
  const esFuturo = fechaValida && fechaPartido.getTime() > obtenerAhoraChile().getTime();
  const estado = String(partido.estado || "").trim().toLowerCase();

  return Boolean(partido.enVivo) ||
    estado === "en vivo" ||
    estado === "abierto" ||
    esFuturo;
}

function separarAdminResultadosActualesYAnteriores(partidosOrdenados) {
  const candidatosRecientes = [];
  const visiblesFijos = [];

  partidosOrdenados.forEach((partido) => {
    if (esAdminPartidoVisibleFijo(partido)) {
      visiblesFijos.push(partido);
    } else {
      candidatosRecientes.push(partido);
    }
  });

  const recientes = [...candidatosRecientes]
    .sort((a, b) => obtenerFechaHoraPartido(b) - obtenerFechaHoraPartido(a))
    .slice(0, 3);
  const clavesRecientes = new Set(recientes.map((partido) => partido.id));

  return partidosOrdenados.reduce((acumulador, partido) => {
    if (clavesRecientes.has(partido.id) || visiblesFijos.includes(partido)) {
      acumulador.visibles.push(partido);
    } else {
      acumulador.anteriores.push(partido);
    }

    return acumulador;
  }, {
    visibles: [],
    anteriores: []
  });
}

function renderizarAdminPartidoCard(partido) {
  const local = escapeHTML(obtenerNombreAdminPartido(partido, "local"));
  const visita = escapeHTML(obtenerNombreAdminPartido(partido, "visita"));
  const meta = adminTipoActual === "grupos"
    ? `Grupo ${escapeHTML(partido.grupo || "")}`
    : escapeHTML(partido.ronda || "");
  const golesLocal = partido.golesLocalReal ?? "";
  const golesVisita = partido.golesVisitaReal ?? "";
  const estado = partido.estado || "Pendiente";
  const opcionesEstado = obtenerOpcionesEstadoAdmin(partido);
  const estadoEtiqueta = partido.enVivo ? "En vivo" : partido.cerradoPorHorario ? "Cerrado por horario" : estado;
  const estadoClase = obtenerClaseEstadoAdmin(estado);
  const estaAbierto = adminResultadoAbiertoId === partido.id;
  const claseTarjeta = obtenerClaseTarjetaResultadoAdmin(partido);
  const marcadorResumen = tieneMarcadorAdmin(partido)
    ? `<span class="admin-result-score">${escapeHTML(golesLocal)} - ${escapeHTML(golesVisita)}</span>`
    : `<span class="admin-result-vs">vs</span>`;
  const clasificado = partido.clasificadoRealLado || "";
  const selectorClasificado = adminTipoActual === "eliminacion"
    ? `
        <label>
          Clasifica
          <select class="admin-clasificado">
            <option value="" ${clasificado === "" ? "selected" : ""}>Sin definir</option>
            <option value="local" ${clasificado === "local" ? "selected" : ""}>Local</option>
            <option value="visita" ${clasificado === "visita" ? "selected" : ""}>Visita</option>
          </select>
        </label>
      `
    : "";
  const equiposEliminacion = adminTipoActual === "eliminacion"
    ? `
        <div class="admin-team-fields">
          <label>
            Local: ${escapeHTML(partido.localPlaceholder || partido.placeholderLocal || "Local")}
            <input class="admin-equipo-local" type="text" value="${escapeHTML(partido.equipoLocal || "")}" placeholder="Equipo real local" />
          </label>
          <label>
            Visita: ${escapeHTML(partido.visitaPlaceholder || partido.placeholderVisita || "Visita")}
            <input class="admin-equipo-visita" type="text" value="${escapeHTML(partido.equipoVisita || "")}" placeholder="Equipo real visita" />
          </label>
        </div>
      `
    : "";

  return `
    <article class="admin-partido-card admin-result-card ${claseTarjeta} ${estaAbierto ? "expanded" : ""}" data-partido-id="${escapeHTML(partido.id)}">
      <button class="admin-result-summary" type="button" onclick="toggleAdminResultado('${escapeHTML(partido.id)}')" aria-expanded="${estaAbierto ? "true" : "false"}">
        <span class="admin-result-team admin-result-team--local">${local}</span>
        ${marcadorResumen}
        <span class="admin-result-team admin-result-team--visita">${visita}</span>
      </button>

      ${estaAbierto ? `
        <div class="admin-result-editor">
          <div class="admin-partido-main">
            <div class="admin-partido-meta-row">
              <span class="admin-partido-meta">${meta} Â· ${escapeHTML(obtenerFechaAdminPartido(partido))}</span>
              <span class="admin-status admin-partido-status ${escapeHTML(estadoClase)}">
                ${escapeHTML(estadoEtiqueta)}
              </span>
            </div>
            ${equiposEliminacion}
          </div>

          <div class="admin-fields">
            <div class="admin-score-fields">
              <label>
                Local
                <input class="admin-goles-local" type="number" min="0" value="${escapeHTML(golesLocal)}" />
              </label>
              <span class="admin-score-separator">-</span>
              <label>
                Visita
                <input class="admin-goles-visita" type="number" min="0" value="${escapeHTML(golesVisita)}" />
              </label>
            </div>
            <label>
              Estado
              <select class="admin-estado">${opcionesEstado}</select>
            </label>
            ${selectorClasificado}
            <button class="admin-save-button" type="button" onclick="guardarAdminPartido('${escapeHTML(partido.id)}')">
              Guardar cambios
            </button>
          </div>
        </div>
      ` : ""}
    </article>
  `;
}

function renderizarAdminResultadosAnteriores(partidosAnteriores) {
  if (partidosAnteriores.length === 0) return "";

  return `
    <section class="previous-matches-section previous-results-section admin-previous-results-section">
      <button class="previous-matches-toggle previous-results-toggle" type="button" onclick="toggleAdminResultadosAnteriores()">
        ${mostrarAdminResultadosAnteriores ? "Ocultar" : "Ver"} resultados anteriores (${partidosAnteriores.length})
      </button>
      <div class="previous-matches-panel previous-results-panel ${mostrarAdminResultadosAnteriores ? "" : "hidden"}">
        ${mostrarAdminResultadosAnteriores ? partidosAnteriores.map(renderizarAdminPartidoCard).join("") : ""}
      </div>
    </section>
  `;
}

function toggleAdminResultadosAnteriores() {
  mostrarAdminResultadosAnteriores = !mostrarAdminResultadosAnteriores;
  renderizarAdminPartidos();
}

function renderizarAdminPartidos() {
  const contenedor = document.getElementById("adminPartidos");

  if (!contenedor) return;

  if (!usuarioAdminActual) {
    contenedor.innerHTML = `<div class="admin-empty">No autorizado.</div>`;
    return;
  }

  const partidosFiltrados = obtenerAdminPartidosFiltrados();

  if (partidosFiltrados.length === 0) {
    contenedor.innerHTML = `<div class="admin-empty">No hay partidos para este filtro.</div>`;
    return;
  }

  const partidosOrdenados = ordenarPartidosPorFechaHora(partidosFiltrados);
  const { visibles, anteriores } = separarAdminResultadosActualesYAnteriores(partidosOrdenados);

  contenedor.innerHTML = `
    ${renderizarAdminResultadosAnteriores(anteriores)}
    ${visibles.map(renderizarAdminPartidoCard).join("")}
  `;
  return;

  contenedor.innerHTML = partidosFiltrados.map((partido) => {
    const local = escapeHTML(obtenerNombreAdminPartido(partido, "local"));
    const visita = escapeHTML(obtenerNombreAdminPartido(partido, "visita"));
    const meta = adminTipoActual === "grupos"
      ? `Grupo ${escapeHTML(partido.grupo || "")}`
      : escapeHTML(partido.ronda || "");
    const golesLocal = partido.golesLocalReal ?? "";
    const golesVisita = partido.golesVisitaReal ?? "";
    const estado = partido.estado || "Pendiente";
    const opcionesEstado = obtenerOpcionesEstadoAdmin(partido);
    const estadoEtiqueta = partido.enVivo ? "En vivo" : partido.cerradoPorHorario ? "Cerrado por horario" : estado;
    const estadoClase = obtenerClaseEstadoAdmin(estado);
    const estaAbierto = adminResultadoAbiertoId === partido.id;
    const claseTarjeta = obtenerClaseTarjetaResultadoAdmin(partido);
    const marcadorResumen = tieneMarcadorAdmin(partido)
      ? `<span class="admin-result-score">${escapeHTML(golesLocal)} - ${escapeHTML(golesVisita)}</span>`
      : `<span class="admin-result-vs">vs</span>`;
    const clasificado = partido.clasificadoRealLado || "";
    const selectorClasificado = adminTipoActual === "eliminacion"
      ? `
          <label>
            Clasifica
            <select class="admin-clasificado">
              <option value="" ${clasificado === "" ? "selected" : ""}>Sin definir</option>
              <option value="local" ${clasificado === "local" ? "selected" : ""}>Local</option>
              <option value="visita" ${clasificado === "visita" ? "selected" : ""}>Visita</option>
            </select>
          </label>
        `
      : "";
    const equiposEliminacion = adminTipoActual === "eliminacion"
      ? `
          <div class="admin-team-fields">
            <label>
              Local: ${escapeHTML(partido.localPlaceholder || partido.placeholderLocal || "Local")}
              <input class="admin-equipo-local" type="text" value="${escapeHTML(partido.equipoLocal || "")}" placeholder="Equipo real local" />
            </label>
            <label>
              Visita: ${escapeHTML(partido.visitaPlaceholder || partido.placeholderVisita || "Visita")}
              <input class="admin-equipo-visita" type="text" value="${escapeHTML(partido.equipoVisita || "")}" placeholder="Equipo real visita" />
            </label>
          </div>
        `
      : "";

    return `
      <article class="admin-partido-card admin-result-card ${claseTarjeta} ${estaAbierto ? "expanded" : ""}" data-partido-id="${escapeHTML(partido.id)}">
        <button class="admin-result-summary" type="button" onclick="toggleAdminResultado('${escapeHTML(partido.id)}')" aria-expanded="${estaAbierto ? "true" : "false"}">
          <span class="admin-result-team admin-result-team--local">${local}</span>
          ${marcadorResumen}
          <span class="admin-result-team admin-result-team--visita">${visita}</span>
        </button>

        ${estaAbierto ? `
          <div class="admin-result-editor">
            <div class="admin-partido-main">
              <div class="admin-partido-meta-row">
                <span class="admin-partido-meta">${meta} · ${escapeHTML(obtenerFechaAdminPartido(partido))}</span>
                <span class="admin-status admin-partido-status ${escapeHTML(estadoClase)}">
                  ${escapeHTML(estadoEtiqueta)}
                </span>
              </div>
              ${equiposEliminacion}
            </div>

            <div class="admin-fields">
              <div class="admin-score-fields">
                <label>
                  Local
                  <input class="admin-goles-local" type="number" min="0" value="${escapeHTML(golesLocal)}" />
                </label>
                <span class="admin-score-separator">-</span>
                <label>
                  Visita
                  <input class="admin-goles-visita" type="number" min="0" value="${escapeHTML(golesVisita)}" />
                </label>
              </div>
              <label>
                Estado
                <select class="admin-estado">${opcionesEstado}</select>
              </label>
              ${selectorClasificado}
              <button class="admin-save-button" type="button" onclick="guardarAdminPartido('${escapeHTML(partido.id)}')">
                Guardar cambios
              </button>
            </div>
          </div>
        ` : ""}
      </article>
    `;
  }).join("");
}

async function cargarAdminPartidos() {
  const selectorTipo = document.getElementById("adminTipoPartidos");
  const contenedor = document.getElementById("adminPartidos");

  if (!usuarioAdminActual) {
    mostrarFeedbackAdmin("No autorizado.", "error");
    if (contenedor) contenedor.innerHTML = "";
    return;
  }

  adminTipoActual = selectorTipo?.value || "grupos";
  mostrarFeedbackAdmin("Cargando partidos...", "info");

  try {
    const respuesta = await window.PollaApiClient.apiAdminObtenerPartidos(adminTipoActual);

    if (!respuesta.ok) {
      if (!manejarErrorAdmin(respuesta)) {
        mostrarFeedbackAdmin(respuesta.error || "Error al cargar partidos.", "error");
      }
      return;
    }

    adminPartidosActuales = respuesta.partidos || [];
    mostrarFeedbackAdmin("", "info");
    renderizarAdminPartidos();
  } catch (error) {
    console.error(error);
    mostrarFeedbackAdmin("Error al cargar partidos.", "error");
  }
}

function obtenerValorGolesAdmin(input) {
  const valor = String(input?.value || "").trim();
  return valor === "" ? null : Number(valor);
}

async function refrescarDatosDespuesDeAdmin(tipo) {
  const tipoNormalizado = String(tipo || "grupos").trim().toLowerCase();
  detalleResultadoAbierto = "";

  if (tipoNormalizado === "grupos") {
    const [cargaPartidos, cargaResultados] = await Promise.all([
      cargarPartidosConServidor(),
      cargarResultadosConServidor()
    ]);

    if (cargaPartidos.ok && Array.isArray(cargaPartidos.partidos)) {
      partidos = cargaPartidos.partidos;
    }

    if (cargaResultados.ok && Array.isArray(cargaResultados.resultados)) {
      guardarResultadosEnMemoria(cargaResultados.resultados);
    }

    renderizarPartidos();
    recargarPronosticosGruposDesdeLocalStorage();
    actualizarContadorPronosticos();
  }

  if (tipoNormalizado === "eliminacion") {
    const [cargaLlaves, cargaResultados] = await Promise.all([
      cargarLlavesConServidor(),
      cargarResultadosEliminacionConServidor()
    ]);

    if (cargaLlaves.ok && Array.isArray(cargaLlaves.llaves)) {
      llavesEliminacion = cargaLlaves.llaves;
    }

    if (cargaResultados.ok && Array.isArray(cargaResultados.resultados)) {
      guardarResultadosEliminacionEnMemoria(cargaResultados.resultados);
    }

    renderizarEliminacion();
    recargarPronosticosEliminacionDesdeLocalStorage();
    actualizarContadorEliminacion();
  }

  renderizarResultadosGrupos();

  const ranking = await cargarRankingConServidor();

  if (ranking.ok) {
    ultimoRankingCargado = ranking.ranking || [];
    rankingIncluyeEnVivo = Boolean(ranking.incluyeEnVivo);

    const seccionRanking = document.getElementById("seccionRanking");

    if (seccionRanking && !seccionRanking.classList.contains("hidden")) {
      mostrarRanking(ultimoRankingCargado);
    }
  }

  const admin = await window.PollaApiClient.apiAdminObtenerPartidos(adminTipoActual);

  if (admin.ok) {
    adminPartidosActuales = admin.partidos || [];
    renderizarAdminPartidos();
  }
}

async function refrescarDatosAlCambiarSeccion(seccion) {
  const codigoUsuario = obtenerCodigoActual();

  if (seccion === "pronosticos") {
    const cargaPartidos = await cargarPartidosConServidor();

    if (cargaPartidos.ok && Array.isArray(cargaPartidos.partidos)) {
      partidos = cargaPartidos.partidos;
    }

    if (codigoUsuario) {
      await sincronizarPronosticosUsuarioDesdeServidor(codigoUsuario);
    }

    renderizarPartidos();
    recargarPronosticosGruposDesdeLocalStorage();
    actualizarContadorPronosticos();
    return;
  }

  if (seccion === "eliminacion") {
    const cargaLlaves = await cargarLlavesConServidor();

    if (cargaLlaves.ok && Array.isArray(cargaLlaves.llaves)) {
      llavesEliminacion = cargaLlaves.llaves;
    }

    if (codigoUsuario) {
      await sincronizarPronosticosUsuarioDesdeServidor(codigoUsuario);
    }

    renderizarEliminacion();
    recargarPronosticosEliminacionDesdeLocalStorage();
    actualizarContadorEliminacion();
    return;
  }

  if (seccion === "resultados") {
    detalleResultadoAbierto = "";

    const [
      cargaPartidos,
      cargaLlaves,
      cargaResultados,
      cargaResultadosEliminacion
    ] = await Promise.all([
      cargarPartidosConServidor(),
      cargarLlavesConServidor(),
      cargarResultadosConServidor(),
      cargarResultadosEliminacionConServidor()
    ]);

    if (cargaPartidos.ok && Array.isArray(cargaPartidos.partidos)) {
      partidos = cargaPartidos.partidos;
    }

    if (cargaLlaves.ok && Array.isArray(cargaLlaves.llaves)) {
      llavesEliminacion = cargaLlaves.llaves;
    }

    if (cargaResultados.ok && Array.isArray(cargaResultados.resultados)) {
      guardarResultadosEnMemoria(cargaResultados.resultados);
    }

    if (cargaResultadosEliminacion.ok && Array.isArray(cargaResultadosEliminacion.resultados)) {
      guardarResultadosEliminacionEnMemoria(cargaResultadosEliminacion.resultados);
    }

    renderizarResultadosGrupos();
    return;
  }

  if (seccion === "ranking") {
    await cargarRankingSeleccionado();
    return;
  }

  if (seccion === "admin") {
    mostrarPanelAdmin(adminSubtabActual);

    if (adminSubtabActual === "usuarios") {
      await cargarAdminUsuarios();
      return;
    }

    if (adminSubtabActual === "pollas") {
      await cargarAdminPollas();
      return;
    }

    await cargarAdminPartidos();
  }
}

async function guardarAdminPartido(partidoId) {
  if (!usuarioAdminActual) {
    mostrarFeedbackAdmin("No autorizado.", "error");
    return;
  }

  const tarjeta = document.querySelector(`[data-partido-id="${CSS.escape(partidoId)}"]`);

  if (!tarjeta) return;

  const datos = {
    tipo: adminTipoActual,
    golesLocalReal: obtenerValorGolesAdmin(tarjeta.querySelector(".admin-goles-local")),
    golesVisitaReal: obtenerValorGolesAdmin(tarjeta.querySelector(".admin-goles-visita")),
    estado: tarjeta.querySelector(".admin-estado")?.value || "Pendiente"
  };

  if (adminTipoActual === "eliminacion") {
    datos.clasificadoRealLado = tarjeta.querySelector(".admin-clasificado")?.value || null;
    datos.equipoLocal = tarjeta.querySelector(".admin-equipo-local")?.value || null;
    datos.equipoVisita = tarjeta.querySelector(".admin-equipo-visita")?.value || null;
  }

  mostrarFeedbackAdmin("Guardando cambios...", "info");

  try {
    const respuesta = await window.PollaApiClient.apiAdminActualizarPartido(partidoId, datos);

    if (!respuesta.ok) {
      if (!manejarErrorAdmin(respuesta)) {
        mostrarFeedbackAdmin(respuesta.error || "Error al guardar.", "error");
      }
      return;
    }

    const estadoGuardado = respuesta.partido?.estado || datos.estado;
    const estadoCorregido = datos.estado !== estadoGuardado;

    try {
      await refrescarDatosDespuesDeAdmin(adminTipoActual);
      mostrarFeedbackAdmin(
        estadoCorregido
          ? `Cambios guardados. El estado se ajustó a ${estadoGuardado} por horario.`
          : "Cambios guardados.",
        "success"
      );
    } catch (errorRefresco) {
      console.error(errorRefresco);
      mostrarFeedbackAdmin("Cambios guardados. Recarga la página si no ves todo actualizado.", "success");
    }
  } catch (error) {
    console.error(error);
    mostrarFeedbackAdmin("Error al guardar.", "error");
  }
}

async function mostrarSeccion(seccion) {
  const seccionPronosticos = document.getElementById("seccionPronosticos");
  const seccionEliminacion = document.getElementById("seccionEliminacion");
  const seccionResultados = document.getElementById("seccionResultados");
  const seccionRanking = document.getElementById("seccionRanking");
  const seccionInformacion = document.getElementById("seccionInformacion");
  const seccionAdmin = document.getElementById("seccionAdmin");

  const tabPronosticos = document.getElementById("tabPronosticos");
  const tabEliminacion = document.getElementById("tabEliminacion");
  const tabResultados = document.getElementById("tabResultados");
  const tabRanking = document.getElementById("tabRanking");
  const tabInformacion = document.getElementById("tabInformacion");
  const tabAdmin = document.getElementById("tabAdmin");

  seccionPronosticos.classList.add("hidden");
  seccionEliminacion.classList.add("hidden");
  seccionResultados.classList.add("hidden");
  seccionRanking.classList.add("hidden");
  seccionInformacion.classList.add("hidden");
  seccionAdmin?.classList.add("hidden");

  tabPronosticos.classList.remove("active");
  tabEliminacion.classList.remove("active");
  tabResultados.classList.remove("active");
  tabRanking.classList.remove("active");
  tabInformacion.classList.remove("active");
  tabAdmin?.classList.remove("active");

  if (seccion === "admin" && !usuarioAdminActual) {
    await mostrarSeccion("pronosticos");
    return;
  }

  try {
    if (seccion === "pronosticos") {
      seccionPronosticos.classList.remove("hidden");
      tabPronosticos.classList.add("active");
      await refrescarDatosAlCambiarSeccion("pronosticos");
    }

    if (seccion === "eliminacion") {
      seccionEliminacion.classList.remove("hidden");
      tabEliminacion.classList.add("active");
      await refrescarDatosAlCambiarSeccion("eliminacion");
    }

    if (seccion === "resultados") {
      seccionResultados.classList.remove("hidden");
      tabResultados.classList.add("active");
      await refrescarDatosAlCambiarSeccion("resultados");
    }

    if (seccion === "ranking") {
      seccionRanking.classList.remove("hidden");
      tabRanking.classList.add("active");
      await refrescarDatosAlCambiarSeccion("ranking");
    }

    if (seccion === "informacion") {
      seccionInformacion.classList.remove("hidden");
      tabInformacion.classList.add("active");
      configurarAcordeonesInformacion();
    }

    if (seccion === "admin") {
      seccionAdmin?.classList.remove("hidden");
      tabAdmin?.classList.add("active");
      await refrescarDatosAlCambiarSeccion("admin");
    }
  } catch (error) {
    console.error("[Navegación] No se pudo refrescar la sección:", seccion, error);
  }
}

function configurarAcordeonesInformacion() {
  const tarjetas = document.querySelectorAll("#seccionInformacion .info-card");

  tarjetas.forEach((tarjeta) => {
    if (tarjeta.dataset.infoAccordionReady === "true") {
      return;
    }

    tarjeta.dataset.infoAccordionReady = "true";
    tarjeta.setAttribute("role", "button");
    tarjeta.setAttribute("tabindex", "0");
    tarjeta.setAttribute("aria-expanded", "false");

    const alternarTarjeta = () => {
      if (!window.matchMedia("(max-width: 600px)").matches) {
        return;
      }

      const estabaAbierta = tarjeta.classList.contains("info-open");

      tarjetas.forEach((otraTarjeta) => {
        otraTarjeta.classList.remove("info-open");
        otraTarjeta.setAttribute("aria-expanded", "false");
      });

      if (!estabaAbierta) {
        tarjeta.classList.add("info-open");
        tarjeta.setAttribute("aria-expanded", "true");
      }
    };

    tarjeta.addEventListener("click", alternarTarjeta);
    tarjeta.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      alternarTarjeta();
    });
  });

}

function cambiarUsuario() {
  limpiarSesionActual();
  usuarioAdminActual = false;
  adminPartidosActuales = [];
  adminParticipantesActuales = [];
  adminPollasActuales = [];
  adminSubtabActual = "resultados";
  mostrarPanelAdmin(adminSubtabActual);
  actualizarVisibilidadAdmin(null);

  document.getElementById("codigoUsuario").value = "";

  document.getElementById("appView").classList.add("hidden");
  document.getElementById("loginView").classList.remove("hidden");

  limpiarInfoPollas();
}

function cargarRankingConServidor() {
  const idPolla = obtenerPollaGlobalSeleccionada();

  console.info("[Ranking] pollaId:", idPolla);

  return window.PollaApiClient.apiObtenerRanking(idPolla);
}

function llenarSelectorRanking(pollas) {
  const selector = document.getElementById("selectorPollaRanking");

  if (!selector) return;

  selector.innerHTML = `<option value="">Selecciona una polla</option>`;

  pollas.forEach((polla) => {
    const option = document.createElement("option");
    option.value = polla.id;
    option.textContent = polla.nombre;
    selector.appendChild(option);
  });

  sincronizarSelectorRankingConGlobal();
}

async function cargarRankingSeleccionado() {
  const selector = document.getElementById("selectorPollaRanking");
  const rankingContent = document.getElementById("rankingContent");

  if (!selector || !rankingContent) return;

  const idPolla = obtenerPollaGlobalSeleccionada() || selector.value;
  selector.value = idPolla;

  if (!idPolla) {
    rankingContent.className = "ranking-placeholder";
    rankingContent.textContent = "Selecciona una polla para ver el ranking";
    return;
  }

  rankingContent.className = "ranking-placeholder";
  rankingContent.textContent = "Cargando ranking... ⏳";

  try {
    const respuesta = await cargarRankingConServidor();

    console.info("[Ranking] respuesta:", respuesta);

    if (!respuesta.ok) {
      if (esRespuestaSesionNodeInvalida(respuesta)) {
        manejarSesionNodeInvalida();
        return;
      }

      rankingContent.className = "ranking-empty";
      rankingContent.textContent = respuesta.error || "No se pudo cargar el ranking.";
      return;
    }

    ultimoRankingCargado = respuesta.ranking || [];
    rankingIncluyeEnVivo = Boolean(respuesta.incluyeEnVivo);
    mostrarRanking(ultimoRankingCargado);

  } catch (error) {
    rankingContent.className = "ranking-empty";
    rankingContent.textContent = "No se pudo cargar el ranking. Intenta nuevamente.";
  }
}

function mostrarRanking(ranking) {
  const rankingContent = document.getElementById("rankingContent");

  if (!rankingContent) return;

  if (!ranking || ranking.length === 0) {
    rankingContent.className = "ranking-empty";
    rankingContent.textContent = "Todavía no hay puntajes para esta polla.";
    return;
  }

  ultimoRankingCargado = ranking;

  const rankingOrdenado = [...ranking].sort((a, b) => {
    const puntosA = obtenerPuntosSegunTipo(a);
    const puntosB = obtenerPuntosSegunTipo(b);

    if (puntosB !== puntosA) return puntosB - puntosA;

    const exactosA = obtenerExactosSegunTipo(a);
    const exactosB = obtenerExactosSegunTipo(b);

    if (exactosB !== exactosA) return exactosB - exactosA;

    return a.nombre.localeCompare(b.nombre);
  });

  rankingContent.className = "ranking-list";

  const leyendaRanking = "";

  rankingContent.innerHTML = leyendaRanking + rankingOrdenado
    .map((participante, index) => {
      const posicion = index + 1;
      const puntos = obtenerPuntosSegunTipo(participante);

      if (tipoRankingActual === "total") {
        const detalleId = `rankingDetalle_${index}`;

        return `
          <article
            class="ranking-item ranking-total-item"
            role="button"
            tabindex="0"
            aria-expanded="false"
            aria-controls="${detalleId}"
          >
            <div class="ranking-position">${posicion}</div>

            <div class="ranking-main">
              <div class="ranking-name">${escapeHTML(participante.nombre)}</div>
              <div id="${detalleId}" class="ranking-total-detail hidden">
                ${obtenerDetalleRankingTotalCompleto(participante)}
              </div>
            </div>

            <div class="ranking-points ranking-points-inline">
              ${escapeHTML(puntos)} <span>pts</span>
            </div>

            <div class="ranking-chevron" aria-hidden="true"></div>
          </article>
        `;
      }

      if (tipoRankingActual === "grupos") {
        const detalleId = `rankingDetalleGrupos_${index}`;

        return `
          <article
            class="ranking-item ranking-total-item ranking-groups-item"
            role="button"
            tabindex="0"
            aria-expanded="false"
            aria-controls="${detalleId}"
          >
            <div class="ranking-position">${posicion}</div>

            <div class="ranking-main">
              <div class="ranking-name">${escapeHTML(participante.nombre)}</div>
              <div id="${detalleId}" class="ranking-total-detail hidden">
                ${obtenerDetalleRankingGruposCompleto(participante)}
              </div>
            </div>

            <div class="ranking-points ranking-points-inline">
              ${escapeHTML(puntos)} <span>pts</span>
            </div>

            <div class="ranking-chevron" aria-hidden="true"></div>
          </article>
        `;
      }

      if (tipoRankingActual === "eliminacion") {
        const detalleId = `rankingDetalleEliminacion_${index}`;

        return `
          <article
            class="ranking-item ranking-total-item ranking-elimination-item"
            role="button"
            tabindex="0"
            aria-expanded="false"
            aria-controls="${detalleId}"
          >
            <div class="ranking-position">${posicion}</div>

            <div class="ranking-main">
              <div class="ranking-name">${escapeHTML(participante.nombre)}</div>
              <div id="${detalleId}" class="ranking-total-detail hidden">
                ${obtenerDetalleRankingEliminacionCompleto(participante)}
              </div>
            </div>

            <div class="ranking-points ranking-points-inline">
              ${escapeHTML(puntos)} <span>pts</span>
            </div>

            <div class="ranking-chevron" aria-hidden="true"></div>
          </article>
        `;
      }

      const detalle = tipoRankingActual === "total"
        ? obtenerDetalleRankingCompacto(participante)
        : obtenerDetalleSegunTipo(participante);

      return `
        <article class="ranking-item">
          <div class="ranking-position">${posicion}</div>

          <div>
            <div class="ranking-name">${escapeHTML(participante.nombre)}</div>

            <div class="ranking-breakdown">
              ${detalle}
            </div>
          </div>

          <div class="ranking-points">
            ${escapeHTML(puntos)}
            <span>puntos</span>
          </div>
        </article>
      `;
    })
    .join("");

  if (
    tipoRankingActual === "total" ||
    tipoRankingActual === "grupos" ||
    tipoRankingActual === "eliminacion"
  ) {
    configurarDetalleRankingDesplegable();
  }
}

function cambiarTipoRanking(tipo) {
  tipoRankingActual = tipo;

  const totalBtn = document.getElementById("rankingTotalBtn");
  const gruposBtn = document.getElementById("rankingGruposBtn");
  const eliminacionBtn = document.getElementById("rankingEliminacionBtn");

  totalBtn.classList.remove("active");
  gruposBtn.classList.remove("active");
  eliminacionBtn.classList.remove("active");

  if (tipo === "total") totalBtn.classList.add("active");
  if (tipo === "grupos") gruposBtn.classList.add("active");
  if (tipo === "eliminacion") eliminacionBtn.classList.add("active");

  mostrarRanking(ultimoRankingCargado);
}

function obtenerPuntosSegunTipo(participante) {
  if (tipoRankingActual === "grupos") {
    return participante.puntosGrupos || 0;
  }

  if (tipoRankingActual === "eliminacion") {
    return participante.puntosEliminacion || 0;
  }

  return participante.puntosTotal || 0;
}

function obtenerExactosSegunTipo(participante) {
  if (tipoRankingActual === "grupos") {
    return participante.exactosGrupos || 0;
  }

  if (tipoRankingActual === "eliminacion") {
    return participante.exactosEliminacion || 0;
  }

  return (participante.exactosGrupos || 0) + (participante.exactosEliminacion || 0);
}

function obtenerDetalleRankingCompacto(participante) {
  const exactos =
    (participante.exactosGrupos || 0) + (participante.exactosEliminacion || 0);
  const partidosPuntuados =
    (participante.partidosGrupos || 0) + (participante.partidosEliminacion || 0);

  return `
    <span class="ranking-highlight">Gr:</span> ${escapeHTML(participante.puntosGrupos || 0)} ·
    <span class="ranking-highlight">Elim:</span> ${escapeHTML(participante.puntosEliminacion || 0)} ·
    <span class="ranking-highlight">Ex:</span> ${escapeHTML(exactos)} ·
    <span class="ranking-highlight">PP:</span> ${escapeHTML(partidosPuntuados)}
  `;
}

function obtenerDetalleRankingTotalCompleto(participante) {
  const exactos =
    (participante.exactosGrupos || 0) + (participante.exactosEliminacion || 0);
  const partidosPuntuados =
    (participante.partidosGrupos || 0) + (participante.partidosEliminacion || 0);

  return `
    <p>Cantidad de puntos obtenidos en Fase de grupos: ${escapeHTML(participante.puntosGrupos || 0)}</p>
    <p>Cantidad de puntos obtenidos en Fase de eliminación: ${escapeHTML(participante.puntosEliminacion || 0)}</p>
    <p>Cantidad de partidos exactos: ${escapeHTML(exactos)}</p>
    <p>Predicciones enviadas: ${escapeHTML(partidosPuntuados)}</p>
  `;
}

function obtenerDetalleRankingGruposCompleto(participante) {
  return `
    <p>Resultado exacto / pleno: ${escapeHTML(participante.exactosGrupos || 0)}</p>
    <p>Acertó ganador/empate: ${escapeHTML(participante.ganadorEmpateGrupos || 0)}</p>
    <p>Acertó diferencia/margen de gol: ${escapeHTML(participante.diferenciaGrupos || 0)}</p>
    <p>Predicciones enviadas: ${escapeHTML(participante.partidosGrupos || 0)}</p>
  `;
}

function obtenerDetalleRankingEliminacionCompleto(participante) {
  return `
    <p>Resultado exacto / pleno: ${escapeHTML(participante.exactosEliminacion || 0)}</p>
    <p>Acertó ganador/empate: ${escapeHTML(participante.ganadorEmpateEliminacion || 0)}</p>
    <p>Acertó quién clasifica: ${escapeHTML(participante.clasificados || 0)}</p>
    <p>Predicciones enviadas: ${escapeHTML(participante.partidosEliminacion || 0)}</p>
  `;
}

function configurarDetalleRankingDesplegable() {
  document.querySelectorAll(".ranking-total-item").forEach((item) => {
    const alternarDetalle = () => {
      const abierto = item.getAttribute("aria-expanded") === "true";
      const detalle = item.querySelector(".ranking-total-detail");

      item.setAttribute("aria-expanded", abierto ? "false" : "true");
      item.classList.toggle("open", !abierto);

      if (detalle) {
        detalle.classList.toggle("hidden", abierto);
      }
    };

    item.addEventListener("click", alternarDetalle);
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        alternarDetalle();
      }
    });
  });

}

function obtenerLlavesEliminacionParaResultados() {
  return ordenarPartidosPorFechaHora(llavesEliminacion);
}

function renderizarTarjetaResultadoEliminacion(partido, destino = contenedorResultados) {
  const resultadoEliminacion = resultadosEliminacion[partido.id];
  const partidoResultado = {
    ...partido,
    ...(resultadoEliminacion || {})
  };
  const resultadoFinalizado = resultadoEliminacionFinalizadoValido(partido.id);
  const estadoResultado = obtenerEstadoResultadoPartido(partidoResultado, "eliminacion");
  const marcador = resultadoFinalizado
    ? `${escapeHTML(partidoResultado.golesLocalReal)} - ${escapeHTML(partidoResultado.golesVisitaReal)}`
    : estadoResultado.marcador || estadoResultado.texto;
  const localMostrado = partido.local || partido.localPlaceholder;
  const visitaMostrada = partido.visita || partido.visitaPlaceholder;
  const fechaSegura = escapeHTML(formatearFecha(partido.fecha));
  const horaSegura = escapeHTML(partido.hora);
  const localSeguro = escapeHTML(localMostrado);
  const visitaSeguro = escapeHTML(visitaMostrada);
  const clasificaSeguro = resultadoFinalizado && partido.clasifica
    ? `<div class="result-qualified">Clasifica: ${escapeHTML(partido.clasifica)}</div>`
    : "";

  const tarjeta = document.createElement("article");
  tarjeta.className = "match-card result-card partido-bloqueado";
  tarjeta.setAttribute("role", "button");
  tarjeta.setAttribute("tabindex", "0");
  tarjeta.setAttribute("aria-expanded", detalleResultadoAbierto === obtenerClaveDetalleResultado(partido.id, "eliminacion") ? "true" : "false");

  tarjeta.innerHTML = `
    <div class="match-info">
      <span class="group-badge">${escapeHTML(partido.ronda)}</span>
      ${fechaSegura} &middot; ${horaSegura} hrs
    </div>

    <div class="result-row">
      <div class="team local">${localSeguro}</div>
      <div>
        <div
          class="${obtenerClaseMarcadorResultado(resultadoFinalizado, estadoResultado)}"
          title="${escapeHTML(estadoResultado.descripcion)}"
        >${escapeHTML(marcador)}</div>
        ${clasificaSeguro}
      </div>
      <div class="team visitante">${visitaSeguro}</div>
    </div>

    <div class="result-hint">
      ${estadoResultado.accion}
    </div>
  `;

  destino.appendChild(tarjeta);

  const panelDetalle = document.createElement("section");
  panelDetalle.className = "result-detail-panel hidden";
  panelDetalle.id = obtenerIdPanelDetalleResultado(partido.id, "eliminacion");
  destino.appendChild(panelDetalle);

  const alternarDetalle = () => {
    manejarClickDetalleResultado(partido, "eliminacion");
  };

  tarjeta.addEventListener("click", alternarDetalle);
  tarjeta.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      alternarDetalle();
    }
  });
}

function renderizarResultadosEliminacion(llavesCerradas) {
  if (!contenedorResultados || llavesCerradas.length === 0) return;

  let rondaActual = "";

  llavesCerradas.forEach((partido) => {
    if (partido.ronda !== rondaActual) {
      rondaActual = partido.ronda;

      const tituloRonda = document.createElement("h2");
      tituloRonda.className = "group-title";
      tituloRonda.textContent = rondaActual;
      contenedorResultados.appendChild(tituloRonda);
    }

    const resultadoEliminacion = resultadosEliminacion[partido.id];
    const partidoResultado = {
      ...partido,
      ...(resultadoEliminacion || {})
    };
    const resultadoFinalizado = resultadoEliminacionFinalizadoValido(partido.id);
    const estadoResultado = obtenerEstadoResultadoPartido(partidoResultado, "eliminacion");
    const marcador = resultadoFinalizado
      ? `${escapeHTML(partidoResultado.golesLocalReal)} - ${escapeHTML(partidoResultado.golesVisitaReal)}`
      : estadoResultado.marcador || estadoResultado.texto;
    const localMostrado = partido.local || partido.localPlaceholder;
    const visitaMostrada = partido.visita || partido.visitaPlaceholder;
    const fechaSegura = escapeHTML(formatearFecha(partido.fecha));
    const horaSegura = escapeHTML(partido.hora);
    const localSeguro = escapeHTML(localMostrado);
    const visitaSeguro = escapeHTML(visitaMostrada);
    const clasificaSeguro = resultadoFinalizado && partido.clasifica
      ? `<div class="result-qualified">Clasifica: ${escapeHTML(partido.clasifica)}</div>`
      : "";

    const tarjeta = document.createElement("article");
    tarjeta.className = "match-card result-card partido-bloqueado";
    tarjeta.setAttribute("role", "button");
    tarjeta.setAttribute("tabindex", "0");
    tarjeta.setAttribute("aria-expanded", detalleResultadoAbierto === obtenerClaveDetalleResultado(partido.id, "eliminacion") ? "true" : "false");

    tarjeta.innerHTML = `
      <div class="match-info">
        <span class="group-badge">${escapeHTML(partido.ronda)}</span>
        ${fechaSegura} &middot; ${horaSegura} hrs
      </div>

      <div class="result-row">
        <div class="team local">${localSeguro}</div>
        <div>
          <div
            class="${obtenerClaseMarcadorResultado(resultadoFinalizado, estadoResultado)}"
            title="${escapeHTML(estadoResultado.descripcion)}"
          >${escapeHTML(marcador)}</div>
          ${clasificaSeguro}
        </div>
        <div class="team visitante">${visitaSeguro}</div>
      </div>

      <div class="result-hint">
        ${estadoResultado.accion}
      </div>
    `;

    contenedorResultados.appendChild(tarjeta);

    const panelDetalle = document.createElement("section");
    panelDetalle.className = "result-detail-panel hidden";
    panelDetalle.id = obtenerIdPanelDetalleResultado(partido.id, "eliminacion");
    contenedorResultados.appendChild(panelDetalle);

    const alternarDetalle = () => {
      manejarClickDetalleResultado(partido, "eliminacion");
    };

    tarjeta.addEventListener("click", alternarDetalle);
    tarjeta.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        alternarDetalle();
      }
    });
  });
}

function obtenerDetalleSegunTipo(participante) {
  if (tipoRankingActual === "grupos") {
    return `
      <span class="ranking-highlight">Grupos:</span>
      Exactos: ${escapeHTML(participante.exactosGrupos || 0)} ·
      Ganador/empate: ${escapeHTML(participante.ganadorEmpateGrupos || 0)} ·
      Goles local: ${escapeHTML(participante.golesLocalGrupos || 0)} ·
      Goles visita: ${escapeHTML(participante.golesVisitaGrupos || 0)} ·
      Margen: ${escapeHTML(participante.diferenciaGrupos || 0)} ·
      Partidos: ${escapeHTML(participante.partidosGrupos || 0)}
    `;
  }

  if (tipoRankingActual === "eliminacion") {
    return `
      <span class="ranking-highlight">Eliminación:</span>
      Exactos: ${escapeHTML(participante.exactosEliminacion || 0)} ·
      Clasificados: ${escapeHTML(participante.clasificados || 0)} ·
      Ganador/empate: ${escapeHTML(participante.ganadorEmpateEliminacion || 0)} ·
      Goles local: ${escapeHTML(participante.golesLocalEliminacion || 0)} ·
      Goles visita: ${escapeHTML(participante.golesVisitaEliminacion || 0)} ·
      Margen: ${escapeHTML(participante.diferenciaEliminacion || 0)} ·
      Partidos: ${escapeHTML(participante.partidosEliminacion || 0)}
    `;
  }

  return `
    <span class="ranking-highlight">Total:</span>
    Grupos: ${escapeHTML(participante.puntosGrupos || 0)} pts ·
    Eliminación: ${escapeHTML(participante.puntosEliminacion || 0)} pts ·
    Exactos: ${escapeHTML((participante.exactosGrupos || 0) + (participante.exactosEliminacion || 0))} ·
    Partidos puntuados: ${escapeHTML((participante.partidosGrupos || 0) + (participante.partidosEliminacion || 0))}
  `;
}

function obtenerRadiosClasifica(partidoId) {
  const nombreGrupo = `${partidoId}_clasifica`;

  return Array.from(document.querySelectorAll('input[type="radio"]'))
    .filter((radio) => radio.name === nombreGrupo);
}

function obtenerClasificaSeleccionado(partidoId) {
  return obtenerRadiosClasifica(partidoId)
    .find((radio) => radio.checked) || null;
}

function obtenerClasificadoAutomaticoEliminacion(partido, golesLocal, golesVisita) {
  if (golesLocal === "" || golesVisita === "") return "";

  const local = Number(golesLocal);
  const visita = Number(golesVisita);

  if (Number.isNaN(local) || Number.isNaN(visita) || local === visita) return "";

  return local > visita
    ? partido.local || partido.localPlaceholder
    : partido.visita || partido.visitaPlaceholder;
}

function actualizarClasificaEliminacion(partido, tarjeta) {
  const inputsMarcador = tarjeta.querySelectorAll(".score-input");
  const inputLocal = inputsMarcador[0];
  const inputVisita = inputsMarcador[1];
  const cajaClasifica = tarjeta.querySelector(".classify-box");
  const radiosClasifica = Array.from(tarjeta.querySelectorAll('input[type="radio"]'));

  if (!inputLocal || !inputVisita || !cajaClasifica) return;

  const clasificadoAutomatico = obtenerClasificadoAutomaticoEliminacion(
    partido,
    inputLocal.value,
    inputVisita.value
  );

  if (clasificadoAutomatico) {
    cajaClasifica.classList.add("hidden");

    radiosClasifica.forEach((radio) => {
      radio.checked = false;
    });

    localStorage.setItem(
      crearClaveEliminacion(partido.id, "clasific"),
      clasificadoAutomatico
    );

    return;
  }

  const marcadorCompleto = inputLocal.value !== "" && inputVisita.value !== "";

  cajaClasifica.classList.toggle("hidden", !marcadorCompleto);

  if (marcadorCompleto) {
    const clasificaManual = radiosClasifica.find((radio) => radio.checked);

    if (clasificaManual) {
      localStorage.setItem(
        crearClaveEliminacion(partido.id, "clasific"),
        clasificaManual.value
      );
    } else {
      localStorage.removeItem(crearClaveEliminacion(partido.id, "clasific"));
    }
  }

  if (!marcadorCompleto) {
    radiosClasifica.forEach((radio) => {
      radio.checked = false;
    });

    localStorage.removeItem(crearClaveEliminacion(partido.id, "clasific"));
  }
}

function cargarLlavesConServidor() {
  return window.PollaApiClient.apiObtenerPartidosEliminacion();
}

async function cargarYRenderizarEliminacion() {
  const contenedor = document.getElementById("partidosEliminacion");

  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="knockout-message">
      Cargando partidos de eliminación... ⏳
    </div>
  `;

  try {
    const respuesta = await cargarLlavesConServidor();

    if (!respuesta.ok) {
      contenedor.innerHTML = `
        <div class="knockout-message">
          No se pudieron cargar las llaves.
        </div>
      `;
      return;
    }

    llavesEliminacion = respuesta.llaves || [];
    renderizarEliminacion();

  } catch (error) {
    contenedor.innerHTML = `
      <div class="knockout-message">
        No se pudieron cargar las llaves. Intenta nuevamente.
      </div>
    `;
  }
}

function renderizarEliminacion() {
  const contenedor = document.getElementById("partidosEliminacion");

  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (!llavesEliminacion || llavesEliminacion.length === 0) {
    contenedor.innerHTML = `
      <div class="knockout-message">
        Todavía no hay partidos de eliminación cargados.
      </div>
    `;
    return;
  }

  let rondaActual = "";

  llavesEliminacion.forEach((partido) => {
    if (partido.ronda !== rondaActual) {
      rondaActual = partido.ronda;

      const tituloRonda = document.createElement("h2");
      tituloRonda.className = "group-title";
      tituloRonda.textContent = rondaActual;
      contenedor.appendChild(tituloRonda);
    }

    const localMostrado = partido.local || partido.localPlaceholder;
    const visitaMostrada = partido.visita || partido.visitaPlaceholder;
    const partidoIdSeguro = escapeHTML(partido.id);
    const fechaSegura = escapeHTML(formatearFecha(partido.fecha));
    const horaSegura = escapeHTML(partido.hora);
    const localSeguro = escapeHTML(localMostrado);
    const visitaSeguro = escapeHTML(visitaMostrada);
    const estadoNormalizado = String(partido.estado || "").trim().toLowerCase();

    const abierto = estadoNormalizado === "abierto";
    const bloqueadoPorHora = estaBloqueado({
      fecha: partido.fecha,
      hora: partido.hora
    });

    const estadoVisual = obtenerEstadoVisualEliminacion(partido, bloqueadoPorHora);
    const bloqueado = estadoVisual.bloqueado;

    const tarjeta = document.createElement("article");
    tarjeta.className = bloqueado
      ? "match-card knockout-prediction-card locked"
      : "match-card knockout-prediction-card";

    tarjeta.innerHTML = `
      <div class="match-info">
        ${fechaSegura} · ${horaSegura} hrs
      </div>

      <div class="match-row">
        <div class="team local">${localSeguro}</div>

        <input 
          class="score-input" 
          type="number" 
          min="0" 
          id="${partidoIdSeguro}_elim_local"
          placeholder="0"
          ${bloqueado ? "disabled" : ""}
        />

        <div class="separator">-</div>

        <input 
          class="score-input" 
          type="number" 
          min="0" 
          id="${partidoIdSeguro}_elim_visita"
          placeholder="0"
          ${bloqueado ? "disabled" : ""}
        />

        <div class="team visitante">${visitaSeguro}</div>
      </div>

      <div class="classify-box">
        <span class="classify-label">¿Quién clasifica?</span>

        <div class="classify-options">
          <label class="classify-option">
            <input 
              type="radio" 
              name="${partidoIdSeguro}_clasifica" 
              value="${localSeguro}"
              ${bloqueado ? "disabled" : ""}
            />
            ${localSeguro}
          </label>

          <label class="classify-option">
            <input 
              type="radio" 
              name="${partidoIdSeguro}_clasifica" 
              value="${visitaSeguro}"
              ${bloqueado ? "disabled" : ""}
            />
            ${visitaSeguro}
          </label>
        </div>
      </div>

      <div class="match-status ${estadoVisual.clase}">
        ${estadoVisual.texto}
      </div>
    `;

    const inputsMarcador = tarjeta.querySelectorAll(".score-input");
    const inputLocal = inputsMarcador[0];
    const inputVisita = inputsMarcador[1];
    const radiosClasifica = tarjeta.querySelectorAll('input[type="radio"]');

    inputLocal.value = localStorage.getItem(crearClaveEliminacion(partido.id, "local")) || "";
    inputVisita.value = localStorage.getItem(crearClaveEliminacion(partido.id, "visita")) || "";

    const clasificaGuardado = localStorage.getItem(crearClaveEliminacion(partido.id, "clasific"));

    radiosClasifica.forEach((radio) => {
      if (radio.value === clasificaGuardado) {
        radio.checked = true;
      }
    });

    actualizarClasificaEliminacion(partido, tarjeta);

    if (!bloqueado) {
      inputLocal.addEventListener("input", () => {
        localStorage.setItem(crearClaveEliminacion(partido.id, "local"), inputLocal.value);
        actualizarClasificaEliminacion(partido, tarjeta);
        actualizarContadorEliminacion();
      });

      inputVisita.addEventListener("input", () => {
        localStorage.setItem(crearClaveEliminacion(partido.id, "visita"), inputVisita.value);
        actualizarClasificaEliminacion(partido, tarjeta);
        actualizarContadorEliminacion();
      });

      radiosClasifica.forEach((radio) => {
        radio.addEventListener("change", () => {
          localStorage.setItem(crearClaveEliminacion(partido.id, "clasific"), radio.value);
          actualizarContadorEliminacion();
        });
      });
    }

    contenedor.appendChild(tarjeta);
  });

  actualizarContadorEliminacion();
}

function actualizarContadorEliminacion() {
  let completados = 0;

  llavesEliminacion.forEach((partido) => {
    const inputLocal = obtenerInputPorId(`${partido.id}_elim_local`);
    const inputVisita = obtenerInputPorId(`${partido.id}_elim_visita`);

    if (!inputLocal || !inputVisita) return;

    const clasificaAutomatico = obtenerClasificadoAutomaticoEliminacion(
      partido,
      inputLocal.value,
      inputVisita.value
    );
    const clasificaManual = obtenerClasificaSeleccionado(partido.id);

    if (
      inputLocal.value !== "" &&
      inputVisita.value !== "" &&
      (clasificaAutomatico || clasificaManual)
    ) {
      completados++;
    }
  });

  const contador = document.getElementById("contadorEliminacion");

  if (contador) {
    contador.textContent = `Pron\u00f3sticos completados: ${completados} de ${TOTAL_PRONOSTICOS_ELIMINACION}`;
  }
}

async function enviar() {
    const usuario = obtenerParticipanteActual();
    const codigoUsuario = normalizarCodigoUsuario(document.getElementById("codigoUsuario").value);
    const btnEnviar = document.getElementById("btnEnviar");

  if (!codigoUsuario) {
  alert("Ingresa tu código de participante antes de guardar");
  return;
}

btnEnviar.disabled = true;
btnEnviar.textContent = "Validando código...";

let validacionCodigo;

try {
  validacionCodigo = await validarCodigoConServidor(codigoUsuario);
} catch (error) {
  alert("No se pudo validar el código. Intenta nuevamente.");
  btnEnviar.disabled = false;
  btnEnviar.textContent = "Guardar mis pronósticos";
  return;
}

if (!validacionCodigo.ok) {
  mostrarErrorCodigo(validacionCodigo.error);
  alert(validacionCodigo.error);
  btnEnviar.disabled = false;
  btnEnviar.textContent = "Guardar mis pronósticos";
  return;
}

mostrarPollasDelParticipante(validacionCodigo);

  const pronosticos = [];

  for (const partido of partidos) {
    if (!partidoDisponibleParaPronosticar(partido)) {
      continue;
    }

    const inputLocal = obtenerInputPorId(`${partido.id}_local`);
    const inputVisita = obtenerInputPorId(`${partido.id}_visita`);

    if (!inputLocal || !inputVisita) {
      console.warn("[Grupos] inputs no encontrados al guardar:", partido);
      continue;
    }

    const golesLocal = inputLocal.value;
    const golesVisita = inputVisita.value;

    const localVacio = golesLocal === "";
    const visitaVacia = golesVisita === "";

    if (localVacio && visitaVacia) {
      continue;
    }

    if (localVacio || visitaVacia) {
      alert(`Te falta completar ambos goles en ${obtenerNombreEquipo(partido.local)} vs ${obtenerNombreEquipo(partido.visita)}`);
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar mis pronósticos";
      return;
    }

    pronosticos.push({
      id: partido.id,
      grupo: partido.grupo,
      fecha: partido.fecha,
      hora: partido.hora,
      local: obtenerNombreEquipo(partido.local),
      golesLocal: Number(golesLocal),
      golesVisita: Number(golesVisita),
      visita: obtenerNombreEquipo(partido.visita)
    });
  }

  if (pronosticos.length === 0) {
    alert("Completa al menos un partido disponible antes de guardar");
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Guardar mis pronósticos";
    return;
  }

  btnEnviar.disabled = true;
  btnEnviar.textContent = "Guardando pronósticos... ⏳";

  try {
    const respuesta = await guardarPronosticosConServidor({
      usuario,
      codigoUsuario,
      pronosticos
    });

    if (!respuesta.ok) {
      if (esRespuestaSesionNodeInvalida(respuesta)) {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Guardar mis pronósticos";
        manejarSesionNodeInvalida();
        return;
      }

      alert(respuesta.error || respuesta.mensaje || "No se pudieron guardar los pronósticos. Intenta nuevamente.");
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar mis pronósticos";
      return;
    }

    alert(respuesta.mensaje || "Pronósticos guardados correctamente");
    btnEnviar.textContent = "Pronósticos guardados";

    setTimeout(() => {
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar mis pronósticos";
    }, 2000);

  } catch (error) {
    console.error(error);
    alert("Hubo un error al guardar los pronósticos. Intenta nuevamente.");
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Guardar mis pronósticos";
  }
}

// =======================
// GUARDAR USUARIO Y CÓDIGO
// =======================

function configurarEventosLogin() {
  const form = document.getElementById("loginForm");
  const input = document.getElementById("codigoUsuario");

  if (!form || !input || form.dataset.loginEventosListos === "true") {
    return;
  }

  form.dataset.loginEventosListos = "true";
  input.value = "";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const btnIngresar = document.getElementById("btnIngresar");

    if (btnIngresar?.disabled) return;

    iniciarSesion();
  });

  input.addEventListener("input", () => {
    recargarPronosticosGruposDesdeLocalStorage();
    recargarPronosticosEliminacionDesdeLocalStorage();
    actualizarContadorPronosticos();
    actualizarContadorEliminacion();
    limpiarInfoPollas();
  });
}

document.addEventListener("click", cerrarDropdownPollaGlobal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cerrarDropdownPollaGlobal();
  }
});

inicializarSubtabsAdmin();

function obtenerInputPorId(id) {
  return document.getElementById(String(id || ""));
}

function actualizarContadorPronosticos() {
  let completados = 0;

  partidos.forEach((partido) => {
    const inputLocal = obtenerInputPorId(`${partido.id}_local`);
    const inputVisita = obtenerInputPorId(`${partido.id}_visita`);
    const valorLocal = inputLocal
      ? inputLocal.value
      : localStorage.getItem(crearClavePronostico(partido.id, "local")) || "";
    const valorVisita = inputVisita
      ? inputVisita.value
      : localStorage.getItem(crearClavePronostico(partido.id, "visita")) || "";

    if (valorLocal !== "" && valorVisita !== "") {
      completados++;
    }
  });

  const contador = document.getElementById("contadorPronosticos");

  if (contador) {
    contador.textContent = `Pron\u00f3sticos completados: ${completados} de ${TOTAL_PARTIDOS_GRUPOS}`;
  }
}

function obtenerCodigoActual() {
  return normalizarCodigoUsuario(document.getElementById("codigoUsuario").value);
}

function crearClavePronostico(partidoId, tipo) {
  const codigo = obtenerCodigoActual();

  if (!codigo) {
    return `sin_codigo_${partidoId}_${tipo}`;
  }

  return `pronostico_${codigo}_${partidoId}_${tipo}`;
}

function crearClaveEliminacion(partidoId, tipo) {
  const codigo = obtenerCodigoActual();

  if (!codigo) {
    return `sin_codigo_elim_${partidoId}_${tipo}`;
  }

  return `eliminacion_${codigo}_${partidoId}_${tipo}`;
}

function limpiarPronosticosLocalesPorPrefijo(prefijo) {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const clave = localStorage.key(i);

    if (clave && clave.startsWith(prefijo)) {
      localStorage.removeItem(clave);
    }
  }
}

function aplicarPronosticosServidorEnLocalStorage(pronosticosServidor, codigoUsuario) {
  const codigo = normalizarCodigoUsuario(codigoUsuario);

  if (!codigo) return;

  limpiarPronosticosLocalesPorPrefijo(`pronostico_${codigo}_`);
  limpiarPronosticosLocalesPorPrefijo(`eliminacion_${codigo}_`);

  const grupos = (pronosticosServidor && pronosticosServidor.grupos) || [];
  const eliminacion = (pronosticosServidor && pronosticosServidor.eliminacion) || [];

  console.info("[Grupos] pronósticos recibidos:", grupos);

  grupos.forEach((pronostico) => {
    if (!pronostico.id) return;

    localStorage.setItem(
      `pronostico_${codigo}_${pronostico.id}_local`,
      String(pronostico.golesLocal ?? "")
    );
    localStorage.setItem(
      `pronostico_${codigo}_${pronostico.id}_visita`,
      String(pronostico.golesVisita ?? "")
    );
  });

  eliminacion.forEach((pronostico) => {
    if (!pronostico.id) return;

    localStorage.setItem(
      `eliminacion_${codigo}_${pronostico.id}_local`,
      String(pronostico.golesLocal ?? "")
    );
    localStorage.setItem(
      `eliminacion_${codigo}_${pronostico.id}_visita`,
      String(pronostico.golesVisita ?? "")
    );
    localStorage.setItem(
      `eliminacion_${codigo}_${pronostico.id}_clasifica`,
      String(pronostico.clasifica ?? "")
    );
  });
}

function recargarPronosticosGruposDesdeLocalStorage() {
  partidos.forEach((partido) => {
    const inputLocal = obtenerInputPorId(`${partido.id}_local`);
    const inputVisita = obtenerInputPorId(`${partido.id}_visita`);

    if (inputLocal) {
      inputLocal.value = localStorage.getItem(crearClavePronostico(partido.id, "local")) || "";
    }

    if (inputVisita) {
      inputVisita.value = localStorage.getItem(crearClavePronostico(partido.id, "visita")) || "";
    }
  });

  actualizarContadorPronosticos();
}

function recargarPronosticosEliminacionDesdeLocalStorage() {
  llavesEliminacion.forEach((partido) => {
    const inputLocal = obtenerInputPorId(`${partido.id}_elim_local`);
    const inputVisita = obtenerInputPorId(`${partido.id}_elim_visita`);
    const radiosClasifica = obtenerRadiosClasifica(partido.id);

    if (inputLocal) {
      inputLocal.value = localStorage.getItem(crearClaveEliminacion(partido.id, "local")) || "";
    }

    if (inputVisita) {
      inputVisita.value = localStorage.getItem(crearClaveEliminacion(partido.id, "visita")) || "";
    }

    const clasificaGuardado = localStorage.getItem(crearClaveEliminacion(partido.id, "clasific")) || "";

    radiosClasifica.forEach((radio) => {
      radio.checked = radio.value === clasificaGuardado;
    });

    const tarjeta = inputLocal?.closest(".knockout-prediction-card") ||
      inputVisita?.closest(".knockout-prediction-card");

    if (tarjeta) {
      actualizarClasificaEliminacion(partido, tarjeta);
    }
  });

  actualizarContadorEliminacion();
}

function limpiarFormulario() {
  const confirmar = confirm(
    "¿Seguro que quieres limpiar los pronósticos guardados en este dispositivo? Esto no borra lo que ya enviaste a la polla."
  );

  if (!confirmar) return;

  // Limpiar fase de grupos
  partidos.forEach((partido) => {
    const inputLocal = obtenerInputPorId(`${partido.id}_local`);
    const inputVisita = obtenerInputPorId(`${partido.id}_visita`);

    if (inputLocal) inputLocal.value = "";
    if (inputVisita) inputVisita.value = "";

    localStorage.removeItem(crearClavePronostico(partido.id, "local"));
    localStorage.removeItem(crearClavePronostico(partido.id, "visita"));
  });

  // Limpiar eliminación directa
  llavesEliminacion.forEach((partido) => {
    const inputLocal = obtenerInputPorId(`${partido.id}_elim_local`);
    const inputVisita = obtenerInputPorId(`${partido.id}_elim_visita`);
    const radiosClasifica = obtenerRadiosClasifica(partido.id);

    if (inputLocal) inputLocal.value = "";
    if (inputVisita) inputVisita.value = "";

    radiosClasifica.forEach((radio) => {
      radio.checked = false;
    });

    const tarjeta = inputLocal?.closest(".knockout-prediction-card") ||
      inputVisita?.closest(".knockout-prediction-card");

    if (tarjeta) {
      actualizarClasificaEliminacion(partido, tarjeta);
    }

    localStorage.removeItem(crearClaveEliminacion(partido.id, "local"));
    localStorage.removeItem(crearClaveEliminacion(partido.id, "visita"));
    localStorage.removeItem(crearClaveEliminacion(partido.id, "clasific"));
  });

  actualizarContadorPronosticos();
  actualizarContadorEliminacion();

  alert("Pronósticos limpiados en este dispositivo.");
}

async function enviarEliminacion() {
  const usuario = obtenerParticipanteActual();
  const codigoUsuario = normalizarCodigoUsuario(document.getElementById("codigoUsuario").value);
  const btnEnviar = document.getElementById("btnEnviarEliminacion");

  if (!codigoUsuario) {
    alert("Ingresa tu código de participante antes de guardar");
    return;
  }

  btnEnviar.disabled = true;
  btnEnviar.textContent = "Validando código...";

  let validacionCodigo;

  try {
    validacionCodigo = await validarCodigoConServidor(codigoUsuario);
  } catch (error) {
    alert("No se pudo validar el código. Intenta nuevamente.");
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Guardar eliminación";
    return;
  }

  if (!validacionCodigo.ok) {
    mostrarErrorCodigo(validacionCodigo.error);
    alert(validacionCodigo.error);
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Guardar eliminación";
    return;
  }

  const pronosticos = [];

  for (const partido of llavesEliminacion) {
    const estadoNormalizado = partido.estado.trim().toLowerCase();

    if (estadoNormalizado !== "abierto") {
      continue;
    }

    const bloqueadoPorHora = estaBloqueado({
      fecha: partido.fecha,
      hora: partido.hora
    });

    if (bloqueadoPorHora) {
      continue;
    }

    const localMostrado = partido.local || partido.localPlaceholder;
    const visitaMostrada = partido.visita || partido.visitaPlaceholder;

    const inputLocal = obtenerInputPorId(`${partido.id}_elim_local`);
    const inputVisita = obtenerInputPorId(`${partido.id}_elim_visita`);

    if (!inputLocal || !inputVisita) {
      console.warn("[Eliminación] inputs no encontrados al guardar:", partido);
      continue;
    }

    const golesLocal = inputLocal.value;
    const golesVisita = inputVisita.value;
    const clasificaAutomatico = obtenerClasificadoAutomaticoEliminacion(
      partido,
      golesLocal,
      golesVisita
    );
    const clasificaSeleccionado = obtenerClasificaSeleccionado(partido.id);
    const clasifica = clasificaAutomatico || clasificaSeleccionado?.value || "";

    const localVacio = golesLocal === "";
    const visitaVacia = golesVisita === "";

    if (localVacio && visitaVacia && !clasifica) {
      continue;
    }

    if (localVacio || visitaVacia) {
      alert(`Te falta completar goles en ${localMostrado} vs ${visitaMostrada}`);
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar eliminación";
      return;
    }

    if (!clasifica) {
      alert(`El partido ${localMostrado} vs ${visitaMostrada} está empatado. Elige quién clasifica`);
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar eliminación";
      return;
    }

    pronosticos.push({
      id: partido.id,
      ronda: partido.ronda,
      fecha: partido.fecha,
      hora: partido.hora,
      local: localMostrado,
      golesLocal: Number(golesLocal),
      golesVisita: Number(golesVisita),
      visita: visitaMostrada,
      clasifica
    });
  }

  if (pronosticos.length === 0) {
    alert("Completa al menos un partido abierto de eliminación antes de guardar");
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Guardar eliminación";
    return;
  }

  btnEnviar.textContent = "Guardando eliminación... ⏳";

  try {
    const respuesta = await guardarPronosticosConServidor({
      tipo: "eliminacion",
      usuario,
      codigoUsuario,
      pronosticos
    });

    if (!respuesta.ok) {
      if (esRespuestaSesionNodeInvalida(respuesta)) {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Guardar eliminación";
        manejarSesionNodeInvalida();
        return;
      }

      alert(respuesta.error || "No se pudo guardar la eliminación. Intenta nuevamente.");
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar eliminación";
      return;
    }

    alert("Pronósticos de eliminación guardados correctamente");
    btnEnviar.textContent = "Eliminación guardada";

    setTimeout(() => {
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar eliminación";
    }, 2000);

  } catch (error) {
    console.error(error);
    alert("Hubo un error al guardar la eliminación. Intenta nuevamente.");
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Guardar eliminación";
  }
}

async function inicializarApp() {
  console.info("[App] iniciando carga");
  console.info("[App] api client disponible:", !!window.PollaApiClient);
  console.info("[App] modo API:", window.PollaApiClient?.API_MODE);
  console.info("[Polla API] usando backend:", window.PollaApiClient?.NODE_API_BASE_URL);
  console.info("[Polla API] modo:", window.PollaApiClient?.API_MODE);
  configurarEventosLogin();

  if (!window.PollaApiClient) {
    throw new Error("No se cargó api-client.js.");
  }

  limpiarClavesSesionAntiguasLocalStorage();

  const sesionGuardada = obtenerSesionGuardada();
  const loginView = document.getElementById("loginView");
  const appView = document.getElementById("appView");

  appView?.classList.add("hidden");
  loginView?.classList.remove("hidden");

  const [cargaPartidos, cargaResultados, cargaResultadosEliminacion, cargaLlaves] = await Promise.allSettled([
    cargarPartidosConServidor(),
    cargarResultadosConServidor(),
    cargarResultadosEliminacionConServidor(),
    cargarLlavesConServidor()
  ]);

  if (
    cargaPartidos.status === "fulfilled" &&
    cargaPartidos.value.ok &&
    Array.isArray(cargaPartidos.value.partidos)
  ) {
    console.info("[Grupos] partidos recibidos:", cargaPartidos.value.partidos);
    console.info("[Grupos] cantidad partidos:", cargaPartidos.value.partidos?.length);
    partidos = cargaPartidos.value.partidos;
    guardarResultadosEnMemoria(partidos);
  }

  if (
    cargaResultados.status === "fulfilled" &&
    cargaResultados.value.ok &&
    Array.isArray(cargaResultados.value.resultados)
  ) {
    guardarResultadosEnMemoria(cargaResultados.value.resultados);
  }

  if (
    cargaResultadosEliminacion.status === "fulfilled" &&
    cargaResultadosEliminacion.value.ok &&
    Array.isArray(cargaResultadosEliminacion.value.resultados)
  ) {
    guardarResultadosEliminacionEnMemoria(cargaResultadosEliminacion.value.resultados);
  }

  if (
    cargaLlaves.status === "fulfilled" &&
    cargaLlaves.value.ok &&
    Array.isArray(cargaLlaves.value.llaves)
  ) {
    llavesEliminacion = cargaLlaves.value.llaves;
  }

  if (cargaPartidos.status === "rejected") {
    console.error(cargaPartidos.reason);
  }

  if (cargaPartidos.status === "fulfilled" && !cargaPartidos.value.ok) {
    console.error("[Grupos] No se pudieron cargar partidos:", cargaPartidos.value);
  }

  if (cargaResultados.status === "rejected") {
    console.error(cargaResultados.reason);
  }

  if (cargaResultados.status === "fulfilled" && !cargaResultados.value.ok) {
    console.error("[Resultados] No se pudieron cargar resultados de grupos:", cargaResultados.value);
  }

  if (cargaResultadosEliminacion.status === "rejected") {
    console.error(cargaResultadosEliminacion.reason);
  }

  if (cargaResultadosEliminacion.status === "fulfilled" && !cargaResultadosEliminacion.value.ok) {
    console.error("[Resultados] No se pudieron cargar resultados de eliminación:", cargaResultadosEliminacion.value);
  }

  if (cargaLlaves.status === "rejected") {
    console.error(cargaLlaves.reason);
  }

  renderizarPartidos();
  renderizarResultadosGrupos();
  actualizarContadorPronosticos();

  if (sesionGuardada) {
    await iniciarSesionGuardada();
  }
}

// Iniciar página
inicializarApp().catch((error) => {
  console.error("[App] error al iniciar:", error);
  document.getElementById("appView")?.classList.add("hidden");
  document.getElementById("loginView")?.classList.remove("hidden");
  mostrarErrorCodigo("No se pudo cargar la app. Recarga la página e intenta nuevamente.");
});

