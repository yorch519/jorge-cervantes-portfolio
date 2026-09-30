# PROMPT_CONTEXT — Portafolio SPA Jorge Cervantes

Bitácora de decisiones técnicas. Actualizar al cerrar cada fase o merge.

## Estado

- Fases 0–8 completadas (estructura completa, contenido aún en placeholder).
- **Hero completo y fusionado a `main`** (rama `feat/hero-mejoras` cerrada).
- Rama activa: `feat/especialidad-mejoras` — modificaciones de la sección Especialidad (en curso).
- Pendiente: rellenar contenido real en `/src/data/`.

## Flujo de trabajo Git

Documentado en detalle en [`GIT_WORKFLOW.md`](./GIT_WORKFLOW.md).

- `main` estable + ramas cortas `feat/<tema>`; merge directo a `main` + push.
- Commits en convención española `tipo(ámbito): descripción`.
- Checkpoints con tags (ej. `hero-v1`).
- `.opencode/` excluido del repo (`.gitignore`).

## Stack (versiones fijadas)

- React 18.3.1 / react-dom 18.3.1
- Vite 5.4.21 + @vitejs/plugin-react 4.3.4
- @react-three/fiber 8.18.0 · @react-three/drei 9.122.0 · three 0.169.0
- framer-motion 11.18.2

> React se fija a 18.3 porque R3F v8 no soporta React 19.

## Estructura

- `/public/personaje.glb` — modelo 3D del Hero (GLB válido, v2, 402 KB).
- `/src/data/` — `specialtyProjects.js`, `codeProjects.js`, `contact.js` (PLACEHOLDERS).
- `/src/components/{Hero,ProyectosEspecialidad,ProyectosCodigo,Footer}/`
- `/src/styles/globals.css` — variables de paleta, reset, scrollbar oculta.

## Decisiones clave

- Identidad visual Maya: fondo `#1E1E1E`, paneles/tarjetas `#252525`, acento `#FF6B00`.
- Acentos secundarios para "dar vida": coral `#FF9E5E` (`--accent-warm`) y teal `#5AC8C8` (`--accent-cool`) — labels por sección, keywords del hero y tintes por categoría.
- Modelo 3D normalizado en runtime: auto-centrado + escalado a 3 unidades de alto, base en y=0.
- Iluminación: `hemisphereLight` + direccional naranja (`#FF8800`, intensidad 2.2) + rim blanco trasero.
- Hero: HUD panel sólido `#252525` centrado vertical a la izquierda; íconos de contacto (copiar email al portapapeles + LinkedIn); indicador de scroll.
- Grid de fondo (CSS) **detrás** del modelo con desvanecido hacia abajo; canvas WebGL transparente.
- Zoom: `enableZoom={false}` (la rueda scrollea la página) + botones `reset` / `+` / `−` (restauración de cámara + `dollyIn`/`dollyOut`).
- Sombra de contacto (`ContactShadows`) bajo el personaje.
- Ángulos de cámara simétricos: ±35° alrededor de la horizontal (`minPolarAngle = π/2 − 0.6`, `maxPolarAngle = π/2 + 0.6`).
- Scroll móvil: `touch-action: pan-y` en el canvas (un dedo = scroll; el modelo gira con autoRotate).
- Micro-interacciones: tarjetas que elevan + glow en hover, flechas `↗` deslizantes, press en botones.
- `prefers-reduced-motion` respetado (autoRotate, reveals y lifts desactivados; `MotionConfig reducedMotion="user"`).
- Error boundary + Suspense con fallback de "viewport de carga" (el texto del Hero no depende del 3D).
- Sin librerías de UI; CSS Modules estricto; cero webfonts externas.

## Cómo ejecutar

```
npm install
npm run dev     # http://localhost:5173
npm run build   # build de producción
```

## Por hacer

- Modificaciones de la sección **Especialidad** (en curso en `feat/especialidad-mejoras`).
- Fase 2 de contenido (rellenar datos reales):
  - `/src/data/contact.js` — email, GitHub, LinkedIn reales.
  - `/src/data/specialtyProjects.js` y `codeProjects.js` — títulos, descripciones, links, previews.
  - Sustituir previews placeholder (CSS/SVG) por imágenes/video/embeds reales.
- (Opcional) Code-split del canvas 3D para reducir bundle inicial (~1.1 MB min / ~333 KB gzip).
