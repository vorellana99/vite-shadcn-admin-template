# Guía del Wrapper `DataTableView`

## ¿Qué problema resuelve?

Cada tabla del proyecto necesita el mismo markup de `<Table>`, `<TableHeader>`, `<TableBody>` y los mismos estilos visuales para la cabecera. Antes, ese código se repetía en cada componente.

`DataTableView` centraliza todo el renderizado y los estilos en un solo lugar:

| | Antes | Después |
|--|-------|---------|
| Líneas por tabla | ~50 líneas de markup repetido | 1 línea |
| Cambiar estilo de cabeceras | Editar N archivos | Editar solo `data-table-view.tsx` |

---

## Arquitectura

```
shared/
├── ui/
│   └── table.tsx          ← Componente Shadcn UI puro (no tocar)
└── components/
    └── data-table/
        ├── data-table-view.tsx        ← Wrapper visual (nuevo)
        ├── data-table-pagination.tsx  ← Paginación reutilizable
        └── data-table-column-toggle.tsx
```

> **Principio clave:** No modificar `shared/ui/table.tsx`. Toda la personalización visual va en los wrappers de `shared/components/data-table/`.

---

## Cómo usar `DataTableView`

### 1. Importar

```tsx
import { DataTableView } from "@/shared/components/data-table/data-table-view"
```

### 2. Reemplazar el bloque `<Table>`

```tsx
// ❌ Antes: 50+ líneas repetidas
<div className="overflow-hidden rounded-lg border">
  <Table>
    <TableHeader className="bg-primary/10 ...">
      {/* ... map de headers ... */}
    </TableHeader>
    <TableBody>
      {/* ... map de filas ... */}
    </TableBody>
  </Table>
</div>

// ✅ Después: una sola línea
<DataTableView table={table} columnsLength={columns.length} />
```

### 3. Props requeridas

| Prop | Tipo | Descripción |
|------|------|-------------|
| `table` | `TanstackTable<TData>` | Objeto retornado por `useReactTable(...)` |
| `columnsLength` | `number` | Cantidad de columnas (para el estado vacío) |

---

## Crear una nueva tabla con este patrón

```tsx
import { useReactTable, getCoreRowModel, ... } from "@tanstack/react-table"
import { DataTableView } from "@/shared/components/data-table/data-table-view"
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination"
import { getMyColumns } from "./my-columns"

export function MyTable({ data }: { data: MyRow[] }) {
  const columns = getMyColumns()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // ... más configuración
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar de filtros, búsqueda, etc. (lógica específica de ESTA tabla) */}
      <div className="flex gap-2">
        <Input placeholder="Buscar..." />
      </div>

      {/* Vista de la tabla: completamente reutilizable */}
      <DataTableView table={table} columnsLength={columns.length} />

      {/* Paginación: también reutilizable */}
      <DataTablePagination table={table} />
    </div>
  )
}
```

---

## Caso especial: tablas con Drag & Drop (DnD)

`DataTableView` **no es compatible** con `@dnd-kit` porque dnd-kit necesita inyectar `<SortableContext>` dentro del `<TableBody>`.

Si tu tabla tiene drag & drop (como `SectionsTable`), debes renderizar la tabla manualmente:

```tsx
<DndContext ...>
  <Table>
    {/* Aplica los estilos manualmente para mantener consistencia visual */}
    <TableHeader className="bg-primary/10 [&_th]:text-primary sticky top-0 z-10">
      {/* ... headers ... */}
    </TableHeader>
    <TableBody>
      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
        {table.getRowModel().rows.map((row) => (
          <DraggableRow key={row.id} row={row} />
        ))}
      </SortableContext>
    </TableBody>
  </Table>
</DndContext>
```

> La clase `bg-primary/10 [&_th]:text-primary sticky top-0 z-10` aplicada manualmente al `<TableHeader>` asegura que el estilo sea idéntico al del wrapper.

---

## Cambiar el estilo visual de TODAS las tablas

Edita únicamente este archivo:

**`src/shared/components/data-table/data-table-view.tsx`**

```tsx
// Cambiar el color de fondo de la cabecera en todas las tablas genéricas:
<TableHeader className="bg-primary/10 [&_th]:text-primary sticky top-0 z-10">
//                       ^^^^^^^^^^^ Edita solo aquí
```

---

## Tablas refactorizadas

| Archivo | Usa `DataTableView` |
|---------|:-------------------:|
| `customers-page/components/customer-table.tsx` | ✅ |
| `products-page/components/product-table.tsx` | ✅ |
| `dashboard-page/components/sections-table.tsx` | ❌ (DnD — manual) |
