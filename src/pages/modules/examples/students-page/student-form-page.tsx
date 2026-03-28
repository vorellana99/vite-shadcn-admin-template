import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ImageIcon, MapPin, ShieldCheck, User } from "lucide-react"
import { toast } from "sonner"

import type { Student, FormErrors } from "./data"
import { loadStudents, saveStudents, formSchema } from "./data"
import { AppButton } from "@/shared/components/buttons/app-button"
import { AppInput } from "@/shared/components/inputs/app-input"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { cn } from "@/shared/lib/utils"
import { FormField } from "@/shared/components/forms/form-field"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormPageCard } from "@/shared/components/forms/form-page-card"


const INITIAL_STATE = {
    name: "",
    email: "",
    phone: "",
    school: "",
    status: "active" as Student["status"],
    avatar: "",
    dob: "",
    address: "",
    city: "",
    zip: "",
}

export default function StudentFormPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditing = id && id !== "new"
    const studentId = isEditing ? parseInt(id, 10) : null

    const [students, setStudents] = useState<Student[]>([])
    const [student, setStudent] = useState<Student | null>(null)
    const [fields, setFields] = useState(INITIAL_STATE)
    const [errors, setErrors] = useState<FormErrors>({})
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    function set(key: keyof typeof INITIAL_STATE) {
        return (value: string) => setFields((prev) => ({ ...prev, [key]: value }))
    }

    useEffect(() => {
        const loaded = loadStudents()
        setStudents(loaded)
        if (studentId) {
            const found = loaded.find(s => s.id === studentId)
            if (found) {
                setStudent(found)
                setFields({
                    name: found.name ?? "",
                    email: found.email ?? "",
                    phone: found.phone ?? "",
                    school: found.school ?? "",
                    status: found.status ?? "active",
                    avatar: found.avatar ?? "",
                    dob: found.dob ?? "",
                    address: found.address ?? "",
                    city: found.city ?? "",
                    zip: found.zip ?? "",
                })
            } else {
                toast.error("Student not found")
                navigate("/examples/students")
            }
        }
    }, [studentId, navigate])

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
        }
    }

    function handleImageClear() {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    function handleReset() {
        handleImageClear()
        setFields(student ? {
            name: student.name ?? "",
            email: student.email ?? "",
            phone: student.phone ?? "",
            school: student.school ?? "",
            status: student.status ?? "active",
            avatar: student.avatar ?? "",
            dob: student.dob ?? "",
            address: student.address ?? "",
            city: student.city ?? "",
            zip: student.zip ?? "",
        } : INITIAL_STATE)
        setErrors({})
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const result = formSchema.safeParse(fields)
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
        <FormPageCard
            icon={User}
            title={isEditing ? `Edit Student: ${fields.name}` : "New Student"}
            subtitle={isEditing ? "Update the student's information." : "Register a new student in the system."}
            formId="student-form"
            submitText={isEditing ? "Save Changes" : "Create Student"}
            onReset={handleReset}
        >
            <form id="student-form" onSubmit={handleSubmit} className="flex flex-col gap-8">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Identity Information" icon={User} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Full Name" htmlFor="sf-name" error={errors.name} labelSize="sm">
                            <AppInput
                                id="sf-name"
                                value={fields.name}
                                onChange={(e) => set("name")(e.target.value)}
                                placeholder="e.g. John Doe"
                            />
                        </FormField>
                        <FormField label="Email Address" htmlFor="sf-email" error={errors.email} labelSize="sm">
                            <AppInput
                                id="sf-email"
                                type="email"
                                value={fields.email}
                                onChange={(e) => set("email")(e.target.value)}
                                placeholder="john@student.test"
                            />
                        </FormField>
                        <FormField label="Date of Birth" htmlFor="sf-dob" labelSize="sm">
                            <DatePicker
                                value={fields.dob}
                                onChange={set("dob")}
                                placeholder="Select birth date"
                                className="w-full font-normal hover:border-primary/60 focus-visible:border-primary focus-visible:ring-primary/20"
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Contact & Location" icon={MapPin} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Phone Number" htmlFor="sf-phone" error={errors.phone} labelSize="sm">
                            <AppInput
                                id="sf-phone"
                                value={fields.phone}
                                onChange={(e) => set("phone")(e.target.value)}
                                placeholder="+1 555-0100"
                            />
                        </FormField>
                        <FormField label="School Name" htmlFor="sf-school" error={errors.school} labelSize="sm">
                            <AppInput
                                id="sf-school"
                                value={fields.school}
                                onChange={(e) => set("school")(e.target.value)}
                                placeholder="e.g. State University"
                            />
                        </FormField>
                        <FormField label="Street Address" htmlFor="sf-address" className="md:col-span-2" labelSize="sm">
                            <AppInput
                                id="sf-address"
                                value={fields.address}
                                onChange={(e) => set("address")(e.target.value)}
                                placeholder="123 Street Name, Apt 4"
                            />
                        </FormField>
                        <FormField label="City" htmlFor="sf-city" labelSize="sm">
                            <AppInput
                                id="sf-city"
                                value={fields.city}
                                onChange={(e) => set("city")(e.target.value)}
                                placeholder="City"
                            />
                        </FormField>
                        <FormField label="ZIP Code" htmlFor="sf-zip" labelSize="sm">
                            <AppInput
                                id="sf-zip"
                                value={fields.zip}
                                onChange={(e) => set("zip")(e.target.value)}
                                placeholder="00000"
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.19s" }}>
                    <FormSection title="System Status" icon={ShieldCheck} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Account Status" htmlFor="sf-status" labelSize="sm">
                            <Select value={fields.status} onValueChange={(v) => set("status")(v)}>
                                <SelectTrigger id="sf-status" className={cn(
                                    "w-full transition-colors",
                                    fields.status === "active"    && "border-emerald-500/50 bg-emerald-500/5 text-emerald-700",
                                    fields.status === "inactive"  && "border-slate-400/50 bg-slate-500/5 text-slate-600",
                                    fields.status === "pending"   && "border-amber-500/50 bg-amber-500/5 text-amber-700",
                                    fields.status === "suspended" && "border-red-500/50 bg-red-500/5 text-red-700",
                                    fields.status === "vip"       && "border-violet-500/50 bg-violet-500/5 text-violet-700",
                                )}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active"    className="text-emerald-700 focus:bg-emerald-500/8">Active</SelectItem>
                                    <SelectItem value="inactive"  className="text-slate-600 focus:bg-slate-500/8">Inactive</SelectItem>
                                    <SelectItem value="pending"   className="text-amber-700 focus:bg-amber-500/8">Pending</SelectItem>
                                    <SelectItem value="suspended" className="text-red-700 focus:bg-red-500/8">Suspended</SelectItem>
                                    <SelectItem value="vip"       className="text-violet-700 focus:bg-violet-500/8">VIP</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.26s" }}>
                    <FormSection title="Profile Photo" icon={ImageIcon} className="grid grid-cols-1 gap-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        {imagePreview ? (
                            <div className="relative group rounded-lg overflow-hidden border border-slate-300 bg-muted/20">
                                <img
                                    src={imagePreview}
                                    alt="Profile photo preview"
                                    className="w-full max-h-64 object-contain"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <AppButton
                                        type="button"
                                        variant="outline"
                                        className="bg-white/90 hover:bg-white text-sm"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Change
                                    </AppButton>
                                    <AppButton
                                        type="button"
                                        variant="outline"
                                        className="bg-white/90 hover:bg-white text-sm text-destructive border-destructive/40"
                                        onClick={handleImageClear}
                                    >
                                        Remove
                                    </AppButton>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-lg border-2 border-dashed border-slate-300 hover:border-primary/60 hover:bg-primary/[0.02] transition-colors cursor-pointer text-muted-foreground"
                            >
                                <ImageIcon className="w-8 h-8 opacity-50" />
                                <div className="text-center">
                                    <p className="text-sm font-medium">Click to upload a photo</p>
                                    <p className="text-xs mt-0.5 opacity-70">PNG, JPG, WEBP — max 10 MB</p>
                                </div>
                            </button>
                        )}
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
