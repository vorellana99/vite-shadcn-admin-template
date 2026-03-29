import { useState } from "react"
import { toast } from "sonner"

import type { Customer } from "./customer-schema"
import { useCustomers } from "./use-customers"
import { CustomerFormDialog } from "./components/customer-form-dialog"
import { CustomerTable } from "./components/customer-table"

export default function CustomersPage() {
    const { customers, addCustomer, updateCustomer, deleteCustomer } = useCustomers()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

    function handleAdd() {
        setEditingCustomer(null)
        setDialogOpen(true)
    }

    function handleEdit(customer: Customer) {
        setEditingCustomer(customer)
        setDialogOpen(true)
    }

    function handleDelete(customer: Customer) {
        deleteCustomer(customer.id)
        toast.success(`"${customer.name}" has been deleted.`)
    }

    function handleSave(data: Omit<Customer, "id" | "createdAt">) {
        if (editingCustomer) {
            updateCustomer(editingCustomer.id, data)
            toast.success(`"${data.name}" has been updated.`)
        } else {
            addCustomer(data)
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
