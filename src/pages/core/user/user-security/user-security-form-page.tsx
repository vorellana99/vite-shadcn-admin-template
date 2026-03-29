import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { KeyRound, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

import { formSchema, formDefaults } from "./user-security-schema"
import { FormPageCard } from "@/shared/components/forms/form-page-card"
import { FormSection } from "@/shared/components/forms/form-section"

type FormValues = z.infer<typeof formSchema>

export default function UserSecurityFormPage() {
    const { handleSubmit, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaults,
    })

    function onSubmit(_data: FormValues) {
        toast.success("Configuración de seguridad guardada.")
    }

    function onInvalid() {
        toast.error("Por favor, corrija los errores antes de guardar.")
    }

    function handleReset() {
        reset(formDefaults)
    }

    return (
        <FormPageCard
            icon={ShieldCheck}
            title="Seguridad"
            subtitle="Gestiona tu contraseña y métodos de autenticación."
            formId="user-security-form"
            submitText="Guardar Cambios"
            onReset={handleReset}
        >
            <form id="user-security-form" onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Credenciales" icon={KeyRound} className="grid grid-cols-1 gap-4">
                        <p className="text-sm text-muted-foreground italic">Cambio de contraseña próximamente...</p>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Autenticación de Dos Factores" icon={ShieldCheck} className="grid grid-cols-1 gap-4">
                        <p className="text-sm text-muted-foreground italic">Configuración de 2FA próximamente...</p>
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
