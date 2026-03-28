import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"

interface FormSelectProps {
    id?: string
    value: string
    onValueChange: (value: string) => void
    placeholder?: string
    children: React.ReactNode
}

export function FormSelect({ id, value, onValueChange, placeholder, children }: FormSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger
                id={id}
                className="w-full h-9 border-slate-300 hover:border-primary/60 focus:border-primary focus:ring-primary/20"
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {children}
            </SelectContent>
        </Select>
    )
}
