# Gym Master Promotion — Cinematic Scene 07 Training / Progress

## CIN-008-A — Effort to Progress / Visible Evolution

Rama: `feature/gm-promotion-cinematic-scene07-training-progress-v1`

Baseline: `6fc3718`

Narrativa:

`Scene 06 -> ser reconocido`

`Scene 07 -> convertir esfuerzo en progreso visible`

La escena se lee como:

`hoy -> trabajo -> registro -> constancia -> progreso`

Se preserva:

- `180vh`;
- React Kino;
- un único `.gm-scene07__motion`;
- PATCH `009-A`;
- MOBILE PROGRESS BALANCE `009-B`;
- ejercicios y cargas;
- `72%`;
- `W1 / W4 / W8 / W12`;
- `87% / +18% / 32`;
- focus e insight;
- JSX, copy, manifest y dependencias.

CIN-008-A añade:

- respiración de sesión;
- lectura 01 -> 02 -> 03 de ejercicios;
- acknowledgement del 72%;
- reveal de curva W1 -> W12 de izquierda a derecha;
- lectura secuencial de métricas;
- respiración de próximo objetivo;
- resolución final del insight;
- fallback completo para reduced motion.

No hay count-up ni mutación de datos.

## QA

Desktop ES/EN:

- Scene 06 -> 07;
- ejercicios 01 -> 03;
- 72%;
- curva W1 -> W12;
- métricas;
- focus;
- insight.

Mobile `368x832`:

- revisar ejercicios y labels;
- curva completa;
- weeks;
- métricas;
- focus/insight;
- overflow horizontal;
- consola.

La foundation usa truncado y ocultamiento de metadata/body en mobile. No se
corrige preventivamente en CIN-008-A: sólo si QA confirma pérdida real.

## Copy verificada — CIN-008-B

La validación final en navegador confirmó que la copy ES se renderiza correctamente como:

`la evolución para que`

No fue necesario modificar `messages/es.json`. CIN-008-B queda cerrado como verificación sin cambio de fuente.

## Criterio

Scene 07 debe sentirse como:

`tiempo convertido en progreso`

No como dashboard fitness, counter animation o HUD deportivo.
