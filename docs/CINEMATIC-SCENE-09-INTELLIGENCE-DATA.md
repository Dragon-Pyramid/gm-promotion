# Gym Master Promotion — Cinematic Scene 09 Intelligence / Data

## CIN-010-A — Connected Data to Signal

Rama:

`feature/gm-promotion-cinematic-scene09-intelligence-data-v1`

Baseline:

`835f961`

## Posición narrativa

Scene 09 abre el capítulo **Intelligence**.

La continuidad narrativa queda:

`Scene 07 -> esfuerzo convertido en progreso`

`Scene 08 -> contexto que mantiene la relación`

`Scene 09 -> actividad dispersa convertida en lectura conectada`

La idea central permanece:

**Cuando los datos se conectan, aparecen señales.**

## Lectura cinematográfica

La escena se interpreta como:

`FUENTES -> CONVERGENCIA -> PATRÓN -> SEÑALES -> CONTEXTO`

Las cinco fuentes:

1. asistencia;
2. pagos;
3. ventas;
4. entrenamiento;
5. relación;

no compiten entre sí.

Empiezan a leerse como partes de una misma historia.

El núcleo `PATRÓN` representa la convergencia.

La salida narrativa se expresa como:

- ritmo;
- cambio;
- atención.

No son predicciones.

No son decisiones automáticas.

No son scores de negocio.

Son señales ilustrativas que ayudan a dirigir la mirada.

## Foundation preservada

CIN-010-A no modifica:

- `Scene duration="180vh"`;
- React Kino;
- el único `.gm-scene09__motion`;
- JSX de `Scene09IntelligenceData`;
- Foundation `011-A`;
- Mobile Signal Balance `011-B`;
- cinco fuentes;
- núcleo central;
- tres señales;
- insight;
- `.gm-scene09 { overflow: visible; }`;
- clipping únicamente en `.gm-scene09__stage`;
- mobile `100svh`;
- variante `<= 680px`;
- copy ES;
- copy EN;
- datos ilustrativos;
- dependencias.

## CIN-010-A añade

- respiración del estado de fuentes conectadas;
- lectura secuencial de las cinco fuentes;
- acknowledgement visual del núcleo de convergencia;
- lectura secuencial de `RITMO / CAMBIO / ATENCIÓN`;
- resolución final en el insight;
- fallback explícito para `prefers-reduced-motion`.

La capa cinematográfica sólo afecta:

- borde;
- fondo;
- glow;
- opacity;
- scale puntual de indicadores.

No modifica geometría ni contenido.

## QA requerida

Desktop ES/EN:

- transición Scene 08 -> Scene 09;
- headline;
- `SEÑALES DEL GIMNASIO / GYM SIGNALS`;
- cinco fuentes;
- núcleo `PATRÓN / PATTERN`;
- `RITMO / CAMBIO / ATENCIÓN`;
- insight;
- salida hacia Scene 10;
- forward scroll;
- reverse scroll;
- consola.

Mobile `368x832`:

- `100svh`;
- cinco fuentes visibles;
- núcleo central visible;
- panel `LA ACTIVIDAD HABLA / ACTIVITY SPEAKS`;
- Mobile Signal Balance 011-B preservado;
- tres señales;
- insight;
- cero overflow horizontal;
- forward / reverse scroll;
- consola.

Viewport corto `<= 680px`:

- composición compacta;
- fuentes legibles;
- núcleo;
- señales;
- insight;
- sin clipping.

Reduced motion:

- toda la información permanece visible;
- rings y pulse Foundation permanecen neutralizados;
- CIN-010-A queda sin animaciones;
- scroll continúa funcionando.

## Gates

- `git diff --check`;
- `npm run typecheck`;
- `npm run lint`;
- `npm run build`.

## Criterio

Scene 09 debe sentirse como:

`muchas actividades empiezan a contar una misma historia`

No como:

- dashboard administrativo;
- tablero de KPIs;
- predicción;
- scoring;
- decisión automática;
- HUD de ciencia ficción.

Gym Master debe aparecer como la capa que conecta actividad dispersa y la vuelve una lectura comprensible.
