# Gym Master Promotion — Hero LCP / Next.js 16

## Contexto

Durante el QA de Scene 04, `next dev` informó que:

`/images/gm_logo_blanco.png`

era detectada como Largest Contentful Paint (LCP) y recomendó cargarla de forma eager.

El logo pertenece al hero y está visible above-the-fold.

## Cambio

Antes:

```tsx
<Image
  ...
  priority
  alt="Gym Master"
/>
```

Después:

```tsx
<Image
  ...
  loading="eager"
  alt="Gym Master"
/>
```

## Motivo

En Next.js 16 la prop `priority` está deprecada.

Para una imagen above-the-fold que actúa como LCP, `loading="eager"` permite iniciar su carga inmediatamente y elimina la dependencia de la prop deprecada.

## Alcance

Este cambio es exclusivamente de performance / compatibilidad Next.js 16.

No modifica:

- narrativa;
- Scene 00–04;
- React Kino;
- motion;
- responsive;
- contenido ES/EN;
- assets.

## Validación esperada

- `git diff --check`;
- TypeScript;
- ESLint;
- production build;
- `npm run dev`;
- `/es` 200;
- `/en` 200;
- ausencia del warning LCP previo para `gm_logo_blanco.png`.
## Reconciliación R2 — causa confirmada

La primera corrección dejó el hero correctamente configurado con:

`loading="eager"`

Sin embargo, el warning LCP continuó apareciendo.

La inspección en DevTools confirmó dos instancias renderizadas del mismo recurso:

1. Hero:
   - clase `gm-hero__logo`;
   - `loading: eager`.

2. Scene 02:
   - mismo asset local;
   - `loading: lazy`.

El código confirmó que ambas instancias utilizaban:

`GM_BRAND_ASSETS.logoWhite.local`

## Solución R2

Se conserva el archivo físico único:

`/images/gm_logo_blanco.png`

Pero Scene 02 recibe una URL lógica distinta:

`/images/gm_logo_blanco.png?context=scene02`

Resultado esperado:

- Hero:
  - `/images/gm_logo_blanco.png`
  - `loading="eager"`

- Scene 02:
  - `/images/gm_logo_blanco.png?context=scene02`
  - lazy por defecto

No se duplica el PNG y Scene 02 no se convierte innecesariamente en eager.

## Next.js 16

Next.js 16 exige declarar explícitamente en `images.localPatterns.search` los query strings permitidos para imágenes locales.

`next.config.ts` restringe ahora:

- `/images/**` sin query;
- `/images/gm_logo_blanco.png?context=scene02` con la query exacta.

No se habilitan queries arbitrarias.

## QA R2 esperado

Después del cambio:

1. `git diff --check`;
2. `npm run typecheck`;
3. `npm run lint`;
4. `npm run build`;
5. `npm run dev`;
6. abrir `/es` y `/en`;
7. confirmar HTTP 200;
8. comprobar ausencia del warning LCP para `gm_logo_blanco.png`;
9. comprobar que Scene 02 sigue mostrando el logo;
10. comprobar en DevTools:
    - hero `eager`;
    - Scene 02 `lazy`;
    - URLs efectivas distintas.
