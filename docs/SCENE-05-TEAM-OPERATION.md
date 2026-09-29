# Gym Master Promotion — Scene 05 Team Operation

## Estado

Implementada por **PATCH 007-A** sobre:

`feature/gm-promotion-scene05-team-operation-v1`

## Posición narrativa

Scene 05 abre el capítulo **Operation**.

Secuencia:

1. Scene 03 — el administrador ve el gimnasio completo.
2. Scene 04 — el administrador entiende el negocio.
3. Scene 05 — el equipo trabaja dentro de un flujo operativo conectado.

## Objetivo comercial

Cambiar el protagonista.

La escena deja de mirar principalmente al administrador y muestra el trabajo cotidiano del equipo/comercial:

- llegada del socio;
- check-in;
- pago / cuota;
- venta;
- stock;
- registro.

La promesa no es “más pantallas”.

La promesa es:

**menos fricción entre una acción y la siguiente.**

## Composición

Desktop:

- copy narrativo a la izquierda;
- estación operativa viva a la derecha;
- seis pasos conectados;
- señal de sincronización;
- insight final.

Mobile:

- composición apilada dentro de 100svh;
- seis pasos en grilla 2 × 3;
- información secundaria compactada;
- sync e insight preservados;
- ajuste adicional para viewports <= 680px de alto.

## Motion

React Kino mantiene ownership exclusivo del scroll.

La escena usa:

- `Scene duration="180vh"`;
- un solo `ScrollTransform` corto para presentar el flujo completo;
- ambient motion CSS para el pulso operativo.

No se agregan motores de scroll ni dependencias.

## Regla estructural

`.gm-scene05` es el Scene spacer exterior y permanece:

`overflow: visible`

El clipping visual ocurre únicamente dentro de:

`.gm-scene05__stage`

Esto protege el sticky/pin interno de React Kino.

## Datos y estados

Los horarios, estados y valores visuales son ilustrativos.

No representan información real de clientes ni datos productivos.

## Assets futuros

PATCH 007-A implementa el esqueleto premium.

La etapa audiovisual puede sumar:

- mockups reales del flujo de caja/POS;
- QR y acceso;
- interacción humana;
- microvideo;
- frame sequences;
- iluminación contextual;
- transición cinematográfica desde Scene 04.

La escena debe seguir siendo legible y útil sin esos assets.

## QA esperado antes de commit

- TypeScript;
- lint;
- production build;
- desktop ES;
- desktop EN;
- mobile ES;
- mobile EN;
- pin estable;
- forward scroll;
- reverse scroll;
- sync e insight visibles antes de agotar el scroll;
- sin clipping;
- reduced motion.
## PATCH 007-B — Visual Balance Polish

QA visual de 007-A confirmó que:

- el flujo operativo se diferencia correctamente de Scene 03 y Scene 04;
- pin y reverse scroll se mantienen estables;
- los seis pasos, sync e insight están presentes en mobile;
- no se detectó clipping estructural.

Antes de cerrar la escena se aplican dos ajustes.

### Headline

ES:

`El trabajo diario empieza a fluir.`

EN:

`Daily work starts to flow.`

El body conserva la explicación funcional de ingreso, cobros, ventas, stock y registro.

### Balance mobile

El stage mobile pasa a composición flex vertical.

El track operativo absorbe el espacio disponible y centra sus seis tarjetas dentro de esa región, mientras el outcome conserva su posición de cierre.

Objetivo:

- evitar concentración excesiva de contenido en la parte superior;
- reducir el vacío visual inferior;
- preservar todos los elementos;
- no introducir clipping en viewports bajos;
- mantener intacta la arquitectura React Kino.
