import { z } from "zod"

export const formSchema = z.object({
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

export const formDefaults: z.infer<typeof formSchema> = {
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
