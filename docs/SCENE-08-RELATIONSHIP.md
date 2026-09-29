# Gym Master Promotion — Scene 08 Relationship Beyond Training

## Estado

Implementada por **PATCH 010-A** sobre:

`feature/gm-promotion-scene08-relationship-v1`

## Posición narrativa

Scene 08 continúa el capítulo **Experience**.

Secuencia:

1. Scene 06 — acceso del socio.
2. Scene 07 — entrenamiento y progreso.
3. Scene 08 — continuidad de la relación fuera del gimnasio.

## Idea central

**La relación sigue cuando el entrenamiento termina.**

Gym Master conecta el contexto de la sesión con el seguimiento, los recordatorios y la próxima visita.

La escena evita parecer una bandeja de mensajes o una aplicación de chat.

## Composición

La escena usa un relationship loop:

`HOY → SEGUIMIENTO → PRÓXIMA VISITA`

Alrededor del socio aparecen cuatro señales:

- contexto del entrenamiento;
- mensaje del equipo;
- próximo paso / recordatorio;
- continuidad de contexto.

## Motion

React Kino conserva ownership exclusivo del scroll.

La escena usa:

- `Scene duration="180vh"`;
- un solo `ScrollTransform`;
- orbit y pulse CSS sólo como ambient motion.

## Regla estructural

`.gm-scene08` permanece:

`overflow: visible`

El clipping visual ocurre únicamente en:

`.gm-scene08__stage`

## Mobile

La composición mobile preserva:

- timeline completa;
- cuatro touchpoints;
- socio central;
- insight final;
- 100svh;
- variante para viewports de altura <= 680px.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- se neutraliza el transform del motion wrapper;
- se eliminan orbit y message pulse animations;
- la escena permanece completa y legible.

## Datos ilustrativos

Nombre, horarios, estado y mensajes son ficticios.

No representan datos reales de clientes.

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
- timeline visible;
- touchpoints legibles;
- insight visible;
- sin clipping;
- reduced motion.
## PATCH 010-B — ES Desktop Headline Collision

QA visual en desktop ES detectó una colisión entre el final de la palabra `entrenamiento` y el panel narrativo derecho.

Corrección:

- sólo `min-width: 981px`;
- sólo español mediante `:lang(es)`;
- ajuste de escala del `h2`;
- no se mueve el panel derecho;
- no cambia el copy;
- no cambia mobile;
- no cambia React Kino;
- no cambia `duration="180vh"`;
- no agrega dependencias.

Objetivo: recuperar separación visual entre copy y panel sin alterar la composición general de Scene 08.
## PATCH 010-C — ES Desktop Headline Final Clearance

Después de PATCH 010-B, `entrenamiento` dejó de quedar tapado, pero la última letra todavía quedaba visualmente demasiado próxima al panel derecho.

Ajuste final:

- sólo desktop `min-width: 981px`;
- sólo español;
- escala del `h2` pasa de `clamp(2.25rem, 3.35vw, 3.95rem)` a `clamp(2.2rem, 3.12vw, 3.72rem)`;
- panel derecho sin cambios;
- copy sin cambios;
- mobile sin cambios;
- React Kino y `180vh` sin cambios.

Objetivo: dejar una separación visual inequívoca entre el headline y el panel.
