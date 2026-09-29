# Gym Master Promotion — Scene 03 Admin Overview

## Estado

Implementada por **PATCH 005-A** sobre:

`feature/gm-promotion-scene03-admin-overview-v1`

## Posición narrativa

Scene 03 es la primera escena del capítulo **Control**.

Secuencia:

1. Scene 01 — información fragmentada.
2. Scene 02 — transformación / conexión.
3. Scene 03 — el administrador deja de buscar información y empieza a ver el gimnasio completo.

## Objetivo comercial

Traducir la promesa conceptual de “todo conectado” en valor operativo visible.

La escena comunica:

- socios activos;
- cobranza;
- asistencia;
- alertas;
- actividad reciente;
- lectura contextual de la operación.

Los valores numéricos son **ilustrativos**. No representan datos reales de ningún cliente.

## Composición

Desktop:

- copy narrativo a la izquierda;
- command center a la derecha;
- cuatro métricas principales;
- actividad en vivo;
- panel de insight.

Mobile:

- composición apilada;
- métricas 2 × 2;
- actividad reducida;
- insight simplificado;
- en viewports de poca altura se prioriza información esencial.

## Motion

React Kino conserva el ownership del scroll.

La escena usa:

- `Scene duration="240vh"`;
- `ScrollTransform` para entrada del command center;
- `Reveal` progresivos para copy, métricas, actividad e insight.

No se agrega ningún motor de scroll adicional.

## Assets futuros

PATCH 005-A es un esqueleto visual premium.

En la fase audiovisual podrán incorporarse:

- mockups reales de Gym Master;
- screenshots procesados;
- imágenes generadas;
- video / frame sequences;
- iluminación y profundidad adicionales.

La escena no depende de esos assets para funcionar.

## Responsive

La escena nace con reglas específicas para:

- desktop;
- <= 980 px;
- <= 760 px;
- <= 760 px con altura <= 760 px;
- reduced motion.

El Mobile Final Polish global se mantiene como etapa posterior a la implementación de Scene 00–14.
## QA visual — PATCH 005-B

Primer QA visual detectó dos puntos:

1. La segunda mitad del command center aparecía demasiado tarde respecto al ingreso de la escena.
2. Los textos de UI del tramo final se percibían más finos y con menor continuidad tipográfica que las escenas anteriores.

Ajustes:

- título: `0.08 -> 0.02`;
- body: `0.14 -> 0.05`;
- microcopy: `0.20 -> 0.08`;
- entrada del dashboard: `0.10 -> 0.02`;
- span de entrada: `0.24 -> 0.16`;
- métricas: stagger adelantado;
- actividad: `0.46 -> 0.20`;
- insight: `0.56 -> 0.26`;
- pesos y contraste de body, labels, actividad, métricas e insight reforzados.

No se modificó la duración global de la escena ni se agregó otro motor de motion.
## QA estructural — PATCH 005-C

El segundo QA visual reveló que el problema no era una carga lenta de recursos.

### Causa

`Scene` de React Kino usa un spacer con un contenedor interno sticky/pinned.

La clase `.gm-scene03`, aplicada al spacer exterior, tenía:

- `overflow: hidden` en desktop;
- `overflow: clip` en mobile.

Eso interfería con el comportamiento sticky del Scene y hacía que el contenido pareciera revelarse o desplazarse tarde. En mobile, además, la composición excedía la altura útil del viewport y el final quedaba fuera cuando terminaba el scroll.

### Corrección

- el Scene spacer vuelve a `overflow: visible`;
- el command center deja de revelarse pieza por pieza;
- se mantiene un único `ScrollTransform` breve para la entrada completa;
- duración Scene 03: `240vh -> 180vh`;
- mobile se compacta para alojar copy + métricas + actividad + insight dentro de `100svh`;
- viewports <= 680px de alto reducen contenido secundario sin ocultar el insight final.

### Regla de arquitectura

No aplicar `overflow: hidden` ni `overflow: clip` al elemento exterior de un `<Scene>` pineado de React Kino.

Si una escena necesita clipping decorativo, debe realizarse dentro de un wrapper visual interno que no sea ancestro del sticky generado por el motor.
