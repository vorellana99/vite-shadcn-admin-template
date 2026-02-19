import type { ColumnDef } from "@tanstack/react-table"
import { IconDotsVertical } from "@tabler/icons-react"

import type { Customer } from "../data"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"

interface ColumnCallbacks {
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export function getCustomerColumns({ onEdit, onDelete }: ColumnCallbacks): ColumnDef<Customer>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "status",
      header: "Status",
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
      header: "Created",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const customer = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <IconDotsVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => onEdit(customer)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(customer)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
