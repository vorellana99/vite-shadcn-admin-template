import type { ColumnDef } from "@tanstack/react-table"
import { CustomerStatusBadge } from "./customer-status-badge"
import type { Customer } from "../data"
import {
  DataTableRowActions,
  SortableHeader,
} from "@/shared/components/data-table"

interface ColumnCallbacks {
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export function getCustomerColumns({ onEdit, onDelete }: ColumnCallbacks): ColumnDef<Customer>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
      cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <SortableHeader column={column}>Email</SortableHeader>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "company",
      header: ({ column }) => <SortableHeader column={column}>Company</SortableHeader>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
      cell: ({ row }) => <CustomerStatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <SortableHeader column={column}>Created</SortableHeader>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ]
}
