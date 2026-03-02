import type { ReactNode } from "react"
import { cn } from "@/shared/lib/utils"

interface PageContentProps {
    children: ReactNode
    className?: string
}

/**
 * Contenedor principal para el contenido de las páginas.
 * Aplica el fondo de marca (canvas) y asegura que el espaciado sea consistente.
 */
export function PageContent({ children, className }: PageContentProps) {
    return (
        <div className={cn(
            "bg-primary/5 flex flex-1 flex-col p-2 pt-6",
            "transition-colors duration-300",
            className
        )}>
            <div className="@container/main flex flex-1 flex-col gap-2">
                {children}
            </div>
        </div>
    )
}
