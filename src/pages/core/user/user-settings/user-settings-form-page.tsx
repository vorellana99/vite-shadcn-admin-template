import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Bell, Globe, Settings2 } from "lucide-react"
import { toast } from "sonner"

import { formSchema, formDefaults } from "./user-settings-schema"
import { FormPageCard } from "@/shared/components/forms/form-page-card"
import { FormSection } from "@/shared/components/forms/form-section"

type FormValues = z.infer<typeof formSchema>

export default function UserSettingsFormPage() {
    const { handleSubmit, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaults,
    })

    function onSubmit(_data: FormValues) {
        toast.success("Configuración guardada.")
    }

    function onInvalid() {
        toast.error("Por favor, corrija los errores antes de guardar.")
    }

    function handleReset() {
        reset(formDefaults)
    }

    return (
        <FormPageCard
            icon={Settings2}
            title="Configuración de Cuenta"
            subtitle="Gestiona tus preferencias de idioma, zona horaria y notificaciones."
            formId="user-settings-form"
            submitText="Guardar Cambios"
            onReset={handleReset}
        >
            <form id="user-settings-form" onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Idioma y Región" icon={Globe} className="grid grid-cols-1 gap-4">
                        <p className="text-sm text-muted-foreground italic">Configuración de idioma y zona horaria próximamente...</p>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Notificaciones" icon={Bell} className="grid grid-cols-1 gap-4">
                        <p className="text-sm text-muted-foreground italic">Preferencias de notificaciones próximamente...</p>
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
