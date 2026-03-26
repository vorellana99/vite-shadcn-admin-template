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

export type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>

const LS_KEY = "students"

const demoStudents: Student[] = [
    { id: 1, name: "Alice Johnson", email: "alice@student.test", phone: "+1 555-0101", school: "State University", status: "vip", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice", dob: "2000-05-15", address: "123 Main St", city: "New York", zip: "10001", createdAt: "2025-01-15" },
    { id: 2, name: "Bob Smith", email: "bob@student.test", phone: "+1 555-0102", school: "City College", status: "pending", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob", dob: "1999-11-20", address: "456 Oak Ave", city: "San Francisco", zip: "94105", createdAt: "2025-01-20" },
    { id: 3, name: "Carlos Rivera", email: "carlos@student.test", phone: "+1 555-0103", school: "Tech Institute", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos", dob: "2002-03-10", address: "789 Pine Rd", city: "Miami", zip: "33101", createdAt: "2025-02-01" },
    { id: 4, name: "Diana Chen", email: "diana@student.test", phone: "+1 555-0104", school: "Global Academy", status: "suspended", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana", dob: "2001-07-25", address: "321 Cedar Ln", city: "Seattle", zip: "98101", createdAt: "2025-02-10" },
    { id: 5, name: "Erik Müller", email: "erik@student.test", phone: "+49 170-5550105", school: "EU Business School", status: "inactive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Erik", dob: "1998-12-05", address: "Stark Tower", city: "Berlin", zip: "10115", createdAt: "2025-02-15" },
]

/**
 * Loads students from localStorage. If empty, seeds with {@link demoStudents}.
 */
export function loadStudents(): Student[] {
    try {
        const raw = localStorage.getItem(LS_KEY)
        if (raw) {
            const parsed = JSON.parse(raw) as Student[]
            if (parsed.length < demoStudents.length) {
                localStorage.setItem(LS_KEY, JSON.stringify(demoStudents))
                return demoStudents
            }
            return parsed
        }
    } catch { /* ignore */ }
    localStorage.setItem(LS_KEY, JSON.stringify(demoStudents))
    return demoStudents
}

export function saveStudents(students: Student[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(students))
}
