# Gym Trasciende — Sitio Web Oficial

[trasciendegym.com](https://trasciendegym.com) · Ocotlán de Morelos, Oaxaca

Sitio web de marketing para Gym Trasciende, construido con Astro 5, Tailwind CSS 4 y Preact. Genera páginas estáticas desplegadas en Cloudflare Pages/Workers.

[![Astro](https://img.shields.io/badge/Astro-5-FF5D01?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Preact](https://img.shields.io/badge/Preact-10-673AB8?style=flat&logo=preact&logoColor=white)](https://preactjs.com)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)

---

## Requisitos

- **Node.js** ≥ 18
- **pnpm** ≥ 9

## Inicio rápido

```bash
pnpm install       # instalar dependencias
pnpm dev           # servidor de desarrollo en localhost:4321
pnpm build         # build de producción en /dist
pnpm preview       # preview del build estático
```

---

## Arquitectura

### Stack

| Capa | Tecnología | Rol |
|---|---|---|
| Framework | Astro 5 | SSG + Islands Architecture |
| UI estática | Componentes `.astro` | Cero JavaScript por defecto |
| UI interactiva | Preact 10 | Islands hidratados bajo demanda |
| Estilos | Tailwind CSS 4 | Utility-first con tokens `@theme` |
| Despliegue | Cloudflare Pages/Workers | Edge rendering + CDN global |

### Rutas

```
/                   → index.astro          (Página principal)
/servicios          → servicios.astro      (Catálogo de servicios)
/servicios/spinning → servicios/spinning.astro
/servicios/pesas-fuerza
/servicios/area-adultos
/servicios/nutricion
/promociones        → promociones.astro
/nosotros           → nosotros.astro
/contacto           → contacto.astro
/reviews            → reviews.astro
```

### Capa de datos

Centralizada en `src/data/`:

| Archivo | Exporta |
|---|---|
| `pricing.ts` | Precios y áreas del gimnasio |
| `services.ts` | Contenido del `InfoSlider` por servicio |
| `navigation.ts` | Ítems de navegación móvil compartidos |

### Componentes clave

| Componente | Tipo | Descripción |
|---|---|---|
| `Layout.astro` | Astro | Layout raíz; maneja SEO, OG, JSON-LD, View Transitions |
| `PricingSelector.tsx` | Preact island | Selector interactivo de planes por área |
| `InfoSlider.tsx` | Preact island | Slider de características de servicio |
| `CountdownTimer.tsx` | Preact island | Cuenta regresiva configurable vía prop `targetDate` |
| `OpenStatusBadge.tsx` | Preact island | Indicador de horario abierto/cerrado en tiempo real |
| `ServiceCTA.astro` | Astro | Sección CTA reutilizable para páginas de servicio |

---

## Guía de desarrollo

### Tokens de diseño

Los colores de marca se definen en `src/styles/global.css` dentro del bloque `@theme`:

```css
@theme {
  --color-primary:    #d5fb00;  /* lima — color de acción principal */
  --color-secondary:  #f7f7f7;  /* texto sobre fondos oscuros */
  --color-background: #0d0e11;  /* fondo base (dark only) */
  --color-accent:     #006400;  /* verde oscuro */
  --color-nutri:      #8fae3a;  /* paleta Yanely García (nutrición) */
  --color-cta-orange: #f28c28;  /* naranja WhatsApp CTA */
}
```

Usa siempre las clases Tailwind generadas (`text-primary`, `bg-background`, etc.) en lugar de valores hexadecimales arbitrarios.

### Agregar una nueva página de servicio

1. Crea `src/pages/servicios/mi-servicio.astro`
2. Importa `Layout`, `ServiceCTA`, `MobileBottomNav` y los slides desde `src/data/services.ts`
3. Agrega los slides del `InfoSlider` a `src/data/services.ts`
4. Define el schema JSON-LD y pásalo al `<Layout schema={schema}>`
5. Usa `servicePageNavItems` desde `src/data/navigation.ts` para el nav móvil

### Actualizar precios

Edita únicamente `src/data/pricing.ts`. Los cambios se reflejan automáticamente en todas las páginas que usan `PricingPlan` o `PricingSelector`.

### Actualizar la cuenta regresiva de promociones

En `src/pages/promociones.astro`, cambia el valor de `targetDate`:

```astro
<CountdownTimer client:load targetDate="2026-04-30T23:59:59" />
```

### Componentes interactivos (Preact islands)

Los islands se montan con directivas `client:*` de Astro:

- `client:load` — se hidrata inmediatamente (usar para interacciones above the fold)
- `client:visible` — se hidrata cuando entra en viewport (sliders, secciones secundarias)
- `client:idle` — se hidrata cuando el navegador está inactivo (lightbox, elementos opcionales)

Importa hooks siempre desde `preact/hooks`, no desde `react`.

---

## SEO

- **Schema.org JSON-LD** — `ExerciseGym` en `/` y `/nosotros`; `Service` en cada página de servicio vía prop `schema` de `Layout.astro`
- **Open Graph + Twitter Card** — configurados en `Layout.astro`
- **Canonical URL** — generado automáticamente
- **Sitemap** — generado por `@astrojs/sitemap` en cada build

---

## Despliegue

El proyecto usa el adaptador `@astrojs/cloudflare`. La configuración de Wrangler está en `wrangler.jsonc`.

```bash
pnpm build           # genera /dist
wrangler pages deploy dist/
```

---

## Licencia

© 2026 Gym Trasciende. Todos los derechos reservados.
