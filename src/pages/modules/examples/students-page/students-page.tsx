import { useCallback, useState } from "react"
import { toast } from "sonner"

import type { Student } from "./data"
import { loadStudents, saveStudents } from "./data"
import { StudentFormDialog } from "./components/student-form-dialog"
import { StudentTable } from "./components/student-table"

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>(loadStudents)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingStudent, setEditingStudent] = useState<Student | null>(null)

    const persist = useCallback((next: Student[]) => {
        setStudents(next)
        saveStudents(next)
    }, [])

    function handleAdd() {
        setEditingStudent(null)
        setDialogOpen(true)
    }

    function handleEdit(student: Student) {
        setEditingStudent(student)
        setDialogOpen(true)
    }

    function handleDelete(student: Student) {
        const next = students.filter((s) => s.id !== student.id)
        persist(next)
        toast.success(`"${student.name}" has been deleted.`)
    }

    function handleSave(data: Omit<Student, "id" | "createdAt">) {
        if (editingStudent) {
            const next = students.map((s) =>
                s.id === editingStudent.id ? { ...s, ...data } : s,
            )
            persist(next)
            toast.success(`"${data.name}" has been updated.`)
        } else {
            const maxId = students.reduce((max, s) => Math.max(max, s.id), 0)
            const newStudent: Student = {
                ...data,
                id: maxId + 1,
                createdAt: new Date().toISOString().slice(0, 10),
            }
            persist([...students, newStudent])
            toast.success(`"${data.name}" has been created.`)
        }
    }

    return (
        <>
            <StudentTable
                students={students}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <StudentFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                student={editingStudent}
                onSave={handleSave}
            />
        </>
    )
}
