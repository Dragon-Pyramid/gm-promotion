# Gym Master Promotion — Cinematic Scene 10 Infrastructure

## CIN-011-A — Simple Experience, Solid Foundation

Rama:

`feature/gm-promotion-cinematic-scene10-infrastructure-v1`

Baseline:

`15d36e7`

## Posición narrativa

Scene 10 abre el capítulo **Connected**.

La continuidad narrativa queda:

`Scene 09 -> actividad conectada convertida en inteligencia`

`Scene 10 -> infraestructura coordinada sosteniendo una experiencia simple`

La idea central permanece:

**Lo simple por fuera necesita una base sólida por dentro.**

## Lectura cinematográfica

La escena se interpreta como:

`EXPERIENCIA SIMPLE -> CONEXIÓN INVISIBLE -> CAPAS COORDINADAS -> BASE SÓLIDA -> TECNOLOGÍA EN SEGUNDO PLANO`

La superficie representa lo que perciben:

- Administrador;
- Equipo;
- Socio.

Debajo, seis capas conceptuales trabajan juntas:

1. aplicación;
2. sincronización;
3. datos;
4. seguridad;
5. nube;
6. continuidad.

El movimiento no describe una topología técnica real.

No representa proveedores, servicios concretos ni disponibilidad cuantificada.

## Foundation preservada

CIN-011-A no modifica:

- `Scene duration="180vh"`;
- React Kino;
- el único `.gm-scene10__motion`;
- JSX de `Scene10Infrastructure`;
- Foundation `012-A`;
- superficie;
- puente;
- seis capas;
- insight;
- `.gm-scene10 { overflow: visible; }`;
- clipping únicamente en `.gm-scene10__stage`;
- mobile `100svh`;
- variante compacta `<= 680px`;
- transformaciones mobile de capas;
- copy EN;
- dependencias.

## CIN-011-A añade

- respiración del estado de base operativa;
- actividad sutil en la superficie, incluyendo carga secuencial de las barras 2, 3 y 4 como progreso;
- énfasis temporal del puente;
- lectura secuencial de las seis capas;
- consolidación visual de la foundation;
- resolución final del insight;
- fallback explícito para `prefers-reduced-motion`.

La capa cinematográfica sólo modifica propiedades visuales:

- border;
- background;
- box-shadow;
- opacity;
- scale puntual de indicadores.

No modifica geometría, estructura ni contenido.

## Verificación de copy ES

La lectura directa del baseline actual confirma que el copy ES ya contiene las formas correctas:

`sin poner la tecnología en el medio`

`para que arriba todo se sienta directo`

CIN-011-A no modifica `messages/es.json` ni `messages/en.json`.

## QA requerida

Desktop ES/EN:

- transición Scene 09 -> Scene 10;
- headline;
- superficie simple;
- puente;
- seis capas;
- foundation;
- insight;
- salida hacia Scene 11;
- forward scroll;
- reverse scroll;
- consola.

Mobile `368x832`:

- `100svh`;
- superficie;
- puente;
- seis capas;
- insight;
- cero overflow horizontal;
- forward / reverse scroll;
- consola.

Viewport corto `368x640` / `<=680px`:

- headline compacto;
- superficie;
- puente;
- seis capas visibles;
- insight;
- sin clipping.

Reduced motion:

- wrapper Kino estable;
- pulse Foundation existente neutralizado;
- CIN-011-A sin animaciones;
- todo el contenido visible;
- scroll funcional.

## Gates

- `git diff --check`;
- `npm run typecheck`;
- `npm run lint`;
- `npm run build`.

## Criterio

Scene 10 debe sentirse como:

`la complejidad trabaja abajo para que la experiencia se sienta simple arriba`

No como:

- diagrama de infraestructura;
- documentación técnica;
- mapa de proveedores;
- topología interna;
- dashboard;
- promesa de disponibilidad;
- HUD de ciencia ficción.

Gym Master debe comunicar solidez tecnológica sin poner la tecnología por delante de las personas.

## R4 - Surface progress geometry fix

R3B introduced the sequential progress concept for the three surface rows.

R4 preserves the original Foundation geometry by keeping those rows absolutely
positioned while their pseudo-elements animate the fill from left to right.

Sequence remains:

`row 2 -> row 3 -> row 4 -> short hold -> reset -> loop`

No JSX, copy, mobile layout, Foundation semantics, or dependencies are changed.

## R5 - Mobile progress containment

Mobile keeps the same sequential progress narrative while compacting the three
animated rows inside the small surface-screen:

`row 2 -> row 3 -> row 4 -> hold -> reset -> loop`

Only the mobile row height and vertical offsets are overridden. Desktop remains
unchanged. The animated fill stays clipped inside each row.

## R6 - Mobile progress bottom clearance

The compact mobile surface-screen gets a little more breathing room below the
last animated row.

Mobile-only geometry becomes:

- row height: `5px`;
- row 2: `top: 21px`;
- row 3: `top: 30px`;
- row 4: `top: 39px`.

Desktop and the sequential progress timing remain unchanged.
