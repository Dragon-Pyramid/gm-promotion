# Gym Master Promotion — Scene 06 Member Entry

## Estado

Implementada por **PATCH 008-A** sobre:

`feature/gm-promotion-scene06-member-entry-v1`

## Posición narrativa

Scene 06 abre el capítulo **Experience**.

La historia cambia nuevamente de protagonista:

1. Scene 03 — el administrador ve el gimnasio completo.
2. Scene 04 — entiende el negocio.
3. Scene 05 — el equipo trabaja dentro de un flujo conectado.
4. Scene 06 — el socio vive una llegada simple y continua.

## Objetivo comercial

Mostrar que Gym Master no sólo organiza la operación interna.

También mejora la experiencia visible del socio desde el primer contacto con el gimnasio.

Secuencia:

- llega;
- se identifica;
- acceso validado;
- bienvenida;
- entra a entrenar.

La promesa es:

**el sistema resuelve el contexto sin convertir la llegada en un trámite.**

## Composición

Desktop:

- copy narrativo;
- portal de acceso;
- journey de cinco pasos;
- pase del socio ilustrativo;
- scanner central;
- acceso validado;
- capa de sistema en segundo plano;
- cierre experiencial.

Mobile:

- composición completa en 100svh;
- journey compacto;
- pase completo;
- scanner + validación;
- cierre de sistema y bienvenida;
- variante adicional para viewports bajos.

## Motion

React Kino mantiene ownership exclusivo del scroll.

La escena usa:

- `Scene duration="180vh"`;
- un `ScrollTransform` corto para presentar el portal;
- ambient motion CSS para scanner y beam.

No se agregan motores de scroll.

## Regla estructural

`.gm-scene06` permanece:

`overflow: visible`

El clipping ocurre únicamente en:

`.gm-scene06__portal`

Esto protege el sticky/pin interno de React Kino.

## Datos ilustrativos

El nombre, horario, plan y estados visibles son ficticios y sólo sirven a la composición promocional.

No representan información real de clientes.

## Assets futuros

La foundation está diseñada para poder incorporar después:

- imagen o microvideo de una persona llegando;
- QR real estilizado;
- acceso físico o molinete;
- frame sequence;
- iluminación cinematográfica;
- transición desde operación hacia experiencia.

La escena debe seguir funcionando sin esos assets.

## QA esperado antes de commit

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
- journey legible;
- scanner y acceso completos;
- system + welcome visibles;
- sin clipping;
- reduced motion.
## QA cross-scene — Scene 04 English headline collision

Durante la validación visual de Scene 06 se detectó un detalle preexistente en Scene 04 desktop EN:

`Understanding`

extendía su última letra sobre el comienzo del panel Business.

Se aplicó el micro-fix **H1**:

- sólo desktop (`min-width: 981px`);
- sólo contenido `:lang(en)`;
- reducción tipográfica controlada;
- no se modifica el copy;
- no se mueve el visual de React Kino;
- ES permanece intacto.

La corrección evita depender de transforms estáticos sobre un nodo cuyo transform pertenece al motion engine.
## PATCH 008-B — Mobile Closing Balance

QA visual en 368 × 832 detectó que el cierre `SIN TRÁMITES / Llegar. Entrar. Entrenar.` quedaba parcialmente por debajo del viewport.

La causa era exclusivamente compositiva: en mobile, `system` y `welcome` estaban apilados en una sola columna.

Corrección:

- sólo `max-width: 760px`;
- `system + welcome` pasan a una fila de dos columnas;
- min-height mobile baja de 58px a 54px;
- en viewports de altura <= 680px baja de 48px a 44px;
- desktop permanece intacto;
- no cambia el copy;
- no cambia React Kino;
- no cambia `duration="180vh"`.

Objetivo: preservar simultáneamente el cierre técnico y el cierre experiencial sin clipping.
