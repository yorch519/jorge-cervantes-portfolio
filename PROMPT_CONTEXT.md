# PROMPT_CONTEXT — Portafolio SPA Jorge Cervantes

Bitácora de decisiones técnicas. Actualizar al cerrar cada fase.

## Estado
- Fases 0–8 completadas (estructura completa, contenido en placeholder).
- Rama `feat/hero-mejoras`: iluminación, HUD, íconos y zoom del Hero (pendiente de aprobación para merge a `main`).
- Pendiente: rellenar contenido real en `/src/data/`.

## Flujo de trabajo Git
- `main` estable + ramas cortas `feat/<tema>`; merge directo a `main` + push.
- Commits en convención española: `tipo(ámbito): descripción`.
- `.opencode/` excluido del repo (en `.gitignore`).

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
- `/src/styles/globals.css` — variables de paleta Maya, reset, scrollbar oculta.

## Decisiones clave
- Identidad visual Maya: fondo `#1E1E1E`, tarjetas `#252525`, acento `#FF6B00`.
- Modelo 3D normalizado en runtime: auto-centrado + escalado a 3 unidades de alto, base en y=0.
- Iluminación: `hemisphereLight` (pareja, la espalda nunca queda negra) + direccional naranja de acento + rim blanco trasero.
- Layout Hero: HUD estilo Maya en esquina inferior izquierda (modelo centrado); íconos de contacto (copiar email + LinkedIn).
- Zoom: `enableZoom={false}` (la rueda scrollea) + botones `+`/`−` que llaman `dollyIn()/dollyOut()`.
- Scroll móvil: `touch-action: pan-y` en el canvas (un dedo = scroll, autoRotate gira el modelo).
- `prefers-reduced-motion` respetado (autoRotate y reveals desactivados; MotionConfig reducedMotion="user").
- Error boundary + Suspense con fallback de "viewport de carga" (el texto del Hero no depende del 3D).
- Sin librerías UI; CSS Modules estricto; cero webfonts externas.

## Cómo ejecutar
```
npm install
npm run dev     # http://localhost:5173
npm run build   # build de producción
```

## Por hacer (Fase 2 de contenido)
- Rellenar `/src/data/contact.js` (email, GitHub, LinkedIn reales).
- Rellenar `/src/data/specialtyProjects.js` y `codeProjects.js` (títulos, descripciones, links, previews).
- Sustituir previews placeholder (CSS/SVG) por imágenes/video/embeds reales.
- (Opcional) Code-split del canvas 3D para reducir bundle inicial (~1.1 MB min / ~331 KB gzip).
