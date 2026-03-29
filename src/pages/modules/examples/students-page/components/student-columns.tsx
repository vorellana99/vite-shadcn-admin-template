import type { ColumnDef } from "@tanstack/react-table"
import { StudentStatusBadge } from "./student-status-badge"
import { StudentRowActions } from "./student-row-actions"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { cn } from "@/shared/lib/utils"
import { getInitialsColor } from "@/shared/lib/avatar-color"
import type { Student } from "../student-schema"
import {
    SortableHeader,
} from "@/shared/components/data-table"

interface ColumnCallbacks {
    onEdit: (student: Student) => void
    onDelete: (student: Student) => void
    isMobile?: boolean
}

export function getStudentColumns({ onEdit, onDelete, isMobile }: ColumnCallbacks): ColumnDef<Student>[] {
    return [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <div className="flex items-center gap-3">
                    <span className="h-7 w-7 shrink-0" />
                    <SortableHeader column={column}>Name</SortableHeader>
                </div>
            ),
            cell: ({ row }) => {
                const student = row.original
                const isClickable = !isMobile
                const linkProps = isClickable
                    ? {
                        onClick: () => onEdit(student),
                        title: `Editar ${student.name}`,
                        className: "hover:underline hover:text-primary cursor-pointer relative z-20",
                    }
                    : {}

                const initials = student.name.substring(0, 2).toUpperCase()
                const { bg } = getInitialsColor(initials)

                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-7 w-7">
                            <AvatarFallback className={cn(bg, "border border-foreground/20 text-foreground font-semibold text-xs")}>{initials}</AvatarFallback>
                        </Avatar>
                        <span
                            className={cn("font-medium transition-colors", linkProps.className)}
                            {...linkProps}
                        >
                            {student.name}
                        </span>
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
            accessorKey: "school",
            header: ({ column }) => <SortableHeader column={column}>School</SortableHeader>,
        },
        {
            accessorKey: "status",
            header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
            cell: ({ row }) => <StudentStatusBadge status={row.getValue("status")} />,
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => <SortableHeader column={column}>Created</SortableHeader>,
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <StudentRowActions
                    student={row.original}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isMobile={isMobile}
                />
            ),
        },
    ]
}
