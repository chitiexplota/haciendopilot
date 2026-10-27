/* IDIOMAS */
import { t } from "./i18n.js";


/* FIREBASE */
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


// IMAGE CONTAINER


const imagenesDisponibles = [


"images/tmob.png",
"images/laus.jpeg",
"images/superilla.jpeg",
"images/chair.png",
"images/bigb.png",
"images/kids1.jpeg",
"images/born.jpeg",
"images/bar.png",
"images/bcn.png",
"images/barric.png",
"images/sit1.png",
"images/sit2.png",
"images/sit3.png",
"images/sit4.png",
"images/sit5.png",




// IMAGE ABC
 "images/abc/A.png",
 "images/abc/B.png",
 "images/abc/C.png",
 "images/abc/D.png",
 "images/abc/E.png",
 "images/abc/F.png",
 "images/abc/G.png",
 "images/abc/H.png",
 "images/abc/I.png",
 "images/abc/J.png",
 "images/abc/K.png",
 "images/abc/L.png",
 "images/abc/M.png",
 "images/abc/N.png",
 "images/abc/O.png",
 "images/abc/P.png",
 "images/abc/Q.png",
 "images/abc/R.png",
 "images/abc/S.png",
 "images/abc/T.png",
 "images/abc/U.png",
 "images/abc/V.png",
 "images/abc/W.png",
 "images/abc/X.png",
 "images/abc/Y.png",
 "images/abc/Z.png",
];




// TEXT AND IMAGES


const contenedor =
document.getElementById("elementos-canvas");




let elementos = [];


let textos = [];
let textoActivo = null;
let draggingTexto = false;


let trazos = [];
let trazoActual = [];




function crearFondo(src, x, y) {
   const contenedorFondos = document.getElementById("fondos-fijos");
   const img = document.createElement("img");
   img.src = src;
   img.className = "imagen-fija";
   img.style.left = x + "px";
   img.style.top = y + "px";
   contenedorFondos.appendChild(img);
}


function crearImagen(src,x,y, width = 220){


   const img=document.createElement("img");


   img.src=src;
   img.className="imagen-movil";


   img.style.width = width + "px";
   img.style.height = "auto";


   img.style.left = x + "px";
   img.style.top = y + "px";


   contenedor.appendChild(img);
   elementos.push({
       src:src,
       x:x,
       y:y,
       width:220
   });
  
   moverImagen(img);
   img.dataset.id =
   elementos.length-1;
}


function crearLetra(src,x,y){


   const img=document.createElement("img");


   img.src=src;
   img.className="letra-movil";
   img.style.left=x+"px";
   img.style.top=y+"px";
   contenedor.appendChild(img);
   elementos.push({
       src:src,
       x:x,
       y:y,
       width:40
   });


   moverImagen(img);
   img.dataset.id =
   elementos.length-1;
}


/* CANVAS */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const textCanvas = document.getElementById("text-canvas");
const ctxText = textCanvas.getContext("2d");




function resizeCanvas() {
   canvas.width = window.innerWidth;
   canvas.height = document.getElementById("zona-dibujo").offsetHeight;
   textCanvas.width = canvas.width;
   textCanvas.height = canvas.height;


   document.getElementById("elementos-canvas").style.height = canvas.height + "px";
}
resizeCanvas();


/* HISTORIAL PARA DESHACER (CTRL+Z) */
let historialCanvas = [];
let historialTextos = [];


function guardarEstado() {
   historialCanvas.push(canvas.toDataURL());
   historialTextos.push(JSON.parse(JSON.stringify(textos)));


   // limita el historial para no consumir demasiada memoria
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
   const teclaZ = e.key === "z" || e.key === "Z";
   const modificador = e.ctrlKey || e.metaKey;


   if (modificador && teclaZ) {
       e.preventDefault();
       deshacer();
   }
});




//




crearImagen("images/superilla.jpeg", window.innerWidth * 0.20, window.innerHeight * 0.40, 650);


crearImagen("images/laus.jpeg", window.innerWidth * 0.3, window.innerHeight * 0.85, 600);
crearImagen("images/born.jpeg", window.innerWidth * 0.1, window.innerHeight * 0.65, 300);


crearImagen("images/kids1.jpeg", window.innerWidth * 0.1, window.innerHeight * 1.20, 600);


crearImagen("images/chair.png", window.innerWidth * 0.10, window.innerHeight * 0.27, 190);
crearImagen("images/bigb.png", window.innerWidth * 0.20, window.innerHeight * 0.35, 100);
crearImagen("images/tmob.png", window.innerWidth * 0.62, window.innerHeight * 0.35, 180);




crearImagen("images/barric.png", window.innerWidth * 0.60, window.innerHeight * 1.20, 300);
crearImagen("images/bar.png",  window.innerWidth * 0.60, window.innerHeight * 1.20, 300);
crearImagen("images/bcn.png", window.innerWidth * 0.60, window.innerHeight * 1.40, 500);


crearImagen("images/sit1.png", window.innerWidth * 0.60, 850, 80);
crearImagen("images/sit2.png", window.innerWidth * 0.66, 850, 80);
crearImagen("images/sit3.png", window.innerWidth * 0.72, 850, 80);
crearImagen("images/sit4.png", window.innerWidth * 0.78, 850, 80);
crearImagen("images/sit5.png", window.innerWidth * 0.84, 850, 80);


// ABC
const alfabeto = [
 "A","B","C","D","E","F","G","H","I","J","K","L","M",
 "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];


const inicioX = 800;
const inicioY = 660;
const espacioX = 30;
const espacioY = 30;
const porFila = 7;
const copias = 2; // <-- cuántas letras "de repuesto" por debajo


for (let c = 0; c < copias; c++) {
   alfabeto.forEach((letra, i) => {
       const fila = Math.floor(i / porFila);
       const columna = i % porFila;


       const x = inicioX + columna * espacioX;
       const y = inicioY + fila * espacioY;


       crearLetra(`images/abc/${letra}.png`, x, y);
   });
}






let drawing = false;


let currentColor = "#000000";
let erasing = false;
let textMode = false;




canvas.addEventListener("mousedown", (e) => {


   if(textMode){


       const texto = prompt(t("prompt_texto"));


       if (texto) {
           guardarEstado(); 


            textos.push({
               text: texto,
               x: e.clientX,
               y: e.clientY + window.scrollY,
               color: currentColor,
               size: 32
           });
           renderTextos(); //
       }


       textMode = false;
       return;
   }


       const x = e.clientX;
       const y = e.clientY + window.scrollY;


       const hit = detectarTexto(x, y);


       if (hit) {
           textoActivo = hit;
           draggingTexto = true;
           return;
       }
  
       guardarEstado();


   drawing = true;


   ctx.beginPath();


   ctx.moveTo(
       e.clientX,
       e.clientY + window.scrollY
   );


});




canvas.addEventListener("mousemove", (e) => {


   if (draggingTexto && textoActivo) {
       textoActivo.x = e.clientX;
       textoActivo.y = e.clientY + window.scrollY;
       redraw();
       return;
   }


   if(!drawing) return;


   ctx.lineTo(
   e.clientX,
   e.clientY + window.scrollY
);


ctx.lineWidth = 4;
ctx.lineCap = "round";


if (erasing) {
   ctx.globalCompositeOperation = "destination-out";
   ctx.lineWidth = 30;
} else {
   ctx.globalCompositeOperation = "source-over";
   ctx.strokeStyle = currentColor;
   ctx.lineWidth = 4;
}


ctx.stroke();
renderTextos();


});




window.addEventListener("mouseup", () => {


   drawing = false;


   ctx.globalCompositeOperation = "source-over";


   draggingTexto = false;
   textoActivo = null;


});




window.addEventListener("resize", resizeCanvas);


// ESCONDER LOGO
window.addEventListener("scroll", () => {
   const logo = document.querySelector(".logo");
   if (window.scrollY > 50) {
       logo.style.opacity = "0";
       logo.style.pointerEvents = "none";
   } else {
       logo.style.opacity = "1";
       logo.style.pointerEvents = "auto";
   }
});


/* ENVIAR */

document.getElementById("enviar")
.addEventListener("click", async()=>{

const captura=document.createElement("canvas");
captura.width=window.innerWidth;
captura.height=window.innerHeight;

const c=captura.getContext("2d");
c.fillStyle="white";
c.fillRect(0,0,captura.width,captura.height);

c.drawImage( canvas, 0, 0 );
c.drawImage(textCanvas, 0, 0);

document
.querySelectorAll(".imagen-movil, .letra-movil")
.forEach(img=>{
  const r = img.getBoundingClientRect();
  c.drawImage(img, r.left, r.top, r.width, r.height);
});

const imagenBase64 =
captura.toDataURL("image/jpeg", 0.5);

try {
  await addDoc(
  collection(db, "dibujos"),
  {
     dibujo: imagenBase64,
     elementos: elementos,
     textos: textos,
     fecha: Date.now()
  }
  );

  alert(t("collage_guardado"));
} catch (error) {
  console.error("Error al guardar el collage:", error);
  alert(t("collage_error") + error.message);
}

})


/* POPUP */
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


/* GALERÍA */
const q = query(
   collection(db, "dibujos"),
   orderBy("fecha", "desc")
);


const galeria =
document.getElementById("galeria");


onSnapshot(q, (snapshot) => {
   galeria.innerHTML = "";


   snapshot.forEach((doc) => {
       const data = doc.data();


       const img = document.createElement("img");
       img.src = data.dibujo;


       img.onclick = () => openPopup(data.dibujo);


       galeria.appendChild(img);
   });
});


/* SUGERIR POPUP */
const sugerirBtn = document.getElementById("sugerir-btn");
const sugerirPopup = document.getElementById("sugerir-popup");
const sugerirClose = document.getElementById("sugerir-close");
const sugerenciaInput = document.getElementById("sugerencia-input");
const sugerenciaBtn = document.getElementById("sugerencia-btn");
const sugerenciasLista = document.getElementById("sugerencias-lista");


if (!sugerirBtn || !sugerirPopup || !sugerirClose || !sugerenciaInput || !sugerenciaBtn || !sugerenciasLista) {
   console.error(
       "SUGERENCIAS: falta algún elemento en el HTML.",
       "sugerir-btn:", sugerirBtn,
       "sugerir-popup:", sugerirPopup,
       "sugerir-close:", sugerirClose,
       "sugerencia-input:", sugerenciaInput,
       "sugerencia-btn:", sugerenciaBtn,
       "sugerencias-lista:", sugerenciasLista
   );
} else {


   // abrir popup
   sugerirBtn.addEventListener("click", () => {
       sugerirPopup.style.display = "flex";
   });


   // cerrar popup con la X
   sugerirClose.addEventListener("click", () => {
       sugerirPopup.style.display = "none";
   });


   // cerrar popup clicando fuera del contenido
   sugerirPopup.addEventListener("click", (e) => {
       if (e.target === sugerirPopup) {
           sugerirPopup.style.display = "none";
       }
   });


   // enviar sugerencia
   sugerenciaBtn.addEventListener("click", async () => {
       const texto = sugerenciaInput.value.trim();
       if (!texto) return;


       try {
           await addDoc(
               collection(db, "sugerencias"),
               {
                   texto: texto,
                   fecha: Date.now()
               }
           );


           sugerenciaInput.value = "";
       } catch (error) {
           console.error("Error al guardar la sugerencia en Firestore:", error);
       }
   });


   // enviar con Enter
   sugerenciaInput.addEventListener("keydown", (e) => {
       if (e.key === "Enter") {
           sugerenciaBtn.click();
       }
   });


   // escuchar y pintar sugerencias en tiempo real
   const qSugerencias = query(
       collection(db, "sugerencias"),
       orderBy("fecha", "desc")
   );


   onSnapshot(
       qSugerencias,
       (snapshot) => {
           sugerenciasLista.innerHTML = "";


           snapshot.forEach((doc) => {
               const data = doc.data();


               const pill = document.createElement("div");
               pill.className = "sugerencia-pill";
               pill.textContent = data.texto;


               sugerenciasLista.appendChild(pill);
           });
       },
       (error) => {
           console.error("Error al leer sugerencias de Firestore:", error);
       }
   );
}




/* IMAGEN INTERACTIVA */
/* NEW - mover cualquier imagen */




function moverImagen(img){


   let moviendo = false;
   let offsetX = 0;
   let offsetY = 0;


   img.addEventListener("mousedown", (e) => {


       moviendo = true;


       offsetX = e.clientX - img.offsetLeft;
       offsetY = (e.clientY + window.scrollY) - img.offsetTop;


   });


   document.addEventListener("mousemove", (e) => {


       if(!moviendo) return;


       const x = e.clientX - offsetX;
       const y = (e.clientY + window.scrollY) - offsetY;


       img.style.left = x + "px";
       img.style.top = y + "px";


       const id = parseInt(img.dataset.id);


       elementos[id].x = x;
       elementos[id].y = y;


   });


   document.addEventListener("mouseup", () => {
       moviendo = false;
   });


   document.addEventListener("touchend", () => {
   moviendo = false;
   });


}


function detectarTexto(x, y) {


   return textos.find(t => {


       ctx.font = t.size + "px Arial";


       const width = ctx.measureText(t.text).width;


       return (
           x >= t.x &&
           x <= t.x + width &&
           y >= t.y - 30 &&
           y <= t.y + 10
       );
   });
}


/* TOOLS MENU */


const crayonBtn = document.getElementById("crayon-btn");
const toolsMenu = document.getElementById("tools-menu");


const colorTool = document.getElementById("color-tool");
const colorPicker = document.getElementById("color-picker");


const eraserTool = document.getElementById("eraser-tool");
const textTool = document.getElementById("text-tool");


crayonBtn.addEventListener("click", () => {


   toolsMenu.style.display =
       toolsMenu.style.display === "flex"
       ? "none"
       : "flex";


});






/* COLOR */


colorTool.addEventListener("click", () => {


   colorPicker.click();


});




colorPicker.addEventListener("input", (e) => {


   currentColor = e.target.value;


   colorTool.style.background = currentColor;


   erasing = false;


});




/* TEXT TOOL */


textTool.addEventListener("click", () => {


   textMode = true;
   erasing = false;


});


document.addEventListener("click", (e) => {


   if (!textTool.contains(e.target)) {
       textMode = false;
   }


});


/* ERASER */


eraserTool.addEventListener("click", () => {


   erasing = true;


});


crayonBtn.addEventListener("click", () => {


   erasing = false;


});


function renderTextos() {
   ctxText.clearRect(0, 0, textCanvas.width, textCanvas.height);
   textos.forEach(t => {
       ctxText.fillStyle = t.color;
       ctxText.font = t.size + "px Arial";
       ctxText.fillText(t.text, t.x, t.y);
   });
}


function redraw() {
   renderTextos();
}