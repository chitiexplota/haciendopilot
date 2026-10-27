/* =========================
   IDIOMAS (ES / CA)
   Todas las páginas cargan este archivo.

   - Los textos del HTML se traducen con atributos:
     data-i18n (texto) · data-i18n-placeholder · data-i18n-title
     data-i18n-aria (aria-label) · data-i18n-tooltip (descripción al pasar el ratón)
   - Los textos que crea el JavaScript usan t("clave").
   - Las aportaciones de los participantes (collages, sugerencias,
     mensajes del mapa) NO se traducen nunca.
   - Para cambiar un texto, edita solo lo que hay entre comillas.

   Índice
   1. Textos (es / ca)
   2. Idioma actual
   3. Aplicar y cambiar idioma
========================= */


/* =========================
   1. TEXTOS
========================= */

const TEXTOS = {

   es: {
      /* TÍTULOS DE PESTAÑA */
      title_inicio: "Haciendo.lab",
      title_collage: "Haciendo.lab — Collage",
      title_mapa: "Haciendo.lab — Mapa",
      title_info: "Haciendo.lab — Cómo participar",

      /* 01 · INICIO */
      intro_subtitulo: "Herramientas creativas para la participación ciudadana inclusiva y la producción de conocimiento cualitativo sobre el espacio público.",
      intro_p1: "Este espacio permite explorar, imaginar y compartir ideas sobre el espacio público de la ciudad.",
      intro_p2: "Puedes crear tu propio collage utilizando imágenes, dibujos y palabras.",
      entrar_collage: "Entrar al collage →",
      entrar_mapa: "Entrar al mapa →",
      entrar_info: "Aprende más sobre el proyecto →",

      /* 02 · COLLAGE */
      enviar_collage: "Enviar Collage",
      galeria_titulo: "Últimos collages enviados",
      sugerir_title: "Sugerir imágenes o componentes",
      sugerir_pregunta: "¿Qué imágenes o elementos te gustaría ver en el collage?",
      sugerencia_placeholder: "Escribe tu sugerencia...",
      sugerencia_enviar: "Enviar",
      prompt_texto: "Escribe un texto:",
      collage_guardado: "Collage guardado correctamente",
      collage_error: "No se pudo guardar el collage: ",

      /* 03 · MAPA */
      buscar_placeholder: "buscar dirección",
      buscar_aria: "Buscar dirección",
      sugerencias_aria: "Sugerencias de direcciones",
      info_mapa: "Haz click en el mapa para crear un pin",
      mapa_aria: "Mapa interactivo de Barcelona",
      zoom_in_aria: "Acercar mapa",
      zoom_out_aria: "Alejar mapa",
      contraste_aria: "Alternar alto contraste",
      lista_aria: "Ver lista de lugares",
      popup_titulo: "Comparte tu experiencia",
      popup_paso1: "1 Haz clic en un lugar en el mapa.",
      popup_paso2: "2 Escribe tu experiencia, historia o sensación relacionada con ese lugar.",
      popup_paso3: "3 Haz clic en «¡Hecho!».",
      popup_nombre: "Nombre o identificador:",
      popup_nombre_ph: "Tu nombre no aparecerá en el mapa.",
      popup_historia_ph: "Escribe aquí tu historia...",
      popup_color: "Color del pin:",
      popup_hecho: "¡Hecho!",
      popup_cerrar: "Cerrar",
      sin_mensaje: "Sin mensaje",
      pin_guardado: "¡Recibido! Gracias por compartir tu experiencia",
      pin_error: "Hubo un problema al guardar tu experiencia. Inténtalo de nuevo.",
      lista_titulo: "Lugares compartidos",
      lista_descripcion: "Haz click en estos comentarios para ver el lugar en el que se añadieron",
      lista_cerrar: "Cerrar lista",
      lista_cerrar_aria: "Cerrar lista de lugares",

      /* 04 · CÓMO PARTICIPAR */
      info_h1: "Cómo participar",
      collage_guia_titulo: "Aprende a crear un collage digital",
      collage_guia_intro: "Crear tu collage en haciendo.lab es muy sencillo, solo tienes que arrastrar los elementos:",
      collage_paso1: "Sitúa el cursor encima del elemento que quieras mover.",
      collage_paso1_detalle: "Verás que el cursor se transforma en una mano.",
      collage_paso2: "Haz click sobre el elemento.",
      collage_paso2_detalle: "Verás que el cursor se transforma en una mano cerrada. ¡Estás agarrando el elemento!",
      collage_paso3: "Sin soltar, muévelo hasta donde quieras colocarlo.",
      collage_paso4: "¡Repite con todos los elementos que quieras para construir tu collage!",
      practica: "¡Puedes practicar moviendo este logo!",
      todo_listo: "¿Todo listo?",
      volver_collage: "Pulsa aquí para volver al collage.",
      porque_collage_titulo: "¿Por qué un collage?",
      porque_collage_p1: "El collage es una forma de expresión muy versátil que combina imágenes y textos en una sola pieza. Es también una herramienta de investigación: permite recoger información de forma rica e inclusiva, y da voz a conocimientos que a veces no caben en los métodos más convencionales o académicos.",
      porque_collage_p2: "Para este proyecto, el collage es especialmente relevante porque es un método accesible para todo el mundo, dinámico y abierto a la iteración. El collage permite pensar sobre el espacio público sin limitarnos a su estado actual, e imaginar cómo nos gustaría que fuera.",
      mapa_guia_titulo: "Aprende a usar el mapa",
      mapa_paso1: "Haz clic en un lugar en el mapa.",
      mapa_paso2: "Escribe tu experiencia, historia o sensación relacionada con ese lugar.",
      mapa_paso3: "Haz clic en «¡Hecho!».",
      ir_mapa: "Pulsa aquí para ir al mapa.",
      porque_mapa_titulo: "¿Por qué un mapa?",
      porque_mapa_p1: "El mapa colaborativo es una forma sencilla de contar cómo vivimos la ciudad. Cada punto del mapa guarda una experiencia, un recuerdo o una sensación ligada a un lugar concreto. Poco a poco, todas estas historias forman un archivo colectivo del espacio público, y el propio mapa muestra en qué lugares se acumulan más experiencias.",
      porque_mapa_p2: "Para este proyecto, el mapa es especialmente relevante porque pone muy fácil participar: basta con hacer clic, escribir y enviar, cuando quieras y desde donde quieras, sin tener que coincidir con nadie. Tu nombre no aparece nunca en el mapa, y lo que escribes se publica tal y como lo cuentas, sin que nadie lo interprete por ti. Así, el mapa ayuda a hacer visibles voces que a menudo se quedan fuera de los procesos de participación tradicionales.",

      /* DESCRIPCIONES AL PASAR EL RATÓN */
      tip_inicio: "Inicio",
      tip_collage: "Collage",
      tip_mapa: "Mapa",
      tip_info: "Cómo participar",
      tip_es: "Ver en castellano",
      tip_ca: "Ver en catalán",
      tip_enviar: "Guarda tu collage y compártelo en la galería",
      tip_dibujar: "Dibujar: abre las herramientas de dibujo",
      tip_mover: "Mover: arrastra las imágenes y las letras",
      tip_color: "Elegir el color del lápiz",
      tip_texto: "Añadir texto: haz clic donde quieras escribir",
      tip_goma: "Goma de borrar"
   },

   ca: {
      /* TÍTOLS DE PESTANYA */
      title_inicio: "Haciendo.lab",
      title_collage: "Haciendo.lab — Collage",
      title_mapa: "Haciendo.lab — Mapa",
      title_info: "Haciendo.lab — Com participar",

      /* 01 · INICI */
      intro_subtitulo: "Eines creatives per a la participació ciutadana inclusiva i la producció de coneixement qualitatiu sobre l'espai públic.",
      intro_p1: "Aquest espai permet explorar, imaginar i compartir idees sobre l'espai públic de la ciutat.",
      intro_p2: "Pots crear el teu propi collage fent servir imatges, dibuixos i paraules.",
      entrar_collage: "Entrar al collage →",
      entrar_mapa: "Entrar al mapa →",
      entrar_info: "Aprèn més sobre el projecte →",

      /* 02 · COLLAGE */
      enviar_collage: "Enviar Collage",
      galeria_titulo: "Últims collages enviats",
      sugerir_title: "Suggerir imatges o components",
      sugerir_pregunta: "Quines imatges o elements t'agradaria veure al collage?",
      sugerencia_placeholder: "Escriu el teu suggeriment...",
      sugerencia_enviar: "Enviar",
      prompt_texto: "Escriu un text:",
      collage_guardado: "Collage desat correctament",
      collage_error: "No s'ha pogut desar el collage: ",

      /* 03 · MAPA */
      buscar_placeholder: "cercar adreça",
      buscar_aria: "Cercar adreça",
      sugerencias_aria: "Suggeriments d'adreces",
      info_mapa: "Fes clic al mapa per crear un pin",
      mapa_aria: "Mapa interactiu de Barcelona",
      zoom_in_aria: "Apropar el mapa",
      zoom_out_aria: "Allunyar el mapa",
      contraste_aria: "Alternar l'alt contrast",
      lista_aria: "Veure la llista de llocs",
      popup_titulo: "Comparteix la teva experiència",
      popup_paso1: "1 Fes clic en un lloc del mapa.",
      popup_paso2: "2 Escriu la teva experiència, història o sensació relacionada amb aquest lloc.",
      popup_paso3: "3 Fes clic a «Fet!».",
      popup_nombre: "Nom o identificador:",
      popup_nombre_ph: "El teu nom no apareixerà al mapa.",
      popup_historia_ph: "Escriu aquí la teva història...",
      popup_color: "Color del pin:",
      popup_hecho: "Fet!",
      popup_cerrar: "Tancar",
      sin_mensaje: "Sense missatge",
      pin_guardado: "Rebut! Gràcies per compartir la teva experiència",
      pin_error: "Hi ha hagut un problema en desar la teva experiència. Torna-ho a provar.",
      lista_titulo: "Llocs compartits",
      lista_descripcion: "Fes clic en aquests comentaris per veure el lloc on es van afegir",
      lista_cerrar: "Tancar la llista",
      lista_cerrar_aria: "Tancar la llista de llocs",

      /* 04 · COM PARTICIPAR */
      info_h1: "Com participar",
      collage_guia_titulo: "Aprèn a crear un collage digital",
      collage_guia_intro: "Crear el teu collage a haciendo.lab és molt senzill, només has d'arrossegar els elements:",
      collage_paso1: "Situa el cursor damunt de l'element que vulguis moure.",
      collage_paso1_detalle: "Veuràs que el cursor es transforma en una mà.",
      collage_paso2: "Fes clic sobre l'element.",
      collage_paso2_detalle: "Veuràs que el cursor es transforma en una mà tancada. Estàs agafant l'element!",
      collage_paso3: "Sense deixar-lo anar, mou-lo fins on el vulguis col·locar.",
      collage_paso4: "Repeteix-ho amb tots els elements que vulguis per construir el teu collage!",
      practica: "Pots practicar movent aquest logo!",
      todo_listo: "Tot a punt?",
      volver_collage: "Prem aquí per tornar al collage.",
      porque_collage_titulo: "Per què un collage?",
      porque_collage_p1: "El collage és una forma d'expressió molt versàtil que combina imatges i textos en una sola peça. És també una eina de recerca: permet recollir informació de manera rica i inclusiva, i dona veu a coneixements que de vegades no caben en els mètodes més convencionals o acadèmics.",
      porque_collage_p2: "Per a aquest projecte, el collage és especialment rellevant perquè és un mètode accessible per a tothom, dinàmic i obert a la iteració. El collage permet pensar l'espai públic sense limitar-nos al seu estat actual, i imaginar com ens agradaria que fos.",
      mapa_guia_titulo: "Aprèn a fer servir el mapa",
      mapa_paso1: "Fes clic en un lloc del mapa.",
      mapa_paso2: "Escriu la teva experiència, història o sensació relacionada amb aquest lloc.",
      mapa_paso3: "Fes clic a «Fet!».",
      ir_mapa: "Prem aquí per anar al mapa.",
      porque_mapa_titulo: "Per què un mapa?",
      porque_mapa_p1: "El mapa col·laboratiu és una manera senzilla d'explicar com vivim la ciutat. Cada punt del mapa guarda una experiència, un record o una sensació lligada a un lloc concret. A poc a poc, totes aquestes històries formen un arxiu col·lectiu de l'espai públic, i el mateix mapa mostra en quins llocs s'acumulen més experiències.",
      porque_mapa_p2: "Per a aquest projecte, el mapa és especialment rellevant perquè posa molt fàcil participar: només cal fer clic, escriure i enviar, quan vulguis i des d'on vulguis, sense haver de coincidir amb ningú. El teu nom no apareix mai al mapa, i el que escrius es publica tal com ho expliques, sense que ningú ho interpreti per tu. Així, el mapa ajuda a fer visibles veus que sovint queden fora dels processos de participació tradicionals.",

      /* DESCRIPCIONS EN PASSAR EL RATOLÍ */
      tip_inicio: "Inici",
      tip_collage: "Collage",
      tip_mapa: "Mapa",
      tip_info: "Com participar",
      tip_es: "Veure en castellà",
      tip_ca: "Veure en català",
      tip_enviar: "Desa el teu collage i comparteix-lo a la galeria",
      tip_dibujar: "Dibuixar: obre les eines de dibuix",
      tip_mover: "Moure: arrossega les imatges i les lletres",
      tip_color: "Triar el color del llapis",
      tip_texto: "Afegir text: fes clic on vulguis escriure",
      tip_goma: "Goma d'esborrar"
   }
};


/* =========================
   2. IDIOMA ACTUAL (se recuerda entre páginas)
========================= */
const CLAVE_IDIOMA = "haciendo-idioma";

export function getIdioma() {
   try {
      return localStorage.getItem(CLAVE_IDIOMA) === "ca" ? "ca" : "es";
   } catch (e) {
      return "es";
   }
}

let idioma = getIdioma();


/* Traducir una clave (textos que crea el JS: avisos, popups, listas) */
export function t(clave) {
   return TEXTOS[idioma][clave] ?? TEXTOS.es[clave] ?? clave;
}


/* =========================
   3. APLICAR Y CAMBIAR IDIOMA
========================= */

/* Aplicar las traducciones a toda la página (o a una parte) */
export function aplicarTraducciones(raiz = document) {

   document.documentElement.lang = idioma;

   raiz.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
   });

   raiz.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
   });

   raiz.querySelectorAll("[data-i18n-title]").forEach(el => {
      el.title = t(el.dataset.i18nTitle);
   });

   raiz.querySelectorAll("[data-i18n-aria]").forEach(el => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
   });

   raiz.querySelectorAll("[data-i18n-tooltip]").forEach(el => {
      el.dataset.tooltip = t(el.dataset.i18nTooltip);
   });

   document.querySelectorAll(".lang-btn").forEach(btn => {
      const activo = btn.dataset.lang === idioma;
      btn.classList.toggle("active", activo);
      btn.setAttribute("aria-pressed", activo);
   });
}


/* Cambiar de idioma */
export function setIdioma(nuevo) {
   idioma = nuevo === "ca" ? "ca" : "es";

   try {
      localStorage.setItem(CLAVE_IDIOMA, idioma);
   } catch (e) {
      // sin localStorage: el cambio funciona igual, pero no se recuerda
   }

   aplicarTraducciones();
   window.dispatchEvent(new CustomEvent("cambio-idioma", { detail: idioma }));
}


/* Botones ES / CA del menú */
document.querySelectorAll(".lang-btn").forEach(btn => {
   btn.addEventListener("click", () => setIdioma(btn.dataset.lang));
});

aplicarTraducciones();