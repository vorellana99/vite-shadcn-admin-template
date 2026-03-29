import { AppBadge } from "@/shared/components/badges/app-badge"
import type { Product } from "../product-schema"

interface ProductStatusBadgeProps {
    status: Product["status"]
}

const statusConfig: Record<Product["status"], { label: string; customColor: string }> = {
    active: {
        label: "Active",
        customColor: "bg-primary/20 text-primary border-primary/20",
    },
    discontinued: {
        label: "Discontinued",
        customColor: "bg-destructive/10 text-destructive border-destructive/20",
    },
    low_stock: {
        label: "Low Stock",
        customColor: "bg-amber-500/15 text-amber-700 border-amber-500/20",
    },
    out_of_stock: {
        label: "Out of Stock",
        customColor: "bg-red-500/15 text-red-700 border-red-500/20",
    },
    coming_soon: {
        label: "Coming Soon",
        customColor: "bg-blue-500/15 text-blue-700 border-blue-500/20",
    },
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
    const config = statusConfig[status]

    return (
        <AppBadge customColor={config.customColor} variant="outline" className="font-semibold">
            {config.label}
        </AppBadge>
    )
}
