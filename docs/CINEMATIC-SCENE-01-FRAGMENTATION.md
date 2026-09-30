# Gym Master Promotion — Cinematic Scene 01 Fragmentation

## Estado

`CIN-002-A — Fragmented Signals`

Rama:

`feature/gm-promotion-cinematic-scene01-fragmentation-v1`

Baseline:

`bed3679`

Precede:

`Cinematic Pass — Scene 00 / Identity`

## Objetivo narrativo

Scene 00 establece:

- simetría;
- control;
- presencia;
- identidad.

Scene 01 rompe esa armonía.

El objetivo no es mostrar caos indiscriminado, sino hacer sentir que existe actividad,
información y sistemas, pero que cada parte vive en su propia isla.

## Copy

La copy ES/EN de foundation se conserva sin cambios.

El conflicto sigue siendo:

- administrar no debería significar perseguir información;
- cada proceso vive en un lugar distinto;
- entender el negocio se vuelve más difícil.

## Dirección visual

La composición conserva dos anclas:

1. copy estable;
2. mapa de fragmentación.

El texto funciona como punto fijo.

La tensión ocurre en el mapa.

## Núcleo

`TU GIMNASIO / YOUR GYM` permanece en el centro.

No se representa como un núcleo conectado.

Se representa como un centro esperando señales.

Su pulso es:

- tenue;
- lento;
- incompleto.

Scene 02 será quien transforme esa espera en conexión.

## Islas

Los seis sistemas siguen utilizando la data existente de `problemSystems`.

Cada sistema vive dentro de un `gm-system-card-shell`.

La separación entre shell y card tiene una razón arquitectónica:

- shell = reveal cinematográfico;
- card = ambient motion;
- transform estático = rotación.

Así no se asigna el mismo canal de transform a layout, reveal y motion ambiental.

## Señales fragmentadas

Se incorpora una capa SVG decorativa.

Las seis rutas:

- se acercan al centro;
- deliberadamente terminan antes de tocarlo;
- usan segmentos;
- desplazan sus dash offsets para sugerir señales en tránsito.

No existe una línea completa entre una isla y el gimnasio.

Eso es intencional.

## Entrada de cámara

Scene 01 está debajo del fold.

Por ese motivo no utiliza delays desde el mount global.

`Scene01Fragmentation` usa `IntersectionObserver` únicamente para detectar que la escena
entró al viewport.

No:

- controla el scroll;
- hace smooth scroll;
- modifica scroll position;
- reemplaza Kino;
- crea un segundo scroll owner.

Sólo marca:

`data-entered="true"`

y CSS ejecuta la coreografía.

## Progressive enhancement

SSR y no-JS mantienen el contenido visible.

Los elementos sólo esperan ocultos después de que el cliente declara:

`data-cinematic-ready="true"`

Si IntersectionObserver no existe, la escena queda visible.

## Arquitectura

Scene 01 conserva:

- duration: `100vh`;
- motionMode: `static`;
- fallbackMode: `natural`;
- analyticsId: `story_problem`.

No se modifica el manifest.

No se agregan dependencias.

## Mobile

Mobile se trata como una constelación vertical compacta.

Se preservan:

- seis islas;
- centro;
- rutas fragmentadas;
- copy;
- señal de fragmentación.

El movimiento se reduce en escala y duración.

Existe adaptación extra para viewports de hasta `720px` de alto.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- no hay reveal;
- no hay drift;
- no hay travel de señales;
- toda la composición aparece inmediatamente.

Las rutas permanecen visualmente fragmentadas porque esa forma también comunica el
concepto sin movimiento.

## QA requerido

### Desktop ES

- transición Scene 00 → Scene 01;
- copy estable;
- aparición escalonada de centro e islas;
- rutas incompletas;
- ambient rhythms no sincronizados;
- transición natural hacia Scene 02.

### Desktop EN

- headline sin clipping;
- mapa sin colisiones.

### Mobile 368×832 ES / EN

- composición completa;
- centro legible;
- seis islas visibles;
- rutas reconocibles;
- sin overflow horizontal;
- sin colisiones graves.

### Reduced motion

- todo visible inmediatamente;
- rutas fragmentadas;
- sin animaciones.

### Console

- 0 errores nuevos;
- 0 warnings nuevos.

## Criterio cinematográfico

La escena debe transmitir:

`la información existe, pero no conversa`

No debe sentirse como:

- dashboard;
- diagrama corporativo genérico;
- caos arbitrario;
- demostración de partículas.

La tensión debe seguir siendo elegante.
## CIN-002-B — Prototype label cleanup

Durante QA visual se confirmó que los textos:

`ISLA 01`, `ISLA 02`, etc.

ya no aportaban información necesaria al tratamiento cinematográfico.

La fragmentación ahora se entiende mediante:

- separación espacial;
- rotaciones;
- ritmos ambientales incompatibles;
- rutas de señal incompletas;
- distancia respecto del núcleo.

Por ese motivo los labels de prototipo se eliminan en la versión cinematográfica.

Las tarjetas pasan a mostrar únicamente el nombre real del sistema acompañado por su
indicador cromático.

También se compactan ligeramente sus proporciones para recuperar espacio negativo y
evitar una segunda fila vacía.

No cambian:

- copy ES/EN;
- orden de sistemas;
- señales SVG;
- IntersectionObserver;
- timings de entrada;
- manifest;
- reduced motion;
- Scene 00.
