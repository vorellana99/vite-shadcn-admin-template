import { useCallback, useState } from "react"

import type { Customer } from "./customer-schema"
import { demoCustomers } from "./customer-data"

const LS_KEY = "customers"

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

export function toFormValues(c: Customer) {
    return {
        name: c.name ?? "",
        email: c.email ?? "",
        phone: c.phone ?? "",
        company: c.company ?? "",
        status: (c.status ?? "active") as Customer["status"],
        avatar: c.avatar ?? "",
        dob: c.dob ?? "",
        address: c.address ?? "",
        city: c.city ?? "",
        zip: c.zip ?? "",
    }
}

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>(loadCustomers)

    const persist = useCallback((next: Customer[]) => {
        setCustomers(next)
        saveCustomers(next)
    }, [])

    const addCustomer = useCallback((data: Omit<Customer, "id" | "createdAt">) => {
        setCustomers((prev) => {
            const maxId = prev.reduce((max, c) => Math.max(max, c.id), 0)
            const next = [...prev, { ...data, id: maxId + 1, createdAt: new Date().toISOString().slice(0, 10) }]
            saveCustomers(next)
            return next
        })
    }, [])

    const updateCustomer = useCallback((id: number, data: Omit<Customer, "id" | "createdAt">) => {
        setCustomers((prev) => {
            const next = prev.map((c) => (c.id === id ? { ...c, ...data } : c))
            saveCustomers(next)
            return next
        })
    }, [])

    const deleteCustomer = useCallback((id: number) => {
        setCustomers((prev) => {
            const next = prev.filter((c) => c.id !== id)
            saveCustomers(next)
            return next
        })
    }, [])

    return { customers, persist, addCustomer, updateCustomer, deleteCustomer }
}
