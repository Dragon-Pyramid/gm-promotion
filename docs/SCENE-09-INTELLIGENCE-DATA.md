# Gym Master Promotion — Scene 09 Intelligence / Data

## Estado

Implementada por **PATCH 011-A** sobre:

`feature/gm-promotion-scene09-intelligence-data-v1`

## Posición narrativa

Scene 09 abre el capítulo **Intelligence**.

Secuencia:

1. Scene 07 — entrenamiento y progreso.
2. Scene 08 — relación y continuidad.
3. Scene 09 — la actividad dispersa se convierte en una lectura conectada.

## Idea central

**Cuando los datos se conectan, aparecen señales.**

La escena evita repetir un dashboard administrativo.

No muestra “más métricas”.

Muestra cómo distintas fuentes empiezan a contar una misma historia.

## Fuentes narrativas

- asistencia;
- pagos;
- ventas;
- entrenamiento;
- relación.

Estas fuentes convergen en un núcleo de lectura conectada.

## Salida narrativa

La escena traduce la convergencia en tres conceptos:

- ritmo;
- cambio;
- atención.

No son predicciones ni decisiones automáticas.

Son señales ilustrativas que ayudan a dirigir la mirada.

## Motion

React Kino conserva ownership exclusivo del scroll.

La escena usa:

- `Scene duration="180vh"`;
- un solo `ScrollTransform`;
- rings y pulse CSS como ambient motion.

## Regla estructural

`.gm-scene09` permanece:

`overflow: visible`

El clipping ocurre únicamente en:

`.gm-scene09__stage`

## Mobile

La composición mobile preserva:

- cinco fuentes;
- núcleo central;
- lectura/señal;
- tres conceptos;
- insight final;
- 100svh;
- variante para viewports <= 680px.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- se neutraliza el transform del wrapper;
- rings y pulse dejan de animarse;
- todo el contenido permanece visible.

## Datos ilustrativos

Los textos y señales son demostrativos.

No representan analítica real, predicción automática ni datos de clientes.

## QA antes de commit

- TypeScript;
- lint;
- production build;
- desktop ES;
- desktop EN;
- mobile ES;
- mobile EN;
- forward scroll;
- reverse scroll;
- pin estable;
- cinco fuentes visibles;
- núcleo visible;
- señales legibles;
- insight final visible;
- sin clipping;
- reduced motion.
## PATCH 011-B — Mobile Signal Balance

QA visual en mobile confirmó que la escena era funcional y completa, pero el panel `LA ACTIVIDAD HABLA / ACTIVITY SPEAKS` dejaba demasiado espacio residual entre la fila `RITMO / CAMBIO / ATENCIÓN` y el insight final.

Corrección:

- sólo `max-width: 760px`;
- el panel de señal pasa a layout flex en columna;
- kicker, título y body conservan altura natural;
- la lista de señales usa `margin-top: auto`;
- la fila de señales queda anclada visualmente al cierre del panel;
- en `max-height: 680px` se reduce el padding interno;
- desktop permanece intacto;
- copy permanece intacto;
- React Kino permanece intacto;
- `duration="180vh"` permanece intacto;
- no se agregan dependencias.

Objetivo: hacer que la altura flexible del panel se sienta intencional y reducir el hueco visual antes del insight final.
