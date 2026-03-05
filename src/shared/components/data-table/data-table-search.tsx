import * as React from "react"
import { Input } from "@/shared/ui/input"
import { cn } from "@/shared/lib/utils"

export interface DataTableSearchProps extends React.InputHTMLAttributes<HTMLInputElement> { }

/**
 * Standard search input for table toolbars.
 * Encapsulates the specific width (sm:w-64) and standard explicit background/border styles
 * to maintain consistency across all application tables.
 */
export const DataTableSearch = React.forwardRef<HTMLInputElement, DataTableSearchProps>(
    ({ className, ...props }, ref) => {
        return (
            <Input
                ref={ref}
                className={cn("h-9 w-full sm:w-64 bg-background border-black/15", className)}
                {...props}
            />
        )
    }
)

DataTableSearch.displayName = "DataTableSearch"
