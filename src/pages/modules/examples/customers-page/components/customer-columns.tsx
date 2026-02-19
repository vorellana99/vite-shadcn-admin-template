import type { ColumnDef } from "@tanstack/react-table"

import type { Customer } from "../data"
import {
  DataTableRowActions,
  SortableHeader,
} from "@/shared/components/data-table"
import { Badge } from "@/shared/ui/badge"

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
      cell: ({ row }) => {
        const status = row.getValue("status") as Customer["status"]
        return (
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status === "active" ? "Active" : "Inactive"}
          </Badge>
        )
      },
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
