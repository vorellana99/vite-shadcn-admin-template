import * as React from "react"
import { Input } from "@/shared/ui/input"
import { cn } from "@/shared/lib/utils"

export interface AppInputProps extends React.ComponentProps<typeof Input> { }

const AppInput = React.forwardRef<React.ElementRef<typeof Input>, AppInputProps>(
    ({ className, ...props }, ref) => {
        return (
            <Input
                ref={ref}
                className={cn(
                    "border-slate-300 transition-colors",
                    className
                )}
                {...props}
            />
        )
    }
)
AppInput.displayName = "AppInput"

export { AppInput }
