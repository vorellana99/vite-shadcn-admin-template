import { useMemo, useState } from "react"
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { IconPlus, IconX } from "@tabler/icons-react"

import type { Product } from "../data"
import { categories } from "../data"
import { getProductColumns } from "./product-columns"
import {
  DataTableColumnToggle,
  DataTablePagination,
} from "@/shared/components/data-table"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

interface ProductTableProps {
  products: Product[]
  onAdd: () => void
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export function ProductTable({ products, onAdd, onEdit, onDelete }: ProductTableProps) {
  const columns = useMemo(
    () => getProductColumns({ onEdit, onDelete }),
    [onEdit, onDelete],
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
            <Input
              placeholder="Search products..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-9 w-full sm:w-64"
            />
            <Select
              value={categoryFilterValue || "_all"}
              onValueChange={(v) =>
                table.getColumn("category")?.setFilterValue(v === "_all" ? undefined : v)
              }
            >
              <SelectTrigger size="sm" className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={statusFilterValue || "_all"}
              onValueChange={(v) =>
                table.getColumn("status")?.setFilterValue(v === "_all" ? undefined : v)
              }
            >
              <SelectTrigger size="sm" className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <IconX className="size-4" />
                Reset
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <DataTableColumnToggle table={table} />
            <Button size="sm" onClick={onAdd}>
              <IconPlus />
              <span className="hidden lg:inline">Add Product</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DataTablePagination table={table} />
      </div>
    </>
  )
}
