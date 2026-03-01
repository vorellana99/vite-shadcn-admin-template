import type { LucideIcon } from "lucide-react"
import { DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/dialog"

interface DialogFormHeaderProps {
    title: string
    description?: string
    icon: LucideIcon
}

export function DialogFormHeader({ title, description, icon: Icon }: DialogFormHeaderProps) {
    return (
        <DialogHeader className="-mt-6 -mx-6 px-6 py-4 bg-primary text-primary-foreground rounded-t-lg relative">
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-primary-foreground" />
                <DialogTitle className="text-lg font-bold text-primary-foreground">
                    {title}
                </DialogTitle>
            </div>
            {description && (
                <DialogDescription className="sr-only">
                    {description}
                </DialogDescription>
            )}
        </DialogHeader>
    )
}
