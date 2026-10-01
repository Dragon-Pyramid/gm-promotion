# Gym Master Promotion — Cinematic Scene 06 Member Entry

## Estado

`CIN-007-A — Recognition Gate / Frictionless Arrival`

Rama:

`feature/gm-promotion-cinematic-scene06-member-entry-v1`

Baseline:

`43e5d76`

Precede:

`Cinematic Pass — Scene 05 / Team Operation`

## Objetivo narrativo

El arco cambia de perspectiva:

`Scene 03 -> ver`

`Scene 04 -> comprender`

`Scene 05 -> actuar`

`Scene 06 -> ser reconocido`

Scene 06 no se presenta como un módulo de control de acceso.

Se presenta como una llegada donde Gym Master reconoce contexto para que el socio
pueda seguir sin pensar en el sistema.

Principio:

`El sistema valida. El socio sigue.`

## Arquitectura preservada

Se conserva sin cambios:

- `Scene duration="180vh"`;
- `motionMode: "kino"`;
- fallback natural;
- `analyticsId: story_member_entry`;
- el `ScrollTransform` atómico de `.gm-scene06__portal-motion`;
- outer `.gm-scene06` con `overflow: visible`;
- PATCH `008-A`;
- MOBILE CLOSING BALANCE `008-B`;
- cinco pasos del journey;
- pass card;
- QR;
- scanner;
- access card;
- system card;
- welcome card;
- copy ES/EN;
- manifest;
- geometría responsive.

No se agregan:

- nuevos `ScrollTransform`;
- nuevos scroll owners;
- timers;
- observers;
- cambios de copy;
- cambios de values;
- cambios de layout;
- dependencias;
- ocultamiento de información.

## Flujo narrativo

La secuencia existente es:

1. llega / arrives;
2. se identifica / identifies;
3. acceso validado / access validated;
4. bienvenida / welcome;
5. entra a entrenar / starts training.

La cinematografía mueve atención, no estructura.

## CIN-007-A

### Arrival light

La `door-light` respira lentamente.

Debe sentirse como presencia y bienvenida, no como un control de seguridad.

### Recognition wave

Los cinco pasos del journey permanecen visibles.

Una onda suave recorre:

- dot;
- label;
- connector.

No se usa una estética de wizard ni checks de progreso.

### Identity acknowledgement

La tarjeta de Sofía permanece estable.

Avatar y QR reciben una confirmación de luminancia para sugerir reconocimiento.

No se anima el nombre.

No se cambia el plan.

No se simula lectura de datos.

### Scanner

Los rings y el beam ya existentes se preservan.

CIN-007-A sólo añade una respuesta contenida sobre el core `GM` y el scanner
como conjunto.

El scanner actúa como puente:

`identidad -> GM -> acceso`

y no como protagonista futurista.

### Access validation

`VALIDADO / VALIDATED` y `08:12` permanecen fijos.

El check recibe una confirmación verde suave.

Este es el clímax funcional.

### Background system

Las tres líneas de `.gm-scene06__system-line` conservan sus anchos.

Sólo se iluminan secuencialmente para expresar:

`identidad -> estado -> acceso`

### Welcome resolution

El cierre narrativo ocurre en:

`Llegar. Entrar. Entrenar.`

y:

`El sistema valida. El socio sigue.`

El welcome card recibe el ritmo más lento de la escena.

## Mobile

La foundation `008-B` sigue siendo autoridad.

CIN-007-A no cambia geometría; sólo reduce la cadencia del ambient motion.

QA obligatorio en `368x832`:

- `ACCESO DEL SOCIO / MEMBER ENTRY`;
- `LISTO / READY`;
- cinco journey labels;
- `SOFÍA M.`;
- pass meta;
- QR;
- scanner;
- `VALIDADO / VALIDATED`;
- `08:12`;
- system title + body;
- welcome title + body.

La foundation usa ellipsis/nowrap en journey labels.

Por eso deben observarse especialmente:

- `ACCESO VALIDADO`;
- `ENTRA A ENTRENAR`;
- `ACCESS VALIDATED`;
- `STARTS TRAINING`.

Si QA detecta truncado, se resuelve en un patch de completitud separado.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- door breathing apagado;
- ready pulse apagado;
- journey recognition apagado;
- identity acknowledgement apagado;
- scanner rings apagados;
- scanner beam apagado;
- access confirmation apagada;
- system reading apagado;
- welcome glow apagado.

Todo el contenido permanece visible.

## QA requerido

### Desktop ES

Recorrer Scene 05 -> Scene 06:

- cambio de operación a experiencia;
- five-step journey;
- identity card legible;
- scanner contenido;
- access confirmation clara;
- system background legible;
- welcome como resolución;
- sin estética de checkpoint agresivo.

### Desktop EN

Comprobar:

- journey labels completos;
- pass meta;
- access status;
- system copy;
- welcome copy;
- cero reflow inesperado.

### Mobile 368x832

Comprobar todos los elementos sin contenido sacrificado.

### Reduced motion

Composición completa y estática.

### Console

- 0 errores nuevos;
- 0 warnings nuevos.

## Criterio cinematográfico

Scene 06 debe sentirse como:

`reconocimiento sin fricción`

No debe sentirse como:

- control fronterizo;
- scanner sci-fi protagonista;
- wizard SaaS;
- demo biométrica;
- seguridad invasiva;
- HUD gamer.

Gym Master reconoce el contexto para que la persona no tenga que pensar en el
sistema.

El sistema valida.

El socio sigue.
## CIN-007-B — Journey Direction / Left-to-Right Recognition

QA visual detectó que la onda de reconocimiento de CIN-007-A se percibía en
sentido inverso: el último paso recibía el énfasis antes que el primero.

La causa era el orden de los offsets negativos de la animación infinita.

CIN-007-B no cambia:

- keyframes;
- duración;
- journey DOM;
- labels;
- layout;
- React Kino;
- `180vh`;
- scanner;
- pass;
- access;
- system;
- welcome.

Sólo invierte los cinco offsets del journey para preservar la misma cadencia
pero leer la secuencia en orden natural:

`01 -> 02 -> 03 -> 04 -> 05`

Visualmente:

`LLEGA -> SE IDENTIFICA -> ACCESO VALIDADO -> BIENVENIDA -> ENTRA A ENTRENAR`

y:

`ARRIVES -> IDENTIFIES -> ACCESS VALIDATED -> WELCOME -> STARTS TRAINING`

El primer nodo recibe ahora la primera activación perceptual y el último nodo
queda como resolución de la secuencia.
## CIN-007-C — Mobile Journey Label Completeness

QA mobile detectó que `BIENVENIDA` mostraba su última `A` parcialmente cortada.

La causa es la regla histórica del journey:

- `overflow: hidden`;
- `text-overflow: ellipsis`;
- `white-space: nowrap`.

CIN-007-C mantiene las cinco columnas y reemplaza el truncado en mobile por
wrapping controlado y una compactación tipográfica mínima.

Se preserva completamente CIN-007-B:

`01 -> 02 -> 03 -> 04 -> 05`

No cambia:

- desktop;
- React Kino;
- `180vh`;
- ScrollTransform;
- keyframes;
- delays del journey;
- scanner;
- pass;
- access;
- system;
- welcome;
- copy ES/EN.

QA mobile debe verificar especialmente:

- `LLEGA`;
- `SE IDENTIFICA`;
- `ACCESO VALIDADO`;
- `BIENVENIDA`;
- `ENTRA A ENTRENAR`;
- `ARRIVES`;
- `IDENTIFIES`;
- `ACCESS VALIDATED`;
- `WELCOME`;
- `STARTS TRAINING`.

Ningún label debe perder caracteres.
## CIN-007-D — Mobile Journey Label Fit Polish

QA posterior a CIN-007-C confirmó que ya no se perdía la última letra de
`BIENVENIDA`, pero la palabra quedaba visualmente partida:

`BIENVENID`
`A`

CIN-007-D conserva el wrapping general introducido por CIN-007-C para labels
largos y aplica un micro-fit únicamente al cuarto label del journey en español
para anchos `<=390px`.

Resultado esperado:

`BIENVENIDA`

en una sola línea y sin clipping.

No cambia:

- `ACCESO VALIDADO`, que puede seguir usando wrapping controlado;
- `ENTRA A ENTRENAR`, que puede seguir usando wrapping controlado;
- labels EN;
- dirección CIN-007-B `01 -> 05`;
- keyframes;
- duración;
- React Kino;
- ScrollTransform;
- layout;
- JSX;
- copy.
