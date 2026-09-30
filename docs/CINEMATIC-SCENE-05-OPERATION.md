# Gym Master Promotion — Cinematic Scene 05 Operation

## Estado

`CIN-006-A — Operational Thread / Flow Propagation`

Rama:

`feature/gm-promotion-cinematic-scene05-team-operation-v1`

Baseline:

`a5bfb6c`

Precede:

`Cinematic Pass — Scene 04 / Business`

## Objetivo narrativo

El arco previo establece:

`Scene 03 -> ver`

`Scene 04 -> comprender`

Scene 05 debe introducir:

`Scene 05 -> actuar`

La escena no representa un dashboard adicional.

Representa una acción atravesando el gimnasio sin perder contexto.

Principio:

`Una persona hace una acción. Gym Master hace que esa acción llegue a donde tiene que llegar.`

## Arquitectura preservada

Se conserva sin cambios:

- `Scene duration="180vh"`;
- `motionMode: "kino"`;
- fallback natural;
- el `ScrollTransform` atómico de `.gm-scene05__flow-motion`;
- outer `.gm-scene05` con `overflow: visible`;
- stage 3x2;
- seis nodos operativos;
- values `08:12`, `QR`, `OK`, `POS`, `-1`, `SYNC`;
- runner existente;
- rail existente;
- geometría responsive;
- copy ES/EN;
- manifest.

No se agregan:

- nuevos `ScrollTransform`;
- nuevos scroll owners;
- timers;
- observers;
- animación de valores;
- animación de alturas;
- nuevas dependencias;
- ocultamiento de contenido.

## Flujo narrativo

La microhistoria ya existente es:

1. socio llega / member arrives;
2. check-in;
3. pago / cuota;
4. venta;
5. stock;
6. registro;
7. sync;
8. insight.

Los seis pasos permanecen visibles todo el tiempo.

La cinematografía sólo mueve la atención.

## CIN-006-A

### Station pulse

`PUESTO OPERATIVO / OPERATIONS DESK` y el estado
`EN CURSO / IN PROGRESS` reciben una respiración leve.

La escena pasa de lectura ejecutiva a operación activa.

### Operational wave

Los seis nodos reciben una onda secuencial de luminancia.

Cada estación conserva:

- posición;
- contenido;
- tamaño;
- value;
- color.

No entra ni sale ninguna tarjeta.

### Node thread

El borde inferior existente de cada nodo aumenta brevemente su luminancia
durante la lectura de ese paso.

El color de cada estación continúa siendo el definido por la foundation:

- cyan;
- violet;
- green;
- amber;
- rose;
- cyan.

### Value acknowledgement

La secuencia:

`08:12 -> QR -> OK -> POS -> -1 -> SYNC`

permanece estática.

Cada value chip recibe un acknowledgement visual cuando su nodo es leído.

No hay count-up, morph ni reemplazo de contenido.

### Runner + rail

El runner y el rail ya existentes continúan siendo el lenguaje físico de
continuidad.

CIN-006-A no cambia su trayectoria.

El rail completo sólo recibe una respiración leve de luminancia.

### Sync

Las cinco barras de sincronización conservan sus alturas originales.

La lectura secuencial se hace únicamente mediante luminancia.

### Insight

El insight es la resolución narrativa:

`El equipo actúa. Gym Master mantiene el hilo.`

Recibe el ritmo más lento del stage para comunicar continuidad y no reacción.

## Mobile

La geometría mobile actual sigue siendo autoridad.

CIN-006-A sólo reduce la cadencia del ambient motion.

QA debe prestar atención especial a los títulos de nodos porque la foundation
usa ellipsis/nowrap. En particular comprobar:

- `MEMBER ARRIVES`;
- `PAYMENT / FEE`;
- equivalentes ES;
- metadata de los seis pasos;
- values de los seis pasos;
- sync;
- insight.

Si QA detecta truncado de información, se resolverá en un patch de completitud
separado y no mezclando geometría con CIN-006-A.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- station pulse apagado;
- node wave apagada;
- value acknowledgement apagado;
- rail/runner motion apagado;
- sync reading apagado;
- insight glow apagado.

Todos los pasos, values, sync e insight permanecen visibles.

## QA requerido

### Desktop ES

Recorrer Scene 04 -> Scene 05:

- cambio de interpretación a acción;
- seis nodos presentes;
- onda secuencial sutil;
- values estáticos;
- rail/runner legibles;
- sync visible;
- insight como resolución;
- sin sensación de dashboard repetido.

### Desktop EN

Comprobar:

- labels completas;
- metadata completas;
- values completos;
- copy sin reflow inesperado.

### Mobile 368x832

Comprobar:

- los seis nodos;
- labels de los seis nodos;
- metadata;
- values;
- sync;
- insight;
- cero overflow horizontal;
- cero contenido sacrificado.

### Reduced motion

Composición completa y estática.

### Console

- 0 errores nuevos;
- 0 warnings nuevos.

## Criterio cinematográfico

Scene 05 debe sentirse como:

`continuidad operacional visible`

No debe sentirse como:

- otro dashboard;
- workflow SaaS genérico;
- loader;
- automation demo falsa;
- tarjetas entrando una por una;
- datos cambiando artificialmente.

La acción ocurre.

Gym Master mantiene el hilo.
## CIN-006-B — Mobile Operation Completeness

QA mobile detectó dos pérdidas de información en la composición compacta:

1. `MEMBER ARRIVES` se truncaba por la regla histórica
   `text-overflow: ellipsis + white-space: nowrap`;
2. el body del insight no quedaba visible en la composición mobile.

CIN-006-B corrige ambos casos sin cambiar el modelo visual de Scene 05.

### Labels operativos

Los seis labels permanecen completos.

En mobile se permite wrapping controlado en lugar de truncado.

Se preservan:

- `MEMBER ARRIVES`;
- `CHECK-IN`;
- `PAYMENT / FEE`;
- `SALE`;
- `STOCK`;
- `RECORD`;
- equivalentes ES.

### Insight

El cierre narrativo conserva ahora:

- eyebrow;
- title;
- body.

No se sacrifica el body para hacer entrar la escena en el viewport.

### Compactación

En `368x832` y pantallas más angostas se ajustan únicamente:

- line-height;
- font-size de labels largos;
- tamaño del body del insight;
- min-height del insight.

No cambia la geometría conceptual del flujo.

### Short-height mobile

En alturas menores o iguales a `680px` se compacta todavía más, pero el body
continúa visible.

### Arquitectura preservada

No cambia:

- desktop;
- tablet;
- `180vh`;
- React Kino;
- ScrollTransform;
- outer overflow;
- 2x3 mobile flow;
- six-step data;
- values;
- runner;
- rail;
- CIN-006-A;
- sync-bar heights.

### QA específico

Mobile EN `368x832`:

- `MEMBER ARRIVES` completo;
- `PAYMENT / FEE` completo;
- seis metadata visibles;
- `08:12`, `QR`, `OK`, `POS`, `-1`, `SYNC` visibles;
- insight body visible;
- cero overflow horizontal.

Mobile ES `368x832`:

- `SOCIO LLEGA`;
- `CHECK-IN`;
- `PAGO / CUOTA`;
- `VENTA`;
- `STOCK`;
- `REGISTRO`;
- insight body visible;
- cero contenido sacrificado.
