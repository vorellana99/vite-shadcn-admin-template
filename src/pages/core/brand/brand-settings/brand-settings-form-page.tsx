import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Building, Globe, Image as ImageIcon, Palette, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

import { formSchema, formDefaults } from "./brand-settings-schema"
import { FormPageCard } from "@/shared/components/forms/form-page-card"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormField } from "@/shared/components/forms/form-field"
import { AppInput } from "@/shared/components/inputs/app-input"
import { AppButton } from "@/shared/components/buttons/app-button"

type FormValues = z.infer<typeof formSchema>

export default function BrandSettingsPage() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
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
            icon={Building}
            title="Configuración de Marca"
            subtitle="Personaliza la identidad visual y los detalles corporativos de tu organización."
            formId="brand-settings-form"
            submitText="Guardar Cambios"
            onReset={handleReset}
        >
            <form id="brand-settings-form" onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Información Corporativa" icon={Building} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Nombre de la Marca" htmlFor="bs-brand-name" error={errors.brandName?.message} labelSize="sm">
                            <AppInput
                                id="bs-brand-name"
                                {...register("brandName")}
                                placeholder="ej. Acme Corp"
                            />
                        </FormField>
                        <FormField label="Sitio Web" htmlFor="bs-website" error={errors.website?.message} labelSize="sm">
                            <div className="flex gap-2">
                                <div className="flex items-center px-3 bg-muted rounded-md border border-slate-300 text-muted-foreground text-sm shrink-0">
                                    <Globe className="size-4 mr-1.5" />
                                    https://
                                </div>
                                <AppInput
                                    id="bs-website"
                                    {...register("website")}
                                    placeholder="acme.com"
                                    className="flex-1"
                                />
                            </div>
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Estado de la Cuenta" icon={ShieldCheck} className="flex flex-col gap-3">
                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                            <span className="text-sm font-medium">Plan</span>
                            <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Enterprise</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                            <span className="text-sm font-medium">Usuarios</span>
                            <span className="text-sm">45 / 100</span>
                        </div>
                        <div className="pt-1">
                            <AppButton type="button" variant="outline" className="w-full">
                                Ver Facturación
                            </AppButton>
                        </div>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.19s" }}>
                    <FormSection title="Apariencia" icon={Palette} className="grid grid-cols-1 gap-4">
                        <p className="text-sm text-muted-foreground italic">Editor de temas visuales próximamente...</p>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.26s" }}>
                    <FormSection title="Logos" icon={ImageIcon} className="grid grid-cols-1 gap-4">
                        <p className="text-sm text-muted-foreground italic">Gestor de archivos próximamente...</p>
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
