import * as React from "react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"

/**
 * Project-level wrapper around the base Shadcn UI Button.
 *
 * Applies project-specific visual enhancements on top of the native
 * Shadcn variants without modifying `shared/ui/button.tsx`.
 *
 * Accepts the same props and variants as the base Button:
 *   - "default"     → Primary CTA (Add, Save, Confirm). Adds shadow-sm.
 *   - "outline"     → Secondary actions (Cancel, Back, Close).
 *   - "destructive" → Dangerous actions (Delete, Remove, Revoke).
 *   - "secondary"   → Subtle solid background.
 *   - "ghost"       → Invisible until hover. Icons, menus.
 *   - "link"        → Looks like a hyperlink.
 */

type AppButtonProps = React.ComponentProps<typeof Button>

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
    ({ className, variant = "default", ...props }, ref) => {
        return (
            <Button
                ref={ref}
                variant={variant}
                className={cn(
                    // Project-level enhancements per variant
                    variant === "default" && "shadow-sm",
                    className,
                )}
                {...props}
            />
        )
    }
)
AppButton.displayName = "AppButton"

export { AppButton }
