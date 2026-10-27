# Haciendo.lab — Collage

Módulo de collage colaborativo de la plataforma **Haciendo.lab**, herramienta digital para la participación ciudadana inclusiva y la producción de conocimiento cualitativo sobre el espacio público en la ciudad postindustrial (Barcelona).

Este prototipo permite expresar experiencias y percepciones sobre el espacio público a través de dibujo libre, imágenes arrastrables, letras y texto, como alternativa creativa y accesible a los métodos convencionales de participación. Cada creación se guarda en Firebase Firestore como imagen en base64.

## Estructura de archivos

```
index.html   → Estructura y contenido (HTML)
style.css    → Todos los estilos (CSS)
script.js    → Lógica de la aplicación y conexión con Firebase (JS, tipo módulo)
```

`index.html` enlaza los otros dos:
```html
<link rel="stylesheet" href="style.css">
...
<script type="module" src="script.js"></script>
```

El código interno de los tres archivos es idéntico al del `index.html` original; solo se ha movido a archivos separados, sin modificar ninguna línea, comentario o lógica.

## Cómo usarlo

1. Sube los tres archivos (`index.html`, `style.css`, `script.js`) junto con la carpeta `images/` y el `logo.png` al mismo directorio en tu hosting.
2. Verifica que la ruta `<base href="/Collage/">` coincide con la ruta real donde se sirve la página; si no, ajústala.
3. Firebase ya está configurado con las credenciales del proyecto `ull-collage`; no requiere pasos adicionales para funcionar.