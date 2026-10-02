# Gym Master Promotion — Scene 14 Cinematic Pass

## Estado

CIN-015-A preparado para la segunda pasada cinematográfica de Scene 14.

Baseline esperado:

`73c3331de569c549ba24a7ef23348d54c120da0a`

Rama:

`feature/gm-promotion-cinematic-scene14-final-cta-v1`

## Propósito

Scene 14 cierra todo el recorrido Scene 00 → Scene 14 y transforma lo visto en una invitación comercial clara.

CIN-015-A refuerza ese cierre sin modificar estructura React, copy ES/EN, React Kino, duración, geometría, responsive ni intención comercial del CTA.

## Narrativa cinematográfica

Secuencia ambiental aproximada de `18s`:

1. atmósfera;
2. convergencia de marca;
3. presencia del mensaje;
4. invitación del CTA;
5. resolución del cierre;
6. regreso lento al estado base.

Scene 14 debe sentirse más calma que Scene 13.

## Brand convergence

Los tres anillos reciben pulsos concéntricos desfasados.

PATCH 016-B continúa siendo autoritativo:

- no se reintroduce el núcleo circular opaco;
- no se reintroducen letras `GM`;
- el descriptor permanece completamente legible.

## Message presence

Descriptor, headline y body reciben únicamente énfasis de luminosidad, opacidad y text-shadow sutil.

No se modifica posición, tamaño ni layout.

## CTA invitation

`data-cta-intent="request-demo"` permanece intacto.

El botón recibe borde luminoso, halo exterior suave, profundidad visual y micro-energía del icono.

CIN-015-A no conecta formulario, email, WhatsApp, CRM, booking, endpoint ni analytics.

Ese wiring pertenece a la capa comercial/release.

## React Kino

React Kino conserva ownership exclusivo del scroll.

Se mantienen:

- `Scene duration="180vh"`;
- un único `ScrollTransform`;
- entrada Foundation existente.

## PATCH 016-C

El ajuste Foundation para desktop de menor altura permanece autoritativo:

`@media (min-width: 761px) and (max-height: 980px)`

CIN-015-A no altera su geometría ni su fit.

## Mobile

Mobile conserva íntegramente la geometría Foundation.

La variante:

`@media (max-width: 760px) and (max-height: 680px)`

permanece sin cambios.

No se vuelve a mostrar contenido que Foundation haya ocultado para mantener fit.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- se detienen todas las animaciones CIN-015-A;
- se neutralizan filtros cinematográficos;
- el pseudo-halo del CTA queda oculto;
- todo el contenido textual permanece visible.

## Archivos modificados

Únicamente:

- `src/app/globals.css`
- `docs/CINEMATIC-SCENE-14-FINAL-CTA.md`

## Archivos protegidos

No deben cambiar:

- `src/components/story/Scene14FinalCta.tsx`
- `messages/es.json`
- `messages/en.json`
- `src/app/[locale]/page.tsx`
- `docs/SCENE-14-FINAL-CTA.md`

## QA obligatorio

Antes del commit:

- TypeScript;
- lint;
- production build;
- `git diff --check`;
- desktop ES/EN;
- mobile ES/EN;
- `368×832`;
- `368×640`;
- forward/reverse scroll;
- pin estable;
- descriptor y headline sin colisiones;
- halo sin clipping;
- CTA visible;
- CTA hover/focus visible;
- closing visible;
- sin overflow horizontal;
- reduced motion;
- DevTools sin errores ni warnings nuevos.

## Criterio de cierre

El merge de CIN-015-A completa la segunda pasada cinematográfica de Scene 00–14 y habilita el pase global previo al release.
