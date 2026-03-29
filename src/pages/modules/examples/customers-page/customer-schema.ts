import { z } from "zod"

export const customerSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
    company: z.string().min(1, "Company is required"),
    status: z.enum(["active", "inactive", "pending", "suspended", "vip"]),
    avatar: z.string().optional(),
    dob: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
    createdAt: z.string(),
})

export type Customer = z.infer<typeof customerSchema>

export const formSchema = customerSchema.omit({ id: true, createdAt: true })

export type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>

export const formDefaults: z.infer<typeof formSchema> = {
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "active",
    avatar: "",
    dob: "",
    address: "",
    city: "",
    zip: "",
}
