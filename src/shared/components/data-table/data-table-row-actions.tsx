import type { ReactNode } from "react"
import { IconDotsVertical } from "@tabler/icons-react"

import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"

interface DataTableRowActionsProps {
  children: ReactNode
  triggerIcon?: ReactNode
}

export function DataTableRowActions({
  children,
  triggerIcon,
}: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="data-[state=open]:bg-primary/10 flex size-8 p-0 border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-primary transition-all duration-200"
          title="Acciones"
        >
          {triggerIcon || <IconDotsVertical className="size-4" />}
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[220px] p-2 rounded-xl border border-slate-400/70 dark:border-slate-700 bg-popover/98 backdrop-blur-sm shadow-2xl animate-in fade-in-0 zoom-in-95"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
