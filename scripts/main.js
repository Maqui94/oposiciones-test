// scripts/main.js

// ---------------------------
// 🌙 MODO OSCURO
// ---------------------------
const btnModoOscuro = document.getElementById("modoOscuroBtn");
const body = document.body;

// Cargar estado inicial del modo oscuro
if (localStorage.getItem("modoOscuro") === "true") {
  body.classList.add("dark-mode");
}

// Alternar modo oscuro
btnModoOscuro.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem("modoOscuro", body.classList.contains("dark-mode"));
});

// ---------------------------
// 📋 BLOQUES Y TEMAS
// ---------------------------
const bloques = [
  {
    titulo: "📚 Ciencias Humanas",
    clase: "bloque1",
    temas: [
      ["deontologia.json", "Deontología policial", "fa-user-shield"],
      ["drogas.json", "Toxicomanías y alcoholismo", "fa-wine-bottle"],
      ["demografia.json", "Contexto sociodemográfico", "fa-users"],
      ["criminologia.json", "Criminología", "fa-user-secret"],
      ["prevencion.json", "Prevención del delito", "fa-shield-alt"],
      ["delincuente.json", "El delincuente", "fa-user-ninja"],
      ["victimas.json", "La víctima", "fa-heart-broken"],
      ["mujeres.json", "Ley Foral 14/2015", "fa-balance-scale"],
      ["XXXX.json", "Habilidades sociales", "fa-comments"],
      ["XXXX.json", "Ortografía básica", "fa-pen-fancy"]
    ]
  },
  {
    titulo: "🗺️ Conocimiento del Territorio de Navarra",
    clase: "bloque2",
    temas: [
      ["carreteras.json", "Carreteras y mapa", "fa-road"],
      ["XXXX.json", "Geografía Navarra - Atlas", "fa-map"],
      ["XXXX.json", "Navarra - Geografía", "fa-globe-europe"]
    ]
  },
  {
    titulo: "⚖️ Legislación",
    clase: "bloque3",
    temas: [
      ["XXXX.json", "Fuentes del Derecho", "fa-balance-scale"],
      ["XXXX.json", "Constitución Española", "fa-gavel"],
      ["XXXX.json", "Unión Europea", "fa-euro-sign"],
      ["XXXX.json", "Actos administrativos", "fa-file-signature"],
      ["XXXX.json", "Procedimiento administrativo", "fa-tasks"],
      ["XXXX.json", "LORAFNA", "fa-university"],
      ["XXXX.json", "Parlamento y Defensor", "fa-landmark"],
      ["XXXX.json", "Gobierno de Navarra", "fa-users-cog"],
      ["XXXX.json", "Administración", "fa-sitemap"],
      ["XXXX.json", "Hacienda Pública", "fa-money-check-alt"],
      ["XXXX.json", "Transparencia y Datos", "fa-user-shield"],
      ["XXXX.json", "Código Penal", "fa-gavel"],
      ["XXXX.json", "Enjuiciamiento Criminal", "fa-scroll"],
      ["XXXX.json", "Seguridad Ciudadana", "fa-shield-alt"],
      ["XXXX.json", "FFCC de Seguridad", "fa-user-secret"],
      ["XXXX.json", "Seguridad Navarra", "fa-exclamation-triangle"],
      ["XXXX.json", "Ley de Policías", "fa-id-badge"],
      ["XXXX.json", "Estatuto Personal", "fa-briefcase"],
      ["XXXX.json", "Reglamento PF", "fa-building"],
      ["XXXX.json", "Provisión de puestos", "fa-exchange-alt"]
    ]
  },
  {
    titulo: "💻 Conocimientos Técnicos",
    clase: "bloque4",
    temas: [
      ["XXXX.json", "Windows 10", "fa-desktop"],
      ["XXXX.json", "Word 2016", "fa-file-word"],
      ["XXXX.json", "Excel 2016", "fa-file-excel"],
      ["XXXX.json", "Internet y correo", "fa-globe"],
      ["XXXX.json", "Redes y malware", "fa-hashtag"]
    ]
  }
];

const contenedor = document.getElementById("temarioAccordion");

bloques.forEach((bloque, index) => {
  const idBloque = `bloque${index + 1}`;
  const htmlTemas = bloque.temas
  .map(([archivo, nombre, icono]) => {
    const esInvalido = archivo.trim().startsWith("XXXX");
    if (esInvalido) {
      return `
        <li class="mb-3">
          <button class="tema-btn disabled" disabled>
            <i class="fas fa-lock me-1"></i> ${nombre} (NO DISPONIBLE TODAVÍA)
          </button>
        </li>`;
    }

    return `
      <li class="mb-3">
        <button class="tema-btn" data-json="${archivo}">
          <i class="fas ${icono} me-1"></i> ${nombre}
        </button>
      </li>`;
  })
  .join("");

  const bloqueHTML = `
    <div class="accordion-item ${bloque.clase} mb-4">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${idBloque}">
          ${bloque.titulo}
        </button>
      </h2>
      <div id="${idBloque}" class="accordion-collapse collapse" data-bs-parent="#temarioAccordion">
        <div class="accordion-body">
          <ul class="tema-lista">${htmlTemas}</ul>
        </div>
      </div>
    </div>
  `;
  contenedor.insertAdjacentHTML("beforeend", bloqueHTML);
});

// ---------------------------
// ▶️ EVENTOS DE TEMAS
// ---------------------------
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".tema-btn");
  if (!btn || btn.disabled || btn.classList.contains("disabled")) return;

  const json = btn.dataset.json;
  const nombre = btn.textContent.trim().replace(" (NO DISPONIBLE TODAVÍA)", "");

  try {
    const res = await fetch(`./data/${json}`);
    const preguntasOriginales = await res.json();

    const preguntasUnicas = preguntasOriginales.filter(
      (p, i, self) => i === self.findIndex(q => q.pregunta === p.pregunta)
    );

    const preguntas = mezclarArray(preguntasUnicas)
      .slice(0, 20)
      .map(p => ({ ...p, opciones: mezclarArray([...p.opciones]) }));

    localStorage.setItem("preguntas", JSON.stringify(preguntas));
    localStorage.setItem("tema", nombre);
    localStorage.setItem("modoJuego", localStorage.getItem("modoJuego") || "examen");
    localStorage.setItem("archivoJson", json);

    window.location.href = "test.html";
  } catch (error) {
    alert("Error al cargar las preguntas.");
    console.error(error);
  }
});

// ---------------------------
// 🎲 FUNCIONES EXTRA
// ---------------------------
function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ---------------------------
// 🧩 MODAL DE JUEGO
// ---------------------------
function mostrarModalModoJuego() {
  document.getElementById("modalModoJuego").classList.remove("d-none");
  body.classList.add("modal-open");
}

function cerrarModalModoJuego() {
  document.getElementById("modalModoJuego").classList.add("d-none");
  body.classList.remove("modal-open");
}

function setModoJuego(modo) {
  localStorage.setItem("modoJuego", modo);
  document.getElementById("modoActual").textContent = modo.toUpperCase();
  cerrarModalModoJuego();
}

document.getElementById("modoActual").textContent =
  (localStorage.getItem("modoJuego") || "examen").toUpperCase();

// ---------------------------
// 👋 MODAL DE BIENVENIDA
// ---------------------------
window.onload = () => {
  document.body.classList.add("modal-open");
  document.getElementById("alertaTest").style.display = "flex";
};

function cerrarAlerta() {
  document.body.classList.remove("modal-open");
  document.getElementById("alertaTest").style.display = "none";
}

// ---------------------------
// ✉️ CONTACTO y ☕ DONACIÓN con protección Base64
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const btnDonacion = document.getElementById("btnDonacion");
  const btnContacto = document.getElementById("btnContacto");
  const popupDonacion = document.getElementById("popupDonacion");
  const popupContacto = document.getElementById("popupContacto");

  // Enlaces codificados en Base64
  const correoBase64 = "bWFxdWkuZGV2ZWxvcEBnbWFpbC5jb20=";
  const revolutBase64 = "aHR0cHM6Ly9yZXZvbHV0Lm1lL2Fkcmlhbno1Yzg="; 

  const correoLink = document.getElementById("correoLink");
  const donarLink = document.getElementById("donarLink");

  if (correoLink) {
  correoLink.href = "https://mail.google.com/mail/?view=cm&to=" + atob(correoBase64);
  correoLink.target = "_blank"; // Abre Gmail en nueva pestaña
}
  if (donarLink) {
    donarLink.href = atob(revolutBase64);
  }

  // Mostrar / ocultar popups
  if (btnDonacion && popupDonacion) {
    btnDonacion.addEventListener("click", (e) => {
      e.stopPropagation();
      popupDonacion.classList.toggle("visible");
      popupContacto.classList.remove("visible");
    });
  }

  if (btnContacto && popupContacto) {
    btnContacto.addEventListener("click", (e) => {
      e.stopPropagation();
      popupContacto.classList.toggle("visible");
      popupDonacion.classList.remove("visible");
    });
  }

  // Cierre al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!popupDonacion.contains(e.target) && e.target !== btnDonacion) {
      popupDonacion.classList.remove("visible");
    }
    if (!popupContacto.contains(e.target) && e.target !== btnContacto) {
      popupContacto.classList.remove("visible");
    }
  });
});