# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Type-check + production build (tsc -b && vite build)
npm run lint       # ESLint
npm run preview    # Preview production build
```

No test runner is configured in this project.

## Architecture Overview

Modern admin dashboard template: **Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui**.

### Directory Structure

```
src/
├── app/           # Entry point, App.tsx, router/
├── layouts/       # AppLayout (sidebar + topbar orchestration)
├── pages/
│   ├── modules/   # Feature pages (dashboard, examples, reports, tables)
│   └── core/      # System pages (user settings, brand settings)
└── shared/
    ├── components/ # App-level wrappers (AppButton, AppBadge, DataTable system, form utils)
    ├── ui/         # Shadcn/UI base components (do not modify directly)
    ├── hooks/      # Custom hooks
    ├── lib/        # cn() utility
    └── styles/     # globals.css (Tailwind v4 + CSS variables theme)
```

### Routing

All routes are in `src/app/router/routes.tsx`. Pages are lazy-loaded with `React.lazy()` and wrapped in `<AppLayout />`. Add new routes there following the existing pattern.

### Layout System

`src/layouts/app-layout/` uses an **orchestrator pattern**: `app-layout.tsx` composes modular subcomponents from `components/`. Navigation items are defined centrally in `menu.ts`.

### Page Pattern (CRUD example pages)

Each feature page follows this pattern:
- `<Feature>Page` holds state (list + dialog open/editing item)
- `<Feature>Table` renders the data table
- `<Feature>FormDialog` handles create/edit
- `data.ts` contains mock data and localStorage persistence helpers
- `<feature>-columns.tsx` defines TanStack Table column definitions
- `<Feature>StatusBadge` maps status values to styled badges

### Data Table System

`src/shared/components/data-table/` is a full-featured TanStack Table v8 wrapper with search, filtering, column visibility toggle, sorting, and pagination. See `DATA_TABLE_VIEW_GUIDE.md` in that folder for usage. Column definitions use `accessorKey` + cell renderers, with status badges driven by config maps.

### Shared Components

- **`AppButton`** — wrapper around shadcn Button with shadow/brightness hover on the default variant
- **`AppBadge`** — dynamic badge with variant driven by data values
- **`FormField`, `FormSection`** — form layout helpers (label + error wrapping)
- **`PageSkeleton`** — loading fallback for `Suspense`

### Styling / Theming

- Tailwind CSS v4 with `@theme inline` in `globals.css`
- Colors use OKLCH/HSL; sidebar is dark blue, primary is dark vibrant blue
- CSS variables drive light/dark mode (toggled via `.dark` class, managed by `next-themes`)
- shadcn configured with `new-york` style, `neutral` base, `cssVariables: true`
- Path alias: `@` → `src/`

### State Management

No global state library. Pages use local `useState`. Persistence is via `localStorage`. Toasts via `sonner`.

### TypeScript

Strict mode is on. No unused locals/parameters allowed. Use the `@/*` path alias throughout.
