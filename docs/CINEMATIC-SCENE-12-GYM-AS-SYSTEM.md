# Gym Master Promotion - Scene 12 Cinematic Pass

## Estado

CIN-013-A preparado para la segunda pasada cinematografica de Scene 12.

Scene 12 culmina el capitulo Connected antes del contraste Before / After.

## Baseline

- Branch: `feature/gm-promotion-cinematic-scene12-gym-as-system-v1`
- Baseline main: `c936592`
- Foundation: `PATCH 014-A`
- Scene duration: `180vh`
- Scroll ownership: React Kino
- ScrollTransform count: 1

## Idea narrativa

La escena representa al gimnasio completo como un sistema en movimiento.

Secuencia cinematografica:

1. El sistema activo respira.
2. Personas recibe enfasis.
3. Operacion recibe enfasis.
4. Experiencia recibe enfasis.
5. Datos recibe enfasis.
6. Infraestructura recibe enfasis.
7. El nucleo Gym Master responde.
8. El panel de principios toma protagonismo.
9. Conecta.
10. Conserva contexto.
11. Da continuidad.
12. El insight final cierra la escena.

## Scope de CIN-013-A

CIN-013-A agrega solamente una capa CSS cinematografica y este documento.

No modifica:

- JSX.
- copy ES.
- copy EN.
- dependencias.
- duracion de la Scene.
- cantidad de ScrollTransform.
- layout Foundation.
- geometria desktop.
- geometria mobile.
- ownership de scroll.

## Movimiento

El ciclo ambiental usa 18 segundos.

La secuencia no intenta reemplazar el progreso de React Kino. Kino conserva ownership exclusivo del scroll y CSS solamente agrega vida ambiental al sistema ya renderizado.

Los cinco dominios conservan siempre su posicion Foundation. El enfasis cambia solamente borde, fondo, sombra y luminosidad.

El nucleo conserva su geometria circular.

Los anillos conservan su geometria y responden mediante luminosidad.

El panel derecho conserva sus tres principios y los enfatiza de manera secuencial.

El insight final recibe el ultimo enfasis del ciclo.

## Mobile

CIN-013-A no cambia medidas ni breakpoints Foundation.

La composicion mobile debe seguir conservando:

- cinco dominios.
- nucleo Gym Master.
- orbitas.
- panel de principios.
- insight final.
- `100svh`.
- variante compacta para alturas menores o iguales a 680px.


## CIN-013-B - MOBILE ORBIT CONTAINMENT

CIN-013-B corrige exclusivamente la composicion mobile del organismo circular.

Problema observado en QA:

- en desktop las cinco areas permanecen visualmente asociadas al nucleo y a las orbitas;
- en mobile, al crecer verticalmente el panel del organismo, las posiciones Foundation basadas en `top` y `bottom` alejaban las etiquetas del circulo central.

Correccion:

- las cinco etiquetas se anclan alrededor del centro vertical del organismo en mobile;
- Personas y Operacion quedan sobre la orbita;
- Experiencia permanece en el lateral del nucleo;
- Datos e Infraestructura quedan debajo de la orbita;
- la variante de altura menor o igual a 680px compacta ligeramente esas distancias.

CIN-013-B no modifica:

- desktop;
- JSX;
- copy ES/EN;
- Scene duration;
- ScrollTransform;
- timing de CIN-013-A;
- reduced motion;
- estructura del organismo;
- tamanos Foundation del nucleo o de las orbitas.

QA adicional requerido:

- mobile ES 368x832;
- mobile EN 368x832;
- short viewport 368x640;
- cinco etiquetas visualmente asociadas al circulo;
- sin clipping;
- sin overflow horizontal;
- desktop ES/EN sin regresion.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- el transform Kino Foundation permanece neutralizado por la regla existente.
- el pulso orbital Foundation permanece detenido por la regla existente.
- todas las animaciones nuevas de CIN-013-A se detienen.
- ningun contenido queda oculto.
- todos los dominios permanecen visibles.
- el nucleo permanece visible.
- los principios permanecen visibles.
- el insight permanece visible.

## QA requerido antes de commit

- Desktop ES.
- Desktop EN.
- Mobile ES.
- Mobile EN.
- 368x832.
- 368x640.
- forward scroll.
- reverse scroll.
- reduced motion.
- cinco dominios visibles.
- nucleo visible.
- principios visibles.
- insight visible.
- sin clipping visible.
- sin overflow horizontal.
- DevTools errors: 0.
- DevTools warnings: 0.
- TypeScript PASS.
- lint PASS.
- production build PASS.
- `git diff --check` PASS.

## Copy

CIN-013-A preserva intencionalmente los archivos de traduccion.

Los microfixes de copy detectados durante la auditoria se resolveran despues de validar la capa cinematografica, mediante un cambio separado y trazable.

## Resultado esperado

Scene 12 debe sentirse como un organismo unico: cinco areas que forman parte de una misma operacion, sostenidas por un nucleo compartido y cerradas por la idea de que Gym Master es un sistema, no una suma de modulos.
