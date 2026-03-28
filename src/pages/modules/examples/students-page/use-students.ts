import { useCallback, useState } from "react"

import type { Student } from "./student-schema"
import { demoStudents } from "./student-data"

const LS_KEY = "students"

export function loadStudents(): Student[] {
    try {
        const raw = localStorage.getItem(LS_KEY)
        if (raw) {
            const parsed = JSON.parse(raw) as Student[]
            if (parsed.length < demoStudents.length) {
                localStorage.setItem(LS_KEY, JSON.stringify(demoStudents))
                return demoStudents
            }
            return parsed
        }
    } catch { /* ignore */ }
    localStorage.setItem(LS_KEY, JSON.stringify(demoStudents))
    return demoStudents
}

export function saveStudents(students: Student[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(students))
}

export function toFormValues(s: Student) {
    return {
        name: s.name ?? "",
        email: s.email ?? "",
        phone: s.phone ?? "",
        school: s.school ?? "",
        status: (s.status ?? "active") as Student["status"],
        avatar: s.avatar ?? "",
        dob: s.dob ?? "",
        address: s.address ?? "",
        city: s.city ?? "",
        zip: s.zip ?? "",
    }
}

export function useStudents() {
    const [students, setStudents] = useState<Student[]>(loadStudents)

    const persist = useCallback((next: Student[]) => {
        setStudents(next)
        saveStudents(next)
    }, [])

    const addStudent = useCallback((data: Omit<Student, "id" | "createdAt">) => {
        setStudents((prev) => {
            const maxId = prev.reduce((max, s) => Math.max(max, s.id), 0)
            const next = [...prev, { ...data, id: maxId + 1, createdAt: new Date().toISOString().slice(0, 10) }]
            saveStudents(next)
            return next
        })
    }, [])

    const updateStudent = useCallback((id: number, data: Omit<Student, "id" | "createdAt">) => {
        setStudents((prev) => {
            const next = prev.map((s) => (s.id === id ? { ...s, ...data } : s))
            saveStudents(next)
            return next
        })
    }, [])

    const deleteStudent = useCallback((id: number) => {
        setStudents((prev) => {
            const next = prev.filter((s) => s.id !== id)
            saveStudents(next)
            return next
        })
    }, [])

    return { students, persist, addStudent, updateStudent, deleteStudent }
}
