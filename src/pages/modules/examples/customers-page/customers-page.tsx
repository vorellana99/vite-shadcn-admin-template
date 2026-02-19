import { useCallback, useEffect, useMemo, useState } from "react"
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconLayoutColumns,
  IconPlus,
} from "@tabler/icons-react"
import { toast } from "sonner"
import { z } from "zod"

import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

// ---------------------------------------------------------------------------
// Schema & types
// ---------------------------------------------------------------------------

const customerSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().min(1, "Company is required"),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string(),
})

type Customer = z.infer<typeof customerSchema>

const formSchema = customerSchema.omit({ id: true, createdAt: true })

// ---------------------------------------------------------------------------
// localStorage persistence
// ---------------------------------------------------------------------------

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
]

function loadCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw) as Customer[]
  } catch { /* ignore */ }
  localStorage.setItem(LS_KEY, JSON.stringify(demoCustomers))
  return demoCustomers
}

function saveCustomers(customers: Customer[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(customers))
}

// ---------------------------------------------------------------------------
// Form field errors type
// ---------------------------------------------------------------------------

type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>

// ---------------------------------------------------------------------------
// Customer Form Dialog
// ---------------------------------------------------------------------------

function CustomerFormDialog({
  open,
  onOpenChange,
  customer,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: Customer | null
  onSave: (data: Omit<Customer, "id" | "createdAt">) => void
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState<"active" | "inactive">("active")
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (open) {
      setName(customer?.name ?? "")
      setEmail(customer?.email ?? "")
      setPhone(customer?.phone ?? "")
      setCompany(customer?.company ?? "")
      setStatus(customer?.status ?? "active")
      setErrors({})
    }
  }, [open, customer])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = formSchema.safeParse({ name, email, phone, company, status })
    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormErrors
        if (!fieldErrors[key]) fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    onSave(result.data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{customer ? "Edit Customer" : "New Customer"}</DialogTitle>
          <DialogDescription>
            {customer ? "Update the customer information below." : "Fill in the details to create a new customer."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cf-name">Name</Label>
            <Input id="cf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cf-email">Email</Label>
            <Input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@company.com" />
            {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cf-phone">Phone</Label>
              <Input id="cf-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555-0100" />
              {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cf-company">Company</Label>
              <Input id="cf-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
              {errors.company && <p className="text-destructive text-xs">{errors.company}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cf-status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as "active" | "inactive")}>
              <SelectTrigger id="cf-status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

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

  // ---- Table setup ---------------------------------------------------------

  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
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
                <DropdownMenuItem onClick={() => handleEdit(customer)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => handleDelete(customer)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customers],
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    data: customers,
    columns,
    state: { sorting, columnVisibility, pagination },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide(),
                )
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={handleAdd}>
            <IconPlus />
            <span className="hidden lg:inline">Add Customer</span>
          </Button>
        </div>
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredRowModel().rows.length} customer(s) total.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CustomerFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        customer={editingCustomer}
        onSave={handleSave}
      />
    </>
  )
}
