const preguntas = [
  {
    pregunta: "¿Cuál es la longitud total de la autopista AP-15 en Navarra (sumando todos sus tramos)?",
    opciones: ["82,93 km", "15,95 km", "118,25 km", "213,48 km"],
    respuestaCorrecta: 2
  },
  {
    pregunta: "¿Qué longitud tiene la autovía A-68 dentro de Navarra?",
    opciones: ["27,61 km", "32,44 km", "13,77 km", "45,42 km"],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Cuál es la denominación del tramo A-15 1 según el catálogo?",
    opciones: [
      "RONDA DE PAMPLONA / IRUÑA OESTE",
      "AUTOPISTA DE NAVARRA",
      "AUTOVÍA DEL PIRINEO",
      "AUTOVÍA DEL CAMINO DE SANTIAGO"
    ],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál es el tramo de autovía que conecta Noáin con el límite con Zaragoza?",
    opciones: ["A-15", "A-12", "A-21", "A-1"],
    respuestaCorrecta: 2
  },
  {
    pregunta: "¿Qué autovía tiene una longitud de 13,77 km y conecta Álava con Gipuzkoa?",
    opciones: ["A-10", "A-1", "A-15", "A-68"],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Cuál es la longitud del tramo AP-15 entre PK 209,11 de AP-68 y PK 83,13 de A-15?",
    opciones: ["82,93 km", "15,95 km", "6,30 km", "23,50 km"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál es el origen del tramo AP-15 que mide 82,93 km según el documento?",
    opciones: ["PK 209,11 de AP-68", "PK 96,20 de A-15", "PK 85,45 de N-113", "PK 3,43 de NA-6001"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál es el destino del tramo AP-15 que mide 82,93 km?",
    opciones: ["PK 83,13 de A-15", "PK 112,15 de AP-15", "PK 6,67 de AP-15", "PK 96,20 de A-15"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué longitud tiene el tramo 2 de la autopista AP-15 según el catálogo?",
    opciones: ["15,95 km", "82,93 km", "6,30 km", "9,91 km"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué tramo de la AP-15 se origina en PK 96,20 de A-15?",
    opciones: ["Tramo 2", "Tramo 1", "Tramo AP-15-R", "Tramo 3"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál es la longitud del Ramal AP-15 desde N-113?",
    opciones: ["6,30 km", "15,95 km", "9,91 km", "82,93 km"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál es el destino del Ramal AP-15 desde N-113?",
    opciones: ["PK 6,67 AP-15", "PK 83,13 de A-15", "PK 112,15 de AP-15", "PK 209,11 de AP-68"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué carretera tiene como denominación 'RONDA DE PAMPLONA / IRUÑA OESTE'?",
    opciones: ["A-15 tramo 1", "AP-15 tramo 2", "A-21", "AP-15-R"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué longitud tiene el tramo A-15 1 'RONDA DE PAMPLONA / IRUÑA OESTE'?",
    opciones: ["9,91 km", "6,30 km", "15,95 km", "82,93 km"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué tramo conecta el PK 85,45 de N-113 con el PK 6,67 de AP-15?",
    opciones: ["AP-15-R", "AP-15 tramo 2", "A-15 tramo 1", "A-68"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál es la longitud del tramo A-21 con denominación 'AUTOVÍA DEL PIRINEO'?",
    opciones: ["49,50 km", "27,61 km", "13,77 km", "32,44 km"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál es el origen del tramo A-21 de 49,50 km?",
    opciones: ["PK 0 de A-15", "PK 3,43 de NA-6001", "PK 96,20 de A-15", "PK 6,67 de AP-15"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál es el final del tramo A-21 de 49,50 km?",
    opciones: ["PK 49,50 de A-21", "PK 83,13 de A-15", "PK 112,15 de AP-15", "PK 209,11 de AP-68"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué tramo tiene como origen el PK 3,43 de NA-6001?",
    opciones: ["A-1", "A-12", "A-10", "NA-6001"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué longitud tiene el tramo de la A-1 que conecta PK 3,43 de NA-6001 con el límite con Gipuzkoa?",
    opciones: ["13,77 km", "49,50 km", "32,44 km", "15,95 km"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál es la longitud del tramo A-68 según el catálogo?",
    opciones: ["32,44 km", "82,93 km", "49,50 km", "27,61 km"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué tramo de autovía parte del límite con La Rioja y termina en Tudela?",
    opciones: ["A-68", "A-1", "A-21", "AP-15"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál es la longitud del tramo A-12, 'AUTOVÍA DEL CAMINO DE SANTIAGO'?",
    opciones: ["27,61 km", "32,44 km", "13,77 km", "49,50 km"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué tramo conecta Pamplona con el límite con La Rioja?",
    opciones: ["A-12", "A-21", "A-15", "A-68"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué tramo tiene el nombre 'AUTOVÍA DE LA BARRANCA'?",
    opciones: ["A-10", "A-15", "A-1", "A-12"],
    respuestaCorrecta: 0
  }
];