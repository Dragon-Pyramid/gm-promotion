# Gym Master Promotion — Scene 14 Final CTA

## Estado

Implementada por **PATCH 016-A** sobre:

`feature/gm-promotion-scene14-final-cta-v1`

## Posición narrativa

Scene 14 cierra la primera pasada foundation completa del storytelling:

**Scene 00 → Scene 14**

No introduce una nueva capacidad.

Convierte todo el recorrido anterior en una sola invitación.

## Idea central

**Tu gimnasio ya está en movimiento. Hagamos que todo trabaje junto.**

CTA principal:

**Solicitar una demostración**

## Dirección visual

La escena rompe deliberadamente el patrón visual de los paneles anteriores.

Utiliza:

- composición centrada;
- mucho espacio negativo;
- halo de marca;
- núcleo GM;
- headline de gran escala;
- CTA dominante;
- cierre mínimo.

No contiene:

- dashboard;
- módulos funcionales;
- mapas de sistema;
- tarjetas de roles;
- comparativas;
- nuevas explicaciones técnicas.

## CTA

El control contiene:

`data-cta-intent="request-demo"`

En esta foundation el destino real del CTA permanece desacoplado.

No se inventa:

- correo comercial;
- formulario;
- CRM;
- booking URL;
- endpoint;
- integración externa.

La acción real se conectará durante la fase de release cuando se defina el canal comercial.

## Copy de apoyo

El mensaje evita promesas cuantitativas o resultados garantizados.

La propuesta se mantiene en:

- conectar personas;
- conectar decisiones;
- conectar experiencia;
- conservar continuidad operacional.

## Motion

React Kino mantiene ownership exclusivo del scroll.

Scene 14 usa:

- `Scene duration="180vh"`;
- un solo `ScrollTransform`;
- entrada suave del bloque final.

No se añade un segundo motor de motion.

## Regla estructural

`.gm-scene14` permanece:

`overflow: visible`

El clipping ocurre únicamente dentro de:

`.gm-scene14__stage`

## Mobile

La escena mobile conserva:

- marca;
- headline;
- body;
- CTA;
- microcopy;
- cierre.

El halo se compacta y el headline reduce escala sin alterar jerarquía.

Existe una variante adicional para pantallas de hasta `680px` de altura.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- se neutraliza el transform del wrapper Kino;
- se mantiene todo el contenido visible;
- se elimina la transición decorativa del icono del CTA.

## Accesibilidad

- headline asociado mediante `aria-labelledby`;
- CTA implementado con `button`;
- focus visible;
- decoraciones marcadas como `aria-hidden`;
- contenido esencial permanece textual.

## Alcance

PATCH 016-A completa la foundation visual/narrativa.

No incluye todavía:

- wiring comercial del CTA;
- analytics finales del CTA;
- metadata/SEO final;
- JSON-LD;
- dominio final;
- deployment final;
- cinematic pass;
- assets definitivos de marketing.

Esos puntos pertenecen a fases posteriores.

## QA antes de commit

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
- headline sin colisiones;
- halo sin clipping;
- CTA visible;
- CTA focus visible;
- closing visible;
- sin overflow horizontal;
- reduced motion;
- DevTools sin warnings nuevos.

## Checkpoint esperado

Cuando Scene 14 quede validada y mergeada:

**Foundation 00–14 = completa.**

Ese merge debe convertirse en el checkpoint previo a la fase cinematográfica/polish.
## PATCH 016-B — Brand line clearance

QA visual detectó que el núcleo circular con las letras `GM` se superponía al descriptor:

`GESTIÓN · OPERACIÓN · EXPERIENCIA`

Ajuste aplicado:

- se elimina el núcleo circular opaco y las letras `GM`;
- se conservan los anillos y el halo de marca;
- el descriptor queda completamente visible;
- headline, body, CTA, layout, React Kino, mobile y reduced motion permanecen sin cambios.

Este ajuste prioriza la lectura del descriptor de cierre y evita redundancia visual de marca.
## PATCH 016-C — Desktop viewport-height fit

QA final detectó una diferencia entre desktop con navegador normal y F11:

- con F11 el cierre completo era visible;
- con el chrome normal del navegador, la menor altura útil dejaba el bloque final parcialmente fuera del viewport;
- mobile no presentaba el problema.

Ajuste aplicado únicamente a:

`@media (min-width: 761px) and (max-height: 980px)`

Dentro de ese rango se compactan de forma moderada:

- padding vertical de la escena;
- tamaño y posición del halo;
- espacio superior del contenido;
- escala del headline;
- separación del body;
- separación y altura del CTA;
- margen y tipografía del closing.

No se modifica:

- estructura React;
- React Kino;
- duración 180vh;
- copy;
- CTA intent;
- mobile;
- composición de pantallas altas/F11;
- reduced motion.

Objetivo: que el cierre de Scene 14 permanezca visible también en desktop con la barra normal del navegador.
