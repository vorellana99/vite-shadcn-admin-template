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
                "group cursor-pointer overflow-hidden transition-all hover:shadow-md hover:ring-2 hover:ring-primary/20",
                className
            )}
        >
            <CardHeader className="bg-primary px-4 py-3 text-primary-foreground space-y-0 flex flex-row items-center gap-3">
                <div className="rounded-md bg-primary-foreground/10 p-2">
                    <Icon className="size-5" />
                </div>
                <CardTitle className="text-base font-semibold leading-none tracking-tight">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="bg-card px-4 py-4 text-card-foreground">
                <CardDescription className="text-sm leading-relaxed">
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    )
}
