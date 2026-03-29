import { Link } from "react-router-dom"
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
    onDelete: (student: Student) => void
    isMobile?: boolean
}

export function getStudentColumns({ onDelete, isMobile }: ColumnCallbacks): ColumnDef<Student>[] {
    return [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <div className="flex items-center gap-3">
                    <span className="h-7 w-7 shrink-0" />
                    <SortableHeader column={column}>Nombre</SortableHeader>
                </div>
            ),
            cell: ({ row }) => {
                const student = row.original
                const initials = student.name.substring(0, 2).toUpperCase()
                const { bg } = getInitialsColor(initials)

                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-7 w-7">
                            <AvatarFallback className={cn(bg, "border border-foreground/20 text-foreground font-semibold text-xs")}>{initials}</AvatarFallback>
                        </Avatar>
                        {isMobile ? (
                            <span className="font-medium">{student.name}</span>
                        ) : (
                            <Link
                                to={`/examples/students/${student.id}`}
                                className="font-medium hover:underline hover:text-primary transition-colors relative z-20"
                            >
                                {student.name}
                            </Link>
                        )}
                    </div>
                )
            },
            enableHiding: false,
        },
        {
            accessorKey: "email",
            header: ({ column }) => <SortableHeader column={column}>Correo</SortableHeader>,
        },
        {
            accessorKey: "phone",
            header: "Teléfono",
        },
        {
            accessorKey: "school",
            header: ({ column }) => <SortableHeader column={column}>Institución</SortableHeader>,
        },
        {
            accessorKey: "status",
            header: ({ column }) => <SortableHeader column={column}>Estado</SortableHeader>,
            cell: ({ row }) => <StudentStatusBadge status={row.getValue("status")} />,
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => <SortableHeader column={column}>Registro</SortableHeader>,
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <StudentRowActions
                    student={row.original}
                    onDelete={onDelete}
                    isMobile={isMobile}
                />
            ),
        },
    ]
}
