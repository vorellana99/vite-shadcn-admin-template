import { z } from "zod"

export const CATEGORIES = ["Audio", "Peripherals", "Accessories", "Video", "Storage", "Networking"] as const

export const productSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name is required"),
    sku: z.string().min(1, "SKU is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().min(0, "Price must be positive"),
    stock: z.number().int().min(0, "Stock must be 0 or more"),
    status: z.enum(["active", "discontinued", "low_stock", "out_of_stock", "coming_soon"]),
    createdAt: z.string(),
})

export type Product = z.infer<typeof productSchema>

export const formSchema = productSchema.omit({ id: true, createdAt: true })

export type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>

export const formDefaults: z.infer<typeof formSchema> = {
    name: "",
    sku: "",
    category: "",
    price: 0,
    stock: 0,
    status: "active",
}
