# Gym Master Promotion — Cinematic Scene 00 Identity

## Estado

CIN-001-A — Opening Title Pass

Rama: `feature/gm-promotion-cinematic-scene00-identity-v1`

Foundation: `foundation-00-14-v1` / `e6cb552`

## Objetivo

Transformar Scene 00 desde un hero promocional convencional hacia una apertura cinematográfica de marca.

## Manifiesto

ES: **No mostramos software. Mostramos un gimnasio funcionando mejor.**

EN: **We don't show software. We show a gym working better.**

## Secuencia

1. oscuridad;
2. respiración de luz;
3. Dragon Pyramid presenta;
4. Gym Master emerge;
5. manifiesto;
6. copy de soporte;
7. CTA;
8. invitación al scroll.

La secuencia no bloquea interacción ni scroll.

## Arquitectura

Scene 00 permanece:

- `100vh`;
- `motionMode: static`;
- SSR;
- Next/Image;
- sin React Kino;
- sin nuevo motor de scroll;
- sin nuevas dependencias.

Se reutiliza Motion System V1.

## Composición

La foundation era de dos columnas.

CIN-001-A la transforma en una composición central, simétrica y monumental.

## Performance

No agrega videos, frame sequences, canvas, WebGL, shaders ni assets remotos adicionales.

## Mobile

Mobile conserva logo, manifiesto, body, CTA y scroll cue. Incluye adaptación para viewports cortos.

## Reduced motion

Todo aparece inmediatamente y sin reveal progresivo.

## QA requerido

- desktop ES / EN;
- mobile ES / EN;
- reload para observar secuencia;
- viewport desktop bajo;
- viewport mobile corto;
- reduced motion;
- transición hacia Scene 01;
- 0 errores / warnings nuevos.
## CIN-001-B — Mobile Reveal Timing Sync

### Motivo

QA visual detectó una diferencia perceptiva entre desktop y mobile.

En desktop, la secuencia de entrada de CIN-001-A se percibe correctamente:

- oscuridad;
- luz;
- marca;
- manifiesto;
- soporte;
- CTA.

En mobile / Chrome DevTools emulado, el primer paint visible puede llegar cuando parte
del reloj de las animaciones CSS ya avanzó. El resultado observado fue que logo,
manifiesto, body y CTA parecían cargar casi al mismo tiempo.

### Corrección

CIN-001-B conserva exactamente la misma coreografía y suma aproximadamente `750ms`
de tolerancia al timeline exclusivamente bajo:

`max-width: 760px` + `prefers-reduced-motion: no-preference`

No se agregan:

- JavaScript;
- client components;
- timers;
- React state;
- librerías;
- nuevos assets.

### Desktop

Sin cambios.

### Reduced motion

Sin cambios.

La regla existente de `prefers-reduced-motion: reduce` sigue mostrando toda la
composición inmediatamente.

### Criterio de QA

En reload mobile debe percibirse nuevamente:

1. atmósfera / luz;
2. presentación y marca;
3. manifiesto;
4. supporting copy;
5. CTA;
6. scroll cue.

La corrección no debe sentirse como una splash screen ni introducir una espera
artificial prolongada.
