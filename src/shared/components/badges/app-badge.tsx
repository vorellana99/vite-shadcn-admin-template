import * as React from "react"
import { Badge } from "@/shared/ui/badge"
import { cn } from "@/shared/lib/utils"

/**
 * Project-level wrapper for the Shadcn Badge component.
 * Allows for easy customization of styles while maintaining consistency.
 */
interface AppBadgeProps extends React.ComponentProps<typeof Badge> {
    /**
     * Optional custom background color class (e.g., 'bg-primary/40')
     */
    customColor?: string
}

function AppBadge({ className, customColor, ...props }: AppBadgeProps) {
    return (
        <Badge
            className={cn(
                customColor,
                className
            )}
            {...props}
        />
    )
}

export { AppBadge }
