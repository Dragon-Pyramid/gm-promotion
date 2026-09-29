# Gym Master Promotion — Motion System v1

## Estado

Implementado por **PATCH 004-A** sobre la rama:

`feature/gm-promotion-motion-system-v1`

## Objetivo

Definir una gramática de movimiento reutilizable para la promoción de Gym Master sin convertir la experiencia en una suma de librerías de animación.

La regla central continúa siendo:

> React Kino es el dueño del progreso global de scroll.

CSS se usa para movimiento ambiental, respiración visual y microinteracciones que no necesitan conocer el progreso del scroll.

## Principios

1. **Un solo dueño del scroll**
   - React Kino conserva el control del progreso narrativo.
   - No se introduce Lenis, GSAP ScrollTrigger ni otro motor de scroll en esta fase.

2. **Movimiento con función narrativa**
   - Hero: identidad que emerge.
   - Scene 01: sistemas fragmentados con vida independiente.
   - Scene 02: convergencia, pulsos y núcleo conectado.
   - Bridge: respiración visual para evitar cortes rígidos.

3. **Peso contenido**
   - Sin nuevas dependencias.
   - Sin canvas adicional.
   - Sin WebGL en esta fase.
   - El movimiento se resuelve con CSS y transformaciones GPU-friendly.

4. **Accesibilidad**
   - `prefers-reduced-motion: reduce` desactiva la animación ambiental.
   - La composición sigue siendo legible y premium sin movimiento.

## Motion tokens

Se incorporan variables CSS para:

- duraciones rápidas, medias, lentas y ambientales;
- easing de salida;
- easing suave;
- easing de respiración;
- amplitud de flotación;
- intensidad de glow.

Esto evita hardcodear decisiones de timing en cada escena.

## Alcance PATCH 004-A

### Hero

- entrada visual del logo;
- respiración sutil del logo;
- deriva del grid;
- respiración de orbs/halos.

### Scene 01 — Fragmentation

Las tarjetas de sistemas reciben micro-flotación asincrónica.

La intención es que se perciban como piezas separadas, activas y todavía no coordinadas.

### Scene 02 — Transformation

- pulsos concéntricos;
- respiración de links;
- glow del núcleo central.

React Kino conserva las transformaciones dependientes del scroll.

### Bridge / after

El logo decorativo recibe respiración suave para que la transición no quede completamente estática.

## Qué NO hace todavía

PATCH 004-A no incorpora:

- nuevas escenas;
- video;
- frame sequences;
- 3D;
- Three.js / React Three Fiber;
- GSAP;
- smooth scrolling;
- transiciones cinematográficas entre capítulos;
- assets audiovisuales definitivos.

Es la **capa base del Motion System**, no el acabado cinematográfico final.

## Próximo paso

Después de QA visual y gates:

1. ajustar amplitudes/timings si fuera necesario;
2. cerrar Motion System base;
3. continuar con scroll-linked polish y construcción incremental de las escenas 03–14.
## Mobile Safety Baseline — PATCH 004-B

El Motion System incorpora un baseline específico para pantallas mobile.

Principio:

> Mobile es una composición adaptada, no una versión desktop reducida.

PATCH 004-B agrega:

- bandas seguras laterales e inferiores;
- protección contra overflow horizontal accidental;
- tipografía fluida para títulos y copy;
- adaptación específica de Scene 02;
- variante para viewports mobile de poca altura;
- variante extra narrow para 320–359 px;
- compatibilidad con `env(safe-area-inset-bottom)`;
- estabilidad adicional bajo `prefers-reduced-motion`.

Este baseline no reemplaza el QA responsive final. Al completar las 15 escenas se realizará un Mobile Final Polish dedicado.
## Transform ownership rule — PATCH 004-C

QA mobile detectó un conflicto entre layout y motion en Scene 02.

El copy estaba centrado mediante:

`left: 50%` + `transform: translateX(-50%)`

pero `ScrollTransform` también necesita controlar `transform` para su desplazamiento animado.

Regla incorporada:

> Un nodo cuyo `transform` pertenece al motor de motion no debe depender de ese mismo `transform` para su layout estático.

Para centrar Scene 02 se usa ahora `left: 0`, `right: 0` y `margin-inline: auto`. React Kino queda libre para controlar únicamente el movimiento.
## Mobile copy dwell — PATCH 004-D

Tras corregir el centrado horizontal, QA mobile mostró que el body de Scene 02 entraba demasiado tarde y quedaba poco tiempo completamente legible.

Se adelantan levemente los reveals:

- kicker: `0.66 -> 0.62`
- title: `0.72 -> 0.68`
- body: `0.79 -> 0.75`

La salida se mantiene en `0.89`, que ya había superado el QA de solapamiento con la escena siguiente.
