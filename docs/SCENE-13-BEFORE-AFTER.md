# Gym Master Promotion — Scene 13 Before / After

## Estado

Implementada por **PATCH 015-A** sobre:

`feature/gm-promotion-scene13-before-after-v1`

## Posición narrativa

Scene 13 es el contraste emocional inmediatamente anterior al cierre comercial.

Secuencia inmediata:

1. Scene 12 — el gimnasio funciona como un sistema.
2. Scene 13 — el mismo gimnasio se percibe antes y después de conectar su operación.
3. Scene 14 — CTA final.

## Idea central

**El gimnasio es el mismo. La forma de gestionarlo cambia todo.**

La escena no busca presentar un benchmark cuantitativo ni una tabla de features.

Busca condensar visualmente la transformación narrada a lo largo del sitio.

## Antes

El lado izquierdo representa:

- fragmentación;
- herramientas y personas con contexto parcial;
- información que se repite o se pierde;
- reacción tardía;
- visión parcial.

El lenguaje visual es más apagado, irregular y discontinuo.

## Después

El lado derecho representa:

- continuidad;
- contexto compartido;
- decisiones con contexto;
- visión conectada;
- una operación que no vuelve a empezar de cero.

El lenguaje visual es más ordenado, continuo y luminoso.

## Mismo gimnasio

Los dos estados muestran las mismas áreas:

- socios;
- pagos;
- acceso;
- entrenamiento.

La diferencia no es el propósito del gimnasio.

La diferencia es la forma en que las partes trabajan juntas.

## Motion

React Kino conserva ownership exclusivo del scroll.

La escena usa:

- `Scene duration="180vh"`;
- un solo `ScrollTransform`;
- pulso ambiental en el estado conectado;
- barrido ambiental en la transición central.

## Regla estructural

`.gm-scene13` permanece:

`overflow: visible`

El clipping ocurre únicamente dentro de:

`.gm-scene13__stage`

## Mobile

La composición mobile mantiene el contraste lado a lado para que el concepto Before / After permanezca inmediato.

Se compactan:

- copy descriptivo;
- nodos;
- transición central;
- shifts;
- insight.

Para viewports de hasta `680px` de alto se ocultan textos secundarios, no la idea principal.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- se neutraliza el transform del wrapper Kino;
- se detienen los pulsos CSS;
- todo el contenido permanece visible.

## Alcance de comunicación

La escena es conceptual.

No afirma:

- métricas de mejora no verificadas;
- automatización total;
- predicción de resultados;
- equivalencia de permisos entre roles;
- resultados garantizados.

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
- headline sin colisiones;
- Before legible;
- After legible;
- transición central visible;
- shifts visibles;
- insight final visible;
- sin clipping;
- sin overflow horizontal;
- reduced motion;
- DevTools sin warnings nuevos.