import { Label } from "@/shared/ui/label"
import { cn } from "@/shared/lib/utils"

interface FormFieldProps {
    label: string
    htmlFor: string
    error?: string
    children: React.ReactNode
    className?: string
    labelSize?: "xs" | "sm" | "base"
}

const labelSizeClasses: Record<NonNullable<FormFieldProps["labelSize"]>, string> = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
}

const errorSizeClasses: Record<NonNullable<FormFieldProps["labelSize"]>, string> = {
    xs: "text-[11px]", // Un poco más legible que 10px, ajustado a XS
    sm: "text-xs",     // Tamaño estándar de error en formularios (12px)
    base: "text-sm",   // Escala proporcional para el tamaño base (14px)
}

export function FormField({ label, htmlFor, error, children, className, labelSize = "sm" }: FormFieldProps) {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <Label htmlFor={htmlFor} className={cn(labelSizeClasses[labelSize], "font-medium")}>
                {label}
            </Label>
            {children}
            {error && (
                <p className={cn("text-destructive font-medium", errorSizeClasses[labelSize])}>
                    {error}
                </p>
            )}
        </div>
    )
}
