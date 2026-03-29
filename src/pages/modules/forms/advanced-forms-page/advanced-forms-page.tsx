import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { AlertCircle, ImageIcon, MapPin, Package, Ruler } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { formSchema, formDefaults } from "./advanced-forms-schema"
import { AppButton } from "@/shared/components/buttons/app-button"
import { AppInput } from "@/shared/components/inputs/app-input"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import { FormField } from "@/shared/components/forms/form-field"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormPageCard } from "@/shared/components/forms/form-page-card"
import { FormSelect } from "@/shared/components/forms/form-select"
import { FormTextarea } from "@/shared/components/forms/form-textarea"
import { ImageUploadZone } from "@/shared/components/forms/image-upload-zone"
import { SelectItem } from "@/shared/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group"

type FormValues = z.infer<typeof formSchema>

function generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = "PKG-"
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

export default function AdvancedFormsPage() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaults,
    })

    const largo = watch("largo")
    const ancho = watch("ancho")
    const alto = watch("alto")

    const volumen = (() => {
        const l = parseFloat(largo)
        const a = parseFloat(ancho)
        const h = parseFloat(alto)
        if (!isNaN(l) && !isNaN(a) && !isNaN(h) && l > 0 && a > 0 && h > 0) {
            return (l * a * h).toLocaleString("es-PE")
        }
        return ""
    })()

    function onSubmit(data: FormValues) {
        toast.success(`Paquete "${data.codigoPaquete}" registrado correctamente.`)
        reset(formDefaults)
        setImagePreview(null)
    }

    function onInvalid() {
        toast.error("Por favor, corrija los errores antes de guardar.")
    }

    function handleReset() {
        reset(formDefaults)
        setImagePreview(null)
    }

    return (
        <FormPageCard
            icon={Package}
            title="Registro de Paquete"
            subtitle="Complete todos los campos para registrar un nuevo paquete."
            formId="package-form"
            submitText="Registrar Paquete"
            onReset={handleReset}
        >
            <form id="package-form" onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Identificación del Paquete" icon={Package} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Código de Paquete" htmlFor="pf-codigo" error={errors.codigoPaquete?.message} labelSize="sm">
                            <div className="flex gap-2">
                                <AppInput
                                    id="pf-codigo"
                                    {...register("codigoPaquete")}
                                    placeholder="ej. PKG-A1B2C3"
                                    className="flex-1"
                                />
                                <AppButton
                                    type="button"
                                    variant="outline"
                                    className="shrink-0 text-xs px-3 border-slate-300"
                                    onClick={() => setValue("codigoPaquete", generateCode())}
                                >
                                    Generar
                                </AppButton>
                            </div>
                        </FormField>
                        <FormField label="Tipo de Paquete" htmlFor="pf-tipo" error={errors.tipoPaquete?.message} labelSize="sm">
                            <Controller
                                control={control}
                                name="tipoPaquete"
                                render={({ field }) => (
                                    <FormSelect id="pf-tipo" value={field.value} onValueChange={field.onChange} placeholder="Seleccionar tipo">
                                        <SelectItem value="caja">Caja</SelectItem>
                                        <SelectItem value="sobre">Sobre</SelectItem>
                                        <SelectItem value="palet">Palet</SelectItem>
                                        <SelectItem value="tubo">Tubo</SelectItem>
                                        <SelectItem value="bolsa">Bolsa</SelectItem>
                                    </FormSelect>
                                )}
                            />
                        </FormField>
                        <FormField label="Descripción" htmlFor="pf-descripcion" error={errors.descripcion?.message} labelSize="sm" className="md:col-span-2">
                            <FormTextarea
                                id="pf-descripcion"
                                {...register("descripcion")}
                                placeholder="Describa brevemente el contenido del paquete..."
                            />
                        </FormField>
                        <FormField label="Categoría" htmlFor="pf-categoria" error={errors.categoria?.message} labelSize="sm">
                            <Controller
                                control={control}
                                name="categoria"
                                render={({ field }) => (
                                    <FormSelect id="pf-categoria" value={field.value} onValueChange={field.onChange} placeholder="Seleccionar categoría">
                                        <SelectItem value="electronico">Electrónico</SelectItem>
                                        <SelectItem value="fragil">Frágil</SelectItem>
                                        <SelectItem value="alimentos">Alimentos</SelectItem>
                                        <SelectItem value="documentos">Documentos</SelectItem>
                                        <SelectItem value="general">General</SelectItem>
                                    </FormSelect>
                                )}
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Dimensiones y Peso" icon={Ruler} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Peso (kg)" htmlFor="pf-peso" error={errors.peso?.message} labelSize="sm">
                            <AppInput id="pf-peso" type="number" min="0" step="0.01" {...register("peso")} placeholder="ej. 2.5" />
                        </FormField>
                        <div className="md:col-span-2 grid grid-cols-3 gap-x-4 gap-y-4">
                            <FormField label="Largo (cm)" htmlFor="pf-largo" error={errors.largo?.message} labelSize="sm">
                                <AppInput id="pf-largo" type="number" min="0" step="0.1" {...register("largo")} placeholder="ej. 30" />
                            </FormField>
                            <FormField label="Ancho (cm)" htmlFor="pf-ancho" error={errors.ancho?.message} labelSize="sm">
                                <AppInput id="pf-ancho" type="number" min="0" step="0.1" {...register("ancho")} placeholder="ej. 20" />
                            </FormField>
                            <FormField label="Alto (cm)" htmlFor="pf-alto" error={errors.alto?.message} labelSize="sm">
                                <AppInput id="pf-alto" type="number" min="0" step="0.1" {...register("alto")} placeholder="ej. 15" />
                            </FormField>
                        </div>
                        <FormField label="Volumen (cm³)" htmlFor="pf-volumen" labelSize="sm" className="md:col-span-2">
                            <div className="relative">
                                <AppInput
                                    id="pf-volumen"
                                    value={volumen}
                                    readOnly
                                    placeholder="Se calcula automáticamente (L × A × H)"
                                    className="bg-muted/40 cursor-default text-muted-foreground"
                                />
                                {volumen && (
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">
                                        cm³
                                    </span>
                                )}
                            </div>
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.19s" }}>
                    <FormSection title="Destino y Responsable" icon={MapPin} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Ciudad de Destino" htmlFor="pf-ciudad" error={errors.ciudadDestino?.message} labelSize="sm">
                            <AppInput id="pf-ciudad" {...register("ciudadDestino")} placeholder="ej. Lima" />
                        </FormField>
                        <FormField label="Responsable" htmlFor="pf-responsable" error={errors.responsable?.message} labelSize="sm">
                            <AppInput id="pf-responsable" {...register("responsable")} placeholder="ej. Juan Pérez" />
                        </FormField>
                        <FormField label="Dirección Completa" htmlFor="pf-direccion" error={errors.direccionCompleta?.message} labelSize="sm">
                            <AppInput id="pf-direccion" {...register("direccionCompleta")} placeholder="ej. Av. Los Álamos 123, Miraflores" />
                        </FormField>
                        <FormField label="Teléfono de Contacto" htmlFor="pf-telefono" error={errors.telefonoContacto?.message} labelSize="sm">
                            <AppInput id="pf-telefono" type="tel" {...register("telefonoContacto")} placeholder="+51 999 000 000" />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.26s" }}>
                    <FormSection title="Estado y Observaciones" icon={AlertCircle} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Prioridad" htmlFor="pf-prioridad" error={errors.prioridad?.message} labelSize="sm" className="md:col-span-2">
                            <Controller
                                control={control}
                                name="prioridad"
                                render={({ field }) => (
                                    <ToggleGroup
                                        type="single"
                                        value={field.value}
                                        onValueChange={(v) => { if (v) field.onChange(v) }}
                                        variant="outline"
                                        className="w-full justify-start"
                                    >
                                        <ToggleGroupItem value="normal" className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary">
                                            Normal
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="urgente" className="flex-1 data-[state=on]:bg-destructive data-[state=on]:text-white data-[state=on]:border-destructive">
                                            Urgente
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="fragil" className="flex-1 data-[state=on]:bg-amber-500 data-[state=on]:text-white data-[state=on]:border-amber-500">
                                            Frágil
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                )}
                            />
                        </FormField>
                        <FormField label="Fecha de Despacho" htmlFor="pf-fecha" error={errors.fechaDespacho?.message} labelSize="sm">
                            <Controller
                                control={control}
                                name="fechaDespacho"
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        placeholder="Seleccionar fecha"
                                        className="w-full font-normal hover:border-primary/60 focus-visible:border-primary focus-visible:ring-primary/20"
                                    />
                                )}
                            />
                        </FormField>
                        <FormField label="Observaciones" htmlFor="pf-observaciones" labelSize="sm" className="md:col-span-2">
                            <FormTextarea
                                id="pf-observaciones"
                                {...register("observaciones")}
                                placeholder="Instrucciones especiales, advertencias de manejo, etc."
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.33s" }}>
                    <FormSection title="Imagen del Paquete" icon={ImageIcon} className="grid grid-cols-1 gap-4">
                        <ImageUploadZone
                            preview={imagePreview}
                            onFileSelect={(file) => setImagePreview(URL.createObjectURL(file))}
                            onClear={() => setImagePreview(null)}
                            uploadLabel="Haz clic para subir una imagen"
                            uploadHint="PNG, JPG, WEBP — máx. 10 MB"
                            previewAlt="Vista previa del paquete"
                        />
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
