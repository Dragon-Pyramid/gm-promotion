# Gym Master Promotion — Scene 10 Infrastructure

## Estado

Implementada por **PATCH 012-A** sobre:

`feature/gm-promotion-scene10-infrastructure-v1`

## Posición narrativa

Scene 10 abre el capítulo **Connected**.

Secuencia inmediata:

1. Scene 09 — la actividad conectada revela señales.
2. Scene 10 — una base tecnológica sostiene esa experiencia.

## Idea central

**Lo simple por fuera necesita una base sólida por dentro.**

La escena no funciona como documentación técnica ni enumera proveedores.

Su objetivo es mostrar que la experiencia visible depende de capas coordinadas que permanecen detrás.

## Capas narrativas

- aplicación;
- sincronización;
- datos;
- seguridad;
- nube;
- continuidad.

Estas capas son una representación conceptual de la base operativa de Gym Master.

## Lenguaje visual

La composición separa:

- la superficie visible;
- un puente de conexión;
- la base por capas;
- un insight final.

La escena evita repetir dashboards, tarjetas de métricas o visualizaciones de negocio.

## Motion

React Kino conserva ownership exclusivo del scroll.

La escena usa:

- `Scene duration="180vh"`;
- un solo `ScrollTransform`;
- un pulse CSS ambiental en el puente.

## Regla estructural

`.gm-scene10` permanece:

`overflow: visible`

El clipping ocurre únicamente dentro de:

`.gm-scene10__stage`

## Mobile

La composición mobile conserva:

- superficie;
- puente;
- seis capas;
- insight final;
- `100svh`;
- variante para viewports de hasta `680px` de altura.

Las transformaciones estáticas de las capas desktop se neutralizan en mobile.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- se neutraliza el transform del wrapper Kino;
- el pulse del puente deja de animarse;
- todo el contenido permanece visible.

## Alcance de comunicación

La escena utiliza conceptos tecnológicos de alto nivel.

No publica:

- nombres de proveedores;
- topología interna;
- secretos de infraestructura;
- credenciales;
- datos reales de clientes;
- promesas cuantificadas de disponibilidad.

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
- seis capas visibles;
- insight final visible;
- sin clipping;
- reduced motion;
- DevTools sin warnings nuevos.