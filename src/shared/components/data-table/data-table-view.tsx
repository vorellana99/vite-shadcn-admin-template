import { flexRender, type Table as TanstackTable } from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table"

interface DataTableViewProps<TData> {
    table: TanstackTable<TData>
    columnsLength: number
}

export function DataTableView<TData>({
    table,
    columnsLength,
}: DataTableViewProps<TData>) {
    return (
        <div className="overflow-hidden rounded-lg border border-black/15 [&_tr]:border-black/15">
            <Table>
                <TableHeader className="bg-primary/90 [&_button:hover]:bg-white/10 sticky top-0 z-10 [&_th]:text-primary-foreground [&_svg]:text-primary-foreground [&_button]:text-primary-foreground hover:[&_button]:text-primary-foreground">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="hover:bg-transparent">
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
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
                                className="relative even:bg-primary/5 hover:bg-primary/20"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columnsLength} className="h-24 text-center">
                                No results found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
