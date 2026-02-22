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

import type { Customer } from "../data"
import { getCustomerColumns } from "./customer-columns"
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination"
import { DataTableView } from "@/shared/components/data-table/data-table-view"
import { DataTableColumnToggle } from "@/shared/components/data-table"
import { Button } from "@/shared/ui/button"
import { AppButton } from "@/shared/components/buttons/app-button"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

interface CustomerTableProps {
  customers: Customer[]
  onAdd: () => void
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export function CustomerTable({ customers, onAdd, onEdit, onDelete }: CustomerTableProps) {
  const columns = useMemo(
    () => getCustomerColumns({ onEdit, onDelete }),
    [onEdit, onDelete],
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    data: customers,
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
  const statusFilterValue = (table.getColumn("status")?.getFilterValue() as string) ?? ""

  function resetFilters() {
    setGlobalFilter("")
    setColumnFilters([])
  }

  return (
    <>
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <Input
              placeholder="Search customers..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-9 w-full sm:w-64"
            />
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
                <SelectItem value="inactive">Inactive</SelectItem>
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
            <AppButton size="sm" onClick={onAdd}>
              <IconPlus />
              <span className="hidden lg:inline">Add Customer</span>
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
