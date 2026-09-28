# Portafolio de periodismo

## Cómo abrirlo en VS Code
1. Abre la carpeta `portafolio` en VS Code.
2. Instala la extensión **Live Server** (de Ritwick Dey).
3. Clic derecho sobre `index.html` y elige **Open with Live Server**.

## Dónde se edita cada cosa
- **Todos los textos, datos de contacto y trabajos:** `js/data.js`
- **Colores y tipografías:** al inicio de `css/styles.css`
- **Portadas de la intro:** la lista `PORTADAS` en `js/data.js`

## Archivos que debes agregar
| Archivo | Uso | Recomendación |
|---|---|---|
| `assets/img/foto.jpg` | Retrato en "Sobre mí" | Vertical 4:5, mínimo 900 px de ancho |
| `assets/img/portada1.jpg` a `portada6.jpg` | Fotos de ella para la intro | Horizontales, mínimo 1600 px |
| `assets/img/portada7.jpg` a `portada10.jpg` | Imágenes de apoyo para la intro | Horizontales, mínimo 1600 px |
| `assets/video/showreel.mp4` | Sección de showreel (opcional) | 30 a 60 s, 1080p, menos de 15 MB |
| `assets/img/trabajo1.jpg` a `trabajo8.jpg` | Portadas de las tarjetas de trabajos (capturas de los reels) | Horizontales 3:2 |
| `assets/cv.pdf` | Hoja de vida descargable | PDF |

Si una foto no existe, el sitio no se rompe: en su lugar aparece una trama de puntos como de periódico.

## Ver la intro otra vez
La intro se muestra una vez por sesión. Para repetirla, cierra la pestaña y ábrela de nuevo, o en la consola del navegador ejecuta `sessionStorage.clear()` y recarga.

## Comprimir videos
Con HandBrake (gratis) usa el preset "Web" y quita la pista de audio de los clips de la intro.
