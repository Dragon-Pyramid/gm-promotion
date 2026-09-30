# Gym Master Promotion — Cinematic Scene 03 Control

## Estado

`CIN-004-A — Command Center / Operational Awareness`

Rama:

`feature/gm-promotion-cinematic-scene03-control-v1`

Baseline:

`a7d40d6`

Precede:

`Cinematic Pass — Scene 02 / Transformation`

## Objetivo narrativo

Scene 02 muestra el momento en que los sistemas dejan de estar fragmentados y
empiezan a trabajar como una sola estructura.

Scene 03 muestra la consecuencia:

`cuando el sistema se conecta, la operación se vuelve observable`

La escena no debe sentirse como un dashboard SaaS decorado.

Debe sentirse como una cabina de mando viva, precisa y bajo control.

## Arquitectura preservada

Se conserva sin cambios:

- `Scene duration="180vh"`;
- `motionMode: "kino"`;
- fallback natural;
- el `ScrollTransform` único que introduce el dashboard como unidad;
- el dashboard atómico;
- el Structural Fix `005-C`;
- la geometría mobile;
- la copy ES/EN;
- el manifest;
- el contenido y valores ilustrativos existentes.

No se agregan:

- nuevos `ScrollTransform`;
- animaciones de entrada por tarjeta;
- `IntersectionObserver`;
- timers;
- un segundo scroll owner;
- nuevas dependencias;
- cambios de copy;
- cambios de duración.

## Dirección

Arco perceptual:

`system connected -> focus -> operational awareness -> live activity -> insight`

La espectacularidad de Scene 03 no viene de superar Scene 02 con más movimiento.

Viene de mostrar energía contenida.

Scene 02:

`energía moviéndose`

Scene 03:

`energía bajo control`

## CIN-004-A

### Operational scan

El dashboard incorpora una scan line muy lenta y de baja intensidad.

No funciona como CRT, glitch o HUD gamer.

Su función es sugerir que el sistema está leyendo continuamente la operación.

El scan vive dentro del dashboard y queda recortado por su `overflow`.

No participa del scroll.

### Metrics awareness

Las cuatro métricas conservan exactamente su layout y contenido.

Una onda de brillo de amplitud mínima cambia de forma escalonada entre ellas.

No aparecen una por una.

No cambian de posición.

No se animan sus números.

El dashboard sigue siendo una sola unidad cinematográfica.

### Sparklines

Las barras no cambian de altura.

Sólo respiran en luminancia.

Esto preserva la idea de datos registrados y evita el cliché de un dashboard
financiero con cifras artificialmente fluctuantes.

### Live activity

Las filas de actividad permanecen estáticas y legibles.

El nodo de pulso que ya existía recibe un acknowledgement periódico:

- check-in;
- pago;
- venta.

La intención es hacer sentir que la operación continúa ocurriendo.

### Insight

El insight trabaja a un ritmo más lento que las métricas y la actividad.

Principio:

`data is fast; interpretation is stable`

El orbit existente respira sin dominar la composición.

### Contained light

Los glows cyan y violet de la escena mantienen continuidad cromática con
Transformation, pero con una cadencia más lenta y contenida.

No viajan por el plano.

## Mobile

No se modifica la geometría mobile.

El Structural Fix `005-C` continúa siendo la autoridad sobre:

- viewport fit;
- composición;
- dashboard atomicity;
- copy;
- heights;
- layout.

CIN-004-A únicamente reduce la intensidad/cadencia del ambient motion en
pantallas pequeñas.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- scan apagado;
- metric awareness apagado;
- spark breathe apagado;
- activity acknowledgements apagados;
- insight breathe apagado;
- glow breathe apagado.

Todo el contenido y la jerarquía siguen visibles.

## QA requerido

### Desktop ES

Recorrer Scene 02 -> Scene 03 y comprobar:

- transición de energía cinética a energía contenida;
- dashboard completo;
- scan discreto;
- métricas legibles;
- actividad legible;
- insight sin competir;
- ningún efecto con sensación de loader/HUD gamer.

### Desktop EN

Comprobar:

- headline sin clipping;
- labels internas completas;
- métrica y activity copy estable;
- dashboard sin reflow.

### Mobile 368x832

Comprobar especialmente:

- Structural Fix 005-C intacto;
- dashboard contenido;
- cero overflow horizontal;
- métricas legibles;
- activity e insight visibles;
- ambient motion no saturado.

### Reduced motion

Comprobar una vez:

- composición estática completa;
- sin scan;
- sin breathe;
- sin pérdida de información.

### Console

- 0 errores nuevos;
- 0 warnings nuevos.

## Criterio cinematográfico

La escena debe hacer sentir:

`por primera vez veo el gimnasio completo`

No debe sentirse como:

- dashboard genérico;
- HUD gamer;
- panel crypto;
- loader;
- efectos por efectos;
- tarjetas entrando independientemente.

La autoridad visual debe venir de la precisión, no del ruido.
## CIN-004-B — Mobile Activity Completeness

Durante QA visual en `368×832` se detectó pérdida de información en el panel
`ACTIVIDAD DEL GIMNASIO`.

El source contiene tres eventos operativos:

1. ingreso de socio;
2. cuota acreditada;
3. venta de mostrador confirmada.

La composición mobile heredada del viewport-fit ocultaba la tercera fila para
reducir altura.

CIN-004-B revierte únicamente esa pérdida de información.

La corrección:

- vuelve a mostrar la tercera fila en mobile;
- compacta mínimamente altura, columnas, gap y tipografía del activity feed;
- preserva las tres señales operativas;
- no cambia desktop;
- no cambia tablet;
- no cambia Scene duration;
- no cambia React Kino;
- no cambia dashboard transform;
- no cambia métricas;
- no cambia copy;
- no cambia el tratamiento CIN-004-A.

### Criterio

En una escena cuyo propósito es demostrar visión operativa completa, esconder un
evento real para hacer entrar el layout contradice la narrativa.

La prioridad es:

`completitud de información + viewport fit`

y no:

`viewport fit a costa de información`.
