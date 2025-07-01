// -----------------------------
// test.js - Lógica del test
// -----------------------------

if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("dark-mode");
}

const btnModoOscuro = document.getElementById("modoOscuroBtn");
if (btnModoOscuro) {
  btnModoOscuro.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("modoOscuro", document.body.classList.contains("dark-mode"));
  });
}

// Variables globales
let preguntas = JSON.parse(localStorage.getItem("preguntas") || "[]");
let tema = localStorage.getItem("tema") || "Test";
let modoJuego = localStorage.getItem("modoJuego") || "examen";
let archivoJson = localStorage.getItem("archivoJson") || "";
let respuestasUsuario = new Array(preguntas.length).fill(null);
let correccionesMostradas = new Array(preguntas.length).fill(false);
let indice = 0;
let tiempo = 0;
let temporizador;

const preguntaCard = document.getElementById("preguntaCard");
const tituloTest = document.getElementById("tituloTest");
const timerElement = document.querySelector("#timer span");

window.onload = () => {
  tituloTest.textContent = tema;
  temporizador = setInterval(actualizarTimer, 1000);
  mostrarPregunta();
};

function mostrarPregunta() {
  const p = preguntas[indice];
  const seleccion = respuestasUsuario[indice];
  const mostrarCorreccion = correccionesMostradas[indice];

  if (modoJuego === "flashcards") {
    mostrarFlashcard(p);
    return;
  }

  const opcionesHTML = p.opciones.map((op, i) => {
    const letra = String.fromCharCode(65 + i);
    let claseExtra = "";

    if (mostrarCorreccion && seleccion !== null) {
      if (op === p.respuestaCorrecta) claseExtra = "correcta";
      else if (op === seleccion && op !== p.respuestaCorrecta) claseExtra = "incorrecta";
    } else if (op === seleccion) {
      claseExtra = "seleccionada";
    }

    const habilitarClick =
      modoJuego === "examen" ||
      (modoJuego === "repaso" && !mostrarCorreccion);

    const bloqueable = habilitarClick ? `onclick="seleccionarOpcion('${op}')"` : "";

    return `
      <div class="opcion ${claseExtra}" ${bloqueable}>
        <span><strong>${letra}.</strong> ${op}</span>
      </div>`;
  }).join("");

  const mostrarBotonComprobar = modoJuego === "repaso" && seleccion !== null && !mostrarCorreccion;
  const mostrarBotonSiguiente = modoJuego !== "repaso" || mostrarCorreccion;

  preguntaCard.innerHTML = `
    <p><strong>Pregunta ${indice + 1} de ${preguntas.length}</strong></p>
    <div class="mb-3 pregunta-box">${p.pregunta}</div>
    ${opcionesHTML}
    <div class="mt-3 d-flex justify-content-between">
      <button class="btn btn-outline-secondary" onclick="anterior()" ${indice === 0 ? "disabled" : ""}>Anterior</button>
      ${mostrarBotonComprobar ? `<button class="btn btn-success" onclick="comprobar()">Comprobar</button>` : ""}
      ${mostrarBotonSiguiente ? `<button class="btn btn-primary" onclick="siguiente()">Siguiente</button>` : ""}
    </div>`;
}

function seleccionarOpcion(opcion) {
  const modo = modoJuego.toLowerCase();
  const yaComprobado = correccionesMostradas[indice];

  if (modo === "repaso" && yaComprobado) return;

  respuestasUsuario[indice] = opcion;
  mostrarPregunta();
}

function comprobar() {
  correccionesMostradas[indice] = true;
  mostrarPregunta();
}

function siguiente() {
  if (!respuestasUsuario[indice]) {
    alert("Selecciona una opción antes de continuar.");
    return;
  }
  indice++;
  indice < preguntas.length ? mostrarPregunta() : mostrarResultados();
}

function anterior() {
  if (indice > 0) {
    indice--;
    mostrarPregunta();
  }
}

function actualizarTimer() {
  tiempo++;
  const min = Math.floor(tiempo / 60);
  const sec = tiempo % 60;
  if (timerElement) {
    timerElement.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
  }
}

function mostrarResultados() {
  clearInterval(temporizador);
  const correctas = preguntas.filter((p, i) => p.respuestaCorrecta === respuestasUsuario[i]).length;
  preguntaCard.innerHTML = `
    <h4 class="text-center">✅ Has acertado ${correctas} de ${preguntas.length} preguntas.</h4>
    <div class="text-center mt-4 d-flex flex-column gap-3 align-items-center">
      <button class="btn btn-primary" onclick="revisarRespuestas()">👁 Revisar respuestas</button>
      <button class="btn btn-outline-secondary" onclick="reiniciarTest()">🔁 Reiniciar test</button>
      <a class="btn btn-outline-secondary" href="index.html">🏠 Volver al inicio</a>
    </div>`;
}

function revisarRespuestas() {
  let contenido = "";
  preguntas.forEach((p, i) => {
    contenido += `<p><strong>Pregunta ${i + 1}:</strong> ${p.pregunta}</p>`;
    contenido += p.opciones.map((op, j) => {
      let clase = "";
      if (op === p.respuestaCorrecta) clase = "correcta";
      if (op === respuestasUsuario[i] && op !== p.respuestaCorrecta) clase = "incorrecta";
      const letra = String.fromCharCode(65 + j);
      return `<div class="opcion ${clase}"><span><strong>${letra}.</strong> ${op}</span></div>`;
    }).join("");
  });

  preguntaCard.innerHTML = `
    <h4 class="text-center mb-4">👁 Revisión de respuestas</h4>
    <div>${contenido}</div>
    <div class="text-center mt-4">
      <button class="btn btn-outline-secondary" onclick="reiniciarTest()">🔁 Reiniciar test</button>
      <a class="btn btn-outline-secondary ms-2" href="index.html">🏠 Volver al inicio</a>
    </div>`;
}

async function reiniciarTest() {
  if (!archivoJson) {
    alert("No se puede reiniciar el test porque no se ha guardado el archivo JSON.");
    return;
  }
  try {
    const response = await fetch(`./data/${archivoJson}`);
    const todas = await response.json();
    preguntas = mezclarArray(todas)
      .filter((p, index, self) => index === self.findIndex(q => q.pregunta === p.pregunta))
      .slice(0, 20)
      .map(p => ({ ...p, opciones: mezclarArray([...p.opciones]) }));

    respuestasUsuario = new Array(preguntas.length).fill(null);
    correccionesMostradas = new Array(preguntas.length).fill(false);
    indice = 0;
    tiempo = 0;
    clearInterval(temporizador);
    temporizador = setInterval(actualizarTimer, 1000);
    mostrarPregunta();
  } catch (error) {
    alert("Error al reiniciar el test.");
    console.error(error);
  }
}

function mostrarFlashcard(p) {
  preguntaCard.innerHTML = `
    <p><strong>Flashcard ${indice + 1} de ${preguntas.length}</strong></p>
    <div class="mb-3 pregunta-box">${p.pregunta}</div>
    <div class="mt-3 d-flex justify-content-end">
      <button class="btn btn-primary" onclick="mostrarRespuestaFlashcard()">Siguiente</button>
    </div>`;
}

function mostrarRespuestaFlashcard() {
  const p = preguntas[indice];
  preguntaCard.innerHTML = `
    <p><strong>Flashcard ${indice + 1} de ${preguntas.length}</strong></p>
    <div class="mb-3 pregunta-box animate__animated animate__flipInY">
      <strong>Respuesta:</strong><br>${p.respuestaCorrecta}
    </div>
    <div class="mt-3 d-flex justify-content-end">
      <button class="btn btn-primary" onclick="siguienteFlashcard()">Siguiente</button>
    </div>`;
}

function siguienteFlashcard() {
  indice++;
  indice < preguntas.length ? mostrarPregunta() : mostrarResultados();
}

function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
document.addEventListener("DOMContentLoaded", () => {
  const bloqueDonacion = document.getElementById("bloqueDonacion");
  const btnCafe = document.getElementById("btnCafeTest");
  const btnCerrar = document.getElementById("cerrarDonacion");
  const linkDonar = document.getElementById("donarLinkTest");

  // Protege el enlace de donación
  if (linkDonar) {
    linkDonar.href = "https://" + "revolut.me/" + "adrianz5c8";
  }

  btnCerrar.addEventListener("click", () => {
    bloqueDonacion.style.display = "none";
    btnCafe.classList.remove("d-none");
  });

  btnCafe.addEventListener("click", () => {
    bloqueDonacion.style.display = "block";
    btnCafe.classList.add("d-none");
  });
});