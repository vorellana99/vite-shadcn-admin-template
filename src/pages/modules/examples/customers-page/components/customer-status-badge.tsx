import { AppBadge } from "@/shared/components/badges/app-badge"
import type { Customer } from "../data"

interface CustomerStatusBadgeProps {
    status: Customer["status"]
}

const statusConfig: Record<Customer["status"], { label: string; customColor: string }> = {
    active: {
        label: "Active",
        customColor: "bg-primary/20 text-primary border-primary/20",
    },
    inactive: {
        label: "Inactive",
        customColor: "bg-muted text-muted-foreground border-border",
    },
    pending: {
        label: "Pending",
        customColor: "bg-amber-500/15 text-amber-700 border-amber-500/20",
    },
    suspended: {
        label: "Suspended",
        customColor: "bg-red-500/15 text-red-700 border-red-500/20",
    },
    vip: {
        label: "VIP",
        customColor: "bg-violet-500/15 text-violet-700 border-violet-500/20",
    },
}

export function CustomerStatusBadge({ status }: CustomerStatusBadgeProps) {
    const config = statusConfig[status]

    return (
        <AppBadge customColor={config.customColor} variant="outline" className="font-semibold">
            {config.label}
        </AppBadge>
    )
}
