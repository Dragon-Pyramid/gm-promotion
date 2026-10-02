# Gym Master Promotion — Scene 13 Cinematic Pass

## Estado

CIN-014-A preparado para la segunda pasada cinematográfica de Scene 13.

Baseline:

`1b191e0934e400961ccbdda1ce1ebd03ce9cc810`

Branch:

`feature/gm-promotion-cinematic-scene13-before-after-v1`

## Posición narrativa

Scene 12 establece que el gimnasio funciona como un sistema.

Scene 13 muestra qué cambia cuando las mismas partes dejan de operar
aisladas y comienzan a conservar contexto.

La narrativa de CIN-014-A es:

`actividad fragmentada -> transición -> contexto compartido -> continuidad`

No se presenta un benchmark cuantitativo.

No se presentan métricas de mejora no verificadas.

## Ownership de motion

React Kino conserva ownership exclusivo del scroll.

Foundation mantiene:

- `Scene duration="180vh"`;
- un único `ScrollTransform`;
- entrada Kino existente;
- geometría desktop;
- geometría mobile;
- breakpoints Foundation.

CIN-014-A agrega únicamente motion CSS ambiental.

## Secuencia cinematográfica

El ciclo ambiental dura aproximadamente 18 segundos.

### Before

La escena enfatiza progresivamente:

1. Socios;
2. Pagos;
3. Acceso;
4. Entrenamiento.

Los nodos siguen siendo independientes.

Las rutas quebradas reciben pequeños pulsos de energía, pero no se
convierten en conexiones completas.

La intención es representar fricción y pérdida de continuidad, no un
sistema roto ni una situación de error.

### Bridge

El puente central toma protagonismo después del recorrido Before.

Se enfatizan:

- línea central;
- sweep;
- flecha;
- glow.

El bridge representa el cambio de continuidad operacional.

No representa una migración de datos ni una automatización específica.

### After

Después del bridge se activa:

1. core compartido `GM`;
2. connected path;
3. Socios;
4. Pagos;
5. Acceso;
6. Entrenamiento.

La señal ya no desaparece entre nodos.

La intención es expresar que cada acción conserva contexto para la
siguiente.

### Shifts

Los cuatro contrastes Foundation se enfatizan en orden:

1. fragmentación -> continuidad;
2. islas -> contexto compartido;
3. reacción tardía -> decisión con contexto;
4. visión parcial -> visión conectada.

El estado anterior no desaparece.

El cambio visual es de énfasis y continuidad.

### Insight

El bloque final recibe el último énfasis cinematográfico.

La escena termina sobre la idea:

`La diferencia no es el gimnasio.`

`Es la forma en que todo trabaja junto.`

## Mobile

CIN-014-A no modifica geometría mobile.

Foundation continúa siendo autoritativa para:

- layout;
- altura;
- padding;
- posiciones;
- tamaños;
- grid;
- breakpoints.

El contraste Before / After continúa lado a lado.

Las nuevas animaciones mobile se limitan a:

- opacity;
- brightness;
- glow;
- box-shadow;
- filter.

No se agregan desplazamientos estructurales.

## Short viewport

Para `max-height: 680px` se preservan las reglas Foundation existentes.

CIN-014-A no vuelve a mostrar contenido secundario que Foundation haya
ocultado para proteger la composición.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- React Kino conserva su neutralización Foundation;
- se detienen todas las animaciones agregadas por CIN-014-A;
- no se oculta contenido;
- no cambia la geometría.

## Archivos

Modificado:

`src/app/globals.css`

Creado:

`docs/CINEMATIC-SCENE-13-BEFORE-AFTER.md`

No se modifica:

- `src/components/story/Scene13BeforeAfter.tsx`;
- `messages/es.json`;
- `messages/en.json`;
- `docs/SCENE-13-BEFORE-AFTER.md`;
- `src/app/[locale]/page.tsx`.

## QA requerido antes de commit

- TypeScript;
- lint;
- production build;
- desktop ES;
- desktop EN;
- mobile ES;
- mobile EN;
- viewport `368x832`;
- viewport `368x640`;
- forward scroll;
- reverse scroll;
- pin estable;
- Before legible;
- After legible;
- bridge visible;
- shared core visible;
- shifts visibles;
- insight visible;
- sin clipping;
- sin overflow horizontal;
- reduced motion;
- DevTools sin errores;
- DevTools sin warnings nuevos.

## Commit

El script no realiza commit.

Primero debe completarse QA visual y técnico.
