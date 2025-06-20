const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const restartBtn = document.getElementById("restart-btn");

let respuestasUsuario = [];

function mostrarTest() {
  quizContainer.innerHTML = "";

  preguntas.forEach((item, index) => {
    const divPregunta = document.createElement("div");
    divPregunta.className = "question";
    divPregunta.innerHTML = `<p><strong>${index + 1}. ${item.pregunta}</strong></p>`;

    item.opciones.forEach((opcion, i) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="pregunta${index}" value="${i}"> ${opcion}
      `;
      divPregunta.appendChild(label);
      divPregunta.appendChild(document.createElement("br"));
    });

    quizContainer.appendChild(divPregunta);
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Finalizar Test";
  submitBtn.addEventListener("click", evaluarRespuestas);
  quizContainer.appendChild(submitBtn);
}

function evaluarRespuestas() {
  let aciertos = 0;
  respuestasUsuario = [];

  preguntas.forEach((item, index) => {
    const respuesta = document.querySelector(`input[name="pregunta${index}"]:checked`);
    if (respuesta) {
      const seleccion = parseInt(respuesta.value);
      respuestasUsuario.push(seleccion);
      if (seleccion === item.respuestaCorrecta) {
        aciertos++;
      }
    } else {
      respuestasUsuario.push(null); // No respondida
    }
  });

  mostrarResultados(aciertos);
}

function mostrarResultados(aciertos) {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  restartBtn.classList.remove("hidden");

  let resultadoHTML = `<h2>Resultado</h2>`;
  resultadoHTML += `<p>Puntuación: ${aciertos} de ${preguntas.length}</p>`;

  resultadoHTML += `<h3>Revisión</h3><ul>`;
  preguntas.forEach((item, index) => {
    const correcta = item.respuestaCorrecta;
    const usuario = respuestasUsuario[index];
    const estado = usuario === correcta
      ? "✅ Correcta"
      : usuario === null
      ? "❌ No respondida"
      : `❌ Incorrecta (Elegiste: ${item.opciones[usuario]})`;

    resultadoHTML += `<li><strong>${item.pregunta}</strong><br>${estado}<br>Respuesta correcta: ${item.opciones[correcta]}</li><br>`;
  });
  resultadoHTML += `</ul>`;

  resultContainer.innerHTML = resultadoHTML;
}

restartBtn.addEventListener("click", () => {
  resultContainer.classList.add("hidden");
  restartBtn.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  mostrarTest();
});

mostrarTest();
