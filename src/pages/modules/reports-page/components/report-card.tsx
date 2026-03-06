import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card"
import type { ComponentType } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/shared/lib/utils"

export interface ReportCardProps {
    title: string
    description: string
    icon: LucideIcon | ComponentType<{ className?: string }>
    onClick?: () => void
    className?: string
}

export function ReportCard({ title, description, icon: Icon, onClick, className }: ReportCardProps) {
    return (
        <Card
            onClick={onClick}
            className={cn(
                "group cursor-pointer overflow-hidden transition-all hover:shadow-md hover:ring-2 hover:ring-primary/20 p-0 gap-0 border-black/40 rounded-lg flex flex-col h-full",
                className
            )}
        >
            <CardHeader className="bg-primary/40 px-4 py-2 text-foreground/70 space-y-0 flex flex-row items-center gap-3">
                <div className="rounded-md bg-secondary p-1.5 grayscale-0 group-hover:bg-primary/20 transition-colors shrink-0">
                    <Icon className="size-4 text-primary" />
                </div>
                <CardTitle className="text-sm font-bold leading-tight tracking-tight">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="bg-card px-4 py-4 text-card-foreground transition-colors group-hover:bg-primary/10 flex-1">
                <CardDescription className="text-sm leading-relaxed">
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    )
}
