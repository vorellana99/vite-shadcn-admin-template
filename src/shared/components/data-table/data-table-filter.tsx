import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { cn } from "@/shared/lib/utils"

export interface DataTableFilterOption {
    value: string
    label: string
}

export interface DataTableFilterProps {
    value: string
    onValueChange: (value: string) => void
    placeholder: string
    options: DataTableFilterOption[]
    allOptionLabel?: string
    className?: string
}

/**
 * Standard dropdown filter for table toolbars.
 * Encapsulates the specific width (sm:w-40), background/border styles, and manages the boilerplate 
 * of rendering Select items from an options array to keep the parent code clean.
 */
export function DataTableFilter({
    value,
    onValueChange,
    placeholder,
    options,
    allOptionLabel = "All",
    className,
}: DataTableFilterProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className={cn("w-full sm:w-64 bg-background border-black/15 transition-colors hover:border-primary/60 focus:border-primary focus:ring-primary/20", className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4}>
                {allOptionLabel && (
                    <SelectItem value="_all">{allOptionLabel}</SelectItem>
                )}
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
