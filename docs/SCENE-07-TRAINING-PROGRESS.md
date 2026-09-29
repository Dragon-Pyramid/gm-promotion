# Gym Master Promotion — Scene 07 Training Progress

## Estado
Implementada por **PATCH 009-A** sobre `feature/gm-promotion-scene07-training-progress-v1`.

## Posición narrativa
Scene 07 continúa el capítulo **Experience**:
- Scene 06: el socio llega, se identifica y entra.
- Scene 07: entrena con dirección y puede ver su progreso.

## Objetivo comercial
Unir rutina, ejecución, registro y evolución desde la perspectiva del socio.

La promesa es:

**el entrenamiento de hoy forma parte de una historia visible.**

## Composición
Desktop:
- rutina de hoy;
- núcleo de sesión;
- progreso de 12 semanas;
- constancia, volumen y sesiones;
- próximo objetivo;
- insight final.

Mobile:
- rutina + núcleo en primera fila;
- progreso debajo;
- objetivo + insight cierran en dos columnas;
- variante adicional para viewports bajos.

## Motion
React Kino conserva ownership exclusivo del scroll.
La escena usa `Scene duration="180vh"` y un solo `ScrollTransform`.

## Regla estructural
`.gm-scene07` permanece `overflow: visible`.
El clipping ocurre en `.gm-scene07__stage`.

## Datos
Ejercicios, semanas, porcentajes y sesiones son ilustrativos.

## Assets futuros
La foundation puede recibir después microvideo de entrenamiento, frame sequence, capturas reales de rutina o evolución física sin depender de ellos.

## QA antes de commit
- TypeScript;
- lint;
- production build;
- desktop ES/EN;
- mobile ES/EN;
- forward/reverse;
- pin estable;
- rutina completa;
- progreso legible;
- focus + insight visibles;
- sin clipping;
- reduced motion.
## PATCH 009-B — Mobile Progress Balance

QA visual en mobile confirmó que la escena funcionaba correctamente, pero el panel `EVOLUCIÓN / PROGRESS` absorbía la altura flexible dejando el gráfico y las métricas demasiado agrupados hacia arriba.

Corrección:

- sólo `max-width: 760px`;
- `progress` pasa a `display: flex` en columna;
- el encabezado conserva altura natural;
- el chart absorbe la zona flexible del panel;
- la curva se centra verticalmente dentro de esa zona;
- semanas y métricas permanecen visibles;
- las métricas cierran visualmente el panel;
- en `max-height: 680px` el chart vuelve a una altura compacta de `42px`;
- desktop permanece intacto;
- no cambia copy;
- no cambia React Kino;
- no cambia `duration="180vh"`;
- no agrega dependencias.

Objetivo: utilizar mejor la altura disponible y eliminar la sensación de espacio residual sin sobrecargar la composición.
