# Gym Master Promotion — Scene 12 Gym as a System

## Estado

Implementada por **PATCH 014-A** sobre:

`feature/gm-promotion-scene12-gym-as-system-v1`

## Posición narrativa

Scene 12 continúa y culmina el capítulo **Connected** antes del contraste final.

Secuencia inmediata:

1. Scene 10 — una base tecnológica sostiene la experiencia.
2. Scene 11 — tres roles comparten contexto.
3. Scene 12 — el gimnasio completo funciona como un sistema.
4. Scene 13 — contraste antes/después.
5. Scene 14 — cierre y CTA.

## Idea central

**Un gimnasio no son módulos separados. Es un sistema en movimiento.**

Scene 12 sintetiza lo mostrado desde las escenas de control, operación, experiencia, inteligencia e infraestructura.

## Áreas del sistema

- Personas.
- Operación.
- Experiencia.
- Datos.
- Infraestructura.

## Lenguaje visual

La composición utiliza un organismo circular, cinco áreas alrededor del núcleo, un núcleo Gym Master, un pulso orbital, un panel de principios y un insight final.

La escena evita repetir dashboards, la convergencia de señales de Scene 09 y los perfiles humanos en paralelo de Scene 11.

## Principios narrativos

- Conecta.
- Conserva contexto.
- Da continuidad.

## Motion

React Kino conserva ownership exclusivo del scroll.

- `Scene duration="180vh"`.
- Un solo `ScrollTransform`.
- Pulso orbital CSS ambiental.

## Regla estructural

`.gm-scene12` permanece con `overflow: visible`.

El clipping ocurre dentro de `.gm-scene12__stage`.

## Mobile

La composición mobile conserva las cinco áreas, el núcleo, las órbitas, el panel de principios y el insight final dentro de `100svh`.

## Reduced motion

Con `prefers-reduced-motion: reduce` se neutraliza el transform Kino y se detiene el pulso orbital.

## QA antes de commit

- TypeScript.
- lint.
- production build.
- desktop ES/EN.
- mobile ES/EN.
- forward/reverse scroll.
- pin estable.
- cinco áreas visibles.
- núcleo visible.
- insight final visible.
- sin clipping.
- DevTools sin warnings nuevos.