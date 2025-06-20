let preguntas = [];
let preguntaActual = 0;
let puntuacion = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultSection = document.getElementById("result");
const quizSection = document.getElementById("quiz");
const scoreText = document.getElementById("score-text");

window.addEventListener("DOMContentLoaded", () => {
  alert("Este test está basado en el temario oficial de la Policía Foral. Pulsa 'Aceptar' para comenzar.");

  fetch("data/policia-foral.json")
    .then(response => response.json())
    .then(data => {
      preguntas = shuffleArray(data).slice(0, 20);
      startQuiz();
    });
});

function startQuiz() {
  preguntaActual = 0;
  puntuacion = 0;
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  mostrarPregunta();
}

function mostrarPregunta() {
  const pregunta = preguntas[preguntaActual];
  questionText.textContent = pregunta.pregunta;
  optionsContainer.innerHTML = "";
  nextBtn.classList.add("hidden");

  pregunta.opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.addEventListener("click", () => comprobarRespuesta(btn, opcion, pregunta.respuestaCorrecta));
    optionsContainer.appendChild(btn);
  });
}

function comprobarRespuesta(boton, seleccionada, correcta) {
  const botones = optionsContainer.querySelectorAll("button");
  botones.forEach(b => {
    b.disabled = true;
    if (b.textContent === correcta) b.classList.add("correct");
    else if (b.textContent === seleccionada) b.classList.add("wrong");
  });

  if (seleccionada === correcta) puntuacion++;
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  preguntaActual++;
  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  scoreText.textContent = `Has acertado ${puntuacion} de ${preguntas.length} preguntas.`;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

 function cerrarAlerta() {
  document.getElementById('alertaTest').style.display = 'none';
  document.body.classList.remove('modal-open');
  startQuiz(); // Inicia test directamente
}

window.onload = () => {
  document.body.classList.add('modal-open');
};


