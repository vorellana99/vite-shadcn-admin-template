import { useEffect, useState } from "react"
import { Building, User, Globe, MapPin } from "lucide-react"

import type { Student, FormErrors } from "../data"
import { formSchema } from "../data"
import { AppButton } from "@/shared/components/buttons/app-button"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/shared/ui/dialog"
import { AppInput } from "@/shared/components/inputs/app-input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { cn } from "@/shared/lib/utils"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormField } from "@/shared/components/forms/form-field"
import { DialogFormHeader } from "@/shared/components/forms/dialog-form-header"
import { AvatarUpload } from "@/shared/components/forms/avatar-upload"

interface StudentFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    student: Student | null
    onSave: (data: Omit<Student, "id" | "createdAt">) => void
}

export function StudentFormDialog({
    open,
    onOpenChange,
    student,
    onSave,
}: StudentFormDialogProps) {
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

    useEffect(() => {
        if (open) {
            setName(student?.name ?? "")
            setEmail(student?.email ?? "")
            setPhone(student?.phone ?? "")
            setSchool(student?.school ?? "")
            setStatus(student?.status ?? "active")
            setAvatar(student?.avatar ?? "")
            setDob(student?.dob ?? "")
            setAddress(student?.address ?? "")
            setCity(student?.city ?? "")
            setZip(student?.zip ?? "")
            setErrors({})
        }
    }, [open, student])

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
            return
        }
        onSave(result.data)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto [&>button]:text-primary-foreground [&>button]:hover:text-primary-foreground/80 [&>button>svg]:!size-5 [&>button]:top-5 [&>button]:right-5">
                <DialogFormHeader
                    title={student ? "Edit Student" : "New Student"}
                    description={student ? "Update the student's information." : "Register a new student in the system."}
                    icon={User}
                />

                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-8 mt-2">
                    {/* SECTION: GENERAL INFO */}
                    <FormSection title="General Information" icon={Globe}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <AvatarUpload src={avatar} alt={name} fallbackText={name} />

                            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField label="Full Name" htmlFor="sf-name" error={errors.name}>
                                    <AppInput id="sf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" />
                                </FormField>

                                <FormField label="Email Address" htmlFor="sf-email" error={errors.email}>
                                    <AppInput id="sf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@student.test" />
                                </FormField>

                                <FormField label="Account Status" htmlFor="sf-status">
                                    <Select value={status} onValueChange={(v) => setStatus(v as Student["status"])}>
                                        <SelectTrigger id="sf-status" className={cn(
                                            "w-full transition-colors",
                                            status === "active" && "border-green-500/50 bg-green-500/5",
                                            status === "vip" && "border-violet-500/50 bg-violet-500/5",
                                            status === "suspended" && "border-red-500/50 bg-red-500/5",
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

                                <FormField label="Photo URL" htmlFor="sf-avatar">
                                    <AppInput id="sf-avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://api.dicebear.com/..." />
                                </FormField>
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION: CONTACT & SCHOOL */}
                    <FormSection title="Contact & School" icon={Building} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Phone Number" htmlFor="sf-phone" error={errors.phone}>
                            <AppInput id="sf-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555-0100" />
                        </FormField>
                        <FormField label="School Name" htmlFor="sf-school" error={errors.school}>
                            <AppInput id="sf-school" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="e.g. State University" />
                        </FormField>
                    </FormSection>

                    {/* SECTION: LOCATION & PERSONAL */}
                    <FormSection title="Location & Details" icon={MapPin} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormField label="Street Address" htmlFor="sf-address" className="sm:col-span-2">
                            <AppInput id="sf-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Street Name, Apt 4" />
                        </FormField>
                        <FormField label="City" htmlFor="sf-city">
                            <AppInput id="sf-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                        </FormField>
                        <FormField label="ZIP Code" htmlFor="sf-zip">
                            <AppInput id="sf-zip" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="00000" />
                        </FormField>
                        <FormField label="Date of Birth" htmlFor="sf-dob" className="sm:col-span-2">
                            <DatePicker
                                value={dob}
                                onChange={setDob}
                                placeholder="Select birth date"
                                className="w-full text-foreground hover:bg-transparent bg-transparent disabled:cursor-not-allowed disabled:opacity-50 !font-normal"
                            />
                        </FormField>
                    </FormSection>

                    <DialogFooter className="pt-2">
                        <AppButton type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </AppButton>
                        <AppButton type="submit" className="min-w-[120px] shadow-lg shadow-primary/20">
                            {student ? "Update Profile" : "Create Student"}
                        </AppButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
