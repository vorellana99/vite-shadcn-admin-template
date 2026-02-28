import { IconEdit, IconTrash, IconEye, IconFileText, IconDownload, IconMenu2 } from "@tabler/icons-react"

import {
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/shared/ui/dropdown-menu"
import { DataTableRowActions } from "@/shared/components/data-table/data-table-row-actions"
import type { Customer } from "../data"

interface CustomerRowActionsProps {
    customer: Customer
    onEdit: (customer: Customer) => void
    onDelete: (customer: Customer) => void
    isMobile?: boolean
}

export function CustomerRowActions({
    customer,
    onEdit,
    onDelete,
    isMobile,
}: CustomerRowActionsProps) {
    return (
        <DataTableRowActions isRowOverlay={isMobile} triggerIcon={<IconMenu2 className="size-4" />}>
            <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                Acciones del Cliente
            </DropdownMenuLabel>

            <DropdownMenuItem onClick={() => onEdit(customer)} className="cursor-pointer gap-3 p-2 rounded-lg mt-1">
                <div className="flex bg-primary/10 p-1.5 rounded-md text-primary">
                    <IconEdit className="size-4" />
                </div>
                <span className="font-medium">Editar Datos</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Ver detalles", customer)} className="cursor-pointer gap-3 p-2 rounded-lg">
                <div className="flex bg-blue-500/10 p-1.5 rounded-md text-blue-600 dark:text-blue-400">
                    <IconEye className="size-4" />
                </div>
                <span>Ver Detalles</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Contrato PDF", customer)} className="cursor-pointer gap-3 p-2 rounded-lg flex-1 justify-between group">
                <div className="flex items-center gap-3">
                    <div className="flex bg-emerald-500/10 p-1.5 rounded-md text-emerald-600 dark:text-emerald-400">
                        <IconFileText className="size-4" />
                    </div>
                    <span>Contrato</span>
                </div>
                <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-semibold bg-muted px-1.5 py-0.5 rounded uppercase">PDF</span>
                    <IconDownload className="size-3" />
                </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 opacity-50" />

            <DropdownMenuItem
                onClick={() => onDelete(customer)}
                className="cursor-pointer gap-3 p-2 rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive group"
            >
                <div className="flex bg-destructive/10 p-1.5 rounded-md text-destructive group-hover:bg-destructive/20 group-hover:scale-105 transition-all">
                    <IconTrash className="size-4" />
                </div>
                <span className="font-medium">Eliminar Cliente</span>
            </DropdownMenuItem>
        </DataTableRowActions>
    )
}
