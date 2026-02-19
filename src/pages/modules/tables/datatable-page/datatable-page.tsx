import { useState } from "react"
import {
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Checkbox } from "@/shared/ui/checkbox"
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

interface Invoice {
  id: string
  customer: string
  email: string
  amount: number
  status: "paid" | "pending" | "overdue" | "draft"
  date: string
}

const invoices: Invoice[] = [
  { id: "INV-001", customer: "Acme Corp", email: "billing@acme.com", amount: 1250, status: "paid", date: "2025-01-05" },
  { id: "INV-002", customer: "Globex Inc", email: "pay@globex.com", amount: 890, status: "pending", date: "2025-01-08" },
  { id: "INV-003", customer: "Initech LLC", email: "accounts@initech.com", amount: 2340, status: "paid", date: "2025-01-12" },
  { id: "INV-004", customer: "Umbrella Co", email: "finance@umbrella.com", amount: 450, status: "overdue", date: "2024-12-20" },
  { id: "INV-005", customer: "Stark Industries", email: "ap@stark.com", amount: 3100, status: "paid", date: "2025-01-15" },
  { id: "INV-006", customer: "Wayne Enterprises", email: "billing@wayne.com", amount: 1780, status: "pending", date: "2025-01-18" },
  { id: "INV-007", customer: "Oscorp", email: "invoices@oscorp.com", amount: 920, status: "draft", date: "2025-01-20" },
  { id: "INV-008", customer: "Cyberdyne Systems", email: "ap@cyberdyne.com", amount: 5600, status: "paid", date: "2025-01-22" },
  { id: "INV-009", customer: "Weyland-Yutani", email: "finance@wy.com", amount: 3400, status: "overdue", date: "2024-12-15" },
  { id: "INV-010", customer: "Soylent Corp", email: "billing@soylent.com", amount: 780, status: "pending", date: "2025-01-25" },
  { id: "INV-011", customer: "Tyrell Corp", email: "pay@tyrell.com", amount: 4200, status: "paid", date: "2025-01-28" },
  { id: "INV-012", customer: "Massive Dynamic", email: "ap@massive.com", amount: 1560, status: "draft", date: "2025-02-01" },
  { id: "INV-013", customer: "Hooli", email: "billing@hooli.com", amount: 2890, status: "paid", date: "2025-02-03" },
  { id: "INV-014", customer: "Pied Piper", email: "invoices@piedpiper.com", amount: 670, status: "pending", date: "2025-02-05" },
  { id: "INV-015", customer: "Dunder Mifflin", email: "ap@dundermifflin.com", amount: 1100, status: "overdue", date: "2024-12-28" },
  { id: "INV-016", customer: "Sterling Cooper", email: "billing@sc.com", amount: 3750, status: "paid", date: "2025-02-08" },
  { id: "INV-017", customer: "Los Pollos Hermanos", email: "finance@lph.com", amount: 490, status: "draft", date: "2025-02-10" },
  { id: "INV-018", customer: "Bluth Company", email: "ap@bluth.com", amount: 2100, status: "pending", date: "2025-02-12" },
  { id: "INV-019", customer: "Wonka Industries", email: "pay@wonka.com", amount: 8900, status: "paid", date: "2025-02-14" },
  { id: "INV-020", customer: "Prestige Worldwide", email: "billing@prestige.com", amount: 340, status: "overdue", date: "2024-12-05" },
]

const statusConfig: Record<Invoice["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  paid: { label: "Paid", variant: "default" },
  pending: { label: "Pending", variant: "outline" },
  overdue: { label: "Overdue", variant: "destructive" },
  draft: { label: "Draft", variant: "secondary" },
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

function SortableHeader({ column, label }: { column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void }; label: string }) {
  const sorted = column.getIsSorted()
  return (
    <Button variant="ghost" size="sm" className="-ml-3 h-8" onClick={() => column.toggleSorting()}>
      {label}
      {sorted === "asc" ? (
        <ArrowUp className="ml-1 size-3.5" />
      ) : sorted === "desc" ? (
        <ArrowDown className="ml-1 size-3.5" />
      ) : (
        <ArrowUpDown className="ml-1 size-3.5 opacity-40" />
      )}
    </Button>
  )
}

const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} label="Invoice" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <SortableHeader column={column} label="Customer" />,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column} label="Amount" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{formatCurrency(row.getValue("amount"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Invoice["status"]
      const sc = statusConfig[status]
      return <Badge variant={sc.variant}>{sc.label}</Badge>
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortableHeader column={column} label="Date" />,
  },
]

export default function DatatablePage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    data: invoices,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  })

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>
            TanStack React Table with sorting, pagination, and row selection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No results.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between gap-4">
            <div className="text-muted-foreground text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm whitespace-nowrap">Rows per page</span>
                <Select
                  value={String(table.getState().pagination.pageSize)}
                  onValueChange={(v) => table.setPageSize(Number(v))}
                >
                  <SelectTrigger className="w-[70px]" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 8, 10, 20].map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm whitespace-nowrap">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </div>

              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="size-8" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                  <ChevronsLeft className="size-4" />
                </Button>
                <Button variant="outline" size="icon" className="size-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                  <ChevronLeft className="size-4" />
                </Button>
                <Button variant="outline" size="icon" className="size-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  <ChevronRight className="size-4" />
                </Button>
                <Button variant="outline" size="icon" className="size-8" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                  <ChevronsRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
