# Gym Master Promotion — Mobile Safety Baseline v1

## Propósito

Evitar que la construcción incremental de escenas acumule deuda responsive grave.

Mobile no se considera un desktop reducido. La composición puede cambiar cuando la legibilidad, densidad o altura disponible lo requieran.

## Reglas desde PATCH 004-B

### 1. Sin clipping crítico

Ningún texto esencial puede quedar:

- fuera del viewport;
- detrás de otro elemento;
- cortado por una escena pinned;
- inaccesible durante el recorrido normal de scroll.

### 2. Safe areas

Se utiliza `env(safe-area-inset-bottom)` en las zonas inferiores relevantes.

### 3. Tipografía fluida

Los títulos principales usan `clamp()` y reglas específicas para:

- <= 760 px;
- <= 760 px con altura <= 760 px;
- <= 359 px.

### 4. Scene 02 adaptada

En mobile:

- el núcleo se desplaza hacia arriba;
- reduce su tamaño;
- el copy ocupa una banda inferior protegida;
- el título reduce escala en viewports cortos;
- el fondo de aislamiento del copy reduce su footprint.

### 5. Reduced motion

El layout mobile sigue siendo estable cuando el usuario solicita movimiento reducido.

## QA recomendado durante construcción

Comprobar al menos:

- 320 x 568
- 360 x 640
- 390 x 844
- 430 x 932

y una prueba adicional con altura reducida por browser chrome.

## QA final

Cuando las escenas 00–14 estén completas se realizará un Mobile Final Polish específico:

- ES / EN;
- portrait;
- landscape;
- safe areas;
- tamaños extremos;
- touch;
- rendimiento;
- reduced motion;
- timings y densidad visual por escena.
## QA correction — Scene 02 copy centering

Durante QA en viewport mobile 368 × 832 se observó que el copy narrativo de Scene 02 quedaba desplazado y cortado hacia el lateral derecho.

La corrección elimina el uso de `transform: translateX(-50%)` como mecanismo de centrado en el mismo nodo animado por React Kino.

El centrado pasa a resolverse por layout (`left/right + auto margins`), evitando conflicto con el transform scroll-linked.

Los chips decorativos pueden atravesar parcialmente el borde durante la convergencia. El copy narrativo esencial no puede quedar cortado.
## QA correction — vertical safe / dwell

En mobile, el copy narrativo de Scene 02 necesita más tiempo de lectura que el desktop debido al mayor número de líneas.

PATCH 004-D:

- adelanta la aparición del kicker, title y body;
- conserva el timing de salida validado;
- aumenta la banda inferior segura;
- aplica una banda específica para viewports de poca altura.

El objetivo no es reducir indiscriminadamente la tipografía, sino conservar legibilidad y tiempo de lectura.
