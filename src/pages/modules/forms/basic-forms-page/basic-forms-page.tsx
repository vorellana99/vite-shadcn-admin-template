import { useState } from "react"
import { Briefcase, MapPin, UserRound } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import { AppInput } from "@/shared/components/inputs/app-input"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import { FormField } from "@/shared/components/forms/form-field"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormPageCard } from "@/shared/components/forms/form-page-card"
import { FormSelect } from "@/shared/components/forms/form-select"
import { SelectItem } from "@/shared/ui/select"

const formSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    apellido: z.string().min(1, "El apellido es requerido"),
    email: z.string().min(1, "El email es requerido").email("Email no válido"),
    telefono: z.string().min(6, "Teléfono no válido"),
    cargo: z.string().min(1, "El cargo es requerido"),
    departamento: z.string().min(1, "Seleccione un departamento"),
    fechaIngreso: z.string().min(1, "La fecha de ingreso es requerida"),
    tipoContrato: z.string().min(1, "Seleccione un tipo de contrato"),
    salario: z.string().min(1, "El salario es requerido"),
    direccion: z.string().min(1, "La dirección es requerida"),
    referencia: z.string().optional(),
})

type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>

const INITIAL_STATE = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    cargo: "",
    departamento: "",
    fechaIngreso: "",
    tipoContrato: "",
    salario: "",
    direccion: "",
    referencia: "",
}

export default function BasicFormsPage() {
    const [fields, setFields] = useState(INITIAL_STATE)
    const [errors, setErrors] = useState<FormErrors>({})

    function set(key: keyof typeof INITIAL_STATE) {
        return (value: string) => setFields((prev) => ({ ...prev, [key]: value }))
    }

    function handleReset() {
        setFields(INITIAL_STATE)
        setErrors({})
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
        toast.success(`Empleado "${result.data.nombre} ${result.data.apellido}" registrado correctamente.`)
        handleReset()
    }

    return (
        <FormPageCard
            icon={UserRound}
            title="Registro de Empleado"
            subtitle="Complete todos los campos para registrar un nuevo empleado."
            formId="employee-form"
            submitText="Registrar Empleado"
            onReset={handleReset}
        >
            <form id="employee-form" onSubmit={handleSubmit} className="flex flex-col gap-8">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Información Personal" icon={UserRound} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Nombre" htmlFor="ef-nombre" error={errors.nombre} labelSize="sm">
                            <AppInput
                                id="ef-nombre"
                                value={fields.nombre}
                                onChange={(e) => set("nombre")(e.target.value)}
                                placeholder="ej. Juan"
                            />
                        </FormField>
                        <FormField label="Apellido" htmlFor="ef-apellido" error={errors.apellido} labelSize="sm">
                            <AppInput
                                id="ef-apellido"
                                value={fields.apellido}
                                onChange={(e) => set("apellido")(e.target.value)}
                                placeholder="ej. Pérez"
                            />
                        </FormField>
                        <FormField label="Correo Electrónico" htmlFor="ef-email" error={errors.email} labelSize="sm">
                            <AppInput
                                id="ef-email"
                                type="email"
                                value={fields.email}
                                onChange={(e) => set("email")(e.target.value)}
                                placeholder="juan.perez@empresa.com"
                            />
                        </FormField>
                        <FormField label="Teléfono" htmlFor="ef-telefono" error={errors.telefono} labelSize="sm">
                            <AppInput
                                id="ef-telefono"
                                type="tel"
                                value={fields.telefono}
                                onChange={(e) => set("telefono")(e.target.value)}
                                placeholder="+51 999 000 000"
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Datos Laborales" icon={Briefcase} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Cargo" htmlFor="ef-cargo" error={errors.cargo} labelSize="sm">
                            <AppInput
                                id="ef-cargo"
                                value={fields.cargo}
                                onChange={(e) => set("cargo")(e.target.value)}
                                placeholder="ej. Desarrollador Frontend"
                            />
                        </FormField>
                        <FormField label="Departamento" htmlFor="ef-departamento" error={errors.departamento} labelSize="sm">
                            <FormSelect
                                id="ef-departamento"
                                value={fields.departamento}
                                onValueChange={set("departamento")}
                                placeholder="Seleccionar departamento"
                            >
                                <SelectItem value="tecnologia">Tecnología</SelectItem>
                                <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                                <SelectItem value="finanzas">Finanzas</SelectItem>
                                <SelectItem value="ventas">Ventas</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="operaciones">Operaciones</SelectItem>
                            </FormSelect>
                        </FormField>
                        <FormField label="Fecha de Ingreso" htmlFor="ef-fecha" error={errors.fechaIngreso} labelSize="sm">
                            <DatePicker
                                value={fields.fechaIngreso}
                                onChange={set("fechaIngreso")}
                                placeholder="Seleccionar fecha"
                                className="w-full font-normal hover:border-primary/60 focus-visible:border-primary focus-visible:ring-primary/20"
                            />
                        </FormField>
                        <FormField label="Tipo de Contrato" htmlFor="ef-contrato" error={errors.tipoContrato} labelSize="sm">
                            <FormSelect
                                id="ef-contrato"
                                value={fields.tipoContrato}
                                onValueChange={set("tipoContrato")}
                                placeholder="Seleccionar contrato"
                            >
                                <SelectItem value="indefinido">Indefinido</SelectItem>
                                <SelectItem value="plazo_fijo">Plazo Fijo</SelectItem>
                                <SelectItem value="honorarios">Honorarios</SelectItem>
                                <SelectItem value="practicas">Prácticas</SelectItem>
                            </FormSelect>
                        </FormField>
                        <FormField label="Salario Mensual (S/.)" htmlFor="ef-salario" error={errors.salario} labelSize="sm" className="md:col-span-2">
                            <AppInput
                                id="ef-salario"
                                type="number"
                                min="0"
                                value={fields.salario}
                                onChange={(e) => set("salario")(e.target.value)}
                                placeholder="ej. 3500"
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.19s" }}>
                    <FormSection title="Ubicación" icon={MapPin} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Dirección" htmlFor="ef-direccion" error={errors.direccion} labelSize="sm">
                            <AppInput
                                id="ef-direccion"
                                value={fields.direccion}
                                onChange={(e) => set("direccion")(e.target.value)}
                                placeholder="ej. Av. Los Álamos 123, Lima"
                            />
                        </FormField>
                        <FormField label="Referencia" htmlFor="ef-referencia" labelSize="sm">
                            <AppInput
                                id="ef-referencia"
                                value={fields.referencia}
                                onChange={(e) => set("referencia")(e.target.value)}
                                placeholder="ej. Frente al parque, edificio azul"
                            />
                        </FormField>
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
