# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Type-check + Vite build (tsc -b && vite build)
pnpm lint       # ESLint check
pnpm preview    # Preview production build
```

No test runner is configured yet (Vitest is planned but not set up).

To add new shadcn/ui components:
```bash
pnpm dlx shadcn@latest add <component>
```

## Architecture

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, React Router v7, TanStack Table v8, Zod, Sonner (toasts), jsPDF + xlsx (export).

**Path alias:** `@/` maps to `src/`.

### Folder structure

```
src/
├── app/            # Entry point (App.tsx, main.tsx) and router
│   └── router/
│       ├── index.tsx     # <AppRouter> renders <Routes>
│       └── routes.tsx    # All route definitions (lazy-loaded pages)
├── layouts/
│   └── app-layout/       # Shell: sidebar + topbar + <Outlet>
│       ├── menu.ts        # Centralized nav data (navMain + navCore)
│       ├── sidebar.tsx
│       ├── topbar.tsx
│       └── components/    # BrandSection, TopbarNotifications, UserMenu, UserProfileSheet, PageContent
├── pages/
│   ├── core/              # User/Brand config pages (profile, settings, security, brand)
│   └── modules/
│       ├── dashboard/
│       ├── examples/      # Customers, Products, Students — reference implementations
│       ├── reports/
│       └── tables/        # Basic, Advanced, Datatable demos
└── shared/
    ├── ui/                # shadcn/ui primitives — DO NOT modify directly
    ├── components/        # Project-level wrappers and reusable components
    │   ├── data-table/    # DataTableView, pagination, filters, search, column toggle
    │   ├── forms/         # FormField, FormSection, DialogFormHeader, AvatarUpload
    │   ├── buttons/       # AppButton (wrapper over shadcn Button)
    │   ├── badges/        # AppBadge (wrapper over shadcn Badge)
    │   ├── inputs/        # AppInput
    │   └── date-picker/
    ├── lib/utils.ts        # cn() helper
    ├── hooks/use-mobile.ts
    └── styles/globals.css  # Tailwind v4 CSS vars + theme tokens
```

### Key architectural rules

**`shared/ui/` is untouchable.** All shadcn primitives live there. Project-level customization goes into `shared/components/` wrappers (e.g. `AppButton`, `AppBadge`) that add styles on top without touching the originals.

**DataTableView pattern.** Every table that doesn't use DnD should use `<DataTableView table={table} columnsLength={columns.length} />` from `shared/components/data-table/data-table-view.tsx`. This centralizes header styles (`bg-primary/10 [&_th]:text-primary`). Tables with drag-and-drop (like `SectionsTable`) must render `<Table>` manually and apply those same classes by hand — see `DATA_TABLE_VIEW_GUIDE.md` in that folder.

**Module page pattern.** Each example module follows this structure:
- `*-page.tsx` — state management + navigation handlers, renders the table component
- `components/*-table.tsx` — TanStack Table setup + toolbar
- `components/*-columns.tsx` — column definitions
- `components/*-row-actions.tsx` — row-level actions (edit, delete, etc.)
- `components/*-status-badge.tsx` — status display
- `components/*-form-dialog.tsx` — inline dialog form (or a separate `*-form-page.tsx` for full-page forms)

The Students module (`/examples/students`) is the most complete reference: it uses full-page editing (`/examples/students/:id`) via `StudentFormPage` rather than a dialog.

**Routing.** All routes are defined in `src/app/router/routes.tsx` as lazy-loaded components under a single `<AppLayout>` wrapper. Page titles in the topbar are resolved automatically from `menuData` in `layouts/app-layout/menu.ts` — add new routes there too.

**Menu.** `src/layouts/app-layout/menu.ts` is the single source of truth for sidebar navigation. `navMain` = primary nav; `navCore` = user/brand config links. Items with `url: "#"` are placeholders and are excluded from the title resolver.

**Styling.** Tailwind v4 with CSS custom properties. Primary color: `hsl(215 75% 38%)`. Theme tokens defined in `globals.css`. Dark mode uses the `.dark` class variant.

**Exports.** Reports support PDF (jsPDF + jspdf-autotable) and Excel (xlsx). See `reports-page/` for usage patterns.
