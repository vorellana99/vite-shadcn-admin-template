import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Briefcase, MapPin, UserRound } from "lucide-react"
import { toast } from "sonner"

import { formSchema, formDefaults } from "./basic-forms-schema"
import { AppInput } from "@/shared/components/inputs/app-input"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import { FormField } from "@/shared/components/forms/form-field"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormPageCard } from "@/shared/components/forms/form-page-card"
import { FormSelect } from "@/shared/components/forms/form-select"
import { SelectItem } from "@/shared/ui/select"

type FormValues = z.infer<typeof formSchema>

export default function BasicFormsPage() {
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaults,
    })

    function onSubmit(data: FormValues) {
        toast.success(`Empleado "${data.nombre} ${data.apellido}" registrado correctamente.`)
        reset(formDefaults)
    }

    function onInvalid() {
        toast.error("Por favor, corrija los errores antes de guardar.")
    }

    function handleReset() {
        reset(formDefaults)
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
            <form id="employee-form" onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Información Personal" icon={UserRound} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Nombre" htmlFor="ef-nombre" error={errors.nombre?.message} labelSize="sm">
                            <AppInput id="ef-nombre" {...register("nombre")} placeholder="ej. Juan" />
                        </FormField>
                        <FormField label="Apellido" htmlFor="ef-apellido" error={errors.apellido?.message} labelSize="sm">
                            <AppInput id="ef-apellido" {...register("apellido")} placeholder="ej. Pérez" />
                        </FormField>
                        <FormField label="Correo Electrónico" htmlFor="ef-email" error={errors.email?.message} labelSize="sm">
                            <AppInput id="ef-email" type="email" {...register("email")} placeholder="juan.perez@empresa.com" />
                        </FormField>
                        <FormField label="Teléfono" htmlFor="ef-telefono" error={errors.telefono?.message} labelSize="sm">
                            <AppInput id="ef-telefono" type="tel" {...register("telefono")} placeholder="+51 999 000 000" />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Datos Laborales" icon={Briefcase} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Cargo" htmlFor="ef-cargo" error={errors.cargo?.message} labelSize="sm">
                            <AppInput id="ef-cargo" {...register("cargo")} placeholder="ej. Desarrollador Frontend" />
                        </FormField>
                        <FormField label="Departamento" htmlFor="ef-departamento" error={errors.departamento?.message} labelSize="sm">
                            <Controller
                                control={control}
                                name="departamento"
                                render={({ field }) => (
                                    <FormSelect id="ef-departamento" value={field.value} onValueChange={field.onChange} placeholder="Seleccionar departamento">
                                        <SelectItem value="tecnologia">Tecnología</SelectItem>
                                        <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                                        <SelectItem value="finanzas">Finanzas</SelectItem>
                                        <SelectItem value="ventas">Ventas</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                        <SelectItem value="operaciones">Operaciones</SelectItem>
                                    </FormSelect>
                                )}
                            />
                        </FormField>
                        <FormField label="Fecha de Ingreso" htmlFor="ef-fecha" error={errors.fechaIngreso?.message} labelSize="sm">
                            <Controller
                                control={control}
                                name="fechaIngreso"
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
                        <FormField label="Tipo de Contrato" htmlFor="ef-contrato" error={errors.tipoContrato?.message} labelSize="sm">
                            <Controller
                                control={control}
                                name="tipoContrato"
                                render={({ field }) => (
                                    <FormSelect id="ef-contrato" value={field.value} onValueChange={field.onChange} placeholder="Seleccionar contrato">
                                        <SelectItem value="indefinido">Indefinido</SelectItem>
                                        <SelectItem value="plazo_fijo">Plazo Fijo</SelectItem>
                                        <SelectItem value="honorarios">Honorarios</SelectItem>
                                        <SelectItem value="practicas">Prácticas</SelectItem>
                                    </FormSelect>
                                )}
                            />
                        </FormField>
                        <FormField label="Salario Mensual (S/.)" htmlFor="ef-salario" error={errors.salario?.message} labelSize="sm" className="md:col-span-2">
                            <AppInput id="ef-salario" type="number" min="0" {...register("salario")} placeholder="ej. 3500" />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.19s" }}>
                    <FormSection title="Ubicación" icon={MapPin} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Dirección" htmlFor="ef-direccion" error={errors.direccion?.message} labelSize="sm">
                            <AppInput id="ef-direccion" {...register("direccion")} placeholder="ej. Av. Los Álamos 123, Lima" />
                        </FormField>
                        <FormField label="Referencia" htmlFor="ef-referencia" labelSize="sm">
                            <AppInput id="ef-referencia" {...register("referencia")} placeholder="ej. Frente al parque, edificio azul" />
                        </FormField>
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
