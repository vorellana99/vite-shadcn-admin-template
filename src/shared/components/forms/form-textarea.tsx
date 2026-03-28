import * as React from "react"
import { cn } from "@/shared/lib/utils"

interface FormTextareaProps extends React.ComponentProps<"textarea"> {
    minHeight?: string
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ className, minHeight = "80px", style, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                style={{ minHeight, ...style }}
                className={cn(
                    "w-full rounded-md border border-slate-300 bg-background px-3 py-2 text-sm",
                    "transition-colors hover:border-primary/60",
                    "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/20",
                    "placeholder:text-muted-foreground resize-none",
                    className
                )}
                {...props}
            />
        )
    }
)
FormTextarea.displayName = "FormTextarea"
