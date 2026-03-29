import { AppBadge } from "@/shared/components/badges/app-badge"
import type { Student } from "../student-schema"

interface StudentStatusBadgeProps {
    status: Student["status"]
}

export const statusConfig: Record<Student["status"], {
    label: string
    badgeClass: string
    triggerClass: string
    optionClass: string
}> = {
    active: {
        label: "Activo",
        badgeClass: "bg-primary/20 text-primary border-primary/20",
        triggerClass: "border-emerald-500/50 bg-emerald-500/5 text-emerald-700",
        optionClass: "text-emerald-700 focus:bg-emerald-500/8",
    },
    inactive: {
        label: "Inactivo",
        badgeClass: "bg-muted text-muted-foreground border-border",
        triggerClass: "border-slate-400/50 bg-slate-500/5 text-slate-600",
        optionClass: "text-slate-600 focus:bg-slate-500/8",
    },
    pending: {
        label: "Pendiente",
        badgeClass: "bg-amber-500/15 text-amber-700 border-amber-500/20",
        triggerClass: "border-amber-500/50 bg-amber-500/5 text-amber-700",
        optionClass: "text-amber-700 focus:bg-amber-500/8",
    },
    suspended: {
        label: "Suspendido",
        badgeClass: "bg-red-500/15 text-red-700 border-red-500/20",
        triggerClass: "border-red-500/50 bg-red-500/5 text-red-700",
        optionClass: "text-red-700 focus:bg-red-500/8",
    },
    vip: {
        label: "VIP",
        badgeClass: "bg-violet-500/15 text-violet-700 border-violet-500/20",
        triggerClass: "border-violet-500/50 bg-violet-500/5 text-violet-700",
        optionClass: "text-violet-700 focus:bg-violet-500/8",
    },
}

export function StudentStatusBadge({ status }: StudentStatusBadgeProps) {
    const config = statusConfig[status]
    return (
        <AppBadge customColor={config.badgeClass} variant="outline" className="font-semibold">
            {config.label}
        </AppBadge>
    )
}
