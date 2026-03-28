import { z } from "zod"

export const studentSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
    school: z.string().min(1, "School is required"),
    status: z.enum(["active", "inactive", "pending", "suspended", "vip"]),
    avatar: z.string().optional(),
    dob: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
    createdAt: z.string(),
})

export type Student = z.infer<typeof studentSchema>

export const formSchema = studentSchema.omit({ id: true, createdAt: true })

export const formDefaults: z.infer<typeof formSchema> = {
    name: "",
    email: "",
    phone: "",
    school: "",
    status: "active",
    avatar: "",
    dob: "",
    address: "",
    city: "",
    zip: "",
}

export type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>
