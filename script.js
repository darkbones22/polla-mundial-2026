// =======================
// CONFIGURACIÓN GENERAL
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

const HORAS_ANTES_BLOQUEO = 1;
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

function limpiarSesionActual() {
  sessionStorage.removeItem(CLAVE_SESION_USUARIO);
  sessionStorage.removeItem(CLAVE_SESION_CODIGO);
  sessionStorage.removeItem(CLAVE_SESION_ACTIVA);
  limpiarClavesSesionAntiguasLocalStorage();
}

function escapeHTML(texto) {
  return String(texto ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function estaBloqueado(partido) {
  const inicioPartido = new Date(`${partido.fecha}T${partido.hora}:00`);
  const limiteEdicion = new Date(
    inicioPartido.getTime() - HORAS_ANTES_BLOQUEO * 60 * 60 * 1000
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

function obtenerFechaHoraPartido(partido) {
  return new Date(`${partido.fecha}T${partido.hora}:00`);
}

function formatearFechaEncabezado(fecha) {
  const fechaObj = new Date(fecha + "T00:00:00");
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

function partidoDisponibleParaPronosticar(partido) {
  return !obtenerEstadoVisualGrupo(partido).bloqueado;
}

function obtenerOrdenEstadoGrupo(partido) {
  const estadoVisual = obtenerEstadoVisualGrupo(partido);

  if (!estadoVisual.bloqueado) return 0;
  if (estadoVisual.clase === "finalizado") return 2;
  return 1;
}

function ordenarPartidosPorFechaHora(listaPartidos) {
  return [...listaPartidos].sort((a, b) => {
    const fechaA = obtenerFechaHoraPartido(a);
    const fechaB = obtenerFechaHoraPartido(b);

    if (a.fecha !== b.fecha) {
      return fechaA - fechaB;
    }

    const ordenEstado = obtenerOrdenEstadoGrupo(a) - obtenerOrdenEstadoGrupo(b);

    if (ordenEstado !== 0) {
      return ordenEstado;
    }

    return fechaA - fechaB;
  });
}

function renderizarPartidos() {
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

  let fechaActual = "";

  partidosOrdenados.forEach((partido) => {
    if (partido.fecha !== fechaActual) {
      fechaActual = partido.fecha;

      const tituloFecha = document.createElement("h2");
      tituloFecha.className = "date-title";
      tituloFecha.textContent = formatearFechaEncabezado(fechaActual);
      contenedorPartidos.appendChild(tituloFecha);
    }

    const estadoVisual = obtenerEstadoVisualGrupo(partido);
    const bloqueado = estadoVisual.bloqueado;
    const fechaSegura = escapeHTML(formatearFecha(partido.fecha));
    const horaSegura = escapeHTML(partido.hora);
    const grupoSeguro = escapeHTML(partido.grupo);
    const localSeguro = escapeHTML(obtenerNombreEquipo(partido.local));
    const visitaSeguro = escapeHTML(obtenerNombreEquipo(partido.visita));

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
          id="${partido.id}_local"
          placeholder="0"
          ${bloqueado ? "disabled" : ""}
        />

        <div class="separator">-</div>

        <input 
          class="score-input" 
          type="number" 
          min="0" 
          id="${partido.id}_visita"
          placeholder="0"
          ${bloqueado ? "disabled" : ""}
        />

        <div class="team visitante">${visitaSeguro}</div>
      </div>

      <div class="match-status ${estadoVisual.clase}">
        ${escapeHTML(estadoVisual.texto)}
      </div>
    `;

    const inputLocal = tarjeta.querySelector(`#${partido.id}_local`);
    const inputVisita = tarjeta.querySelector(`#${partido.id}_visita`);

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

    contenedorPartidos.appendChild(tarjeta);
  });
}

function renderizarResultadosGrupos() {
  if (!contenedorResultados) return;

  contenedorResultados.innerHTML = "";

  const partidosCerrados = ordenarPartidosPorFechaHora(
    partidos.filter((partido) => !partidoDisponibleParaPronosticar(partido))
  );
  const llavesCerradas = obtenerLlavesEliminacionParaResultados();

  if (partidosCerrados.length === 0 && llavesCerradas.length === 0) {
    contenedorResultados.innerHTML = `
      <div class="empty-state">
        Todavía no hay resultados disponibles.
      </div>
    `;
    return;
  }

  partidosCerrados.forEach((partido) => {
    const resultado = resultadosGrupos[partido.id];
    const resultadoFinalizado = resultadoGrupoFinalizadoValido(partido.id);

    const marcador = resultadoFinalizado
      ? `${escapeHTML(resultado.golesLocalReal)} - ${escapeHTML(resultado.golesVisitaReal)}`
      : "Resultado pendiente";

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
        <div class="${resultadoFinalizado ? "result-score" : "result-pending"}">${marcador}</div>
        <div class="team visitante">${visitaSeguro}</div>
      </div>

      <div class="result-hint">
        ${resultadoFinalizado ? "Ver detalle de puntos" : "Ver pron\u00f3sticos registrados"}
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

  renderizarResultadosEliminacion(llavesCerradas);
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

function mostrarDetallePartido(panel, respuesta) {
  const partido = respuesta.partido || {};
  const participantes = respuesta.participantes || [];
  const nombrePolla = respuesta.polla ? respuesta.polla.nombre : obtenerNombrePollaPorId(obtenerPollaGlobalSeleccionada());
  const resultadoFinalizado = respuesta.resultadoFinalizado !== false;
  const local = obtenerNombreEquipo(partido.local || partido.localPlaceholder || "Local");
  const visita = obtenerNombreEquipo(partido.visita || partido.visitaPlaceholder || "Visita");
  const encabezadoPartido = resultadoFinalizado
    ? `${partido.golesLocalReal} - ${partido.golesVisitaReal}`
    : "vs";
  const avisoPendiente = resultadoFinalizado
    ? ""
    : `
        <p class="result-detail-note">
          Pron\u00f3sticos registrados. Los puntos se calcular\u00e1n cuando el resultado sea final.
        </p>
      `;

  const filas = participantes.length
    ? participantes.map((participante, index) => `
        <li class="result-detail-row">
          <div>
            <strong>${index + 1}. ${escapeHTML(participante.nombre)}</strong>
            <span>${escapeHTML(obtenerTextoDetallePuntos(participante))}</span>
          </div>
          <strong class="result-detail-points">${escapeHTML(participante.puntos || 0)} pts</strong>
        </li>
      `).join("")
    : `<li class="result-detail-row empty">No hay participantes activos en esta polla.</li>`;

  panel.innerHTML = `
    <div class="result-detail-header">
      <div>
        <span class="result-detail-kicker">${escapeHTML(nombrePolla)}</span>
        <h3>${escapeHTML(local)} ${escapeHTML(encabezadoPartido)} ${escapeHTML(visita)}</h3>
        ${avisoPendiente}
      </div>
      <button class="result-detail-close" type="button" aria-label="Cerrar detalle">×</button>
    </div>

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
  const fechaObj = new Date(fecha + "T00:00:00");

  return fechaObj.toLocaleDateString("es-CL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

// =======================
// ENVIAR PRONÓSTICOS
// =======================

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw0LDbeRCQxYDp18grZApWUPQJDYEpBBODYorhPl7FeACkpytoytAVcRx0P7Szx580V2g/exec";
let llavesEliminacion = [];
let tipoRankingActual = "total";
let ultimoRankingCargado = [];
let pollasUsuarioActual = [];

function cargarPartidosConServidor() {
  return new Promise((resolve, reject) => {
    const callbackName = `partidos_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    const script = document.createElement("script");

    const timeout = setTimeout(() => {
      limpiar();
      reject(new Error("Tiempo de espera agotado."));
    }, 10000);

    function limpiar() {
      clearTimeout(timeout);
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = (respuesta) => {
      limpiar();
      resolve(respuesta);
    };

    script.onerror = () => {
      limpiar();
      reject(new Error("No se pudieron cargar los partidos."));
    };

    script.src = `${WEB_APP_URL}?action=partidos&callback=${callbackName}`;

    document.body.appendChild(script);
  });
}

function cargarResultadosConServidor() {
  return cargarResultadosPorTipoConServidor("grupos");
}

function cargarResultadosEliminacionConServidor() {
  return cargarResultadosPorTipoConServidor("eliminacion");
}

function cargarResultadosPorTipoConServidor(tipo) {
  return new Promise((resolve, reject) => {
    const callbackName = `resultados_${tipo}_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    const script = document.createElement("script");

    const timeout = setTimeout(() => {
      limpiar();
      reject(new Error("Tiempo de espera agotado."));
    }, 10000);

    function limpiar() {
      clearTimeout(timeout);
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = (respuesta) => {
      limpiar();
      resolve(respuesta);
    };

    script.onerror = () => {
      limpiar();
      reject(new Error("No se pudieron cargar los resultados."));
    };

    const params = new URLSearchParams({
      action: "resultados",
      tipo,
      callback: callbackName
    });

    script.src = `${WEB_APP_URL}?${params.toString()}`;

    document.body.appendChild(script);
  });
}

function cargarDetallePartidoConServidor(partidoId, tipo) {
  return new Promise((resolve, reject) => {
    const idPolla = obtenerPollaGlobalSeleccionada();

    if (!idPolla) {
      reject(new Error("Selecciona una polla para ver el detalle."));
      return;
    }

    const callbackName = `detalle_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    const script = document.createElement("script");

    const timeout = setTimeout(() => {
      limpiar();
      reject(new Error("Tiempo de espera agotado."));
    }, 10000);

    function limpiar() {
      clearTimeout(timeout);
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = (respuesta) => {
      limpiar();
      resolve(respuesta);
    };

    script.onerror = () => {
      limpiar();
      reject(new Error("No se pudo cargar el detalle del partido."));
    };

    const params = new URLSearchParams({
      action: "detallePartido",
      idPolla,
      partidoId,
      tipo,
      callback: callbackName
    });

    script.src = `${WEB_APP_URL}?${params.toString()}`;

    document.body.appendChild(script);
  });
}

function validarCodigoConServidor(codigoUsuario) {
  return new Promise((resolve, reject) => {
    const callbackName = `validarCodigo_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    const script = document.createElement("script");

    const timeout = setTimeout(() => {
      limpiar();
      reject(new Error("Tiempo de espera agotado."));
    }, 10000);

    function limpiar() {
      clearTimeout(timeout);
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = (respuesta) => {
      limpiar();
      resolve(respuesta);
    };

    script.onerror = () => {
      limpiar();
      reject(new Error("No se pudo validar el código."));
    };

    script.src = `${WEB_APP_URL}?action=validarCodigo&codigo=${encodeURIComponent(codigoUsuario)}&callback=${callbackName}`;

    document.body.appendChild(script);
  });
}

function cargarPronosticosUsuarioConServidor(codigoUsuario) {
  return new Promise((resolve, reject) => {
    const callbackName = `pronosticosUsuario_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    const script = document.createElement("script");

    const timeout = setTimeout(() => {
      limpiar();
      reject(new Error("Tiempo de espera agotado."));
    }, 10000);

    function limpiar() {
      clearTimeout(timeout);
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = (respuesta) => {
      limpiar();
      resolve(respuesta);
    };

    script.onerror = () => {
      limpiar();
      reject(new Error("No se pudieron cargar los pronÃ³sticos."));
    };

    script.src = `${WEB_APP_URL}?action=pronosticosUsuario&codigo=${encodeURIComponent(codigoUsuario)}&callback=${callbackName}`;

    document.body.appendChild(script);
  });
}

async function guardarPronosticosConServidor(datosGuardado) {
  const tipo = datosGuardado.tipo || "grupos";

  console.info("[Guardar pronósticos] API_MODE:", window.PollaApiClient?.API_MODE);
  console.info("[Guardar pronósticos] destino:", window.PollaApiClient?.NODE_API_BASE_URL);
  console.info("[Guardar pronósticos] tipo:", tipo);

  if (window.PollaApiClient?.API_MODE === "node") {
    const idPolla = obtenerPollaGlobalSeleccionada();

    if (!idPolla) {
      return {
        ok: false,
        error: "Selecciona una polla antes de guardar."
      };
    }

    if (tipo === "eliminacion") {
      const pronosticosEliminacion = (datosGuardado.pronosticos || []).map((pronostico) => ({
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

    return window.PollaApiClient.apiGuardarPronosticosGrupos(idPolla, datosGuardado.pronosticos || []);
  }

  console.warn("[Guardar pronósticos] usando fallback Apps Script");

  return new Promise((resolve, reject) => {
    const callbackName = `guardarPronosticos_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    const script = document.createElement("script");

    const timeout = setTimeout(() => {
      limpiar();
      reject(new Error("Tiempo de espera agotado."));
    }, 20000);

    function limpiar() {
      clearTimeout(timeout);
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = (respuesta) => {
      limpiar();
      resolve(respuesta);
    };

    script.onerror = () => {
      limpiar();
      reject(new Error("No se pudieron guardar los pronósticos."));
    };

    const data = encodeURIComponent(JSON.stringify(datosGuardado));

    script.src = `${WEB_APP_URL}?action=guardarPronosticos&data=${data}&callback=${callbackName}`;

    document.body.appendChild(script);
  });
}

function mostrarPollasDelParticipante(validacionCodigo) {
  const infoPollas = document.getElementById("infoPollas");

  if (!infoPollas) return;

  infoPollas.classList.remove("hidden", "error");

  const listaPollas = validacionCodigo.pollas
    .map((polla) => `<li>${escapeHTML(polla.nombre)}</li>`)
    .join("");

  infoPollas.innerHTML = `
    <strong>✅ Código validado</strong>
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
    <strong>⚠️ Código no válido</strong>
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
  const usuario = document.getElementById("usuario").value.trim();
  const codigoUsuario = document.getElementById("codigoUsuario").value.trim().toLowerCase();
  const btnIngresar = document.getElementById("btnIngresar");

  if (!usuario) {
    alert("Ingresa tu nombre 😊");
    return;
  }

  if (!codigoUsuario) {
    alert("Ingresa tu código de participante 🔐");
    return;
  }

  btnIngresar.disabled = true;
  btnIngresar.textContent = "Validando código... 🔐";

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

  guardarSesionActual(usuario, codigoUsuario);

  btnIngresar.textContent = "Cargando pronósticos... ⏳";

  await sincronizarPronosticosUsuarioDesdeServidor(codigoUsuario);

  mostrarPollasDelParticipante(validacionCodigo);
  abrirApp(validacionCodigo);

  btnIngresar.disabled = false;
  btnIngresar.textContent = "Ingresar";
}

function abrirApp(validacionCodigo) {
  const usuario = document.getElementById("usuario").value.trim();
  const codigoUsuario = document.getElementById("codigoUsuario").value.trim().toLowerCase();

  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("appView").classList.remove("hidden");

  document.getElementById("usuarioActivo").textContent = `Hola, ${usuario} · Código: ${codigoUsuario}`;

  mostrarResumenPollas(validacionCodigo.pollas);
  llenarSelectorPollaGlobal(validacionCodigo.pollas);
  llenarSelectorRanking(validacionCodigo.pollas);
  mostrarSeccion("pronosticos");
  recargarPronosticosGruposDesdeLocalStorage();
  recargarPronosticosEliminacionDesdeLocalStorage();
  actualizarContadorPronosticos();
}

function obtenerSesionGuardada() {
  const sesionActiva = sessionStorage.getItem(CLAVE_SESION_ACTIVA) === "true";
  const usuarioGuardado = sessionStorage.getItem(CLAVE_SESION_USUARIO) || "";
  const codigoGuardado = sessionStorage.getItem(CLAVE_SESION_CODIGO) || "";

  if (!sesionActiva || !usuarioGuardado.trim() || !codigoGuardado.trim()) return null;

  return {
    usuario: usuarioGuardado.trim(),
    codigo: codigoGuardado.trim().toLowerCase()
  };
}

async function iniciarSesionGuardada() {
  const sesionGuardada = obtenerSesionGuardada();

  if (!sesionGuardada) return false;

  const btnIngresar = document.getElementById("btnIngresar");
  const inputUsuario = document.getElementById("usuario");
  const inputCodigoUsuario = document.getElementById("codigoUsuario");

  inputUsuario.value = sesionGuardada.usuario;
  inputCodigoUsuario.value = sesionGuardada.codigo;

  btnIngresar.disabled = true;
  btnIngresar.textContent = "Cargando pronósticos... ⏳";

  try {
    const validacionCodigo = await validarCodigoConServidor(sesionGuardada.codigo);

    if (!validacionCodigo.ok) {
      limpiarSesionActual();
      inputUsuario.value = "";
      inputCodigoUsuario.value = "";
      document.getElementById("loginView").classList.remove("hidden");
      btnIngresar.disabled = false;
      btnIngresar.textContent = "Ingresar";
      return false;
    }

    await sincronizarPronosticosUsuarioDesdeServidor(sesionGuardada.codigo);
    mostrarPollasDelParticipante(validacionCodigo);
    abrirApp(validacionCodigo);

    return true;
  } catch (error) {
    console.error(error);
    inputUsuario.value = "";
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

function mostrarSeccion(seccion) {
  const seccionPronosticos = document.getElementById("seccionPronosticos");
  const seccionEliminacion = document.getElementById("seccionEliminacion");
  const seccionResultados = document.getElementById("seccionResultados");
  const seccionRanking = document.getElementById("seccionRanking");
  const seccionInformacion = document.getElementById("seccionInformacion");

  const tabPronosticos = document.getElementById("tabPronosticos");
  const tabEliminacion = document.getElementById("tabEliminacion");
  const tabResultados = document.getElementById("tabResultados");
  const tabRanking = document.getElementById("tabRanking");
  const tabInformacion = document.getElementById("tabInformacion");

  seccionPronosticos.classList.add("hidden");
  seccionEliminacion.classList.add("hidden");
  seccionResultados.classList.add("hidden");
  seccionRanking.classList.add("hidden");
  seccionInformacion.classList.add("hidden");

  tabPronosticos.classList.remove("active");
  tabEliminacion.classList.remove("active");
  tabResultados.classList.remove("active");
  tabRanking.classList.remove("active");
  tabInformacion.classList.remove("active");

  if (seccion === "pronosticos") {
    seccionPronosticos.classList.remove("hidden");
    tabPronosticos.classList.add("active");
  }

  if (seccion === "eliminacion") {
    seccionEliminacion.classList.remove("hidden");
    tabEliminacion.classList.add("active");

    if (llavesEliminacion.length === 0) {
      cargarYRenderizarEliminacion();
    } else {
      renderizarEliminacion();
    }
  }

  if (seccion === "resultados") {
    seccionResultados.classList.remove("hidden");
    tabResultados.classList.add("active");
    renderizarResultadosGrupos();
  }

  if (seccion === "ranking") {
    seccionRanking.classList.remove("hidden");
    tabRanking.classList.add("active");

    cargarRankingSeleccionado();
  }

  if (seccion === "informacion") {
    seccionInformacion.classList.remove("hidden");
    tabInformacion.classList.add("active");
    configurarAcordeonesInformacion();
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

  document.getElementById("usuario").value = "";
  document.getElementById("codigoUsuario").value = "";

  document.getElementById("appView").classList.add("hidden");
  document.getElementById("loginView").classList.remove("hidden");

  limpiarInfoPollas();
}

function cargarRankingConServidor(idPolla) {
  return new Promise((resolve, reject) => {
    const callbackName = `ranking_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    const script = document.createElement("script");

    const timeout = setTimeout(() => {
      limpiar();
      reject(new Error("Tiempo de espera agotado."));
    }, 10000);

    function limpiar() {
      clearTimeout(timeout);
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = (respuesta) => {
      limpiar();
      resolve(respuesta);
    };

    script.onerror = () => {
      limpiar();
      reject(new Error("No se pudo cargar el ranking."));
    };

    script.src = `${WEB_APP_URL}?action=ranking&polla=${encodeURIComponent(idPolla)}&callback=${callbackName}`;

    document.body.appendChild(script);
  });
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
    rankingContent.textContent = "Selecciona una polla para ver el ranking 🏅";
    return;
  }

  rankingContent.className = "ranking-placeholder";
  rankingContent.textContent = "Cargando ranking... ⏳";

  try {
    const respuesta = await cargarRankingConServidor(idPolla);

    if (!respuesta.ok) {
      rankingContent.className = "ranking-empty";
      rankingContent.textContent = respuesta.error || "No se pudo cargar el ranking.";
      return;
    }

    ultimoRankingCargado = respuesta.ranking || [];
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
    <p>Acertó diferencia de gol: ${escapeHTML(participante.diferenciaGrupos || 0)}</p>
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
  return llavesEliminacion.filter((partido) => {
    const bloqueadoPorHora = estaBloqueado({
      fecha: partido.fecha,
      hora: partido.hora
    });
    const estadoVisual = obtenerEstadoVisualEliminacion(partido, bloqueadoPorHora);

    return estadoVisual.bloqueado;
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

    const resultadoFinalizado = resultadoEliminacionFinalizadoValido(partido.id);
    const marcador = resultadoFinalizado
      ? `${escapeHTML(partido.golesLocalReal)} - ${escapeHTML(partido.golesVisitaReal)}`
      : "Resultado pendiente";
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
          <div class="${resultadoFinalizado ? "result-score" : "result-pending"}">${marcador}</div>
          ${clasificaSeguro}
        </div>
        <div class="team visitante">${visitaSeguro}</div>
      </div>

      <div class="result-hint">
        ${resultadoFinalizado ? "Ver detalle de puntos" : "Ver pron\u00f3sticos registrados"}
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
      Diferencia: ${escapeHTML(participante.diferenciaGrupos || 0)} ·
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
      Diferencia: ${escapeHTML(participante.diferenciaEliminacion || 0)} ·
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
      crearClaveEliminacion(partido.id, "clasifica"),
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
        crearClaveEliminacion(partido.id, "clasifica"),
        clasificaManual.value
      );
    } else {
      localStorage.removeItem(crearClaveEliminacion(partido.id, "clasifica"));
    }
  }

  if (!marcadorCompleto) {
    radiosClasifica.forEach((radio) => {
      radio.checked = false;
    });

    localStorage.removeItem(crearClaveEliminacion(partido.id, "clasifica"));
  }
}

function cargarLlavesConServidor() {
  return new Promise((resolve, reject) => {
    const callbackName = `llaves_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    const script = document.createElement("script");

    const timeout = setTimeout(() => {
      limpiar();
      reject(new Error("Tiempo de espera agotado."));
    }, 10000);

    function limpiar() {
      clearTimeout(timeout);
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = (respuesta) => {
      limpiar();
      resolve(respuesta);
    };

    script.onerror = () => {
      limpiar();
      reject(new Error("No se pudieron cargar las llaves."));
    };

    script.src = `${WEB_APP_URL}?action=llaves&callback=${callbackName}`;

    document.body.appendChild(script);
  });
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

    const clasificaGuardado = localStorage.getItem(crearClaveEliminacion(partido.id, "clasifica"));

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
          localStorage.setItem(crearClaveEliminacion(partido.id, "clasifica"), radio.value);
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
    const inputLocal = document.getElementById(`${partido.id}_elim_local`);
    const inputVisita = document.getElementById(`${partido.id}_elim_visita`);

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
    const usuario = document.getElementById("usuario").value.trim();
    const codigoUsuario = document.getElementById("codigoUsuario").value.trim().toLowerCase();
    const btnEnviar = document.getElementById("btnEnviar");

  if (!usuario) {
    alert("Ingresa tu nombre antes de guardar 😊");
    return;
  }

  if (!codigoUsuario) {
  alert("Ingresa tu código de participante antes de guardar 🔐");
  return;
}

btnEnviar.disabled = true;
btnEnviar.textContent = "Validando código... 🔐";

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

    const golesLocal = document.getElementById(`${partido.id}_local`).value;
    const golesVisita = document.getElementById(`${partido.id}_visita`).value;

    const localVacio = golesLocal === "";
    const visitaVacia = golesVisita === "";

    if (localVacio && visitaVacia) {
      continue;
    }

    if (localVacio || visitaVacia) {
      alert(`Te falta completar ambos goles en ${obtenerNombreEquipo(partido.local)} vs ${obtenerNombreEquipo(partido.visita)} ⚽`);
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
    alert("Completa al menos un partido disponible antes de guardar 😊");
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
      alert(respuesta.error || respuesta.mensaje || "No se pudieron guardar los pronósticos. Intenta nuevamente.");
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar mis pronósticos";
      return;
    }

    alert(respuesta.mensaje || "Pronósticos guardados correctamente ✅");
    btnEnviar.textContent = "Pronósticos guardados ✅";

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

const inputUsuario = document.getElementById("usuario");
const inputCodigoUsuario = document.getElementById("codigoUsuario");

inputUsuario.value = "";
inputCodigoUsuario.value = "";

inputCodigoUsuario.addEventListener("input", () => {
  recargarPronosticosGruposDesdeLocalStorage();
  recargarPronosticosEliminacionDesdeLocalStorage();
  actualizarContadorPronosticos();
  actualizarContadorEliminacion();
  limpiarInfoPollas();
});

document.addEventListener("click", cerrarDropdownPollaGlobal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cerrarDropdownPollaGlobal();
  }
});

function actualizarContadorPronosticos() {
  let completados = 0;

  partidos.forEach((partido) => {
    const inputLocal = document.getElementById(`${partido.id}_local`);
    const inputVisita = document.getElementById(`${partido.id}_visita`);

    if (!inputLocal || !inputVisita) return;

    if (inputLocal.value !== "" && inputVisita.value !== "") {
      completados++;
    }
  });

  const contador = document.getElementById("contadorPronosticos");

  if (contador) {
    contador.textContent = `Pron\u00f3sticos completados: ${completados} de ${TOTAL_PARTIDOS_GRUPOS}`;
  }
}

function obtenerCodigoActual() {
  return document.getElementById("codigoUsuario").value.trim().toLowerCase();
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
  const codigo = String(codigoUsuario || "").trim().toLowerCase();

  if (!codigo) return;

  limpiarPronosticosLocalesPorPrefijo(`pronostico_${codigo}_`);
  limpiarPronosticosLocalesPorPrefijo(`eliminacion_${codigo}_`);

  const grupos = (pronosticosServidor && pronosticosServidor.grupos) || [];
  const eliminacion = (pronosticosServidor && pronosticosServidor.eliminacion) || [];

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
    const inputLocal = document.getElementById(`${partido.id}_local`);
    const inputVisita = document.getElementById(`${partido.id}_visita`);

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
    const inputLocal = document.getElementById(`${partido.id}_elim_local`);
    const inputVisita = document.getElementById(`${partido.id}_elim_visita`);
    const radiosClasifica = obtenerRadiosClasifica(partido.id);

    if (inputLocal) {
      inputLocal.value = localStorage.getItem(crearClaveEliminacion(partido.id, "local")) || "";
    }

    if (inputVisita) {
      inputVisita.value = localStorage.getItem(crearClaveEliminacion(partido.id, "visita")) || "";
    }

    const clasificaGuardado = localStorage.getItem(crearClaveEliminacion(partido.id, "clasifica")) || "";

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
    const inputLocal = document.getElementById(`${partido.id}_local`);
    const inputVisita = document.getElementById(`${partido.id}_visita`);

    if (inputLocal) inputLocal.value = "";
    if (inputVisita) inputVisita.value = "";

    localStorage.removeItem(crearClavePronostico(partido.id, "local"));
    localStorage.removeItem(crearClavePronostico(partido.id, "visita"));
  });

  // Limpiar eliminación directa
  llavesEliminacion.forEach((partido) => {
    const inputLocal = document.getElementById(`${partido.id}_elim_local`);
    const inputVisita = document.getElementById(`${partido.id}_elim_visita`);
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
    localStorage.removeItem(crearClaveEliminacion(partido.id, "clasifica"));
  });

  actualizarContadorPronosticos();
  actualizarContadorEliminacion();

  alert("Pronósticos limpiados en este dispositivo ✅");
}

async function enviarEliminacion() {
  const usuario = document.getElementById("usuario").value.trim();
  const codigoUsuario = document.getElementById("codigoUsuario").value.trim().toLowerCase();
  const btnEnviar = document.getElementById("btnEnviarEliminacion");

  if (!usuario) {
    alert("Ingresa tu nombre antes de guardar 😊");
    return;
  }

  if (!codigoUsuario) {
    alert("Ingresa tu código de participante antes de guardar 🔐");
    return;
  }

  btnEnviar.disabled = true;
  btnEnviar.textContent = "Validando código... 🔐";

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

    const golesLocal = document.getElementById(`${partido.id}_elim_local`).value;
    const golesVisita = document.getElementById(`${partido.id}_elim_visita`).value;
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
      alert(`Te falta completar goles en ${localMostrado} vs ${visitaMostrada} ⚽`);
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar eliminación";
      return;
    }

    if (!clasifica) {
      alert(`El partido ${localMostrado} vs ${visitaMostrada} está empatado. Elige quién clasifica ⚽`);
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
    alert("Completa al menos un partido abierto de eliminación antes de guardar 😊");
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
      alert(respuesta.error || "No se pudo guardar la eliminación. Intenta nuevamente.");
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar eliminación";
      return;
    }

    alert("Pronósticos de eliminación guardados correctamente ✅");
    btnEnviar.textContent = "Eliminación guardada ✅";

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
  limpiarClavesSesionAntiguasLocalStorage();

  const sesionGuardada = obtenerSesionGuardada();

  if (sesionGuardada) {
    document.getElementById("loginView").classList.add("hidden");
  } else {
    document.getElementById("appView").classList.add("hidden");
    document.getElementById("loginView").classList.remove("hidden");
  }

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

  if (cargaResultados.status === "rejected") {
    console.error(cargaResultados.reason);
  }

  if (cargaResultadosEliminacion.status === "rejected") {
    console.error(cargaResultadosEliminacion.reason);
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
inicializarApp();

