# Gym Master Promotion — Cinematic Scene 04 Business

## Estado

`CIN-005-A-R — Business Pulse / Decision Intelligence`

Rama: `feature/gm-promotion-cinematic-scene04-admin-business-v1`

Baseline: `92d30ef`

## Objetivo narrativo

Scene 03 responde qué está pasando.

Scene 04 responde qué significa.

El capítulo Control evoluciona:

`ver -> comprender -> decidir`

## Arquitectura preservada

Se conservan:

- `Scene duration="180vh"`;
- `motionMode: "kino"`;
- fallback natural;
- ScrollTransform atómico;
- `.gm-scene04 { overflow: visible; }`;
- headline polish `006-B`;
- EN collision fix `H1`;
- geometría responsive;
- copy;
- manifest;
- valores y alturas de gráficos.

No se agregan:

- nuevos scroll owners;
- nuevos ScrollTransform;
- count-up;
- animación de alturas;
- dependencias;
- ocultamiento de información.

## Tratamiento

- Business Pulse lento.
- `7.8M` fijo.
- `+12.6%` fijo.
- Rings con respiración analítica.
- Sources leídas por luminancia de sus dots.
- Flow `01..08` leído por luminancia sin alterar datos.
- Decision signal enfatizado sin alterar alturas.
- Business lens horizontal muy lenta.
- Mobile conserva layout y reduce cadencia.
- Reduced motion deja toda la escena estática.

## QA

Desktop ES/EN:
- transición Scene 03 -> 04;
- resultado y tendencia;
- cuatro fuentes;
- flow `01..08`;
- decision panel;
- sin sensación crypto/HUD.

Mobile `368×832`:
- resultado;
- tendencia;
- cuotas/memberships;
- ventas/sales;
- servicios/services;
- gastos/expenses;
- ingresos vs gastos;
- períodos `01..08`;
- decisión;
- cero información oculta.

Console:
- 0 errores nuevos;
- 0 warnings nuevos.

## Criterio

Scene 03 muestra el gimnasio.

Scene 04 muestra lo que el gimnasio está tratando de decirte.
## CIN-005-B — Mobile Business Completeness

QA mobile detectó dos pérdidas de información heredadas del viewport-fit
original de Scene 04:

1. labels largos de fuentes —por ejemplo `MEMBERSHIPS`— se truncaban con
   `text-overflow: ellipsis`;
2. el body del panel de decisión se ocultaba con `display: none`.

CIN-005-B mantiene la misma estructura y corrige únicamente esas pérdidas.

### Sources

Las cuatro fuentes siguen siendo las mismas:

- memberships / cuotas;
- sales / ventas;
- services / servicios;
- expenses / gastos.

En mobile, el label puede ocupar una segunda línea controlada en lugar de
truncarse.

### Decision body

El cuerpo explicativo de la decisión vuelve a ser visible.

En vez de ocultarlo, se compactan:

- font-size;
- line-height;
- margin;
- padding derecho para respetar el decision signal.

### Short-height mobile

Incluso en `max-height: 680px`, la estrategia pasa de ocultar información a
compactarla.

### Arquitectura preservada

No cambia:

- desktop;
- tablet;
- `Scene duration="180vh"`;
- React Kino;
- ScrollTransform;
- outer overflow;
- business pulse;
- flow bars;
- data values;
- chart heights.

### QA específico

En `368×832` verificar:

- `MEMBERSHIPS` completo;
- `SALES` completo;
- `SERVICES` completo;
- `EXPENSES` completo;
- body de `INSIGHT, NOT SPREADSHEETS` visible;
- cero overflow horizontal;
- decision signal sin colisionar con el texto.

En ES verificar:

- `CUOTAS`;
- `VENTAS`;
- `SERVICIOS`;
- `GASTOS`;
- body `Cuando la información financiera...` visible.
