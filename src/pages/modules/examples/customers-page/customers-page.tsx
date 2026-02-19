import { useCallback, useState } from "react"
import { toast } from "sonner"

import type { Customer } from "./data"
import { loadCustomers, saveCustomers } from "./data"
import { CustomerFormDialog } from "./components/customer-form-dialog"
import { CustomerTable } from "./components/customer-table"

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(loadCustomers)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  const persist = useCallback((next: Customer[]) => {
    setCustomers(next)
    saveCustomers(next)
  }, [])

  function handleAdd() {
    setEditingCustomer(null)
    setDialogOpen(true)
  }

  function handleEdit(customer: Customer) {
    setEditingCustomer(customer)
    setDialogOpen(true)
  }

  function handleDelete(customer: Customer) {
    const next = customers.filter((c) => c.id !== customer.id)
    persist(next)
    toast.success(`"${customer.name}" has been deleted.`)
  }

  function handleSave(data: Omit<Customer, "id" | "createdAt">) {
    if (editingCustomer) {
      const next = customers.map((c) =>
        c.id === editingCustomer.id ? { ...c, ...data } : c,
      )
      persist(next)
      toast.success(`"${data.name}" has been updated.`)
    } else {
      const maxId = customers.reduce((max, c) => Math.max(max, c.id), 0)
      const newCustomer: Customer = {
        ...data,
        id: maxId + 1,
        createdAt: new Date().toISOString().slice(0, 10),
      }
      persist([...customers, newCustomer])
      toast.success(`"${data.name}" has been created.`)
    }
  }

  return (
    <>
      <CustomerTable
        customers={customers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CustomerFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        customer={editingCustomer}
        onSave={handleSave}
      />
    </>
  )
}
