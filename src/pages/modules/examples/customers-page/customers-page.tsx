import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import type { Customer } from "./customer-schema"
import { useCustomers } from "./use-customers"
import { CustomerTable } from "./components/customer-table"

export default function CustomersPage() {
    const navigate = useNavigate()
    const { customers, deleteCustomer } = useCustomers()

    function handleAdd() {
        navigate("/examples/customers/new")
    }

    function handleDelete(customer: Customer) {
        deleteCustomer(customer.id)
        toast.success(`"${customer.name}" has been deleted.`)
    }

    return (
        <CustomerTable
            customers={customers}
            onAdd={handleAdd}
            onDelete={handleDelete}
        />
    )
}
