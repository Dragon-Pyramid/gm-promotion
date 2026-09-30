# Gym Master Promotion — Scene 11 Three People, One System

## Estado

Implementada por **PATCH 013-A** sobre:

`feature/gm-promotion-scene11-three-people-one-system-v1`

## Posición narrativa

Scene 11 continúa el capítulo **Connected**.

Secuencia inmediata:

1. Scene 10 — la infraestructura sostiene la experiencia.
2. Scene 11 — tres personas distintas comparten un mismo contexto.
3. Scene 12 — el gimnasio completo se presenta como un sistema.

## Idea central

**Tres formas de vivir el gimnasio. Un solo sistema conectándolas.**

La escena vuelve a poner a las personas en el centro después de Scene 10.

No muestra tres dashboards.

Muestra tres perspectivas humanas sobre la misma realidad operativa.

## Roles

- Administrador — decide con visión completa.
- Equipo — resuelve el día a día.
- Socio — entrena con continuidad.

## Contexto compartido

Los tres perfiles se conectan mediante un mismo hilo narrativo.

Ese contexto puede incluir:

- socios;
- pagos;
- acceso;
- entrenamiento.

El objetivo no es afirmar que todos los roles ven exactamente la misma interfaz ni los mismos permisos.

El objetivo es comunicar que trabajan sobre una realidad coherente.

## Lenguaje visual

La composición utiliza:

- tres perfiles humanos;
- una línea/hilo que atraviesa los tres;
- momentos operativos específicos;
- un bloque de contexto compartido;
- un núcleo Gym Master;
- un insight final.

## Motion

React Kino conserva ownership exclusivo del scroll.

La escena usa:

- `Scene duration="180vh"`;
- un solo `ScrollTransform`;
- una animación CSS ambiental en el hilo compartido.

## Regla estructural

`.gm-scene11` permanece:

`overflow: visible`

El clipping ocurre únicamente dentro de:

`.gm-scene11__stage`

## Mobile

La composición mobile conserva:

- tres perfiles visibles en paralelo;
- hilo compartido;
- momentos operativos;
- contexto compartido;
- núcleo GM;
- insight final;
- `100svh`;
- variante para viewports de hasta `680px` de altura.

La descripción secundaria de cada rol se oculta en mobile para preservar legibilidad.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- se neutraliza el transform del wrapper Kino;
- el viaje luminoso del hilo se detiene;
- todo el contenido permanece visible.

## Alcance de comunicación

La escena comunica continuidad de contexto.

No implica:

- permisos idénticos entre roles;
- interfaces idénticas;
- acceso irrestricto a todos los datos;
- automatización de decisiones;
- datos reales de clientes.

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
- tres perfiles visibles;
- hilo compartido visible;
- contexto compartido legible;
- insight final visible;
- sin clipping;
- reduced motion;
- DevTools sin warnings nuevos.
## PATCH 013-B — ES Desktop Headline Clearance

QA visual detectó una colisión exclusiva de desktop ES: la `s` final de `conectándolas` quedaba parcialmente debajo del stage derecho.

Corrección aplicada:

- sólo Scene 11;
- sólo idioma español mediante `:lang(es)`;
- sólo desktop con `min-width: 981px`;
- reducción mínima del `font-size` del headline;
- stage sin cambios;
- layout general sin cambios;
- EN sin cambios;
- mobile sin cambios;
- React Kino sin cambios;
- `duration="180vh"` sin cambios;
- sin nuevas dependencias.

Objetivo: liberar completamente la palabra `conectándolas` preservando el peso visual del headline.
## PATCH 013-C — ES Desktop Headline Micro Clearance

QA visual detectó que, después de 013-B, todavía faltaba un margen muy pequeño para despejar completamente la palabra `conectándolas` en desktop ES.

Corrección aplicada:

- sólo Scene 11;
- sólo idioma español mediante `:lang(es)`;
- sólo desktop con `min-width: 981px`;
- micro reducción adicional del `font-size` del headline;
- EN sin cambios;
- mobile sin cambios;
- stage sin cambios;
- layout general sin cambios;
- React Kino sin cambios;
- `duration="180vh"` sin cambios;
- sin nuevas dependencias.

Valor final aplicado en desktop ES: `clamp(2.16rem, 3.28vw, 3.82rem)`.
