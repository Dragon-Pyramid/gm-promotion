# Gym Master Promotion - Scene 11 Cinematic Pass

## Estado

CIN-012-A preparado para la segunda pasada cinematografica de Scene 11.

## Baseline

- main de origen: `b851917`;
- rama: `feature/gm-promotion-cinematic-scene11-three-people-one-system-v1`;
- Foundation: `PATCH 013-A`, `013-B`, `013-C`.

## Idea narrativa

Scene 11 vuelve a poner a las personas en el centro despues de la infraestructura.

Secuencia cinematografica:

1. tres personas;
2. tres momentos distintos;
3. un hilo compartido;
4. un contexto coherente;
5. un unico sistema;
6. insight final.

Forma resumida:

`THREE PEOPLE -> THREE MOMENTS -> ONE THREAD -> SHARED CONTEXT -> ONE SYSTEM`

## Alcance

CIN-012-A agrega solamente una capa CSS cinematografica.

No modifica:

- `Scene11ThreePeopleOneSystem.tsx`;
- la Foundation de Scene 11;
- copy ES;
- copy EN;
- `Scene duration="180vh"`;
- el unico `ScrollTransform`;
- layout desktop;
- layout mobile;
- dependencias.

## Motion

La secuencia usa un ciclo ambiental de `16s`.

Fases principales:

- Administrador;
- Equipo;
- Socio;
- recorrido del hilo;
- contexto compartido;
- nucleo GM;
- insight final;
- reset suave.

El movimiento no cambia geometria ni ownership del scroll.

## Mobile

La misma narrativa se conserva sin cambiar dimensiones, grid ni posiciones.

La variante `100svh` y el tratamiento de viewports de hasta `680px` permanecen bajo control de la Foundation.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- las animaciones de CIN-012-A se detienen;
- el viaje luminoso del hilo queda oculto;
- el contenido permanece visible;
- React Kino conserva el fallback existente.

## Disclosure

La escena comunica contexto compartido.

No implica:

- permisos identicos;
- interfaces identicas;
- acceso irrestricto;
- automatizacion de decisiones;
- datos reales de clientes.

## QA requerido antes de commit

- TypeScript;
- lint;
- production build;
- `git diff --check`;
- desktop ES;
- desktop EN;
- mobile ES;
- mobile EN;
- 368x832;
- 368x640;
- forward scroll;
- reverse scroll;
- tres roles visibles;
- secuencia de momentos visible;
- hilo compartido visible;
- contexto compartido legible;
- nucleo GM visible;
- insight final visible;
- reduced motion;
- sin overflow horizontal;
- DevTools con 0 errores y 0 warnings nuevos.
