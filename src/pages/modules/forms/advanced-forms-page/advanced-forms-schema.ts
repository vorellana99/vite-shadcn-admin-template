import { z } from "zod"

export const formSchema = z.object({
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

export const formDefaults: z.infer<typeof formSchema> = {
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
