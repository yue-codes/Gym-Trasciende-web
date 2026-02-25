# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Dev server at localhost:4321
pnpm build      # Production build (outputs to dist/)
pnpm preview    # Preview production build
pnpm astro check  # Type-check the project
```

Deployment is to Cloudflare Workers via `wrangler.jsonc`. The site is always built as static (`output: "static"`).

## Architecture

**Stack**: Astro 5 + Tailwind CSS 4 + Preact + Cloudflare adapter

The site follows Astro's **Islands Architecture**: pages and layout are `.astro` files rendered at build time; interactive UI islands are `.tsx` Preact components hydrated with `client:load` (or other Astro client directives).

**View Transitions**: `<ClientRouter />` from `astro:transitions` enables SPA-style navigation. The `<Header>` uses `transition:persist` so it doesn't re-render on navigation.

### Component organization under `src/components/`

| Folder | Purpose |
|--------|---------|
| `layout/` | Header, Footer, MobileBottomNav (Preact), SectionContainer |
| `sections/` | Full page sections (Hero, Reviews, PricingPlan, Gallery, etc.) |
| `services/` | Service-specific components; ServiceBento is the main services grid |
| `ui/` | Reusable UI: CountUp, CountdownTimer, PricingSelector (all Preact), Icon, etc. |
| `social/` | Social media link components |
| `media/` | GalleryLightbox (Preact), MapEmbed, TiktokVideo |
| `icons/` | SVG icon components |
| `hooks/` | Preact hooks (e.g. `useProgressiveNumber.ts`) |

### Data

Pricing data is centralized in `src/data/pricing.ts` — update it there to change prices shown across the site.

### Pages (`src/pages/`)

- `/` — Main landing page
- `/nosotros` — About page (delegates to `NosotrosPage.astro` component)
- `/contacto` — Contact page
- `/servicios` — Services overview
- `/servicios/spinning`, `/servicios/pesas-fuerza`, `/servicios/area-adultos`, `/servicios/nutricion` — Individual service pages
- `/promociones` — Promotions
- `/reviews` — Reviews
- `/404` — Custom 404

### Layout

`src/layouts/Layout.astro` is the single base layout. It handles all SEO meta tags (Open Graph, Twitter Card, Schema.org JSON-LD for the gym), canonical URLs, and injects the Montserrat Variable font. Pass `title`, `description`, `image`, and `keywords` props to override defaults.

## Styling

Tailwind CSS 4 with `@theme` in `src/styles/global.css`. Brand tokens:

| Token | Value |
|-------|-------|
| `primary` | `#d5fb00` (vibrant lime green) |
| `secondary` | `#f7f7f7` |
| `tertiary` | `#0e1300` |
| `accent` | `#006400` |
| `background` | `#0d0e11` |

Font: `Montserrat Variable` (variable font, imported via `@fontsource-variable/montserrat`).

Custom utility: `.cp-v` — a clip-path that creates a chevron/V bottom edge effect.

The design is **dark mode only** (`bg-background` = `#0d0e11`).

## Path Aliases

Defined in `tsconfig.json`:

```
@components/* → src/components/*
@layouts/*    → src/layouts/*
@hooks/*      → src/components/hooks/*
@icons/*      → src/icons/*
```

## Preact / JSX

TSConfig sets `jsxImportSource: "preact"`, so all `.tsx` files use Preact JSX automatically. Import hooks from `preact/hooks`, not `react`.
