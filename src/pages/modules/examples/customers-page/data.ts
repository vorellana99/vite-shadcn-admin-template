import { z } from "zod"

export const customerSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().min(1, "Company is required"),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string(),
})

export type Customer = z.infer<typeof customerSchema>

export const formSchema = customerSchema.omit({ id: true, createdAt: true })

export type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>

const LS_KEY = "customers"

const demoCustomers: Customer[] = [
  { id: 1, name: "Alice Johnson", email: "alice@acme.com", phone: "+1 555-0101", company: "Acme Corp", status: "active", createdAt: "2025-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@globex.com", phone: "+1 555-0102", company: "Globex Inc", status: "active", createdAt: "2025-01-20" },
  { id: 3, name: "Carlos Rivera", email: "carlos@initech.com", phone: "+1 555-0103", company: "Initech LLC", status: "inactive", createdAt: "2025-02-01" },
  { id: 4, name: "Diana Chen", email: "diana@umbrella.com", phone: "+1 555-0104", company: "Umbrella Co", status: "active", createdAt: "2025-02-10" },
  { id: 5, name: "Erik Müller", email: "erik@stark.com", phone: "+49 170-5550105", company: "Stark Industries", status: "active", createdAt: "2025-02-15" },
  { id: 6, name: "Fiona Lee", email: "fiona@wayne.com", phone: "+1 555-0106", company: "Wayne Enterprises", status: "inactive", createdAt: "2025-03-01" },
  { id: 7, name: "George Park", email: "george@oscorp.com", phone: "+1 555-0107", company: "Oscorp", status: "active", createdAt: "2025-03-05" },
  { id: 8, name: "Hannah Kim", email: "hannah@cyberdyne.com", phone: "+82 10-5550108", company: "Cyberdyne Systems", status: "active", createdAt: "2025-03-10" },
  { id: 9, name: "Ivan Torres", email: "ivan@weyland.com", phone: "+34 600-550109", company: "Weyland-Yutani", status: "inactive", createdAt: "2025-03-15" },
  { id: 10, name: "Julia Wang", email: "julia@soylent.com", phone: "+1 555-0110", company: "Soylent Corp", status: "active", createdAt: "2025-03-20" },
  { id: 11, name: "Kevin Nakamura", email: "kevin@tyrell.com", phone: "+81 90-5550111", company: "Tyrell Corp", status: "active", createdAt: "2025-03-25" },
  { id: 12, name: "Laura Fernández", email: "laura@massive.com", phone: "+34 612-550112", company: "Massive Dynamic", status: "inactive", createdAt: "2025-04-01" },
  { id: 13, name: "Marco Rossi", email: "marco@hooli.com", phone: "+39 333-5550113", company: "Hooli", status: "active", createdAt: "2025-04-05" },
  { id: 14, name: "Natasha Petrova", email: "natasha@piedpiper.com", phone: "+7 916-5550114", company: "Pied Piper", status: "active", createdAt: "2025-04-10" },
  { id: 15, name: "Oliver Thompson", email: "oliver@dundermifflin.com", phone: "+1 555-0115", company: "Dunder Mifflin", status: "inactive", createdAt: "2025-04-15" },
]

/**
 * Loads customers from localStorage. If empty, seeds with {@link demoCustomers}.
 *
 * Because localStorage takes priority, changes to `demoCustomers` in code won't
 * be visible until the stored data is cleared:
 * ```js
 * localStorage.removeItem("customers")
 * ```
 */
export function loadCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw) as Customer[]
  } catch { /* ignore */ }
  localStorage.setItem(LS_KEY, JSON.stringify(demoCustomers))
  return demoCustomers
}

export function saveCustomers(customers: Customer[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(customers))
}
