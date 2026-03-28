import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { AppButton } from "@/shared/components/buttons/app-button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card"

interface FormPageCardProps {
    icon: LucideIcon
    title: string
    subtitle: string
    formId: string
    submitText: string
    onReset: () => void
    children: React.ReactNode
}

export function FormPageCard({
    icon: Icon,
    title,
    subtitle,
    formId,
    submitText,
    onReset,
    children,
}: FormPageCardProps) {
    const navigate = useNavigate()

    return (
        <div className="flex-1 w-full h-full px-4 md:px-6 py-2 md:py-4 overflow-y-auto">
            <Card className="w-full max-w-4xl mx-auto shadow-lg shadow-primary/5 border border-slate-300 overflow-hidden pt-0 pb-0 gap-0 animate-fade-in-up">
                <CardHeader className="bg-primary/90 text-primary-foreground px-6 py-4 flex flex-row items-center gap-3">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                    <div>
                        <CardTitle className="text-xl font-bold">{title}</CardTitle>
                        <p className="text-sm text-primary-foreground/70 mt-0.5">{subtitle}</p>
                    </div>
                </CardHeader>
                <CardContent className="pt-8 bg-[radial-gradient(ellipse_at_top,hsl(215_75%_38%/0.03)_0%,transparent_60%)]">
                    {children}
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-3 pt-6 pb-6 border-t mt-8 bg-muted/20">
                    <AppButton
                        type="button"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="group min-w-[100px] gap-1.5"
                    >
                        <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Volver
                    </AppButton>
                    <div className="flex gap-3">
                        <AppButton
                            type="button"
                            variant="outline"
                            onClick={onReset}
                            className="min-w-[100px]"
                        >
                            Limpiar
                        </AppButton>
                        <AppButton
                            type="submit"
                            form={formId}
                            className="shadow-lg shadow-primary/20 min-w-[140px]"
                        >
                            {submitText}
                        </AppButton>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
