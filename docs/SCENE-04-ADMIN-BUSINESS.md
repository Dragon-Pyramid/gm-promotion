# Gym Master Promotion — Scene 04 Admin Business

## Estado

Implementada por **PATCH 006-A** sobre:

`feature/gm-promotion-scene04-admin-business-v1`

## Posición narrativa

Scene 04 continúa el capítulo **Control**.

Secuencia:

1. Scene 03 — el administrador ve el gimnasio completo.
2. Scene 04 — el administrador entiende cómo está funcionando el negocio.

La escena no pretende ser una pantalla contable. Su función es traducir operación diaria en lectura de negocio.

## Objetivo comercial

Comunicar que Gym Master permite leer en conjunto:

- cuotas;
- ventas;
- servicios;
- gastos;
- resultado operativo;
- tendencia.

La idea central es pasar de “tener datos” a “entender señales”.

## Datos

Todos los valores numéricos son ilustrativos.

No representan datos reales de clientes, gimnasios ni implementaciones productivas.

## Composición

Desktop:

- copy narrativo a la izquierda;
- business pulse cinematográfico a la derecha;
- resultado operativo como foco principal;
- mezcla de fuentes de ingreso / gasto;
- gráfica comparativa;
- bloque de decisión.

Mobile:

- composición apilada dentro de 100svh;
- resultado operativo prioritario;
- fuentes en una fila compacta;
- gráfica simplificada;
- insight final preservado;
- reducción adicional para viewports <= 680px de alto.

## Motion

React Kino conserva ownership exclusivo del scroll.

La escena usa:

- `Scene duration="180vh"`;
- un único `ScrollTransform` corto para la entrada del business pulse;
- contenido interno presentado como composición atómica.

No se agregan GSAP, Lenis ni otros motores.

## Regla estructural

`.gm-scene04` corresponde al spacer exterior de React Kino y permanece:

`overflow: visible`

Cualquier clipping decorativo ocurre dentro de:

`.gm-scene04__visual-shell`

Esto preserva el sticky/pin interno del motor.

## Assets futuros

PATCH 006-A implementa el esqueleto premium.

En la fase audiovisual podremos enriquecer esta escena con:

- mockups reales de métricas del producto;
- overlays de interfaz;
- partículas / lighting;
- video o frame sequence;
- transiciones desde Scene 03;
- assets diferenciados desktop/mobile.

La escena debe seguir funcionando correctamente aun sin esos assets.

## QA esperado

Validar antes de commit:

- desktop ES;
- desktop EN;
- mobile ES;
- mobile EN;
- scroll forward;
- reverse scroll;
- pin estable;
- insight final visible antes de agotar el scroll;
- sin clipping;
- reduced motion;
- TypeScript;
- lint;
- production build.
## QA visual — PATCH 006-B

El primer QA de Scene 04 mostró que la estructura, pin y composición mobile funcionaban correctamente.

En desktop, el headline original era demasiado largo y ocupaba casi toda la columna narrativa, desplazando el body fuera del viewport.

Ajuste aplicado:

- ES headline: `Entender el negocio cambia las decisiones.`
- EN headline: `Understanding the business changes decisions.`
- la idea “ver la operación es el primer paso” pasa al body;
- headline desktop reduce escala y amplía ancho útil;
- mobile conserva su escala específica.

No se modifica motion, duración, pin ni estructura de la escena.
