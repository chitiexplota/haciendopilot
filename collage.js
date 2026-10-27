/* =========================
   PÁGINA 02 — COLLAGE
   Funciona con ratón, dedo y lápiz (pointer events).

   Índice
   1. Importaciones y Firebase
   2. Referencias al HTML y estado
   3. Colocar imágenes y letras
   4. Lienzo: tamaño y deshacer (Ctrl+Z)
   5. Modos: mover / dibujar
   6. Herramientas: color, texto y goma
   7. Dibujar y escribir en el lienzo
   8. Mover imágenes, letras y textos
   9. Enviar collage
   10. Galería
   11. Sugerencias
   12. Logo al hacer scroll
========================= */


/* =========================
   1. IMPORTACIONES Y FIREBASE
========================= */

import { t } from "./i18n.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
   getFirestore,
   collection,
   addDoc,
   onSnapshot,
   query,
   orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
   apiKey: "AIzaSyBWhFE2VQEYiUpPsyK2f8uYKRUm9xh2M3o",
   authDomain: "ull-collage.firebaseapp.com",
   projectId: "ull-collage",
   storageBucket: "ull-collage.firebasestorage.app",
   messagingSenderId: "784943019157",
   appId: "1:784943019157:web:3a8fc16d375c9c6c7b579c",
   measurementId: "G-V0ZQSJ0GH3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* =========================
   2. REFERENCIAS AL HTML Y ESTADO
========================= */

const zonaDibujo  = document.getElementById("zona-dibujo");
const contenedor  = document.getElementById("elementos-canvas");

const canvas      = document.getElementById("canvas");
const ctx         = canvas.getContext("2d");
const textCanvas  = document.getElementById("text-canvas");
const ctxText     = textCanvas.getContext("2d");

const moverBtn    = document.getElementById("mover-btn");
const crayonBtn   = document.getElementById("crayon-btn");
const toolsMenu   = document.getElementById("tools-menu");
const colorTool   = document.getElementById("color-tool");
const colorPicker = document.getElementById("color-picker");
const textTool    = document.getElementById("text-tool");
const eraserTool  = document.getElementById("eraser-tool");

/* Pantallas estrechas: el collage ocupa una sola pantalla */
const esMovil = window.matchMedia("(max-width: 700px)").matches;

let elementos = [];           // imágenes y letras: { src, x, y, width }
let textos = [];              // textos escritos: { text, x, y, color, size }

let modoDibujo = false;       // false = mover · true = dibujar
let currentColor = "#000000";
let erasing = false;
let textMode = false;
let drawing = false;

let textoActivo = null;       // texto que se está arrastrando
let offsetTexto = { x: 0, y: 0 };


/* =========================
   3. COLOCAR IMÁGENES Y LETRAS
   Posiciones pensadas para escritorio:
   x = fracción del ancho · y = fracción del alto de pantalla (o "px")
   En móvil se reducen y se reparten en una sola pantalla.
========================= */

const IMAGENES = [
   { src: "images/superilla.jpeg", x: 0.20, y: 0.40, ancho: 650 },
   { src: "images/laus.jpeg",      x: 0.30, y: 0.85, ancho: 600 },
   { src: "images/born.jpeg",      x: 0.10, y: 0.65, ancho: 300 },
   { src: "images/kids1.jpeg",     x: 0.10, y: 1.20, ancho: 600 },
   { src: "images/chair.png",      x: 0.10, y: 0.27, ancho: 190 },
   { src: "images/bigb.png",       x: 0.20, y: 0.35, ancho: 100 },
   { src: "images/tmob.png",       x: 0.62, y: 0.35, ancho: 180 },
   { src: "images/barric.png",     x: 0.60, y: 1.20, ancho: 300 },
   { src: "images/bar.png",        x: 0.60, y: 1.20, ancho: 300 },
   { src: "images/bcn.png",        x: 0.60, y: 1.40, ancho: 500 },
   { src: "images/sit1.png",       x: 0.60, y: "850px", ancho: 80 },
   { src: "images/sit2.png",       x: 0.66, y: "850px", ancho: 80 },
   { src: "images/sit3.png",       x: 0.72, y: "850px", ancho: 80 },
   { src: "images/sit4.png",       x: 0.78, y: "850px", ancho: 80 },
   { src: "images/sit5.png",       x: 0.84, y: "850px", ancho: 80 }
];

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const COPIAS_LETRAS = 2;      // cuántas letras "de repuesto" quedan debajo
const LETRAS_POR_FILA = 7;

/* Tamaño de la zona donde se colocan los elementos */
function medidasZona() {
   return {
      ancho: zonaDibujo.clientWidth,
      alto: zonaDibujo.clientHeight,
      pantalla: window.innerHeight
   };
}

/* Calcula posición y tamaño de una imagen según la pantalla */
function colocarImagen(img, zona) {
   const yPx = typeof img.y === "string" ? parseFloat(img.y) : img.y * zona.pantalla;
   let ancho, x, y;

   if (esMovil) {
      const escala = Math.max(0.42, zona.ancho / 1280);
      ancho = Math.max(44, Math.round(img.ancho * escala));
      x = img.x * zona.ancho;
      // el alto de escritorio (2 pantallas) se reparte en una sola
      y = zona.alto * 0.14 + (yPx / (2 * zona.pantalla)) * zona.alto * 0.95;
      y = Math.min(y, zona.alto - 60);
   } else {
      ancho = Math.min(img.ancho, zona.ancho * 0.9);
      x = img.x * zona.ancho;
      y = yPx;
   }

   // que no se salga por la derecha
   x = Math.max(6, Math.min(x, zona.ancho - ancho - 6));

   return { x: Math.round(x), y: Math.round(y), ancho };
}

/* Crea una imagen o letra arrastrable */
function crearElemento(src, x, y, ancho, clase) {
   const img = document.createElement("img");
   img.src = src;
   img.className = clase;
   img.draggable = false;
   img.style.left = x + "px";
   img.style.top = y + "px";
   img.style.width = ancho + "px";

   elementos.push({ src, x, y, width: ancho });
   img.dataset.id = elementos.length - 1;

   contenedor.appendChild(img);
   hacerArrastrable(img);
}

function colocarElementos() {
   const zona = medidasZona();

   IMAGENES.forEach(img => {
      const pos = colocarImagen(img, zona);
      crearElemento(img.src, pos.x, pos.y, pos.ancho, "imagen-movil");
   });

   // bloque de letras
   const tamLetra = esMovil ? 32 : 40;
   const espacio = esMovil ? 26 : 30;
   const anchoBloque = LETRAS_POR_FILA * espacio + tamLetra;

   const inicioX = esMovil
      ? zona.ancho - anchoBloque - 8
      : Math.min(800, zona.ancho - anchoBloque - 40);
   const inicioY = esMovil ? Math.round(zona.alto * 0.5) : 660;

   for (let c = 0; c < COPIAS_LETRAS; c++) {
      ALFABETO.forEach((letra, i) => {
         const x = inicioX + (i % LETRAS_POR_FILA) * espacio;
         const y = inicioY + Math.floor(i / LETRAS_POR_FILA) * espacio;
         crearElemento(`images/abc/${letra}.png`, x, y, tamLetra, "letra-movil");
      });
   }
}


/* =========================
   4. LIENZO: TAMAÑO Y DESHACER (Ctrl+Z)
========================= */

/* Ajusta el lienzo a la zona sin borrar lo dibujado
   (en móvil la barra del navegador cambia el alto al hacer scroll) */
function ajustarCanvas() {
   const ancho = zonaDibujo.clientWidth;
   const alto = zonaDibujo.clientHeight;

   if (canvas.width === ancho && canvas.height === alto) return;

   const copia = document.createElement("canvas");
   copia.width = canvas.width;
   copia.height = canvas.height;
   if (copia.width && copia.height) copia.getContext("2d").drawImage(canvas, 0, 0);

   canvas.width = textCanvas.width = ancho;
   canvas.height = textCanvas.height = alto;

   ctx.drawImage(copia, 0, 0);
   renderTextos();

   contenedor.style.height = alto + "px";
}

let historialCanvas = [];
let historialTextos = [];

function guardarEstado() {
   historialCanvas.push(canvas.toDataURL());
   historialTextos.push(JSON.parse(JSON.stringify(textos)));

   // límite para no consumir demasiada memoria
   if (historialCanvas.length > 50) {
      historialCanvas.shift();
      historialTextos.shift();
   }
}

function deshacer() {
   if (historialCanvas.length === 0) return;

   const ultimoEstado = historialCanvas.pop();
   textos = historialTextos.pop();

   const imgRestaurada = new Image();
   imgRestaurada.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgRestaurada, 0, 0);
   };
   imgRestaurada.src = ultimoEstado;

   renderTextos();
}

window.addEventListener("keydown", (e) => {
   if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
      e.preventDefault();
      deshacer();
   }
});


/* =========================
   5. MODOS: MOVER / DIBUJAR
========================= */

function activarModo(dibujar) {
   modoDibujo = dibujar;

   document.body.classList.toggle("modo-dibujo", dibujar);
   crayonBtn.classList.toggle("activo", dibujar);
   moverBtn.classList.toggle("activo", !dibujar);

   if (!dibujar) {
      toolsMenu.classList.remove("abierto");
      textMode = false;
   }
}

/* Lápiz: activa el modo dibujo y abre/cierra las herramientas */
crayonBtn.addEventListener("click", () => {
   if (!modoDibujo) {
      activarModo(true);
      toolsMenu.classList.add("abierto");
   } else {
      toolsMenu.classList.toggle("abierto");
   }
   erasing = false;
   marcarHerramienta(colorTool);
});

/* Mano: vuelve al modo mover */
moverBtn.addEventListener("click", () => activarModo(false));


/* =========================
   6. HERRAMIENTAS: COLOR, TEXTO Y GOMA
========================= */

function marcarHerramienta(boton) {
   [colorTool, textTool, eraserTool].forEach(b => b.classList.toggle("activo", b === boton));
}

colorTool.addEventListener("click", () => {
   erasing = false;
   textMode = false;
   marcarHerramienta(colorTool);
   colorPicker.click();
});

colorPicker.addEventListener("input", (e) => {
   currentColor = e.target.value;
   colorTool.style.background = currentColor;
   erasing = false;
});

textTool.addEventListener("click", () => {
   textMode = true;
   erasing = false;
   marcarHerramienta(textTool);
});

eraserTool.addEventListener("click", () => {
   erasing = true;
   textMode = false;
   marcarHerramienta(eraserTool);
});


/* =========================
   7. DIBUJAR Y ESCRIBIR EN EL LIENZO
   (solo en modo dibujo: en modo mover el lienzo no recibe el puntero)
========================= */

/* Posición del puntero dentro del lienzo */
function puntoEnCanvas(e) {
   const r = canvas.getBoundingClientRect();
   return { x: e.clientX - r.left, y: e.clientY - r.top };
}

canvas.addEventListener("pointerdown", (e) => {
   if (!modoDibujo) return;
   e.preventDefault();

   const { x, y } = puntoEnCanvas(e);

   // herramienta de texto: escribir donde se toca
   if (textMode) {
      const texto = prompt(t("prompt_texto"));

      if (texto) {
         guardarEstado();
         textos.push({ text: texto, x, y, color: currentColor, size: 32 });
         renderTextos();
      }

      textMode = false;
      marcarHerramienta(colorTool);
      return;
   }

   // si se toca un texto, se arrastra en vez de dibujar
   if (empezarArrastreTexto(x, y, e)) return;

   // empezar a dibujar
   guardarEstado();
   drawing = true;
   canvas.setPointerCapture(e.pointerId);

   ctx.lineCap = "round";
   ctx.lineJoin = "round";

   if (erasing) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 30;
   } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 4;
   }

   ctx.beginPath();
   ctx.moveTo(x, y);
   ctx.lineTo(x + 0.1, y + 0.1);   // un toque deja un punto
   ctx.stroke();
});

canvas.addEventListener("pointermove", (e) => {
   if (moverTexto(e)) return;
   if (!drawing) return;

   const { x, y } = puntoEnCanvas(e);
   ctx.lineTo(x, y);
   ctx.stroke();
});

function terminarTrazo() {
   drawing = false;
   ctx.globalCompositeOperation = "source-over";
   soltarTexto();
}

canvas.addEventListener("pointerup", terminarTrazo);
canvas.addEventListener("pointercancel", terminarTrazo);

function renderTextos() {
   ctxText.clearRect(0, 0, textCanvas.width, textCanvas.height);

   textos.forEach(texto => {
      ctxText.fillStyle = texto.color;
      ctxText.font = texto.size + "px Arial";
      ctxText.fillText(texto.text, texto.x, texto.y);
   });
}

/* Devuelve el texto que hay en un punto (o undefined) */
function detectarTexto(x, y) {
   return textos.find(texto => {
      ctxText.font = texto.size + "px Arial";
      const ancho = ctxText.measureText(texto.text).width;

      return (
         x >= texto.x &&
         x <= texto.x + ancho &&
         y >= texto.y - texto.size &&
         y <= texto.y + 10
      );
   });
}


/* =========================
   8. MOVER IMÁGENES, LETRAS Y TEXTOS
========================= */

/* Imágenes y letras */
function hacerArrastrable(img) {
   let arrastrando = false;
   let offsetX = 0;
   let offsetY = 0;

   img.addEventListener("pointerdown", (e) => {
      if (modoDibujo) return;
      e.preventDefault();

      arrastrando = true;
      offsetX = e.pageX - img.offsetLeft;
      offsetY = e.pageY - img.offsetTop;

      img.classList.add("agarrado");
      img.setPointerCapture(e.pointerId);
   });

   img.addEventListener("pointermove", (e) => {
      if (!arrastrando) return;

      // que siempre quede un trozo visible para poder recuperarla
      const minimo = 30;
      const x = Math.min(Math.max(e.pageX - offsetX, minimo - img.offsetWidth), contenedor.clientWidth - minimo);
      const y = Math.min(Math.max(e.pageY - offsetY, minimo - img.offsetHeight), contenedor.clientHeight - minimo);

      img.style.left = x + "px";
      img.style.top = y + "px";

      const elemento = elementos[Number(img.dataset.id)];
      elemento.x = x;
      elemento.y = y;
   });

   function soltar(e) {
      if (!arrastrando) return;
      arrastrando = false;
      img.classList.remove("agarrado");
      if (img.hasPointerCapture(e.pointerId)) img.releasePointerCapture(e.pointerId);
   }

   img.addEventListener("pointerup", soltar);
   img.addEventListener("pointercancel", soltar);
}

/* Textos: se arrastran en cualquier modo */
function empezarArrastreTexto(x, y, e) {
   const hit = detectarTexto(x, y);
   if (!hit) return false;

   guardarEstado();
   textoActivo = hit;
   offsetTexto = { x: x - hit.x, y: y - hit.y };
   e.target.setPointerCapture(e.pointerId);
   return true;
}

function moverTexto(e) {
   if (!textoActivo) return false;

   const { x, y } = puntoEnCanvas(e);
   textoActivo.x = x - offsetTexto.x;
   textoActivo.y = y - offsetTexto.y;
   renderTextos();
   return true;
}

function soltarTexto() {
   textoActivo = null;
}

/* En modo mover, el lienzo no recibe el puntero:
   los textos se recogen desde la zona de dibujo */
zonaDibujo.addEventListener("pointerdown", (e) => {
   if (modoDibujo || e.target !== zonaDibujo) return;
   const { x, y } = puntoEnCanvas(e);
   if (empezarArrastreTexto(x, y, e)) e.preventDefault();
});

zonaDibujo.addEventListener("pointermove", (e) => {
   if (!modoDibujo) moverTexto(e);
});

zonaDibujo.addEventListener("pointerup", soltarTexto);
zonaDibujo.addEventListener("pointercancel", soltarTexto);


/* =========================
   9. ENVIAR COLLAGE
   Se guarda lo que se ve en pantalla, en el mismo orden de capas:
   imágenes y letras → dibujo → textos
========================= */

document.getElementById("enviar").addEventListener("click", async () => {

   const captura = document.createElement("canvas");
   captura.width = window.innerWidth;
   captura.height = window.innerHeight;

   const c = captura.getContext("2d");
   c.fillStyle = "white";
   c.fillRect(0, 0, captura.width, captura.height);

   document.querySelectorAll(".imagen-movil, .letra-movil").forEach(img => {
      const r = img.getBoundingClientRect();
      c.drawImage(img, r.left, r.top, r.width, r.height);
   });

   const r = canvas.getBoundingClientRect();
   c.drawImage(canvas, r.left, r.top);
   c.drawImage(textCanvas, r.left, r.top);

   const imagenBase64 = captura.toDataURL("image/jpeg", 0.5);

   try {
      await addDoc(collection(db, "dibujos"), {
         dibujo: imagenBase64,
         elementos: elementos,
         textos: textos,
         fecha: Date.now()
      });

      alert(t("collage_guardado"));
   } catch (error) {
      console.error("Error al guardar el collage:", error);
      alert(t("collage_error") + error.message);
   }
});


/* =========================
   10. GALERÍA
========================= */

const galeria = document.getElementById("galeria");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");

function openPopup(src) {
   popupImg.src = src;
   popup.style.display = "flex";
}

popup.addEventListener("click", () => {
   popup.style.display = "none";
   popupImg.src = "";
});

onSnapshot(
   query(collection(db, "dibujos"), orderBy("fecha", "desc")),
   (snapshot) => {
      galeria.innerHTML = "";

      snapshot.forEach((doc) => {
         const data = doc.data();
         const img = document.createElement("img");
         img.src = data.dibujo;
         img.onclick = () => openPopup(data.dibujo);
         galeria.appendChild(img);
      });
   },
   (error) => console.error("Error al leer la galería:", error)
);


/* =========================
   11. SUGERENCIAS
========================= */

const sugerirBtn = document.getElementById("sugerir-btn");
const sugerirPopup = document.getElementById("sugerir-popup");
const sugerirClose = document.getElementById("sugerir-close");
const sugerenciaInput = document.getElementById("sugerencia-input");
const sugerenciaBtn = document.getElementById("sugerencia-btn");
const sugerenciasLista = document.getElementById("sugerencias-lista");

/* Abrir y cerrar */
sugerirBtn.addEventListener("click", () => {
   sugerirPopup.style.display = "flex";
});

sugerirClose.addEventListener("click", () => {
   sugerirPopup.style.display = "none";
});

sugerirPopup.addEventListener("click", (e) => {
   if (e.target === sugerirPopup) sugerirPopup.style.display = "none";
});

/* Enviar (botón o tecla Enter) */
sugerenciaBtn.addEventListener("click", async () => {
   const texto = sugerenciaInput.value.trim();
   if (!texto) return;

   try {
      await addDoc(collection(db, "sugerencias"), {
         texto: texto,
         fecha: Date.now()
      });
      sugerenciaInput.value = "";
   } catch (error) {
      console.error("Error al guardar la sugerencia:", error);
   }
});

sugerenciaInput.addEventListener("keydown", (e) => {
   if (e.key === "Enter") sugerenciaBtn.click();
});

/* Lista en tiempo real (las aportaciones no se traducen) */
onSnapshot(
   query(collection(db, "sugerencias"), orderBy("fecha", "desc")),
   (snapshot) => {
      sugerenciasLista.innerHTML = "";

      snapshot.forEach((doc) => {
         const pill = document.createElement("div");
         pill.className = "sugerencia-pill";
         pill.textContent = doc.data().texto;
         sugerenciasLista.appendChild(pill);
      });
   },
   (error) => console.error("Error al leer las sugerencias:", error)
);


/* =========================
   12. LOGO AL HACER SCROLL
========================= */

const logo = document.querySelector(".logo");

window.addEventListener("scroll", () => {
   const oculto = window.scrollY > 50;
   logo.style.opacity = oculto ? "0" : "1";
   logo.style.pointerEvents = oculto ? "none" : "auto";
});


/* =========================
   INICIO
========================= */

ajustarCanvas();
colocarElementos();
activarModo(false);

window.addEventListener("resize", ajustarCanvas);