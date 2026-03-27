import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import type { Student } from "./data"
import { loadStudents, saveStudents } from "./data"
import { StudentTable } from "./components/student-table"

export default function StudentsPage() {
    const navigate = useNavigate()
    const [students, setStudents] = useState<Student[]>(loadStudents)

    const persist = useCallback((next: Student[]) => {
        setStudents(next)
        saveStudents(next)
    }, [])

    function handleAdd() {
        navigate("/examples/students/new")
    }

    function handleEdit(student: Student) {
        navigate(`/examples/students/${student.id}`)
    }

    function handleDelete(student: Student) {
        const next = students.filter((s) => s.id !== student.id)
        persist(next)
        toast.success(`"${student.name}" has been deleted.`)
    }

    return (
        <StudentTable
            students={students}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

