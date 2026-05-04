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

    const tarjeta = document.createElement("article");
    tarjeta.className = bloqueado ? "match-card locked" : "match-card";

    tarjeta.innerHTML = `
      <div class="match-info">
        ${formatearFecha(partido.fecha)} · ${partido.hora} hrs
      </div>

      <div class="match-row">
        <div class="team local">${equipos[partido.local]}</div>

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

        <div class="team visitante">${equipos[partido.visita]}</div>
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
  actualizarContadorPronosticos();
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

function limpiarFormulario() {
  const confirmar = confirm("¿Seguro que quieres limpiar los pronósticos de este formulario?");

  if (!confirmar) return;

  partidos.forEach((partido) => {
    const inputLocal = document.getElementById(`${partido.id}_local`);
    const inputVisita = document.getElementById(`${partido.id}_visita`);

    if (inputLocal) inputLocal.value = "";
    if (inputVisita) inputVisita.value = "";

    localStorage.removeItem(crearClavePronostico(partido.id, "local"));
    localStorage.removeItem(crearClavePronostico(partido.id, "visita"));
  });

  actualizarContadorPronosticos();

  alert("Formulario limpio ✅");
}
// Iniciar página
renderizarPartidos();
actualizarContadorPronosticos();