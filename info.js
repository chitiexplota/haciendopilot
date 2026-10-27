/* =========================
   PÁGINA 04 — CÓMO PARTICIPAR

   Índice
   1. Idiomas
   2. Práctica: arrastrar el logo
========================= */


/* =========================
   1. IDIOMAS
========================= */

import "./i18n.js";


/* =========================
   2. PRÁCTICA: ARRASTRAR EL LOGO
   Funciona con ratón, dedo y lápiz (pointer events).
========================= */

const zona = document.getElementById("zona-practica");
const logo = document.getElementById("logo-practica");

let arrastrando = false;
let offsetX = 0;
let offsetY = 0;

logo.addEventListener("pointerdown", (e) => {
   e.preventDefault();
   arrastrando = true;

   const r = logo.getBoundingClientRect();
   offsetX = e.clientX - r.left;
   offsetY = e.clientY - r.top;

   logo.classList.add("agarrado");
   logo.setPointerCapture(e.pointerId);
});

logo.addEventListener("pointermove", (e) => {
   if (!arrastrando) return;

   // mantener el logo dentro de la zona de práctica
   const z = zona.getBoundingClientRect();
   const maxX = Math.max(z.width - logo.offsetWidth, 0);
   const maxY = Math.max(z.height - logo.offsetHeight, 0);

   const x = Math.min(Math.max(e.clientX - z.left - offsetX, 0), maxX);
   const y = Math.min(Math.max(e.clientY - z.top - offsetY, 0), maxY);

   logo.style.left = x + "px";
   logo.style.top = y + "px";
});

function soltar(e) {
   if (!arrastrando) return;
   arrastrando = false;
   logo.classList.remove("agarrado");
   if (logo.hasPointerCapture(e.pointerId)) logo.releasePointerCapture(e.pointerId);
}

logo.addEventListener("pointerup", soltar);
logo.addEventListener("pointercancel", soltar);