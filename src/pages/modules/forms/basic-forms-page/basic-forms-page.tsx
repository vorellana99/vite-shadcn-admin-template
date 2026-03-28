import { useState } from "react"
import { ArrowLeft, Briefcase, MapPin, UserRound } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

import { AppButton } from "@/shared/components/buttons/app-button"
import { AppInput } from "@/shared/components/inputs/app-input"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import { FormField } from "@/shared/components/forms/form-field"
import { FormSection } from "@/shared/components/forms/form-section"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card"

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
    const navigate = useNavigate()
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
        <div className="flex-1 w-full h-full px-4 md:px-6 py-2 md:py-4 overflow-y-auto">
            <Card className="w-full max-w-4xl mx-auto shadow-lg shadow-primary/5 border border-slate-300 overflow-hidden pt-0 pb-0 gap-0 animate-fade-in-up">
                <CardHeader className="bg-primary/90 text-primary-foreground px-6 py-4 flex flex-row items-center gap-3">
                    <UserRound className="w-6 h-6 text-primary-foreground" />
                    <div>
                        <CardTitle className="text-xl font-bold">Registro de Empleado</CardTitle>
                        <p className="text-sm text-primary-foreground/70 mt-0.5">Complete todos los campos para registrar un nuevo empleado.</p>
                    </div>
                </CardHeader>
                <CardContent className="pt-8 bg-[radial-gradient(ellipse_at_top,hsl(215_75%_38%/0.03)_0%,transparent_60%)]">
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
                                <Select value={fields.departamento} onValueChange={set("departamento")}>
                                    <SelectTrigger id="ef-departamento" className="w-full h-9 border-slate-300 hover:border-primary/60 focus:border-primary focus:ring-primary/20">
                                        <SelectValue placeholder="Seleccionar departamento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tecnologia">Tecnología</SelectItem>
                                        <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                                        <SelectItem value="finanzas">Finanzas</SelectItem>
                                        <SelectItem value="ventas">Ventas</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                        <SelectItem value="operaciones">Operaciones</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                <Select value={fields.tipoContrato} onValueChange={set("tipoContrato")}>
                                    <SelectTrigger id="ef-contrato" className="w-full h-9 border-slate-300 hover:border-primary/60 focus:border-primary focus:ring-primary/20">
                                        <SelectValue placeholder="Seleccionar contrato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="indefinido">Indefinido</SelectItem>
                                        <SelectItem value="plazo_fijo">Plazo Fijo</SelectItem>
                                        <SelectItem value="honorarios">Honorarios</SelectItem>
                                        <SelectItem value="practicas">Prácticas</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormField>
                            <FormField label="Salario Mensual (S/.)" htmlFor="ef-salario" error={errors.salario} labelSize="sm">
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
                            <FormField label="Dirección" htmlFor="ef-direccion" error={errors.direccion} labelSize="sm" className="md:col-span-2">
                                <AppInput
                                    id="ef-direccion"
                                    value={fields.direccion}
                                    onChange={(e) => set("direccion")(e.target.value)}
                                    placeholder="ej. Av. Los Álamos 123, Lima"
                                />
                            </FormField>
                            <FormField label="Referencia" htmlFor="ef-referencia" labelSize="sm" className="md:col-span-2">
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
                </CardContent>

                <CardFooter className="flex items-center justify-between gap-3 pt-6 pb-6 border-t mt-8 bg-muted/20">
                    <AppButton type="button" variant="outline" onClick={() => navigate(-1)} className="group min-w-[100px] gap-1.5">
                        <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Volver
                    </AppButton>
                    <div className="flex gap-3">
                        <AppButton type="button" variant="outline" onClick={handleReset} className="min-w-[100px]">
                            Limpiar
                        </AppButton>
                        <AppButton type="submit" form="employee-form" className="shadow-lg shadow-primary/20 min-w-[140px]">
                            Registrar Empleado
                        </AppButton>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
