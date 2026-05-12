// =====================================================
// POLLA MUNDIAL 2026 - APPS SCRIPT COMPLETO
// =====================================================

// -----------------------------------------------------
// POST: guarda pronósticos de grupos o eliminación
// -----------------------------------------------------

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const data = JSON.parse(e.postData.contents);

    return responder(procesarGuardadoPronosticos(ss, data));

  } catch (error) {
    return responder({
      ok: false,
      error: error.message
    });

  } finally {
    try {
      lock.releaseLock();
    } catch (error) {}
  }
}


// -----------------------------------------------------
// GET: valida código, carga ranking o carga llaves
// -----------------------------------------------------

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const hojaParticipantes = ss.getSheetByName("Participantes");
    const hojaPollas = ss.getSheetByName("Pollas");
    const hojaParticipantesPollas = ss.getSheetByName("Participantes_Pollas");
    const hojaPronosticos = ss.getSheetByName("Pronosticos");
    const hojaPronosticosEliminacion = ss.getSheetByName("Pronosticos_Eliminacion");
    const hojaResultados = ss.getSheetByName("Resultados");
    const hojaResultadosEliminacion = ss.getSheetByName("Resultados_Eliminacion");
    const hojaLlaves = ss.getSheetByName("Llaves");
    const hojaPartidos = ss.getSheetByName("Partidos");

    const action = e.parameter.action;
    const callback = e.parameter.callback || "callback";

    let respuesta = {
      ok: false,
      error: "Acción no válida."
    };

    if (action === "validarCodigo") {
      const codigoUsuario = normalizarTexto(e.parameter.codigo);

      if (!codigoUsuario) {
        respuesta = {
          ok: false,
          error: "Ingresa tu código de participante."
        };
      } else {
        const participante = obtenerParticipanteValido(
          hojaParticipantes,
          codigoUsuario
        );

        if (!participante.valido) {
          respuesta = {
            ok: false,
            error: "El código ingresado no existe o está inactivo."
          };
        } else {
          const pollasActivas = obtenerPollasDelParticipante(
            hojaParticipantesPollas,
            hojaPollas,
            codigoUsuario
          );

          if (pollasActivas.length === 0) {
            respuesta = {
              ok: false,
              error: "Este código no está inscrito en ninguna polla activa."
            };
          } else {
            respuesta = {
              ok: true,
              nombre: participante.nombre,
              pollas: pollasActivas
            };
          }
        }
      }
    }

    if (action === "ranking") {
      const idPolla = normalizarTexto(e.parameter.polla);

      if (!idPolla) {
        respuesta = {
          ok: false,
          error: "Debes indicar una polla."
        };
      } else {
        respuesta = obtenerRankingPolla(
          hojaParticipantes,
          hojaParticipantesPollas,
          hojaPronosticos,
          hojaResultados,
          idPolla
        );
      }
    }

    if (action === "pronosticosUsuario") {
      const codigoUsuario = normalizarTexto(e.parameter.codigo);

      if (!codigoUsuario) {
        respuesta = {
          ok: false,
          error: "Debes indicar un código de participante."
        };
      } else {
        const participante = obtenerParticipanteValido(
          hojaParticipantes,
          codigoUsuario
        );

        if (!participante.valido) {
          respuesta = {
            ok: false,
            error: "Código de participante no válido o inactivo."
          };
        } else {
          respuesta = obtenerPronosticosUsuario(
            hojaPronosticos,
            hojaPronosticosEliminacion,
            codigoUsuario
          );
        }
      }
    }

    if (action === "partidos") {
      respuesta = obtenerPartidos(hojaPartidos);
    }

    if (action === "resultados") {
      respuesta = obtenerResultados(hojaResultados);
    }

    if (action === "detallePartido") {
      respuesta = obtenerDetallePartido(
        hojaParticipantes,
        hojaPollas,
        hojaParticipantesPollas,
        hojaPronosticos,
        hojaResultados,
        hojaPronosticosEliminacion,
        hojaResultadosEliminacion,
        normalizarTexto(e.parameter.idPolla),
        String(e.parameter.partidoId || "").trim(),
        normalizarTexto(e.parameter.tipo || "grupos")
      );
    }

    if (action === "guardarPronosticos") {
      const lock = LockService.getScriptLock();

      try {
        lock.waitLock(10000);

        if (!e.parameter.data) {
          respuesta = {
            ok: false,
            error: "Datos incompletos."
          };
        } else {
          respuesta = procesarGuardadoPronosticos(
            ss,
            JSON.parse(e.parameter.data)
          );
        }
      } finally {
        try {
          lock.releaseLock();
        } catch (error) {}
      }
    }

    if (action === "llaves") {
      respuesta = obtenerLlaves(hojaLlaves);
    }

    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(respuesta)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);

  } catch (error) {
    const callback = e.parameter.callback || "callback";

    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify({
        ok: false,
        error: error.message
      })})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}


function procesarGuardadoPronosticos(ss, data) {
  const hojaPronosticos = ss.getSheetByName("Pronosticos");
  const hojaPronosticosEliminacion = ss.getSheetByName("Pronosticos_Eliminacion");
  const hojaParticipantes = ss.getSheetByName("Participantes");
  const hojaPollas = ss.getSheetByName("Pollas");
  const hojaParticipantesPollas = ss.getSheetByName("Participantes_Pollas");
  const hojaLlaves = ss.getSheetByName("Llaves");
  const hojaPartidos = ss.getSheetByName("Partidos");

  const tipo = data.tipo || "grupos";
  const fechaEnvio = new Date();
  const usuario = String(data.usuario || "").trim();
  const codigoUsuario = normalizarTexto(data.codigoUsuario);
  const pronosticos = data.pronosticos || [];

  if (!usuario || !codigoUsuario || pronosticos.length === 0) {
    return {
      ok: false,
      error: "Datos incompletos."
    };
  }

  const participante = obtenerParticipanteValido(
    hojaParticipantes,
    codigoUsuario
  );

  if (!participante.valido) {
    return {
      ok: false,
      error: "Código de participante no válido o inactivo."
    };
  }

  const pollasActivas = obtenerPollasDelParticipante(
    hojaParticipantesPollas,
    hojaPollas,
    codigoUsuario
  );

  if (pollasActivas.length === 0) {
    return {
      ok: false,
      error: "Este participante no está inscrito en ninguna polla activa."
    };
  }

  if (tipo === "eliminacion") {
    return guardarPronosticosEliminacion(
      hojaPronosticosEliminacion,
      hojaLlaves,
      fechaEnvio,
      usuario,
      codigoUsuario,
      pronosticos
    );
  }

  return guardarPronosticosGrupos(
    hojaPronosticos,
    hojaPartidos,
    fechaEnvio,
    usuario,
    codigoUsuario,
    pronosticos
  );
}


// =====================================================
// GUARDAR PRONÓSTICOS - GRUPOS
// =====================================================

function guardarPronosticosGrupos(
  hojaPronosticos,
  hojaPartidos,
  fechaEnvio,
  usuario,
  codigoUsuario,
  pronosticos
) {
  const mapaPartidos = obtenerMapaPartidos(hojaPartidos);
  const datosActuales = hojaPronosticos.getDataRange().getValues();
  const mapaFilas = {};

  for (let i = 1; i < datosActuales.length; i++) {
    const codigoExistente = normalizarTexto(datosActuales[i][2]);
    const partidoIdExistente = datosActuales[i][3];

    const clave = `${codigoExistente}|${partidoIdExistente}`;
    mapaFilas[clave] = i + 1;
  }

  let guardados = 0;
  let bloqueados = 0;
  let bloqueadosPorEstado = 0;
  let bloqueadosPorHorario = 0;

  pronosticos.forEach(p => {
    const partidoOficial = mapaPartidos[String(p.id || "").trim()];

    if (!partidoOficial) {
      throw new Error(`El partido ${p.id || "(sin ID)"} no existe en la hoja Partidos.`);
    }

    const estado = normalizarTexto(partidoOficial.estado);

    const estadoPermiteGuardar =
      !estado ||
      estado === "abierto" ||
      estado === "pendiente";

    if (!estadoPermiteGuardar) {
      bloqueados++;
      bloqueadosPorEstado++;
      return;
    }

    if (estaBloqueadoServidor(partidoOficial.fecha, partidoOficial.hora)) {
      bloqueados++;
      bloqueadosPorHorario++;
      return;
    }

    const fila = [
      fechaEnvio,
      usuario,
      codigoUsuario,
      p.id,
      partidoOficial.grupo,
      partidoOficial.local,
      p.golesLocal,
      p.golesVisita,
      partidoOficial.visita
    ];

    const clave = `${codigoUsuario}|${p.id}`;
    const filaExistente = mapaFilas[clave];

    if (filaExistente) {
      hojaPronosticos
        .getRange(filaExistente, 1, 1, fila.length)
        .setValues([fila]);
    } else {
      hojaPronosticos.appendRow(fila);
    }

    guardados++;
  });

  if (guardados === 0 && bloqueados > 0) {
    return {
      ok: false,
      tipo: "grupos",
      guardados,
      bloqueados,
      bloqueadosPorEstado,
      bloqueadosPorHorario,
      error: "No se guardaron pronósticos porque los partidos seleccionados están cerrados."
    };
  }

  const mensaje = bloqueados > 0
    ? "Se guardaron algunos pronósticos, pero otros no porque ya están cerrados."
    : "Pronósticos guardados correctamente.";

  return {
    ok: true,
    tipo: "grupos",
    guardados,
    bloqueados,
    bloqueadosPorEstado,
    bloqueadosPorHorario,
    mensaje
  };
}


// =====================================================
// PARTIDOS OFICIALES - GRUPOS
// =====================================================

function obtenerMapaPartidos(hojaPartidos) {
  if (!hojaPartidos) {
    throw new Error("Falta la hoja Partidos.");
  }

  const datos = hojaPartidos.getDataRange().getValues();

  if (datos.length < 1) {
    throw new Error("La hoja Partidos no tiene encabezados.");
  }

  const encabezados = datos[0].map(valor => normalizarTexto(valor));
  const requeridas = {
    partidoId: "partido id",
    grupo: "grupo",
    fecha: "fecha",
    hora: "hora",
    local: "local",
    visita: "visita",
    estado: "estado"
  };

  const indices = {};

  Object.keys(requeridas).forEach((clave) => {
    const indice = encabezados.indexOf(requeridas[clave]);

    if (indice === -1) {
      throw new Error(`La hoja Partidos debe incluir la columna "${requeridas[clave]}".`);
    }

    indices[clave] = indice;
  });

  const mapa = {};

  for (let i = 1; i < datos.length; i++) {
    const partidoId = String(datos[i][indices.partidoId] || "").trim();

    if (!partidoId) continue;

    mapa[partidoId] = {
      id: partidoId,
      grupo: String(datos[i][indices.grupo] || "").trim(),
      fecha: formatearFechaParaWeb(datos[i][indices.fecha]),
      hora: formatearHoraParaWeb(datos[i][indices.hora]),
      local: String(datos[i][indices.local] || "").trim(),
      visita: String(datos[i][indices.visita] || "").trim(),
      estado: String(datos[i][indices.estado] || "").trim()
    };
  }

  return mapa;
}

function obtenerPartidos(hojaPartidos) {
  const mapaPartidos = obtenerMapaPartidos(hojaPartidos);

  return {
    ok: true,
    partidos: Object.keys(mapaPartidos).map(id => mapaPartidos[id])
  };
}

function obtenerResultados(hojaResultados) {
  if (!hojaResultados) {
    throw new Error("Falta la hoja Resultados.");
  }

  const datos = hojaResultados.getDataRange().getValues();
  const resultados = [];

  for (let i = 1; i < datos.length; i++) {
    const partidoId = String(datos[i][0] || "").trim();

    if (!partidoId) continue;

    resultados.push({
      id: partidoId,
      grupo: String(datos[i][1] || "").trim(),
      local: String(datos[i][2] || "").trim(),
      golesLocalReal: datos[i][3],
      golesVisitaReal: datos[i][4],
      visita: String(datos[i][5] || "").trim(),
      estado: String(datos[i][6] || "").trim()
    });
  }

  return {
    ok: true,
    resultados
  };
}


// =====================================================
// GUARDAR PRONÓSTICOS - ELIMINACIÓN
// =====================================================

function guardarPronosticosEliminacion(
  hojaPronosticosEliminacion,
  hojaLlaves,
  fechaEnvio,
  usuario,
  codigoUsuario,
  pronosticos
) {
  const mapaLlaves = obtenerMapaLlaves(hojaLlaves);

  const datosActuales = hojaPronosticosEliminacion.getDataRange().getValues();
  const mapaFilas = {};

  for (let i = 1; i < datosActuales.length; i++) {
    const codigoExistente = normalizarTexto(datosActuales[i][2]);
    const partidoIdExistente = datosActuales[i][3];

    const clave = `${codigoExistente}|${partidoIdExistente}`;
    mapaFilas[clave] = i + 1;
  }

  let guardados = 0;
  let bloqueados = 0;

  pronosticos.forEach(p => {
    const llave = mapaLlaves[p.id];

    if (!llave) {
      bloqueados++;
      return;
    }

    const estado = normalizarTexto(llave.estado);

    if (estado !== "abierto") {
      bloqueados++;
      return;
    }

    if (estaBloqueadoServidor(llave.fecha, llave.hora)) {
      bloqueados++;
      return;
    }

    const fila = [
      fechaEnvio,
      usuario,
      codigoUsuario,
      p.id,
      p.ronda,
      p.local,
      p.golesLocal,
      p.golesVisita,
      p.visita,
      p.clasifica
    ];

    const clave = `${codigoUsuario}|${p.id}`;
    const filaExistente = mapaFilas[clave];

    if (filaExistente) {
      hojaPronosticosEliminacion
        .getRange(filaExistente, 1, 1, fila.length)
        .setValues([fila]);
    } else {
      hojaPronosticosEliminacion.appendRow(fila);
    }

    guardados++;
  });

  return {
    ok: true,
    tipo: "eliminacion",
    guardados,
    bloqueados
  };
}


// =====================================================
// CARGAR PRONÓSTICOS DE USUARIO
// =====================================================

function obtenerPronosticosUsuario(
  hojaPronosticos,
  hojaPronosticosEliminacion,
  codigoUsuario
) {
  const grupos = [];
  const eliminacion = [];

  const datosGrupos = hojaPronosticos.getDataRange().getValues();

  for (let i = 1; i < datosGrupos.length; i++) {
    const codigo = normalizarTexto(datosGrupos[i][2]);

    if (codigo !== codigoUsuario) continue;

    grupos.push({
      id: String(datosGrupos[i][3] || "").trim(),
      grupo: String(datosGrupos[i][4] || "").trim(),
      local: String(datosGrupos[i][5] || "").trim(),
      golesLocal: datosGrupos[i][6],
      golesVisita: datosGrupos[i][7],
      visita: String(datosGrupos[i][8] || "").trim()
    });
  }

  const datosEliminacion = hojaPronosticosEliminacion.getDataRange().getValues();

  for (let i = 1; i < datosEliminacion.length; i++) {
    const codigo = normalizarTexto(datosEliminacion[i][2]);

    if (codigo !== codigoUsuario) continue;

    eliminacion.push({
      id: String(datosEliminacion[i][3] || "").trim(),
      ronda: String(datosEliminacion[i][4] || "").trim(),
      local: String(datosEliminacion[i][5] || "").trim(),
      golesLocal: datosEliminacion[i][6],
      golesVisita: datosEliminacion[i][7],
      visita: String(datosEliminacion[i][8] || "").trim(),
      clasifica: String(datosEliminacion[i][9] || "").trim()
    });
  }

  return {
    ok: true,
    pronosticos: {
      grupos,
      eliminacion
    }
  };
}


// =====================================================
// PARTICIPANTES Y POLLAS
// =====================================================

function obtenerParticipanteValido(hojaParticipantes, codigoUsuario) {
  const datos = hojaParticipantes.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    const codigo = normalizarTexto(datos[i][0]);
    const nombre = String(datos[i][1] || "").trim();
    const activo = normalizarTexto(datos[i][2]);

    if (codigo === codigoUsuario && activo === "si") {
      return {
        valido: true,
        nombre
      };
    }
  }

  return {
    valido: false,
    nombre: ""
  };
}


function obtenerPollasDelParticipante(
  hojaParticipantesPollas,
  hojaPollas,
  codigoUsuario
) {
  const pollas = hojaPollas.getDataRange().getValues();
  const participantesPollas = hojaParticipantesPollas.getDataRange().getValues();

  const mapaPollasActivas = {};

  for (let i = 1; i < pollas.length; i++) {
    const idPolla = normalizarTexto(pollas[i][0]);
    const nombrePolla = String(pollas[i][1] || "").trim();
    const activa = normalizarTexto(pollas[i][2]);

    if (idPolla && activa === "si") {
      mapaPollasActivas[idPolla] = nombrePolla;
    }
  }

  const resultado = [];

  for (let i = 1; i < participantesPollas.length; i++) {
    const codigo = normalizarTexto(participantesPollas[i][0]);
    const idPolla = normalizarTexto(participantesPollas[i][1]);
    const activo = normalizarTexto(participantesPollas[i][2]);

    if (
      codigo === codigoUsuario &&
      activo === "si" &&
      mapaPollasActivas[idPolla]
    ) {
      resultado.push({
        id: idPolla,
        nombre: mapaPollasActivas[idPolla]
      });
    }
  }

  return resultado;
}


// =====================================================
// LLAVES DE ELIMINACIÓN
// =====================================================

function obtenerLlaves(hojaLlaves) {
  const datos = hojaLlaves.getDataRange().getValues();

  const llaves = [];

  for (let i = 1; i < datos.length; i++) {
    const partidoId = String(datos[i][0] || "").trim();
    const ronda = String(datos[i][1] || "").trim();
    const fecha = formatearFechaParaWeb(datos[i][2]);
    const hora = formatearHoraParaWeb(datos[i][3]);
    const localPlaceholder = String(datos[i][4] || "").trim();
    const local = String(datos[i][5] || "").trim();
    const visitaPlaceholder = String(datos[i][6] || "").trim();
    const visita = String(datos[i][7] || "").trim();
    const estado = String(datos[i][8] || "").trim();

    if (!partidoId) continue;

    llaves.push({
      id: partidoId,
      ronda,
      fecha,
      hora,
      localPlaceholder,
      local,
      visitaPlaceholder,
      visita,
      estado
    });
  }

  return {
    ok: true,
    llaves
  };
}


function obtenerMapaLlaves(hojaLlaves) {
  const datos = hojaLlaves.getDataRange().getValues();
  const mapa = {};

  for (let i = 1; i < datos.length; i++) {
    const partidoId = String(datos[i][0] || "").trim();

    if (!partidoId) continue;

    mapa[partidoId] = {
      id: partidoId,
      ronda: String(datos[i][1] || "").trim(),
      fecha: formatearFechaParaWeb(datos[i][2]),
      hora: formatearHoraParaWeb(datos[i][3]),
      localPlaceholder: String(datos[i][4] || "").trim(),
      local: String(datos[i][5] || "").trim(),
      visitaPlaceholder: String(datos[i][6] || "").trim(),
      visita: String(datos[i][7] || "").trim(),
      estado: String(datos[i][8] || "").trim()
    };
  }

  return mapa;
}


// =====================================================
// RANKING GENERAL
// =====================================================

function obtenerRankingPolla(
  hojaParticipantes,
  hojaParticipantesPollas,
  hojaPronosticos,
  hojaResultados,
  idPolla
) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const hojaPronosticosEliminacion = ss.getSheetByName("Pronosticos_Eliminacion");
  const hojaResultadosEliminacion = ss.getSheetByName("Resultados_Eliminacion");

  const participantes = hojaParticipantes.getDataRange().getValues();
  const participantesPollas = hojaParticipantesPollas.getDataRange().getValues();

  const participantesActivos = {};

  for (let i = 1; i < participantes.length; i++) {
    const codigo = normalizarTexto(participantes[i][0]);
    const nombre = String(participantes[i][1] || "").trim();
    const activo = normalizarTexto(participantes[i][2]);

    if (codigo && activo === "si") {
      participantesActivos[codigo] = {
        codigo,
        nombre,

        puntosGrupos: 0,
        puntosEliminacion: 0,
        puntosTotal: 0,

        exactosGrupos: 0,
        exactosEliminacion: 0,

        ganadorEmpateGrupos: 0,
        ganadorEmpateEliminacion: 0,

        golesLocalGrupos: 0,
        golesLocalEliminacion: 0,

        golesVisitaGrupos: 0,
        golesVisitaEliminacion: 0,

        diferenciaGrupos: 0,
        diferenciaEliminacion: 0,

        clasificados: 0,

        partidosGrupos: 0,
        partidosEliminacion: 0
      };
    }
  }

  const codigosPolla = {};

  for (let i = 1; i < participantesPollas.length; i++) {
    const codigo = normalizarTexto(participantesPollas[i][0]);
    const polla = normalizarTexto(participantesPollas[i][1]);
    const activo = normalizarTexto(participantesPollas[i][2]);

    if (
      codigo &&
      polla === idPolla &&
      activo === "si" &&
      participantesActivos[codigo]
    ) {
      codigosPolla[codigo] = true;
    }
  }

  calcularRankingGrupos(
    hojaPronosticos,
    hojaResultados,
    participantesActivos,
    codigosPolla
  );

  calcularRankingEliminacion(
    hojaPronosticosEliminacion,
    hojaResultadosEliminacion,
    participantesActivos,
    codigosPolla
  );

  const ranking = Object.keys(codigosPolla)
    .map(codigo => {
      const participante = participantesActivos[codigo];

      participante.puntosTotal =
        participante.puntosGrupos + participante.puntosEliminacion;

      return participante;
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (b.puntosTotal !== a.puntosTotal) {
        return b.puntosTotal - a.puntosTotal;
      }

      if (b.puntosGrupos !== a.puntosGrupos) {
        return b.puntosGrupos - a.puntosGrupos;
      }

      if (b.puntosEliminacion !== a.puntosEliminacion) {
        return b.puntosEliminacion - a.puntosEliminacion;
      }

      return a.nombre.localeCompare(b.nombre);
    });

  ranking.forEach((participante, index) => {
    participante.posicion = index + 1;
  });

  return {
    ok: true,
    ranking
  };
}


// =====================================================
// RANKING GRUPOS
// =====================================================

function calcularRankingGrupos(
  hojaPronosticos,
  hojaResultados,
  participantesActivos,
  codigosPolla
) {
  const pronosticos = hojaPronosticos.getDataRange().getValues();
  const resultados = hojaResultados.getDataRange().getValues();

  const resultadosPorPartido = {};

  for (let i = 1; i < resultados.length; i++) {
    const partidoId = String(resultados[i][0] || "").trim();
    const golesLocalReal = resultados[i][3];
    const golesVisitaReal = resultados[i][4];
    const estado = normalizarTexto(resultados[i][6]);

    if (
      partidoId &&
      estado === "finalizado" &&
      golesLocalReal !== "" &&
      golesVisitaReal !== ""
    ) {
      resultadosPorPartido[partidoId] = {
        golesLocal: Number(golesLocalReal),
        golesVisita: Number(golesVisitaReal)
      };
    }
  }

  for (let i = 1; i < pronosticos.length; i++) {
    const codigo = normalizarTexto(pronosticos[i][2]);
    const partidoId = String(pronosticos[i][3] || "").trim();

    if (!codigosPolla[codigo]) continue;
    if (!resultadosPorPartido[partidoId]) continue;

    const predLocal = Number(pronosticos[i][6]);
    const predVisita = Number(pronosticos[i][7]);
    const real = resultadosPorPartido[partidoId];

    const detalle = calcularDetallePuntosGrupos(
      predLocal,
      predVisita,
      real.golesLocal,
      real.golesVisita
    );

    const participante = participantesActivos[codigo];

    participante.puntosGrupos += detalle.total;
    participante.partidosGrupos += 1;

    if (detalle.exacto) participante.exactosGrupos += 1;
    if (detalle.ganadorEmpate) participante.ganadorEmpateGrupos += 1;
    if (detalle.golesLocal) participante.golesLocalGrupos += 1;
    if (detalle.golesVisita) participante.golesVisitaGrupos += 1;
    if (detalle.diferencia) participante.diferenciaGrupos += 1;
  }
}


// =====================================================
// RANKING ELIMINACIÓN
// =====================================================

function calcularRankingEliminacion(
  hojaPronosticosEliminacion,
  hojaResultadosEliminacion,
  participantesActivos,
  codigosPolla
) {
  const pronosticos = hojaPronosticosEliminacion.getDataRange().getValues();
  const resultados = hojaResultadosEliminacion.getDataRange().getValues();

  const resultadosPorPartido = {};

  for (let i = 1; i < resultados.length; i++) {
    const partidoId = String(resultados[i][0] || "").trim();
    const golesLocalReal = resultados[i][3];
    const golesVisitaReal = resultados[i][4];
    const clasificaReal = String(resultados[i][6] || "").trim();
    const estado = normalizarTexto(resultados[i][7]);

    if (
      partidoId &&
      estado === "finalizado" &&
      golesLocalReal !== "" &&
      golesVisitaReal !== "" &&
      clasificaReal
    ) {
      resultadosPorPartido[partidoId] = {
        golesLocal: Number(golesLocalReal),
        golesVisita: Number(golesVisitaReal),
        clasifica: normalizarTexto(clasificaReal)
      };
    }
  }

  for (let i = 1; i < pronosticos.length; i++) {
    const codigo = normalizarTexto(pronosticos[i][2]);
    const partidoId = String(pronosticos[i][3] || "").trim();

    if (!codigosPolla[codigo]) continue;
    if (!resultadosPorPartido[partidoId]) continue;

    const predLocal = Number(pronosticos[i][6]);
    const predVisita = Number(pronosticos[i][7]);
    const clasificaPred = normalizarTexto(pronosticos[i][9]);

    const real = resultadosPorPartido[partidoId];

    const detalle = calcularDetallePuntosEliminacion(
      predLocal,
      predVisita,
      clasificaPred,
      real.golesLocal,
      real.golesVisita,
      real.clasifica
    );

    const participante = participantesActivos[codigo];

    participante.puntosEliminacion += detalle.total;
    participante.partidosEliminacion += 1;

    if (detalle.exacto) participante.exactosEliminacion += 1;
    if (detalle.ganadorEmpate) participante.ganadorEmpateEliminacion += 1;
    if (detalle.golesLocal) participante.golesLocalEliminacion += 1;
    if (detalle.golesVisita) participante.golesVisitaEliminacion += 1;
    if (detalle.diferencia) participante.diferenciaEliminacion += 1;
    if (detalle.clasificado) participante.clasificados += 1;
  }
}


// =====================================================
// DETALLE DE PUNTOS POR PARTIDO
// =====================================================

function obtenerParticipantesDePolla(
  hojaParticipantes,
  hojaPollas,
  hojaParticipantesPollas,
  idPolla
) {
  const participantes = hojaParticipantes.getDataRange().getValues();
  const pollas = hojaPollas.getDataRange().getValues();
  const participantesPollas = hojaParticipantesPollas.getDataRange().getValues();

  const participantesActivos = {};
  let nombrePolla = "";
  let pollaActiva = false;

  for (let i = 1; i < participantes.length; i++) {
    const codigo = normalizarTexto(participantes[i][0]);
    const nombre = String(participantes[i][1] || "").trim();
    const activo = normalizarTexto(participantes[i][2]);

    if (codigo && activo === "si") {
      participantesActivos[codigo] = {
        codigo,
        nombre
      };
    }
  }

  for (let i = 1; i < pollas.length; i++) {
    const id = normalizarTexto(pollas[i][0]);
    const nombre = String(pollas[i][1] || "").trim();
    const activa = normalizarTexto(pollas[i][2]);

    if (id === idPolla && activa === "si") {
      nombrePolla = nombre;
      pollaActiva = true;
      break;
    }
  }

  if (!pollaActiva) {
    throw new Error("La polla seleccionada no existe o no estÃ¡ activa.");
  }

  const participantesPolla = {};

  for (let i = 1; i < participantesPollas.length; i++) {
    const codigo = normalizarTexto(participantesPollas[i][0]);
    const polla = normalizarTexto(participantesPollas[i][1]);
    const activo = normalizarTexto(participantesPollas[i][2]);

    if (
      codigo &&
      polla === idPolla &&
      activo === "si" &&
      participantesActivos[codigo]
    ) {
      participantesPolla[codigo] = {
        codigo,
        nombre: participantesActivos[codigo].nombre,
        puntos: 0,
        sinPronostico: true
      };
    }
  }

  return {
    nombrePolla,
    participantes: participantesPolla
  };
}


function obtenerDetallePartido(
  hojaParticipantes,
  hojaPollas,
  hojaParticipantesPollas,
  hojaPronosticos,
  hojaResultados,
  hojaPronosticosEliminacion,
  hojaResultadosEliminacion,
  idPolla,
  partidoId,
  tipo
) {
  if (!idPolla) {
    return {
      ok: false,
      error: "Debes seleccionar una polla."
    };
  }

  if (!partidoId) {
    return {
      ok: false,
      error: "Debes indicar un partido."
    };
  }

  const datosPolla = obtenerParticipantesDePolla(
    hojaParticipantes,
    hojaPollas,
    hojaParticipantesPollas,
    idPolla
  );

  if (tipo === "eliminacion") {
    return obtenerDetallePartidoEliminacion(
      hojaPronosticosEliminacion,
      hojaResultadosEliminacion,
      datosPolla,
      idPolla,
      partidoId
    );
  }

  return obtenerDetallePartidoGrupos(
    hojaPronosticos,
    hojaResultados,
    datosPolla,
    idPolla,
    partidoId
  );
}


function obtenerDetallePartidoGrupos(
  hojaPronosticos,
  hojaResultados,
  datosPolla,
  idPolla,
  partidoId
) {
  const resultados = hojaResultados.getDataRange().getValues();
  let resultado = null;

  for (let i = 1; i < resultados.length; i++) {
    const id = String(resultados[i][0] || "").trim();
    const estado = normalizarTexto(resultados[i][6]);

    if (id === partidoId) {
      resultado = {
        partidoId,
        grupo: String(resultados[i][1] || "").trim(),
        local: String(resultados[i][2] || "").trim(),
        golesLocalReal: resultados[i][3],
        golesVisitaReal: resultados[i][4],
        visita: String(resultados[i][5] || "").trim(),
        estado
      };
      break;
    }
  }

  if (
    !resultado ||
    resultado.estado !== "finalizado" ||
    resultado.golesLocalReal === "" ||
    resultado.golesVisitaReal === ""
  ) {
    return {
      ok: false,
      error: "El resultado aÃºn no estÃ¡ disponible."
    };
  }

  const pronosticos = hojaPronosticos.getDataRange().getValues();

  for (let i = 1; i < pronosticos.length; i++) {
    const codigo = normalizarTexto(pronosticos[i][2]);
    const id = String(pronosticos[i][3] || "").trim();

    if (id !== partidoId || !datosPolla.participantes[codigo]) continue;

    const predLocal = Number(pronosticos[i][6]);
    const predVisita = Number(pronosticos[i][7]);
    const detalle = calcularDetallePuntosGrupos(
      predLocal,
      predVisita,
      Number(resultado.golesLocalReal),
      Number(resultado.golesVisitaReal)
    );

    datosPolla.participantes[codigo].puntos = detalle.total;
    datosPolla.participantes[codigo].sinPronostico = false;
    datosPolla.participantes[codigo].pronostico = {
      golesLocal: predLocal,
      golesVisita: predVisita
    };
    datosPolla.participantes[codigo].detalle = detalle;
  }

  return responderDetallePartido(datosPolla, idPolla, "grupos", resultado);
}


function obtenerDetallePartidoEliminacion(
  hojaPronosticosEliminacion,
  hojaResultadosEliminacion,
  datosPolla,
  idPolla,
  partidoId
) {
  const resultados = hojaResultadosEliminacion.getDataRange().getValues();
  let resultado = null;

  for (let i = 1; i < resultados.length; i++) {
    const id = String(resultados[i][0] || "").trim();
    const estado = normalizarTexto(resultados[i][7]);

    if (id === partidoId) {
      resultado = {
        partidoId,
        ronda: String(resultados[i][1] || "").trim(),
        local: String(resultados[i][2] || "").trim(),
        golesLocalReal: resultados[i][3],
        golesVisitaReal: resultados[i][4],
        visita: String(resultados[i][5] || "").trim(),
        clasifica: normalizarTexto(resultados[i][6]),
        estado
      };
      break;
    }
  }

  if (
    !resultado ||
    resultado.estado !== "finalizado" ||
    resultado.golesLocalReal === "" ||
    resultado.golesVisitaReal === "" ||
    !resultado.clasifica
  ) {
    return {
      ok: false,
      error: "El resultado aÃºn no estÃ¡ disponible."
    };
  }

  const pronosticos = hojaPronosticosEliminacion.getDataRange().getValues();

  for (let i = 1; i < pronosticos.length; i++) {
    const codigo = normalizarTexto(pronosticos[i][2]);
    const id = String(pronosticos[i][3] || "").trim();

    if (id !== partidoId || !datosPolla.participantes[codigo]) continue;

    const predLocal = Number(pronosticos[i][6]);
    const predVisita = Number(pronosticos[i][7]);
    const clasificaPred = normalizarTexto(pronosticos[i][9]);
    const detalle = calcularDetallePuntosEliminacion(
      predLocal,
      predVisita,
      clasificaPred,
      Number(resultado.golesLocalReal),
      Number(resultado.golesVisitaReal),
      resultado.clasifica
    );

    datosPolla.participantes[codigo].puntos = detalle.total;
    datosPolla.participantes[codigo].sinPronostico = false;
    datosPolla.participantes[codigo].pronostico = {
      golesLocal: predLocal,
      golesVisita: predVisita,
      clasifica: clasificaPred
    };
    datosPolla.participantes[codigo].detalle = detalle;
  }

  return responderDetallePartido(datosPolla, idPolla, "eliminacion", resultado);
}


function responderDetallePartido(datosPolla, idPolla, tipo, resultado) {
  const participantes = Object.keys(datosPolla.participantes)
    .map(codigo => datosPolla.participantes[codigo])
    .sort((a, b) => {
      if (b.puntos !== a.puntos) {
        return b.puntos - a.puntos;
      }

      return a.nombre.localeCompare(b.nombre);
    });

  return {
    ok: true,
    tipo,
    polla: {
      id: idPolla,
      nombre: datosPolla.nombrePolla
    },
    partido: resultado,
    participantes
  };
}


// =====================================================
// PUNTAJES
// =====================================================

function calcularDetallePuntosGrupos(
  predLocal,
  predVisita,
  realLocal,
  realVisita
) {
  const exacto = predLocal === realLocal && predVisita === realVisita;

  if (exacto) {
    return {
      total: 10,
      exacto: true,
      ganadorEmpate: false,
      golesLocal: false,
      golesVisita: false,
      diferencia: false
    };
  }

  const ganadorEmpate =
    obtenerSignoResultado(predLocal, predVisita) ===
    obtenerSignoResultado(realLocal, realVisita);

  const golesLocal = predLocal === realLocal;
  const golesVisita = predVisita === realVisita;

  const diferencia =
    predLocal - predVisita === realLocal - realVisita;

  let total = 0;

  if (ganadorEmpate) total += 3;
  if (golesLocal) total += 2;
  if (golesVisita) total += 2;
  if (diferencia) total += 1;

  return {
    total,
    exacto: false,
    ganadorEmpate,
    golesLocal,
    golesVisita,
    diferencia
  };
}


function calcularDetallePuntosEliminacion(
  predLocal,
  predVisita,
  clasificaPred,
  realLocal,
  realVisita,
  clasificaReal
) {
  const exacto = predLocal === realLocal && predVisita === realVisita;
  const clasificado = clasificaPred === clasificaReal;

  if (exacto) {
    return {
      total: 10 + (clasificado ? 3 : 0),
      exacto: true,
      ganadorEmpate: false,
      golesLocal: false,
      golesVisita: false,
      diferencia: false,
      clasificado
    };
  }

  const ganadorEmpate =
    obtenerSignoResultado(predLocal, predVisita) ===
    obtenerSignoResultado(realLocal, realVisita);

  const golesLocal = predLocal === realLocal;
  const golesVisita = predVisita === realVisita;

  const diferencia =
    predLocal - predVisita === realLocal - realVisita;

  let total = 0;

  if (ganadorEmpate) total += 3;
  if (golesLocal) total += 2;
  if (golesVisita) total += 2;
  if (diferencia) total += 1;
  if (clasificado) total += 3;

  return {
    total,
    exacto: false,
    ganadorEmpate,
    golesLocal,
    golesVisita,
    diferencia,
    clasificado
  };
}


function obtenerSignoResultado(local, visita) {
  if (local > visita) return "local";
  if (local < visita) return "visita";
  return "empate";
}


// =====================================================
// UTILIDADES
// =====================================================

function normalizarTexto(texto) {
  return String(texto || "")
    .trim()
    .toLowerCase();
}


function estaBloqueadoServidor(fecha, hora) {
  const HORAS_ANTES_BLOQUEO = 3;

  const inicioPartido = new Date(`${fecha}T${hora}:00`);
  const limiteEdicion = new Date(
    inicioPartido.getTime() - HORAS_ANTES_BLOQUEO * 60 * 60 * 1000
  );

  return new Date() >= limiteEdicion;
}


function formatearFechaParaWeb(valor) {
  if (Object.prototype.toString.call(valor) === "[object Date]") {
    return Utilities.formatDate(
      valor,
      Session.getScriptTimeZone(),
      "yyyy-MM-dd"
    );
  }

  return String(valor || "").trim();
}


function formatearHoraParaWeb(valor) {
  if (Object.prototype.toString.call(valor) === "[object Date]") {
    return Utilities.formatDate(
      valor,
      Session.getScriptTimeZone(),
      "HH:mm"
    );
  }

  return String(valor || "").trim();
}


function responder(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
