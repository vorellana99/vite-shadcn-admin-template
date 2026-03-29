import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import type { Student } from "./student-schema"
import { useStudents } from "./use-students"
import { StudentTable } from "./components/student-table"

export default function StudentsPage() {
    const navigate = useNavigate()
    const { students, deleteStudent } = useStudents()

    function handleAdd() {
        navigate("/examples/students/new")
    }

    function handleDelete(student: Student) {
        deleteStudent(student.id)
        toast.success(`"${student.name}" has been deleted.`)
    }

    return (
        <StudentTable
            students={students}
            onAdd={handleAdd}
            onDelete={handleDelete}
        />
    )
}

