import { useMemo, useState } from "react"
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { IconPlus, IconX } from "@tabler/icons-react"

import { useIsMobile } from "@/shared/hooks/use-mobile"
import type { Product } from "../product-schema"
import { CATEGORIES } from "../product-schema"
import { getProductColumns } from "./product-columns"
import {
  DataTableColumnToggle,
  DataTablePagination,
  DataTableSearch,
  DataTableFilter,
} from "@/shared/components/data-table"
import { DataTableView } from "@/shared/components/data-table/data-table-view"
import { Button } from "@/shared/ui/button"
import { AppButton } from "@/shared/components/buttons/app-button"

interface ProductTableProps {
  products: Product[]
  onAdd: () => void
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export function ProductTable({ products, onAdd, onEdit, onDelete }: ProductTableProps) {
  const isMobile = useIsMobile()
  const columns = useMemo(
    () => getProductColumns({ onEdit, onDelete, isMobile }),
    [onEdit, onDelete, isMobile],
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    data: products,
    columns,
    state: { sorting, columnVisibility, columnFilters, globalFilter, pagination },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const hasActiveFilters = globalFilter !== "" || columnFilters.length > 0

  function resetFilters() {
    setGlobalFilter("")
    setColumnFilters([])
  }

  const categoryFilterValue = (table.getColumn("category")?.getFilterValue() as string) ?? ""
  const statusFilterValue = (table.getColumn("status")?.getFilterValue() as string) ?? ""

  return (
    <>
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <DataTableSearch
              placeholder="Search products..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <DataTableFilter
              value={categoryFilterValue || "_all"}
              onValueChange={(v) =>
                table.getColumn("category")?.setFilterValue(v === "_all" ? undefined : v)
              }
              placeholder="Category"
              allOptionLabel="All Categories"
              options={CATEGORIES.map(cat => ({ value: cat, label: cat }))}
            />
            <DataTableFilter
              value={statusFilterValue || "_all"}
              onValueChange={(v) =>
                table.getColumn("status")?.setFilterValue(v === "_all" ? undefined : v)
              }
              placeholder="Status"
              allOptionLabel="All Statuses"
              options={[
                { value: "active", label: "Active" },
                { value: "low_stock", label: "Low Stock" },
                { value: "out_of_stock", label: "Out of Stock" },
                { value: "coming_soon", label: "Coming Soon" },
                { value: "discontinued", label: "Discontinued" },
              ]}
            />
            {hasActiveFilters && (
              <Button variant="ghost" onClick={resetFilters}>
                <IconX className="size-4" />
                Reset
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <DataTableColumnToggle table={table} />
            <AppButton onClick={onAdd}>
              <IconPlus />
              <span className="hidden lg:inline">Add Product</span>
            </AppButton>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <DataTableView table={table} columnsLength={columns.length} />

        <DataTablePagination table={table} />
      </div>
    </>
  )
}
