/* =========================
   PÁGINA 03 — MAPA COLABORATIVO
   Mapa Leaflet + Firestore (proyecto digitalull, colección entries).

   Índice
   1. Importaciones y Firebase
   2. Mapa y capas
   3. Utilidades: texto seguro, colores e iconos
   4. Popups
   5. Crear, guardar y cancelar pins
   6. Likes
   7. Zoom y teclado
   8. Buscador de direcciones
   9. Lista de lugares
   10. Cargar los pins guardados
========================= */


/* =========================
   1. IMPORTACIONES Y FIREBASE
========================= */

import { t, aplicarTraducciones } from "./i18n.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
   getFirestore,
   collection,
   addDoc,
   getDocs,
   doc,
   updateDoc,
   increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
   apiKey: "AIzaSyAWGffQhe1R_lSjaXGvMsLwYlTZILgoJ7s",
   authDomain: "digitalull.firebaseapp.com",
   projectId: "digitalull",
   storageBucket: "digitalull.firebasestorage.app",
   messagingSenderId: "421274305167",
   appId: "1:421274305167:web:750093830e5718f9e426fa",
   measurementId: "G-5NTRRTN0T0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* =========================
   2. MAPA Y CAPAS
   Centrado en Barcelona. Botón ◐: alterna entre el mapa
   de color (Voyager) y el de alto contraste (Light).
========================= */

const map = L.map("map", { zoomControl: false }).setView([41.4036, 2.1744], 13);

const CARTO = "https://{s}.basemaps.cartocdn.com/rastertiles/{estilo}/{z}/{x}/{y}{r}.png?key=cb1_2ybc_1_8518c0a9a781f7fc341376d1";
const opcionesCapa = { attribution: "&copy; OpenStreetMap &copy; CARTO", subdomains: "abcd", maxZoom: 20 };

const capaColor = L.tileLayer(CARTO.replace("{estilo}", "voyager"), opcionesCapa).addTo(map);
const capaContraste = L.tileLayer(CARTO.replace("{estilo}", "light_all"), opcionesCapa);

let altoContraste = false;

document.getElementById("contrastToggle").addEventListener("click", () => {
   if (altoContraste) {
      map.removeLayer(capaContraste);
      capaColor.addTo(map);
   } else {
      map.removeLayer(capaColor);
      capaContraste.addTo(map);
   }
   altoContraste = !altoContraste;
});

/* Los pins siempre por encima de las calles */
map.createPane("alwaysOnTopPane");
map.getPane("alwaysOnTopPane").style.zIndex = 650;
map.getPane("alwaysOnTopPane").style.pointerEvents = "auto";


/* =========================
   3. UTILIDADES
========================= */

/* Escapar el texto de los participantes (evita que se inserte HTML) */
function escapeHTML(texto = "") {
   return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
}

/* Solo se aceptan colores #RGB / #RRGGBB (si no, se usa el magenta) */
const COLOR_POR_DEFECTO = "#DA64F0";

function colorSeguro(color) {
   return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color || "") ? color : COLOR_POR_DEFECTO;
}

/* Icono de un pin */
function crearIconoPin(color = "var(--blanco)") {
   return L.divIcon({
      className: "",
      html: `<div class="pin-icono" style="background:${color};"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
   });
}

const iconoBusqueda = L.divIcon({
   className: "",
   html: `<div class="pin-busqueda"></div>`,
   iconSize: [18, 18],
   iconAnchor: [9, 9]
});


/* =========================
   4. POPUPS
========================= */

/* Pin nuevo: formulario */
function popupNuevo(id) {
   return `
      <div class="popup-nuevo">
         <h3>${t("popup_titulo")}</h3>
         <p>${t("popup_paso1")}</p>
         <p>${t("popup_paso2")}</p>
         <p>${t("popup_paso3")}</p>

         <div class="popup-campo">
            <label for="name-${id}">${t("popup_nombre")}</label>
            <input type="text" id="name-${id}" placeholder="${t("popup_nombre_ph")}">
         </div>

         <textarea id="msg-${id}" placeholder="${t("popup_historia_ph")}"></textarea>

         <div class="popup-campo">
            <label for="color-${id}">${t("popup_color")}</label>
            <input type="color" id="color-${id}" value="${COLOR_POR_DEFECTO}">
         </div>

         <button class="popup-btn done-btn" onclick="window.savePin(${id})">${t("popup_hecho")}</button>
         <button class="popup-btn close-btn" onclick="window.cancelPin(${id})">${t("popup_cerrar")}</button>
      </div>
   `;
}

/* Pin guardado: mensaje y likes (el nombre nunca se muestra) */
function popupGuardado(mensaje, docId, likes = 0) {
   const texto = mensaje
      ? `<p>${escapeHTML(mensaje)}</p>`
      : `<em data-i18n="sin_mensaje">${t("sin_mensaje")}</em>`;

   return `
      <div class="popup-guardado">
         ${texto}
         <button class="like-btn" onclick="window.addLike('${escapeHTML(docId)}', this)">❤️ <span>${likes}</span></button>
      </div>
   `;
}


/* =========================
   5. CREAR, GUARDAR Y CANCELAR PINS
========================= */

let pinId = 0;
const pendientes = {};   // pins nuevos que aún no se han guardado

/* Clic en el mapa: pin temporal con formulario */
map.on("click", (e) => {
   const id = pinId++;
   const marker = L.marker(e.latlng, {
      icon: crearIconoPin(),
      pane: "alwaysOnTopPane"
   }).addTo(map);

   pendientes[id] = { marker, guardado: false };

   marker.bindPopup(popupNuevo(id)).openPopup();

   // si se cierra sin guardar, el pin desaparece
   marker.on("popupclose", () => {
      if (!pendientes[id]?.guardado) map.removeLayer(marker);
      delete pendientes[id];
   });
});

/* Guardar en Firestore */
window.savePin = async function (id) {
   const pendiente = pendientes[id];
   if (!pendiente) return;

   const { marker } = pendiente;
   const { lat, lng } = marker.getLatLng();

   const color = colorSeguro(document.getElementById(`color-${id}`)?.value);
   const message = document.getElementById(`msg-${id}`)?.value || "";
   const author = document.getElementById(`name-${id}`)?.value || "";

   pendiente.guardado = true;
   marker.setIcon(crearIconoPin(color));
   marker.closePopup();
   marker.unbindPopup();

   try {
      const docRef = await addDoc(collection(db, "entries"), {
         lat,
         lng,
         author,
         message,
         color,
         likes: 0,
         createdAt: Date.now()
      });

      // popup con el id real, para que el like funcione en el pin recién creado
      marker.bindPopup(popupGuardado(message, docRef.id, 0));
      anadirALista(message, marker, [lat, lng]);

      alert(t("pin_guardado"));
   } catch (err) {
      console.error("Error al guardar el pin:", err);
      map.removeLayer(marker);
      alert(t("pin_error"));
   }
};

/* Cancelar */
window.cancelPin = function (id) {
   const pendiente = pendientes[id];
   if (!pendiente) return;
   map.removeLayer(pendiente.marker);
   delete pendientes[id];
};


/* =========================
   6. LIKES
========================= */

window.addLike = async function (docId, boton) {
   boton.disabled = true;
   const contador = boton.querySelector("span");
   contador.textContent = Number(contador.textContent) + 1;

   try {
      await updateDoc(doc(db, "entries", docId), { likes: increment(1) });
   } catch (err) {
      console.error("Error al guardar el like:", err);
   }
};


/* =========================
   7. ZOOM Y TECLADO
   + / −, flechas y WASD
========================= */

document.getElementById("zoomIn").addEventListener("click", () => map.zoomIn());
document.getElementById("zoomOut").addEventListener("click", () => map.zoomOut());

const TECLAS = {
   "+": () => map.zoomIn(),
   "=": () => map.zoomIn(),
   "-": () => map.zoomOut(),
   "_": () => map.zoomOut(),
   "ArrowUp": () => map.panBy([0, -50]),
   "w": () => map.panBy([0, -50]),
   "ArrowDown": () => map.panBy([0, 50]),
   "s": () => map.panBy([0, 50]),
   "ArrowLeft": () => map.panBy([-50, 0]),
   "a": () => map.panBy([-50, 0]),
   "ArrowRight": () => map.panBy([50, 0]),
   "d": () => map.panBy([50, 0])
};

document.getElementById("map").addEventListener("keydown", (e) => {
   const etiqueta = e.target.tagName;
   if (etiqueta === "INPUT" || etiqueta === "TEXTAREA") return;

   const accion = TECLAS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
   if (accion) accion();
});


/* =========================
   8. BUSCADOR DE DIRECCIONES
   Prioridad: Barcelona ciudad → Cataluña → resto del mundo (Nominatim)
========================= */

const searchInput = document.getElementById("searchBox");
const suggestionBox = document.getElementById("suggestions");
let temporizador;
let marcadorBusqueda = null;

const NOMINATIM = "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&accept-language=ca,es";
const ZONA_BCN = "&viewbox=2.052,41.469,2.228,41.320&bounded=0";
const ZONA_CAT = "&viewbox=0.15,42.9,3.4,40.5&bounded=0";

async function buscar(texto, zona = "") {
   const res = await fetch(`${NOMINATIM}&q=${encodeURIComponent(texto)}${zona}`);
   return res.json();
}

function irALugar(lugar) {
   if (marcadorBusqueda) map.removeLayer(marcadorBusqueda);

   map.setView([lugar.lat, lugar.lon], 16);
   searchInput.value = lugar.display_name;
   suggestionBox.style.display = "none";

   marcadorBusqueda = L.marker([lugar.lat, lugar.lon], { icon: iconoBusqueda, pane: "alwaysOnTopPane" })
      .addTo(map)
      .bindPopup(`<div style="font-size:13px;">${escapeHTML(lugar.display_name)}</div>`)
      .openPopup();
}

searchInput.addEventListener("input", () => {
   clearTimeout(temporizador);

   const texto = searchInput.value;
   if (texto.length < 3) {
      suggestionBox.style.display = "none";
      return;
   }

   temporizador = setTimeout(async () => {
      try {
         const [bcn, cat, global] = await Promise.all([
            buscar(texto, ZONA_BCN),
            buscar(texto, ZONA_CAT),
            buscar(texto)
         ]);

         const esBarcelona = (p) => p.address && (p.address.city === "Barcelona" || p.address.town === "Barcelona");
         const yaIncluido = (lista, p) => lista.some(otro => otro.place_id === p.place_id);

         const nivel1 = bcn.filter(esBarcelona);
         const nivel2 = cat.filter(p => !yaIncluido(nivel1, p));
         const nivel3 = global.filter(p => !yaIncluido(nivel1, p) && !yaIncluido(nivel2, p));

         const resultados = [...nivel1, ...nivel2, ...nivel3].slice(0, 5);

         suggestionBox.innerHTML = "";
         suggestionBox.style.display = resultados.length ? "block" : "none";

         resultados.forEach(lugar => {
            const div = document.createElement("div");
            div.className = "suggestion";
            div.textContent = lugar.display_name;
            div.addEventListener("click", () => irALugar(lugar));
            suggestionBox.appendChild(div);
         });

      } catch (err) {
         console.error("Error en el buscador:", err);
      }
   }, 300);
});

/* Enter: primer resultado */
searchInput.addEventListener("keydown", (e) => {
   if (e.key === "Enter") suggestionBox.querySelector(".suggestion")?.click();
});

/* Mostrar u ocultar las sugerencias */
searchInput.addEventListener("focus", () => {
   if (suggestionBox.innerHTML.trim() !== "") suggestionBox.style.display = "block";
});

document.addEventListener("click", (e) => {
   if (!e.target.closest("#searchBox") && !e.target.closest("#suggestions")) {
      suggestionBox.style.display = "none";
   }
});


/* =========================
   9. LISTA DE LUGARES (panel lateral ☰)
========================= */

const listaLugares = document.getElementById("pinList");

listaLugares.innerHTML = `
   <button class="close-list-btn" data-i18n-aria="lista_cerrar_aria" data-i18n-tooltip="lista_cerrar">✕</button>
   <h3 data-i18n="lista_titulo"></h3>
   <p class="list-description" data-i18n="lista_descripcion"></p>
`;
aplicarTraducciones(listaLugares);

function anadirALista(mensaje, marker, latlng) {
   const item = document.createElement("div");
   item.className = "pin-item";

   if (mensaje) {
      item.textContent = mensaje.slice(0, 60);   // aportación del participante: no se traduce
   } else {
      item.dataset.i18n = "sin_mensaje";
      item.textContent = t("sin_mensaje");
   }

   item.addEventListener("click", () => {
      map.setView(latlng, 16);
      marker.openPopup();
      if (window.matchMedia("(max-width: 700px)").matches) listaLugares.classList.remove("abierto");
   });

   listaLugares.appendChild(item);
}

document.getElementById("listToggle").addEventListener("click", () => {
   listaLugares.classList.toggle("abierto");
});

listaLugares.querySelector(".close-list-btn").addEventListener("click", () => {
   listaLugares.classList.remove("abierto");
});


/* =========================
   10. CARGAR LOS PINS GUARDADOS
========================= */

async function cargarPins() {
   try {
      const snapshot = await getDocs(collection(db, "entries"));

      snapshot.forEach((docSnap) => {
         const data = docSnap.data();
         if (!data.lat || !data.lng) return;

         const marker = L.marker([data.lat, data.lng], {
            icon: crearIconoPin(colorSeguro(data.color)),
            pane: "alwaysOnTopPane"
         }).addTo(map);

         marker.bindPopup(popupGuardado(data.message, docSnap.id, data.likes || 0));
         anadirALista(data.message, marker, [data.lat, data.lng]);
      });

   } catch (err) {
      console.error("Error al cargar los pins:", err);
   }
}

cargarPins();