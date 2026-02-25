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

const LS_KEY = "customers"

const demoCustomers: Customer[] = [
  { id: 1, name: "Alice Johnson", email: "alice@acme.com", phone: "+1 555-0101", company: "Acme Corp", status: "vip", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice", dob: "1990-05-15", address: "123 Main St", city: "New York", zip: "10001", createdAt: "2025-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@globex.com", phone: "+1 555-0102", company: "Globex Inc", status: "pending", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob", dob: "1985-11-20", address: "456 Oak Ave", city: "San Francisco", zip: "94105", createdAt: "2025-01-20" },
  { id: 3, name: "Carlos Rivera", email: "carlos@initech.com", phone: "+1 555-0103", company: "Initech LLC", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos", dob: "1992-03-10", address: "789 Pine Rd", city: "Miami", zip: "33101", createdAt: "2025-02-01" },
  { id: 4, name: "Diana Chen", email: "diana@umbrella.com", phone: "+1 555-0104", company: "Umbrella Co", status: "suspended", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana", dob: "1988-07-25", address: "321 Cedar Ln", city: "Seattle", zip: "98101", createdAt: "2025-02-10" },
  { id: 5, name: "Erik Müller", email: "erik@stark.com", phone: "+49 170-5550105", company: "Stark Industries", status: "inactive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Erik", dob: "1982-12-05", address: "Stark Tower", city: "Berlin", zip: "10115", createdAt: "2025-02-15" },
  { id: 6, name: "Fiona Lee", email: "fiona@wayne.com", phone: "+1 555-0106", company: "Wayne Enterprises", status: "vip", createdAt: "2025-03-01" },
  { id: 7, name: "George Park", email: "george@oscorp.com", phone: "+1 555-0107", company: "Oscorp", status: "active", createdAt: "2025-03-05" },
  { id: 8, name: "Hannah Kim", email: "hannah@cyberdyne.com", phone: "+82 10-5550108", company: "Cyberdyne Systems", status: "pending", createdAt: "2025-03-10" },
  { id: 9, name: "Ivan Torres", email: "ivan@weyland.com", phone: "+34 600-550109", company: "Weyland-Yutani", status: "suspended", createdAt: "2025-03-15" },
  { id: 10, name: "Julia Wang", email: "julia@soylent.com", phone: "+1 555-0110", company: "Soylent Corp", status: "active", createdAt: "2025-03-20" },
  { id: 11, name: "Kevin Nakamura", email: "kevin@tyrell.com", phone: "+81 90-5550111", company: "Tyrell Corp", status: "inactive", createdAt: "2025-03-25" },
  { id: 12, name: "Laura Fernández", email: "laura@massive.com", phone: "+34 612-550112", company: "Massive Dynamic", status: "vip", createdAt: "2025-04-01" },
  { id: 13, name: "Marco Rossi", email: "marco@hooli.com", phone: "+39 333-5550113", company: "Hooli", status: "pending", createdAt: "2025-04-05" },
  { id: 14, name: "Natasha Petrova", email: "natasha@piedpiper.com", phone: "+7 916-5550114", company: "Pied Piper", status: "suspended", createdAt: "2025-04-10" },
  { id: 15, name: "Oliver Thompson", email: "oliver@dundermifflin.com", phone: "+1 555-0115", company: "Dunder Mifflin", status: "active", createdAt: "2025-04-15" },
  { id: 16, name: "Elena Gilbert", email: "elena@gilbert.com", phone: "+1 555-0116", company: "Mystic Grill", status: "inactive", createdAt: "2025-04-20" },
  { id: 17, name: "Stefan Salvatore", email: "stefan@salvatore.com", phone: "+1 555-0117", company: "Brothers LLC", status: "active", createdAt: "2025-04-22" },
  { id: 18, name: "Damon Salvatore", email: "damon@salvatore.com", phone: "+1 555-0118", company: "Brothers LLC", status: "pending", createdAt: "2025-04-25" },
  { id: 19, name: "Bonnie Bennett", email: "bonnie@bennett.com", phone: "+1 555-0119", company: "Witchy Crafts", status: "vip", createdAt: "2025-04-28" },
  { id: 20, name: "Caroline Forbes", email: "caroline@forbes.com", phone: "+1 555-0120", company: "Events Pro", status: "suspended", createdAt: "2025-05-01" },
  { id: 21, name: "Alaric Saltzman", email: "alaric@saltzman.com", phone: "+1 555-0121", company: "Historians Inc", status: "inactive", createdAt: "2025-05-05" },
  { id: 22, name: "Tyler Lockwood", email: "tyler@lockwood.com", phone: "+1 555-0122", company: "Lockwood Manor", status: "active", createdAt: "2025-05-08" },
  { id: 23, name: "Matt Donovan", email: "matt@donovan.com", phone: "+1 555-0123", company: "Town Council", status: "active", createdAt: "2025-05-10" },
  { id: 24, name: "Jeremy Gilbert", email: "jeremy@gilbert.com", phone: "+1 555-0124", company: "Gilbert Arts", status: "vip", createdAt: "2025-05-12" },
  { id: 25, name: "Klaus Mikaelson", email: "klaus@mikaelson.com", phone: "+44 20-5550125", company: "The Originals", status: "suspended", createdAt: "2025-05-15" },
]

/**
 * Loads customers from localStorage. If empty, seeds with {@link demoCustomers}.
 */
export function loadCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Customer[]
      if (parsed.length < demoCustomers.length) {
        localStorage.setItem(LS_KEY, JSON.stringify(demoCustomers))
        return demoCustomers
      }
      return parsed
    }
  } catch { /* ignore */ }
  localStorage.setItem(LS_KEY, JSON.stringify(demoCustomers))
  return demoCustomers
}

export function saveCustomers(customers: Customer[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(customers))
}
