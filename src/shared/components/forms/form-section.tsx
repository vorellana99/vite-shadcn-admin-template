import type { LucideIcon } from "lucide-react"

interface FormSectionProps {
    title: string
    icon: LucideIcon
    children: React.ReactNode
    className?: string
}

export function FormSection({ title, icon: Icon, children, className }: FormSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <Icon className="w-4 h-4" />
                {title}
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}
