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

const partidos = [
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

const HORAS_ANTES_BLOQUEO = 3;

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

function renderizarPartidos() {
  let grupoActual = "";

  partidos.forEach((partido) => {
    if (partido.grupo !== grupoActual) {
      grupoActual = partido.grupo;

      const tituloGrupo = document.createElement("h2");
      tituloGrupo.className = "group-title";
      tituloGrupo.textContent = `Grupo ${grupoActual}`;
      contenedorPartidos.appendChild(tituloGrupo);
    }

    const bloqueado = estaBloqueado(partido);
    const fechaSegura = escapeHTML(formatearFecha(partido.fecha));
    const horaSegura = escapeHTML(partido.hora);
    const localSeguro = escapeHTML(equipos[partido.local]);
    const visitaSeguro = escapeHTML(equipos[partido.visita]);

    const tarjeta = document.createElement("article");
    tarjeta.className = bloqueado ? "match-card locked" : "match-card";

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

      <div class="match-status ${bloqueado ? "locked" : "open"}">
        ${
          bloqueado
            ? "🔒 Pronóstico cerrado"
            : "✅ Disponible para editar"
        }
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

  localStorage.setItem("usuario", usuario);
  localStorage.setItem("codigoUsuario", codigoUsuario);

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
  llenarSelectorRanking(validacionCodigo.pollas);
  mostrarSeccion("pronosticos");
  recargarPronosticosGruposDesdeLocalStorage();
  recargarPronosticosEliminacionDesdeLocalStorage();
  actualizarContadorPronosticos();
}

async function iniciarSesionGuardada() {
  const usuarioGuardado = localStorage.getItem("usuario") || "";
  const codigoGuardado = localStorage.getItem("codigoUsuario") || "";

  if (!usuarioGuardado || !codigoGuardado) return;

  const btnIngresar = document.getElementById("btnIngresar");

  btnIngresar.disabled = true;
  btnIngresar.textContent = "Cargando pronósticos... ⏳";

  try {
    const validacionCodigo = await validarCodigoConServidor(codigoGuardado);

    if (!validacionCodigo.ok) {
      btnIngresar.disabled = false;
      btnIngresar.textContent = "Ingresar";
      return;
    }

    await sincronizarPronosticosUsuarioDesdeServidor(codigoGuardado);
    mostrarPollasDelParticipante(validacionCodigo);
    abrirApp(validacionCodigo);

  } catch (error) {
    console.error(error);
  }

  btnIngresar.disabled = false;
  btnIngresar.textContent = "Ingresar";
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

function mostrarSeccion(seccion) {
  const seccionPronosticos = document.getElementById("seccionPronosticos");
  const seccionEliminacion = document.getElementById("seccionEliminacion");
  const seccionRanking = document.getElementById("seccionRanking");

  const tabPronosticos = document.getElementById("tabPronosticos");
  const tabEliminacion = document.getElementById("tabEliminacion");
  const tabRanking = document.getElementById("tabRanking");

  seccionPronosticos.classList.add("hidden");
  seccionEliminacion.classList.add("hidden");
  seccionRanking.classList.add("hidden");

  tabPronosticos.classList.remove("active");
  tabEliminacion.classList.remove("active");
  tabRanking.classList.remove("active");

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

  if (seccion === "ranking") {
    seccionRanking.classList.remove("hidden");
    tabRanking.classList.add("active");

    cargarRankingSeleccionado();
  }
}

function cambiarUsuario() {
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

  if (pollas.length === 1) {
    selector.value = pollas[0].id;
    cargarRankingSeleccionado();
  }
}

async function cargarRankingSeleccionado() {
  const selector = document.getElementById("selectorPollaRanking");
  const rankingContent = document.getElementById("rankingContent");

  if (!selector || !rankingContent) return;

  const idPolla = selector.value;

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

  rankingContent.innerHTML = rankingOrdenado
    .map((participante, index) => {
      const posicion = index + 1;
      const puntos = obtenerPuntosSegunTipo(participante);
      const detalle = obtenerDetalleSegunTipo(participante);

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
    const estadoSeguro = escapeHTML(partido.estado);

    const estadoNormalizado = String(partido.estado || "").trim().toLowerCase();

    const abierto = estadoNormalizado === "abierto";
    const bloqueadoPorHora = estaBloqueado({
      fecha: partido.fecha,
      hora: partido.hora
    });

    const bloqueado = !abierto || bloqueadoPorHora;

    const tarjeta = document.createElement("article");
    tarjeta.className = bloqueado ? "match-card locked" : "match-card";

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

      <div class="match-status ${bloqueado ? "locked" : "open"}">
        ${
          bloqueado
            ? `🔒 ${estadoSeguro}`
            : "✅ Disponible para pronosticar"
        }
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

    if (!bloqueado) {
      inputLocal.addEventListener("input", () => {
        localStorage.setItem(crearClaveEliminacion(partido.id, "local"), inputLocal.value);
        actualizarContadorEliminacion();
      });

      inputVisita.addEventListener("input", () => {
        localStorage.setItem(crearClaveEliminacion(partido.id, "visita"), inputVisita.value);
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
    const estadoNormalizado = partido.estado.trim().toLowerCase();

    if (estadoNormalizado !== "abierto") return;

    const inputLocal = document.getElementById(`${partido.id}_elim_local`);
    const inputVisita = document.getElementById(`${partido.id}_elim_visita`);
    const clasifica = obtenerClasificaSeleccionado(partido.id);

    if (!inputLocal || !inputVisita) return;

    if (
      inputLocal.value !== "" &&
      inputVisita.value !== "" &&
      clasifica
    ) {
      completados++;
    }
  });

  const contador = document.getElementById("contadorEliminacion");

  if (contador) {
    contador.textContent = `Pronósticos de eliminación completados: ${completados}`;
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
    if (estaBloqueado(partido)) {
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
      alert(`Te falta completar ambos goles en ${equipos[partido.local]} vs ${equipos[partido.visita]} ⚽`);
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Guardar mis pronósticos";
      return;
    }

    pronosticos.push({
      id: partido.id,
      grupo: partido.grupo,
      fecha: partido.fecha,
      hora: partido.hora,
      local: equipos[partido.local],
      golesLocal: Number(golesLocal),
      golesVisita: Number(golesVisita),
      visita: equipos[partido.visita]
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
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        usuario,
        codigoUsuario,
        pronosticos
        })
    });

    alert("Pronósticos guardados correctamente ✅");
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

inputUsuario.value = localStorage.getItem("usuario") || "";
inputCodigoUsuario.value = localStorage.getItem("codigoUsuario") || "";

inputUsuario.addEventListener("input", () => {
  localStorage.setItem("usuario", inputUsuario.value);
});

inputCodigoUsuario.addEventListener("input", () => {
  localStorage.setItem("codigoUsuario", inputCodigoUsuario.value);
  recargarPronosticosGruposDesdeLocalStorage();
  recargarPronosticosEliminacionDesdeLocalStorage();
  actualizarContadorPronosticos();
  actualizarContadorEliminacion();
  limpiarInfoPollas();
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
    contador.textContent = `Pronósticos completados: ${completados} de ${partidos.length}`;
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
    const clasificaSeleccionado = obtenerClasificaSeleccionado(partido.id);

    const localVacio = golesLocal === "";
    const visitaVacia = golesVisita === "";
    const clasificaVacio = !clasificaSeleccionado;

    if (localVacio && visitaVacia && clasificaVacio) {
      continue;
    }

    if (localVacio || visitaVacia || clasificaVacio) {
      alert(`Te falta completar goles y clasificado en ${localMostrado} vs ${visitaMostrada} ⚽`);
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
      clasifica: clasificaSeleccionado.value
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
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        tipo: "eliminacion",
        usuario,
        codigoUsuario,
        pronosticos
      })
    });

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

// Iniciar página
renderizarPartidos();
actualizarContadorPronosticos();
iniciarSesionGuardada();
