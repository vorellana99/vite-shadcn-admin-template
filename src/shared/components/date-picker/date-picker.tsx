import * as React from "react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui/popover"

interface DatePickerProps {
    /** The value in string format, typically yyyy-MM-dd */
    value?: string
    /** The callback when a date is selected, returning yyyy-MM-dd format */
    onChange?: (date: string) => void
    /** Placeholder text when no date is selected */
    placeholder?: string
    /** Additional CSS classes for the trigger button */
    className?: string
    /** Disabled state */
    disabled?: boolean
}

export function DatePicker({
    value,
    onChange,
    placeholder = "Seleccionar fecha",
    className,
    disabled = false,
}: DatePickerProps) {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

    // Parse the string value into a Date object for the Calendar component
    const selectedDate = value ? parseISO(value) : undefined

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            // Format back to yyyy-MM-dd to ensure consistency
            const formattedDate = format(date, "yyyy-MM-dd")
            onChange?.(formattedDate)
        } else {
            onChange?.("")
        }
        setIsPopoverOpen(false)
    }

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal flex items-center h-9 px-3 py-1",
                        "border-slate-300 dark:border-slate-600 transition-colors",
                        !value && "text-muted-foreground",
                        className
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(selectedDate!, "PPP", { locale: es }) : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50 pointer-events-auto" align="start">
                <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={selectedDate}
                    onSelect={handleSelect}
                    locale={es}
                    startMonth={new Date(1900, 0)}
                    endMonth={new Date()}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                />
            </PopoverContent>
        </Popover>
    )
}
