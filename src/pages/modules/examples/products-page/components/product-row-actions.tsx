import { IconEdit, IconTrash, IconEye, IconPackage, IconHistory } from "@tabler/icons-react"

import {
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/shared/ui/dropdown-menu"
import { DataTableRowActions } from "@/shared/components/data-table/data-table-row-actions"
import type { Product } from "../data"

interface ProductRowActionsProps {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

export function ProductRowActions({
    product,
    onEdit,
    onDelete,
}: ProductRowActionsProps) {
    return (
        <DataTableRowActions>
            <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                Acciones del Producto
            </DropdownMenuLabel>

            <DropdownMenuItem onClick={() => onEdit(product)} className="cursor-pointer gap-3 p-2 rounded-lg mt-1">
                <div className="flex bg-primary/10 p-1.5 rounded-md text-primary">
                    <IconEdit className="size-4" />
                </div>
                <span className="font-medium">Editar Producto</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Ver detalles", product)} className="cursor-pointer gap-3 p-2 rounded-lg">
                <div className="flex bg-blue-500/10 p-1.5 rounded-md text-blue-600 dark:text-blue-400">
                    <IconEye className="size-4" />
                </div>
                <span>Detalles Técnicos</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Stock history", product)} className="cursor-pointer gap-3 p-2 rounded-lg">
                <div className="flex bg-amber-500/10 p-1.5 rounded-md text-amber-600 dark:text-amber-400">
                    <IconHistory className="size-4" />
                </div>
                <span>Historial de Stock</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Duplicar", product)} className="cursor-pointer gap-3 p-2 rounded-lg">
                <div className="flex bg-emerald-500/10 p-1.5 rounded-md text-emerald-600 dark:text-emerald-400">
                    <IconPackage className="size-4" />
                </div>
                <span>Duplicar Producto</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 opacity-50" />

            <DropdownMenuItem
                onClick={() => onDelete(product)}
                className="cursor-pointer gap-3 p-2 rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive group"
            >
                <div className="flex bg-destructive/10 p-1.5 rounded-md text-destructive group-hover:bg-destructive/20 group-hover:scale-105 transition-all">
                    <IconTrash className="size-4" />
                </div>
                <span className="font-medium">Eliminar Producto</span>
            </DropdownMenuItem>
        </DataTableRowActions>
    )
}
