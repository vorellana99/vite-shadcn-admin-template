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
import type { Student } from "../student-schema"
import { getStudentColumns } from "./student-columns"
import { DataTableView } from "@/shared/components/data-table/data-table-view"
import {
    DataTableColumnToggle,
    DataTablePagination,
    DataTableSearch,
    DataTableFilter,
} from "@/shared/components/data-table"
import { Button } from "@/shared/ui/button"
import { AppButton } from "@/shared/components/buttons/app-button"

interface StudentTableProps {
    students: Student[]
    onAdd: () => void
    onDelete: (student: Student) => void
}

export function StudentTable({ students, onAdd, onDelete }: StudentTableProps) {
    const isMobile = useIsMobile()
    const columns = useMemo(
        () => getStudentColumns({ onDelete, isMobile }),
        [onDelete, isMobile],
    )

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

    const table = useReactTable({
        data: students,
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
                        <DataTableSearch
                            placeholder="Buscar estudiantes..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                        <DataTableFilter
                            value={statusFilterValue || "_all"}
                            onValueChange={(v) =>
                                table.getColumn("status")?.setFilterValue(v === "_all" ? undefined : v)
                            }
                            placeholder="Estado"
                            allOptionLabel="Todos los estados"
                            options={[
                                { value: "active", label: "Activo" },
                                { value: "pending", label: "Pendiente" },
                                { value: "vip", label: "VIP" },
                                { value: "suspended", label: "Suspendido" },
                                { value: "inactive", label: "Inactivo" },
                            ]}
                        />
                        {hasActiveFilters && (
                            <Button variant="ghost" onClick={resetFilters}>
                                <IconX className="size-4" />
                                Limpiar
                            </Button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <DataTableColumnToggle table={table} />
                        <AppButton onClick={onAdd}>
                            <IconPlus />
                            <span className="hidden lg:inline">Agregar Estudiante</span>
                        </AppButton>
                    </div>
                </div>
            </div>

            <div className="relative mt-2 flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                <DataTableView table={table} columnsLength={columns.length} />
                <DataTablePagination table={table} />
            </div>
        </>
    )
}
