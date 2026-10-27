# Haciendo.lab — Piloto

Plataforma web de **Haciendo.lab**: herramientas creativas para la participación ciudadana inclusiva y la producción de conocimiento cualitativo sobre el espacio público en la ciudad postindustrial (Barcelona). Etapa 1. PILOTO.

Web publicada: https://chitiexplota.github.io/haciendopilot/

## Páginas

| Página | HTML | CSS | JS |
|---|---|---|---|
| 01 · Inicio | `index.html` | `style.css` | `i18n.js` |
| 02 · Collage | `collage.html` | `style.css` + `collage.css` | `collage.js` |
| 03 · Mapa | `mapa.html` | `style.css` + `mapa.css` | `mapa.js` |
| 04 · Cómo participar | `info.html` | `style.css` + `info.css` | `info.js` |

## Archivos comunes

- **`style.css`**: colores, cabecera (logo, menú, idioma), botones de entrada, descripciones al pasar el ratón, página 01 y versión móvil de la cabecera.
- **`i18n.js`**: textos en castellano y catalán, y selector ES / CA. Las aportaciones de los participantes no se traducen nunca.
- **`logo.png`** y la carpeta **`images/`** (fotos, iconos y letras `images/abc/A.png` … `Z.png`).

## Versión móvil

Todas las páginas se adaptan a pantallas de hasta 700 px de ancho.
En el collage, en móvil, todo cabe en una sola pantalla (lo que se ve es lo que se envía), y se puede mover, dibujar y escribir con el dedo.

## Datos (Firebase Firestore)

| Herramienta | Proyecto | Colecciones |
|---|---|---|
| Collage | `ull-collage` | `dibujos`, `sugerencias` |
| Mapa | `digitalull` | `entries` |

Copias de seguridad: repositorio privado `haciendo-backups`.

## Normas del código

- Comentarios y nombres en castellano.
- Secciones con el mismo formato en CSS y JS:
  ```
  /* =========================
     TÍTULO
  ========================= */
  ```
  y en HTML: `<!-- TÍTULO -->`.
- Indentación de 3 espacios.
- Cada archivo empieza con un índice de sus secciones.