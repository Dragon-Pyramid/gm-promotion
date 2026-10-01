# Gym Master Promotion — Cinematic Scene 08 Relationship Beyond Training

## CIN-009-A — Continuity Beyond Training

Rama: `feature/gm-promotion-cinematic-scene08-relationship-v1`

Baseline: `b5b7521`

Narrativa:

`Scene 06 -> ser reconocido`

`Scene 07 -> convertir esfuerzo en progreso visible`

`Scene 08 -> mantener la relación después del entrenamiento`

La escena se lee como:

`HOY -> SEGUIMIENTO -> PRÓXIMA VISITA -> CONTINUIDAD`

Se preserva:

- `180vh`;
- React Kino;
- un único `.gm-scene08__motion`;
- Foundation `010-A`;
- fixes ES desktop `010-B` y `010-C`;
- relationship loop;
- timeline;
- cuatro touchpoints;
- socio central;
- insight;
- `.gm-scene08 { overflow: visible; }`;
- clipping únicamente en `.gm-scene08__stage`;
- mobile `100svh`;
- variante `<= 680px`;
- copy EN;
- datos ilustrativos;
- JSX y dependencias.

CIN-009-A añade:

- respiración del estado de relación activa;
- lectura secuencial del timeline;
- lectura secuencial de los cuatro touchpoints;
- presencia estable del socio como centro narrativo;
- flujo visual por los conectores;
- continuidad progresiva de contexto;
- resolución final del insight;
- fallback completo para reduced motion.

No hay counters, chats dinámicos, mutación de datos ni nuevas dependencias.

## CIN-009-B — Spanish Copy Spacing — Verificada

El baseline `b5b7521` ya contiene correctamente:

`sin sumar fricción`

en `relationshipBody` de `messages/es.json`.

R2 verifica la frase completa de forma fail-closed y no modifica `messages/es.json`.

El typo histórico:

`sin sumarfricción`

no está presente.

CIN-009-B queda cerrado como **verificación sin cambio de fuente**.

## QA

Desktop ES/EN:

- transición Scene 07 -> Scene 08;
- headline ES sin colisión;
- relación activa;
- HOY;
- SEGUIMIENTO;
- PRÓXIMA VISITA;
- entrenamiento;
- mensaje;
- recordatorio;
- continuidad;
- socio central;
- insight;
- salida hacia Scene 09;
- forward / reverse scroll;
- consola.

Mobile `368x832`:

- `100svh`;
- headline;
- timeline completa;
- cuatro touchpoints;
- socio central;
- insight;
- overflow horizontal;
- forward / reverse scroll;
- consola.

Viewport corto `<= 680px`:

- composición compacta;
- touchpoints;
- member card;
- insight;
- sin clipping.

Reduced motion:

- toda la información permanece visible;
- sólo se neutraliza movimiento.

## Gates

- `git diff --check`;
- `npm run typecheck`;
- `npm run lint`;
- `npm run build`.

## Criterio

Scene 08 debe sentirse como:

`el entrenamiento terminó, pero la relación no`

No como dashboard, inbox, CRM, chat o HUD.

Gym Master mantiene vivo el contexto entre una visita y la siguiente.
