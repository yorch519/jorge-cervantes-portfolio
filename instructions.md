# ESPECIFICACIÓN TÉCNICA Y DE DISEÑO: PORTAFOLIO WEB PERSONAL (SPA)

## 1. INFORMACIÓN DEL DESARROLLADOR Y OBJETIVO
Desarrollar una aplicación web de una sola página (Single Page Application - SPA) para el portafolio profesional de Jorge Cervantes. El sitio debe proyectar una identidad visual técnica, altamente creativa e inmersiva, alejándose por completo de plantillas corporativas genéricas o sitios con "aspecto vibecodeado".

- **Nombre:** Jorge Cervantes
- **Rol / Especialización:** Productor Multimedia
- **Ubicación:** Ciudad Obregón, Sonora, México
- **Formato:** Single Page Application (SPA) con scroll vertical fluido.

---

## 2. REGLAS DE DISEÑO, UX Y QUÉ EVITAR STRICTAMENTE

### Lo que DEBE EVITARSE a nivel visual y de código:
- **No Skill Galaxies / No Bubble Spam:** Prohibido usar nubes flotantes de logos o burbujas para listar lenguajes, frameworks o software (React, Vite, Maya, etc.). Las herramientas se demuestran en los proyectos.
- **No Bars / Progress Indicators:** Prohibido usar barras de porcentaje de conocimiento (ej. "90% CSS").
- **No Dark/Light Mode Switch:** La página no tendrá botón de cambio de tema. La experiencia es fija, intencional y oscura.
- **No Cliché Copywriting:** Evitar frases genéricas como "desarrollador apasionado por soluciones innovadoras". El texto debe ser pragmático, directo y en voz activa.
- **No Multi-Page Friction:** Toda la información vital y proyectos estarán en una sola vista vertical mediante scroll. Nada de ocultar el trabajo principal detrás de pestañas o menús complejos.
- **No Flashy Unnecessary Animations:** Las animaciones deben ser funcionales, sutiles y no entorpecer el acceso al contenido ni retrasar la carga.

### Lo que DEBE IMPLEMENTARSE:
- **Información Vital al Frente:** Nombre, ubicación (Ciudad Obregón), especialización (Productor Multimedia) y botones de contacto visibles inmediatamente en la primera sección.
- **Acceso Directo al Trabajo:** Enlaces directos, masivos y de baja fricción a repositorios de GitHub y demos en vivo.
- **Demostración de Habilidades CSS:** Uso de código CSS limpio, personalizado y técnico.

---

## 3. GUÍA DE ESTILO Y DIRECCIÓN DE ARTE (MAYA3D WORKSPACE)

El lenguaje visual está inspirado en la interfaz de trabajo del software de modelado 3D Autodesk Maya: utilitario, enfocado en producción, oscuro y sin distracciones.

### Paleta de Colores
- **Fondo General (Viewport Base):** `#1E1E1E` (Gris carbón oscuro).
- **Paneles y Tarjetas (Containers):** `#2A2A2A` y `#252525` (Gris medio con jerarquía visual sutil).
- **Acento Principal (Interactive / Focus):** `#FF6B00` o `#FF8800` (Naranja técnico para botones, estados hover, enlaces activos y luces de acento).
- **Texto Principal:** `#E0E0E0` (Blanco suave de alto contraste sin fatiga visual).
- **Texto Secundario / Labels:** `#888888` (Gris neutro para metadata).

### UI & UX Rules
- **Scrollbar Personalizado/Oculto:** Ocultar la barra de desplazamiento predeterminada del navegador (`scrollbar-width: none;` y `::-webkit-scrollbar { display: none; }`), manteniendo la funcionalidad del scroll totalmente intacta.
- **Indicador de Scroll:** Incluir un indicador visual sutil (como un elemento interactivo o flecha en naranja de acento) en la primera sección para indicar al usuario que hay más contenido hacia abajo.

### Tipografía
- **Labels / UI / Metadata (monospace técnica):** `ui-monospace, "Cascadia Mono", "JetBrains Mono", Menlo, Consolas, monospace`. Reservada para etiquetas, metadata técnica y microcopy estilo software de producción.
- **Texto general (sans serif neutra):** `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
- **Restricción:** Cero Google Fonts o webfonts externas (0 peticiones de red por tipografía; los stacks de sistema son suficientes y refuerzan el look utilitario).

---

## 4. ARQUITECTURA TÉCNICA Y STACK

- **Build Tool / Framework:** React 18+ sobre Vite.
- **3D Engine:** `@react-three/fiber` (R3F) y `@react-three/drei` sobre `three.js`.
- **Animaciones e Interacciones:** `framer-motion`.
- **Metodología de Estilos:** CSS Modules (`.module.css`) para modularidad estricta y código CSS puro.
- **Restricción Estricta:** Queda prohibido el uso de librerías de UI prefabricadas (Tailwind CSS, Bootstrap, Material UI, etc.).

### Versiones (PIN CRÍTICO — no instalar a ciegas)
npm instala React 19 por defecto hoy, pero `@react-three/fiber` v8 —la versión estable usada en la mayoría de ejemplos— requiere React 18. Instalar ciego compila con errores o warnings rotos. Fijar:
- `react@18.3.x` / `react-dom@18.3.x`
- `@react-three/fiber@^8` + `@react-three/drei@^9`
- `three` (última estable compatible con fiber v8)
- `framer-motion@^11`
- Vite 5.x (template `react` de Vite 6/7 cambia estructura; usar el que genere el scaffold, pero anclar React a 18.3).

> Regla: tras `npm install`, verificar en `package.json` que React sea `18.3.x` antes de escribir componente alguno.

---

## 5. ESTRUCTURA DE COMPONENTES Y CONTENIDO (SCROLL VERTICAL)

La página se compone de 4 bloques apilados verticalmente:

1. HERO SECTION (3D Viewport + Presentación Directa)
2. PROYECTOS ESPECIALIDAD (3D, Render, Video)
3. PROYECTOS CÓDIGO (Desarrollo Web & Tools Tecnológicas)
4. FOOTER (Cierre + Contacto Directo)

### Bloque 1: `<Hero />`
- **Contenido 3D Interactivo:** Un canvas de React Three Fiber que carga el modelo optimizado `public/personaje.glb` (nombre resuelto; el archivo existe en el proyecto).
- **Manejo del modelo 3D (prevención de errores):**
  - Carga vía `useGLTF` dentro de `<Suspense>`; fallback = viewport de carga estilo Maya (grilla técnica + spinner naranja), coherente con la identidad visual.
  - Normalización obligatoria en código: auto-centrado del modelo + escalado proporcional por bounding box (target: ~3 unidades de alto) y base apoyada en y=0. Previene el clásico "aparece gigante, diminuto o fuera de cuadro".
  - Si el GLB falla al cargar o tarda demasiado: la escena muestra solo el viewport de carga con el contenido textual intacto (el texto del hero NO depende del 3D).
- **Configuración de Escena 3D:** Luces ambientales neutras y una luz direccional de acento en color naranja técnico (`#FF6B00`). Uso de `<OrbitControls>` de `@react-three/drei` configurado con rotación suave (`enableDamping`, `autoRotate` lento), zoom acotado (`minDistance`/`maxDistance`), `enablePan` deshabilitado y límites de ángulo polar para no ver el modelo desde debajo.
- **Rendimiento:** `dpr={[1, 1.75]}` en el canvas; sin sombras costosas salvo que se demuestren necesarias.
- **Accesibilidad / Comportamiento móvil:**
  - En táctil, el canvas NO captura el gesto de un dedo: un dedo = scroll de página; el modelo gira solo vía `autoRotate`. Evita la trampa común donde el hero "se traga" el scroll en celulares.
  - Respetar `prefers-reduced-motion`: si está activo, apagar `autoRotate` y animaciones de entrada.
- **Contenido de Texto (Hero Layout):**
  - Titular Principal: "Jorge Cervantes"
  - Rol: "Productor Multimedia"
  - Ubicación: "Ciudad Obregón, Sonora, México"
  - "About Me" conciso (máximo 2 líneas enfocado en la convergencia entre arte visual, 3D y código).
  - Botón primario de contacto directo en color naranja de acento.
  - Indicador sutil de scroll hacia abajo.

### Bloque 2: `<ProyectosEspecialidad />`
- Muestra principal del portafolio centrada en la especialidad a futuro (Renders 3D, Reel de Video, Animación).
- Tarjetas masivas con fondo `#252525` y soporte para previsualización o reproductor integrado.
- **Anti-plantilla (obligatorio):** Grid **asimétrico** — una tarjeta destacada de mayor tamaño + secundarias. Queda prohibida la fila de tarjetas idénticas de igual tamaño (look de plantilla genérica).
- Metadata técnica estilo Maya bajo cada título, en monospace y gris `#888888` con valores clave en naranja (ej. `out_render_01.png · 3840×2160 · Arnold`).

### Bloque 3: `<ProyectosCodigo />`
- Sección secundaria ("As bajo la manga") para demostrar capacidad técnica de ingeniería y código (e.g., desarrollo web, aplicaciones como TechLoop, experimentos de shaders o cámaras estilo PSX).
- Enlaces directos a repositorios y demos funcionales.
- Densidad mayor que la sección 2: más datos, menos decoración. Contraste deliberado entre ambas secciones.

### Gestión de contenido (Fase 2 — rellenado posterior)
- Los datos de proyectos se desacoplan del JSX: `/src/data/specialtyProjects.js` y `/src/data/codeProjects.js`. Rellenar la página = editar arrays, nunca tocar componentes.
- Igual para contacto: `/src/data/contact.js` con placeholders claramente marcados.
- Previews placeholder generados en CSS/SVG (grilla técnica tipo viewport de Maya), cero imágenes externas.

### Bloque 4: `<Footer />`
- Cierre limpio del sitio con información de contacto directa (Email mailto, LinkedIn, GitHub).
- Sin formularios complejos; enlaces directos e inmediatos.

---

## 6. ESTRUCTURA DE DIRECTORIOS E INSTRUCCIONES DE EJECUCIÓN

### Estructura de Proyecto Esperada:
- `/public/personaje.glb` (o `3d_Model.glb`)
- `/src/assets/`
- `/src/components/Hero/Hero.jsx`
- `/src/components/Hero/Hero.module.css`
- `/src/components/Hero/ModelCanvas.jsx`
- `/src/components/ProyectosEspecialidad/ProyectosEspecialidad.jsx`
- `/src/components/ProyectosEspecialidad/ProyectosEspecialidad.module.css`
- `/src/components/ProyectosCodigo/ProyectosCodigo.jsx`
- `/src/components/ProyectosCodigo/ProyectosCodigo.module.css`
- `/src/components/Footer/Footer.jsx`
- `/src/components/Footer/Footer.module.css`
- `/src/data/specialtyProjects.js`
- `/src/data/codeProjects.js`
- `/src/data/contact.js`
- `/src/styles/globals.css`
- `/src/App.jsx`
- `/src/main.jsx`
- `/PROMPT_CONTEXT.md` (bitácora de decisiones técnicas del proyecto — mantenerla actualizada al cerrar cada fase)
- `/package.json`
- `/vite.config.js`

### Instrucciones paso a paso para Open Code:
1. **Inicializar Proyecto:** Crear el entorno React + Vite en la raíz.
2. **Instalar Dependencias:**
   `npm install @react-three/fiber @react-three/drei three framer-motion`
3. **Configurar Estilos Globales (`globals.css`):**
   - Definir variables CSS (`:root`) para la paleta tipo Maya (`--bg-color: #1E1E1E`, `--card-bg: #252525`, `--accent-color: #FF6B00`, etc.).
   - Aplicar el reseteo de scrollbar (`scrollbar-width: none;` y `::-webkit-scrollbar { display: none; }`) en `html` y `body`.
4. **Construir Componentes Base:** Implementar la jerarquía de componentes descrita cargando el modelo 3D en el `<Hero />`.
5. **Desacoplar Contenido:** Crear `/src/data/` (proyectos + contacto) con datos placeholder; los componentes únicamente consumen estos arrays.

---

## 7. CHECKLIST DE VERIFICACIÓN FINAL

- [ ] `npm run build` compila sin errores críticos.
- [ ] Consola del navegador limpia: sin 404 del GLB, errores de R3F ni warnings de peer deps.
- [ ] El modelo 3D carga con fallback de viewport de carga (Suspense) y el texto del hero es visible incluso sin el 3D.
- [ ] El scroll funciona en móvil: un dedo sobre el hero desplaza la página (el canvas no lo captura).
- [ ] Focus visible al navegar con teclado (`:focus-visible` en enlaces y botones).
- [ ] `prefers-reduced-motion` respetado (sin `autoRotate` ni animaciones de entrada cuando está activo).
- [ ] Scrollbar oculta pero funcional; indicador de scroll presente en el Hero.
- [ ] Cero strings de contacto/repos hardcodeadas en JSX: todo proviene de `/src/data/`.
- [ ] Verificación visual a 390px (móvil) y 1440px (desktop): jerarquía y contraste correctos en ambas.
- [ ] Grid de tarjetas asimétrico (sin fila de tarjetas idénticas).