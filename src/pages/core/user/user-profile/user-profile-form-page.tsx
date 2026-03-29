import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { BadgeCheck, Image as ImageIcon, Mail, User } from "lucide-react"
import { toast } from "sonner"

import { formSchema, formDefaults } from "./user-profile-schema"
import { FormPageCard } from "@/shared/components/forms/form-page-card"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormField } from "@/shared/components/forms/form-field"
import { AppInput } from "@/shared/components/inputs/app-input"

type FormValues = z.infer<typeof formSchema>

export default function UserProfileFormPage() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaults,
    })

    function onSubmit(_data: FormValues) {
        toast.success("Perfil actualizado.")
    }

    function onInvalid() {
        toast.error("Por favor, corrija los errores antes de guardar.")
    }

    function handleReset() {
        reset(formDefaults)
    }

    return (
        <FormPageCard
            icon={BadgeCheck}
            title="Perfil de Usuario"
            subtitle="Gestiona tu información personal y preferencias."
            formId="user-profile-form"
            submitText="Guardar Cambios"
            onReset={handleReset}
        >
            <form id="user-profile-form" onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Información Personal" icon={User} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Nombre Completo" htmlFor="up-name" error={errors.name?.message} labelSize="sm">
                            <AppInput
                                id="up-name"
                                {...register("name")}
                                placeholder="ej. Juan García"
                            />
                        </FormField>
                        <FormField label="Correo Electrónico" htmlFor="up-email" error={errors.email?.message} labelSize="sm">
                            <AppInput
                                id="up-email"
                                type="email"
                                {...register("email")}
                                placeholder="juan@correo.com"
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Foto de Perfil" icon={ImageIcon} className="grid grid-cols-1 gap-4">
                        <p className="text-sm text-muted-foreground italic">
                            <Mail className="inline size-3.5 mr-1 opacity-60" />
                            Gestor de avatar próximamente...
                        </p>
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
