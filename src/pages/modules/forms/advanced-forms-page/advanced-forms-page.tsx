import { useRef, useState } from "react"
import { AlertCircle, ImageIcon, MapPin, Package, Ruler } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import { AppButton } from "@/shared/components/buttons/app-button"
import { AppInput } from "@/shared/components/inputs/app-input"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import { FormField } from "@/shared/components/forms/form-field"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormPageCard } from "@/shared/components/forms/form-page-card"
import { FormSelect } from "@/shared/components/forms/form-select"
import { FormTextarea } from "@/shared/components/forms/form-textarea"
import { SelectItem } from "@/shared/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group"

const formSchema = z.object({
    codigoPaquete: z.string().min(1, "El código es requerido"),
    descripcion: z.string().min(1, "La descripción es requerida"),
    tipoPaquete: z.string().min(1, "Seleccione un tipo"),
    categoria: z.string().min(1, "Seleccione una categoría"),
    peso: z.string().min(1, "El peso es requerido"),
    largo: z.string().min(1, "El largo es requerido"),
    ancho: z.string().min(1, "El ancho es requerido"),
    alto: z.string().min(1, "El alto es requerido"),
    ciudadDestino: z.string().min(1, "La ciudad de destino es requerida"),
    direccionCompleta: z.string().min(1, "La dirección es requerida"),
    responsable: z.string().min(1, "El responsable es requerido"),
    telefonoContacto: z.string().min(6, "Teléfono no válido"),
    prioridad: z.string().min(1, "Seleccione una prioridad"),
    fechaDespacho: z.string().min(1, "La fecha de despacho es requerida"),
    observaciones: z.string().optional(),
})

type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>

const INITIAL_STATE = {
    codigoPaquete: "",
    descripcion: "",
    tipoPaquete: "",
    categoria: "",
    peso: "",
    largo: "",
    ancho: "",
    alto: "",
    ciudadDestino: "",
    direccionCompleta: "",
    responsable: "",
    telefonoContacto: "",
    prioridad: "",
    fechaDespacho: "",
    observaciones: "",
}

function generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = "PKG-"
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

export default function AdvancedFormsPage() {
    const [fields, setFields] = useState(INITIAL_STATE)
    const [errors, setErrors] = useState<FormErrors>({})
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    function set(key: keyof typeof INITIAL_STATE) {
        return (value: string) => {
            setFields((prev) => ({ ...prev, [key]: value }))
            if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
        }
    }

    const volumen = (() => {
        const l = parseFloat(fields.largo)
        const a = parseFloat(fields.ancho)
        const h = parseFloat(fields.alto)
        if (!isNaN(l) && !isNaN(a) && !isNaN(h) && l > 0 && a > 0 && h > 0) {
            return (l * a * h).toLocaleString("es-PE")
        }
        return ""
    })()

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
        }
    }

    function handleImageClear() {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    function handleReset() {
        setFields(INITIAL_STATE)
        setErrors({})
        handleImageClear()
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const result = formSchema.safeParse(fields)
        if (!result.success) {
            const fieldErrors: FormErrors = {}
            for (const issue of result.error.issues) {
                const key = issue.path[0] as keyof FormErrors
                if (!fieldErrors[key]) fieldErrors[key] = issue.message
            }
            setErrors(fieldErrors)
            toast.error("Por favor, corrija los errores antes de guardar.")
            return
        }
        toast.success(`Paquete "${result.data.codigoPaquete}" registrado correctamente.`)
        handleReset()
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
            <form id="package-form" onSubmit={handleSubmit} className="flex flex-col gap-8">

                {/* Sección 1 — Identificación */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Identificación del Paquete" icon={Package} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Código de Paquete" htmlFor="pf-codigo" error={errors.codigoPaquete} labelSize="sm">
                            <div className="flex gap-2">
                                <AppInput
                                    id="pf-codigo"
                                    value={fields.codigoPaquete}
                                    onChange={(e) => set("codigoPaquete")(e.target.value)}
                                    placeholder="ej. PKG-A1B2C3"
                                    className="flex-1"
                                />
                                <AppButton
                                    type="button"
                                    variant="outline"
                                    className="shrink-0 text-xs px-3 border-slate-300"
                                    onClick={() => set("codigoPaquete")(generateCode())}
                                >
                                    Generar
                                </AppButton>
                            </div>
                        </FormField>
                        <FormField label="Tipo de Paquete" htmlFor="pf-tipo" error={errors.tipoPaquete} labelSize="sm">
                            <FormSelect
                                id="pf-tipo"
                                value={fields.tipoPaquete}
                                onValueChange={set("tipoPaquete")}
                                placeholder="Seleccionar tipo"
                            >
                                <SelectItem value="caja">Caja</SelectItem>
                                <SelectItem value="sobre">Sobre</SelectItem>
                                <SelectItem value="palet">Palet</SelectItem>
                                <SelectItem value="tubo">Tubo</SelectItem>
                                <SelectItem value="bolsa">Bolsa</SelectItem>
                            </FormSelect>
                        </FormField>
                        <FormField label="Descripción" htmlFor="pf-descripcion" error={errors.descripcion} labelSize="sm" className="md:col-span-2">
                            <FormTextarea
                                id="pf-descripcion"
                                value={fields.descripcion}
                                onChange={(e) => set("descripcion")(e.target.value)}
                                placeholder="Describa brevemente el contenido del paquete..."
                            />
                        </FormField>
                        <FormField label="Categoría" htmlFor="pf-categoria" error={errors.categoria} labelSize="sm">
                            <FormSelect
                                id="pf-categoria"
                                value={fields.categoria}
                                onValueChange={set("categoria")}
                                placeholder="Seleccionar categoría"
                            >
                                <SelectItem value="electronico">Electrónico</SelectItem>
                                <SelectItem value="fragil">Frágil</SelectItem>
                                <SelectItem value="alimentos">Alimentos</SelectItem>
                                <SelectItem value="documentos">Documentos</SelectItem>
                                <SelectItem value="general">General</SelectItem>
                            </FormSelect>
                        </FormField>
                    </FormSection>
                </div>

                {/* Sección 2 — Dimensiones y Peso */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Dimensiones y Peso" icon={Ruler} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Peso (kg)" htmlFor="pf-peso" error={errors.peso} labelSize="sm">
                            <AppInput
                                id="pf-peso"
                                type="number"
                                min="0"
                                step="0.01"
                                value={fields.peso}
                                onChange={(e) => set("peso")(e.target.value)}
                                placeholder="ej. 2.5"
                            />
                        </FormField>
                        <div className="md:col-span-2 grid grid-cols-3 gap-x-4 gap-y-4">
                            <FormField label="Largo (cm)" htmlFor="pf-largo" error={errors.largo} labelSize="sm">
                                <AppInput
                                    id="pf-largo"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={fields.largo}
                                    onChange={(e) => set("largo")(e.target.value)}
                                    placeholder="ej. 30"
                                />
                            </FormField>
                            <FormField label="Ancho (cm)" htmlFor="pf-ancho" error={errors.ancho} labelSize="sm">
                                <AppInput
                                    id="pf-ancho"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={fields.ancho}
                                    onChange={(e) => set("ancho")(e.target.value)}
                                    placeholder="ej. 20"
                                />
                            </FormField>
                            <FormField label="Alto (cm)" htmlFor="pf-alto" error={errors.alto} labelSize="sm">
                                <AppInput
                                    id="pf-alto"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={fields.alto}
                                    onChange={(e) => set("alto")(e.target.value)}
                                    placeholder="ej. 15"
                                />
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

                {/* Sección 3 — Destino y Responsable */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.19s" }}>
                    <FormSection title="Destino y Responsable" icon={MapPin} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Ciudad de Destino" htmlFor="pf-ciudad" error={errors.ciudadDestino} labelSize="sm">
                            <AppInput
                                id="pf-ciudad"
                                value={fields.ciudadDestino}
                                onChange={(e) => set("ciudadDestino")(e.target.value)}
                                placeholder="ej. Lima"
                            />
                        </FormField>
                        <FormField label="Responsable" htmlFor="pf-responsable" error={errors.responsable} labelSize="sm">
                            <AppInput
                                id="pf-responsable"
                                value={fields.responsable}
                                onChange={(e) => set("responsable")(e.target.value)}
                                placeholder="ej. Juan Pérez"
                            />
                        </FormField>
                        <FormField label="Dirección Completa" htmlFor="pf-direccion" error={errors.direccionCompleta} labelSize="sm">
                            <AppInput
                                id="pf-direccion"
                                value={fields.direccionCompleta}
                                onChange={(e) => set("direccionCompleta")(e.target.value)}
                                placeholder="ej. Av. Los Álamos 123, Miraflores"
                            />
                        </FormField>
                        <FormField label="Teléfono de Contacto" htmlFor="pf-telefono" error={errors.telefonoContacto} labelSize="sm">
                            <AppInput
                                id="pf-telefono"
                                type="tel"
                                value={fields.telefonoContacto}
                                onChange={(e) => set("telefonoContacto")(e.target.value)}
                                placeholder="+51 999 000 000"
                            />
                        </FormField>
                    </FormSection>
                </div>

                {/* Sección 4 — Estado y Observaciones */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.26s" }}>
                    <FormSection title="Estado y Observaciones" icon={AlertCircle} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Prioridad" htmlFor="pf-prioridad" error={errors.prioridad} labelSize="sm" className="md:col-span-2">
                            <ToggleGroup
                                type="single"
                                value={fields.prioridad}
                                onValueChange={(v) => { if (v) set("prioridad")(v) }}
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
                        </FormField>
                        <FormField label="Fecha de Despacho" htmlFor="pf-fecha" error={errors.fechaDespacho} labelSize="sm">
                            <DatePicker
                                value={fields.fechaDespacho}
                                onChange={set("fechaDespacho")}
                                placeholder="Seleccionar fecha"
                                className="w-full font-normal hover:border-primary/60 focus-visible:border-primary focus-visible:ring-primary/20"
                            />
                        </FormField>
                        <FormField label="Observaciones" htmlFor="pf-observaciones" labelSize="sm" className="md:col-span-2">
                            <FormTextarea
                                id="pf-observaciones"
                                value={fields.observaciones}
                                onChange={(e) => set("observaciones")(e.target.value)}
                                placeholder="Instrucciones especiales, advertencias de manejo, etc."
                            />
                        </FormField>
                    </FormSection>
                </div>

                {/* Sección 5 — Imagen del Paquete */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.33s" }}>
                    <FormSection title="Imagen del Paquete" icon={ImageIcon} className="grid grid-cols-1 gap-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        {imagePreview ? (
                            <div className="relative group rounded-lg overflow-hidden border border-slate-300 bg-muted/20">
                                <img
                                    src={imagePreview}
                                    alt="Vista previa del paquete"
                                    className="w-full max-h-64 object-contain"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <AppButton
                                        type="button"
                                        variant="outline"
                                        className="bg-white/90 hover:bg-white text-sm"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Cambiar
                                    </AppButton>
                                    <AppButton
                                        type="button"
                                        variant="outline"
                                        className="bg-white/90 hover:bg-white text-sm text-destructive border-destructive/40"
                                        onClick={handleImageClear}
                                    >
                                        Quitar
                                    </AppButton>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-lg border-2 border-dashed border-slate-300 hover:border-primary/60 hover:bg-primary/[0.02] transition-colors cursor-pointer text-muted-foreground"
                            >
                                <ImageIcon className="w-8 h-8 opacity-50" />
                                <div className="text-center">
                                    <p className="text-sm font-medium">Haz clic para subir una imagen</p>
                                    <p className="text-xs mt-0.5 opacity-70">PNG, JPG, WEBP — máx. 10 MB</p>
                                </div>
                            </button>
                        )}
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
