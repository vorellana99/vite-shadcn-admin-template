import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, User } from "lucide-react"
import { toast } from "sonner"

import type { Student, FormErrors } from "./data"
import { loadStudents, saveStudents, formSchema } from "./data"
import { AppButton } from "@/shared/components/buttons/app-button"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import { AppInput } from "@/shared/components/inputs/app-input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { cn } from "@/shared/lib/utils"
import { FormField } from "@/shared/components/forms/form-field"
import { AvatarUpload } from "@/shared/components/forms/avatar-upload"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card"

export default function StudentFormPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditing = id && id !== "new"
    const studentId = isEditing ? parseInt(id, 10) : null

    const [students, setStudents] = useState<Student[]>([])
    const [student, setStudent] = useState<Student | null>(null)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [school, setSchool] = useState("")
    const [status, setStatus] = useState<Student["status"]>("active")
    const [avatar, setAvatar] = useState("")
    const [dob, setDob] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zip, setZip] = useState("")
    const [errors, setErrors] = useState<FormErrors>({})

    const initialValues = {
        name: "", email: "", phone: "", school: "", status: "active" as Student["status"],
        avatar: "", dob: "", address: "", city: "", zip: "",
    }

    useEffect(() => {
        const loaded = loadStudents()
        setStudents(loaded)
        if (studentId) {
            const found = loaded.find(s => s.id === studentId)
            if (found) {
                setStudent(found)
                setName(found.name ?? "")
                setEmail(found.email ?? "")
                setPhone(found.phone ?? "")
                setSchool(found.school ?? "")
                setStatus(found.status ?? "active")
                setAvatar(found.avatar ?? "")
                setDob(found.dob ?? "")
                setAddress(found.address ?? "")
                setCity(found.city ?? "")
                setZip(found.zip ?? "")
            } else {
                toast.error("Student not found")
                navigate("/examples/students")
            }
        }
    }, [studentId, navigate])

    function handleReset() {
        if (student) {
            setName(student.name ?? "")
            setEmail(student.email ?? "")
            setPhone(student.phone ?? "")
            setSchool(student.school ?? "")
            setStatus(student.status ?? "active")
            setAvatar(student.avatar ?? "")
            setDob(student.dob ?? "")
            setAddress(student.address ?? "")
            setCity(student.city ?? "")
            setZip(student.zip ?? "")
        } else {
            setName(initialValues.name)
            setEmail(initialValues.email)
            setPhone(initialValues.phone)
            setSchool(initialValues.school)
            setStatus(initialValues.status)
            setAvatar(initialValues.avatar)
            setDob(initialValues.dob)
            setAddress(initialValues.address)
            setCity(initialValues.city)
            setZip(initialValues.zip)
        }
        setErrors({})
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const result = formSchema.safeParse({ name, email, phone, school, status, avatar, dob, address, city, zip })
        if (!result.success) {
            const fieldErrors: FormErrors = {}
            for (const issue of result.error.issues) {
                const key = issue.path[0] as keyof FormErrors
                if (!fieldErrors[key]) fieldErrors[key] = issue.message
            }
            setErrors(fieldErrors)
            toast.error("Please correct the errors before saving.")
            return
        }

        const data = result.data
        let nextStudents = [...students]

        if (studentId && student) {
            nextStudents = students.map((s) =>
                s.id === studentId ? { ...s, ...data } : s,
            )
            toast.success(`"${data.name}" has been updated.`)
        } else {
            const maxId = students.reduce((max, s) => Math.max(max, s.id), 0)
            const newStudent: Student = {
                ...data,
                id: maxId + 1,
                createdAt: new Date().toISOString().slice(0, 10),
            }
            nextStudents.push(newStudent)
            toast.success(`"${data.name}" has been created.`)
        }

        saveStudents(nextStudents)
        navigate("/examples/students")
    }

    return (
        <div className="flex-1 w-full h-full px-4 md:px-6 py-4 md:py-6 overflow-y-auto">
            <div className="flex items-center gap-4 mb-6 max-w-4xl mx-auto">
                <AppButton type="button" variant="ghost" size="icon" onClick={() => navigate("/examples/students")} className="shrink-0 group">
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                </AppButton>
                <div className="font-medium text-sm text-muted-foreground mr-auto">
                    Back to Students
                </div>
            </div>

            <Card className="w-full max-w-4xl mx-auto shadow-md border-0 overflow-hidden pt-0 pb-0 gap-0">
                <CardHeader className="bg-primary/90 text-primary-foreground px-6 py-4 flex flex-row items-center gap-3">
                    <User className="w-6 h-6 text-primary-foreground" />
                    <div>
                        <CardTitle className="text-xl font-bold">
                            {isEditing ? `Edit Student: ${name}` : "New Student"}
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-8">
                    <form
                        id="student-form"
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-10"
                    >
                        {/* Group: Identity */}
                        <div className="flex flex-col gap-5">
                            <h3 className="text-sm font-semibold text-foreground border-b pb-2">Identity Information</h3>
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Left side: Avatar */}
                                <div className="flex-shrink-0 flex justify-center w-full md:w-auto md:pt-4">
                                    <AvatarUpload src={avatar} alt={name} fallbackText={name} />
                                </div>

                                {/* Right side: Fields */}
                                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    <FormField className="md:col-span-2" labelSize="sm" label="Full Name" htmlFor="sf-name" error={errors.name}>
                                        <AppInput id="sf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" />
                                    </FormField>
                                    <FormField labelSize="sm" label="Email Address" htmlFor="sf-email" error={errors.email}>
                                        <AppInput id="sf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@student.test" />
                                    </FormField>
                                    <FormField labelSize="sm" label="Date of Birth" htmlFor="sf-dob">
                                        <DatePicker
                                            value={dob}
                                            onChange={setDob}
                                            placeholder="Select birth date"
                                            className="w-full font-normal"
                                        />
                                    </FormField>
                                    <FormField className="md:col-span-2" labelSize="sm" label="Photo URL" htmlFor="sf-avatar">
                                        <AppInput id="sf-avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://api.dicebear.com/..." />
                                    </FormField>
                                </div>
                            </div>
                        </div>

                        {/* Group: Contact & Address */}
                        <div className="flex flex-col gap-5">
                            <h3 className="text-sm font-semibold text-foreground border-b pb-2">Contact & Location</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField labelSize="sm" label="Phone Number" htmlFor="sf-phone" error={errors.phone}>
                                    <AppInput id="sf-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555-0100" />
                                </FormField>
                                <FormField labelSize="sm" label="School Name" htmlFor="sf-school" error={errors.school}>
                                    <AppInput id="sf-school" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="e.g. State University" />
                                </FormField>
                                <FormField className="md:col-span-2" labelSize="sm" label="Street Address" htmlFor="sf-address">
                                    <AppInput id="sf-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Street Name, Apt 4" />
                                </FormField>
                                <FormField labelSize="sm" label="City" htmlFor="sf-city">
                                    <AppInput id="sf-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                                </FormField>
                                <FormField labelSize="sm" label="ZIP Code" htmlFor="sf-zip">
                                    <AppInput id="sf-zip" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="00000" />
                                </FormField>
                            </div>
                        </div>

                        {/* Group: System */}
                        <div className="flex flex-col gap-5">
                            <h3 className="text-sm font-semibold text-foreground border-b pb-2">System Status</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField labelSize="sm" label="Account Status" htmlFor="sf-status">
                                    <Select value={status} onValueChange={(v) => setStatus(v as Student["status"])}>
                                        <SelectTrigger id="sf-status" className={cn(
                                            "w-full transition-colors h-10",
                                            status === "active" && "border-green-500/50 bg-green-500/5 text-green-700 dark:text-green-400 font-medium",
                                            status === "vip" && "border-violet-500/50 bg-violet-500/5 text-violet-700 dark:text-violet-400 font-medium",
                                            status === "suspended" && "border-red-500/50 bg-red-500/5 text-red-700 dark:text-red-400 font-medium",
                                            status === "inactive" && "border-gray-500/50 bg-gray-500/5 text-gray-700 dark:text-gray-400 font-medium",
                                            status === "pending" && "border-amber-500/50 bg-amber-500/5 text-amber-700 dark:text-amber-400 font-medium"
                                        )}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="suspended">Suspended</SelectItem>
                                            <SelectItem value="vip">VIP</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormField>
                            </div>
                        </div>

                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-end gap-3 pt-6 pb-6 border-t mt-4 bg-muted/20">
                    <AppButton type="button" variant="outline" onClick={handleReset} className="min-w-[100px]">
                        Reset
                    </AppButton>
                    <AppButton type="submit" form="student-form" className="shadow-lg shadow-primary/20 min-w-[140px]">
                        {isEditing ? "Save Changes" : "Create Student"}
                    </AppButton>
                </CardFooter>
            </Card>
        </div>
    )
}
