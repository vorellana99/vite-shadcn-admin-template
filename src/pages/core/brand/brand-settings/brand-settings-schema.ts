import { z } from "zod"

export const formSchema = z.object({
    brandName: z.string().min(1, "El nombre es requerido"),
    website: z.string().min(1, "El sitio web es requerido"),
})

export const formDefaults: z.infer<typeof formSchema> = {
    brandName: "Acme Corp",
    website: "acme.com",
}
