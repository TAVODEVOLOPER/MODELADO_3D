# Dolwin 4 · Visor 3D de cubiertas

Visor 3D (Three.js) de las cubiertas de la plataforma HVDC **Dolwin 4** (niveles 0 a 11), generado a partir del plano
`DB4_AREAS_REV03_20250617.pdf` (Rev03, 17/06/2025, escala 1:175) y del Excel `ROOM_CR.xlsx`.

## Qué incluye
- Navegación orbital y modo **caminar** dentro de cada área (teclado, ratón, táctil).
- Búsqueda por **área** o **room**, filtro **Clean Room** (resaltado) y nombres sobre el modelo.
- **Paredes, puertas y persianas** extraídas de los trazos del plano (detección automática, no es un listado oficial).
- **Planos PDF** sobre el suelo: textura por nivel y, al seleccionar o entrar a un área, versión de alta resolución.
- Brújula/Norte, modo escritorio, tablet y móvil, pantalla completa.
- **PWA instalable** y funciona sin conexión tras la primera visita.
- Enlaces profundos: `#nivel=3`, `#area=3.01`, `#room=CLSL01` (útil desde Excel con `HYPERLINK`).

## Estructura
```
index.html              aplicación (HTML + CSS + JS, datos de áreas/paredes embebidos)
manifest.webmanifest    manifiesto PWA
sw.js                   service worker (caché offline; cambia VERSION al publicar cambios)
vendor/three.min.js     Three.js r128 (local, para offline)
icons/                  iconos de la app (any + maskable + apple-touch + favicon)
assets/plans/           texturas por nivel (L0…L10, detalles 10d1/10d2)
assets/areas/           texturas de alta resolución por área
```

## Publicar en GitHub Pages
1. Sube el contenido de esta carpeta a un repositorio (raíz del repo o carpeta `docs/`).
2. *Settings → Pages* → rama `main` y carpeta `/ (root)` (o `/docs`).
3. Abre `https://<usuario>.github.io/<repo>/` (HTTPS es obligatorio para instalar como app).
4. En Chrome/Edge: icono *Instalar* en la barra de direcciones. En iOS: *Compartir → Añadir a pantalla de inicio*.

Las rutas son relativas, así que funciona en subcarpetas. **No abras `index.html` con doble clic** (`file://`): el
navegador bloquea las texturas; usa un servidor, por ejemplo `python3 -m http.server`.

## Notas
- Las tipografías (Google Fonts) se cargan por red la primera vez y quedan en caché; sin ellas se usa la fuente del sistema.
- Al cambiar cualquier archivo, sube `VERSION` en `sw.js` para que las instalaciones se actualicen.
