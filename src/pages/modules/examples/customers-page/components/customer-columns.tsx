import { Link } from "react-router-dom"
import type { ColumnDef } from "@tanstack/react-table"
import { CustomerStatusBadge } from "./customer-status-badge"
import { CustomerRowActions } from "./customer-row-actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import type { Customer } from "../customer-schema"
import {
  SortableHeader,
} from "@/shared/components/data-table"

interface ColumnCallbacks {
  onDelete: (customer: Customer) => void
  isMobile?: boolean
}

export function getCustomerColumns({ onDelete, isMobile }: ColumnCallbacks): ColumnDef<Customer>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
      cell: ({ row }) => {
        const customer = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={customer.avatar} alt={customer.name} />
              <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {isMobile ? (
              <span className="font-medium">{customer.name}</span>
            ) : (
              <Link
                to={`/examples/customers/${customer.id}`}
                className="font-medium hover:underline hover:text-primary transition-colors relative z-20"
              >
                {customer.name}
              </Link>
            )}
          </div>
        )
      },
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
        <CustomerRowActions
          customer={row.original}
          onDelete={onDelete}
          isMobile={isMobile}
        />
      ),
    },
  ]
}
