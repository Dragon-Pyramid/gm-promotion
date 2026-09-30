# Gym Master Promotion — Cinematic Scene 02 Transformation

## Estado

`CIN-003-A — Convergence / System Ignition`

Rama:

`feature/gm-promotion-cinematic-scene02-transformation-v1`

Baseline:

`399cde2`

Precede:

`Cinematic Pass — Scene 01 / Fragmentation`

## Objetivo narrativo

Scene 01 termina con:

- sistemas aislados;
- señales fragmentadas;
- un gimnasio central esperando;
- tensión operativa sin resolver.

Scene 02 no debe empezar ya resuelta.

La transformación debe ocurrir delante del espectador.

Arco:

`fragmentación residual -> atracción -> señal -> convergencia -> ignición -> sincronización -> orden`

## Arquitectura preservada

React Kino continúa siendo el único propietario del progreso de scroll.

Se conservan:

- `Kino`;
- `Scene duration="320vh"`;
- `ScrollTransform`;
- `Reveal`;
- manifest `motionMode: kino`;
- fallback natural;
- copy ES/EN actual.

No se agregan:

- IntersectionObserver;
- timers;
- GSAP;
- Lenis;
- canvas;
- WebGL;
- nuevas dependencias;
- un segundo scroll owner.

## CIN-003-A

### Residuo de Scene 01

La primera parte de Scene 02 conserva temporalmente señales cálidas `rose / amber`.

Un `ScrollTransform` controlado por Kino las desvanece durante el primer tramo.

Su función es evitar un corte narrativo brusco entre Fragmentation y Transformation.

### Convergence Signals

Se incorporan cinco señales visuales asociadas al sistema existente:

- members;
- payments;
- attendance;
- sales;
- training.

Cada señal:

- nace desplazada;
- avanza hacia el centro mediante `ScrollTransform`;
- llega en un punto diferente del progreso;
- mantiene recorrido moderado para no romper mobile;
- se desvanece antes de que el core suba para dar lugar a la copy.

Las señales no reemplazan la geometría de links existente.

La complementan narrativamente.

### System Ignition

Alrededor del momento de nacimiento del core aparece una capa de ignición:

- halo;
- anillos;
- ejes;
- respiración lumínica.

No es una explosión ni un flash.

Debe sentirse como activación silenciosa de un sistema.

### Order

El color cálido residual desaparece progresivamente.

La escena migra visualmente hacia:

- cyan;
- blue;
- violet.

El final debe tener menos tensión visual que el comienzo.

## Existing choreography preserved

Se mantiene el orden conceptual de foundation:

1. chips convergen;
2. core aparece;
3. core se eleva;
4. kicker aparece;
5. headline aparece;
6. body aparece;
7. copy sale hacia el handoff siguiente.

CIN-003-A agrega narrativa dentro de esos actos sin reemplazar su estructura.

## Transform ownership

La separación de responsabilidades es estricta:

- React Kino = transform ligado al scroll;
- CSS = apariencia y ambient motion;
- layout estático = top/left/grid/flex;
- no se reutiliza el mismo transform para layout estático y scroll motion.

## Mobile

Mobile conserva el mismo concepto con:

- señal más pequeña;
- distancia visual reducida;
- halo más compacto;
- menor trail;
- sin nuevos recorridos extremos.

No se intenta reproducir literalmente la escala desktop.

## Reduced motion

El Motion System existente sigue desactivando pulse/core/link animations.

CIN-003-A además:

- elimina el residuo fragmentado;
- desactiva breathe de señales e ignición;
- mantiene el resultado final comprensible.

## QA requerido

### Desktop ES

Revisar todo el scroll de Scene 01 -> Scene 02:

- residuos de fragmentación al inicio;
- chips convergiendo;
- señales viajando;
- core apareciendo;
- ignición;
- core subiendo;
- copy de transformación;
- handoff natural hacia Scene 03.

### Desktop EN

- copy sin clipping;
- topline estable;
- core sin solapamientos.

### Mobile 368×832

- señales dentro del viewport;
- core siempre reconocible;
- no overflow horizontal;
- copy final legible;
- transición no saturada.

### Reduced motion

- sin breathe;
- sin residuo cálido;
- composición final comprensible.

### Console

- 0 errores nuevos;
- 0 warnings nuevos.

## Criterio cinematográfico

La escena debe hacer sentir:

`el caos empieza a convertirse en sistema`

No debe sentirse como:

- loader;
- HUD gamer;
- demo de partículas;
- animación gratuita;
- un diagrama simplemente encendido.

Primero se muestra la transformación.

Después la copy la nombra.
## CIN-003-B — Mobile Convergence Framing

Visual QA en `368×832` detectó clipping lateral únicamente en las tarjetas del
lado derecho de la convergencia:

- `PAYMENTS / PAGOS`;
- `SALES / VENTAS`.

La corrección es deliberadamente quirúrgica:

- desplaza ambas anclas visuales hacia el interior sólo en mobile;
- limita ligeramente su ancho máximo;
- no cambia el recorrido desktop;
- no cambia timings de React Kino;
- no modifica `from/to/at/span`;
- no usa `transform` para layout;
- mantiene a React Kino como propietario exclusivo del transform ligado al scroll.

La intención es conservar la sensación de que las piezas entran desde fuera del
sistema, pero asegurar que su estado legible/final quede completamente contenido
en el viewport mobile.
