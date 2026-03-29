import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Email no válido"),
})

export const formDefaults: z.infer<typeof formSchema> = {
    name: "",
    email: "",
}
