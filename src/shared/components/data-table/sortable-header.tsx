import type { Column } from "@tanstack/react-table"
import {
  IconArrowDown,
  IconArrowUp,
  IconArrowsSort,
} from "@tabler/icons-react"

import { Button } from "@/shared/ui/button"

interface SortableHeaderProps<TData> {
  column: Column<TData>
  children: React.ReactNode
  className?: string
}

export function SortableHeader<TData>({
  column,
  children,
  className,
}: SortableHeaderProps<TData>) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`-ml-3 ${className ?? ""}`}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      {column.getIsSorted() === "asc" ? (
        <IconArrowUp className="size-4" />
      ) : column.getIsSorted() === "desc" ? (
        <IconArrowDown className="size-4" />
      ) : (
        <IconArrowsSort className="text-muted-foreground/50 size-4" />
      )}
    </Button>
  )
}
