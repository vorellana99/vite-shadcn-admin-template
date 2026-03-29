import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Building2, ImageIcon, ShieldCheck, User } from "lucide-react"
import { toast } from "sonner"

import type { Customer } from "./customer-schema"
import { formSchema, formDefaults } from "./customer-schema"
import { loadCustomers, saveCustomers, toFormValues } from "./use-customers"
import { AppInput } from "@/shared/components/inputs/app-input"
import { ImageUploadZone } from "@/shared/components/forms/image-upload-zone"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { cn } from "@/shared/lib/utils"
import { FormField } from "@/shared/components/forms/form-field"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormPageCard } from "@/shared/components/forms/form-page-card"

type FormValues = z.infer<typeof formSchema>

export default function CustomerFormPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditing = id && id !== "new"
    const customerId = isEditing ? parseInt(id, 10) : null

    const [customers, setCustomers] = useState<Customer[]>([])
    const [customer, setCustomer] = useState<Customer | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaults,
    })

    useEffect(() => {
        const loaded = loadCustomers()
        setCustomers(loaded)
        if (customerId) {
            const found = loaded.find(c => c.id === customerId)
            if (found) {
                setCustomer(found)
                reset(toFormValues(found))
            } else {
                toast.error("Customer not found")
                navigate("/examples/customers")
            }
        }
    }, [customerId, navigate, reset])

    function handleReset() {
        setImagePreview(null)
        reset(customer ? toFormValues(customer) : formDefaults)
    }

    function onSubmit(data: FormValues) {
        let nextCustomers = [...customers]
        if (customerId && customer) {
            nextCustomers = customers.map((c) =>
                c.id === customerId ? { ...c, ...data } : c,
            )
            toast.success(`"${data.name}" has been updated.`)
        } else {
            const maxId = customers.reduce((max, c) => Math.max(max, c.id), 0)
            const newCustomer: Customer = {
                ...data,
                id: maxId + 1,
                createdAt: new Date().toISOString().slice(0, 10),
            }
            nextCustomers.push(newCustomer)
            toast.success(`"${data.name}" has been created.`)
        }
        saveCustomers(nextCustomers)
        navigate("/examples/customers")
    }

    function onInvalid() {
        toast.error("Please correct the errors before saving.")
    }

    return (
        <FormPageCard
            icon={User}
            title={isEditing ? "Edit Customer" : "New Customer"}
            subtitle={isEditing ? "Update the customer's information." : "Register a new customer in the system."}
            formId="customer-form"
            submitText={isEditing ? "Save Changes" : "Create Customer"}
            onReset={handleReset}
        >
            <form id="customer-form" onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Identity Information" icon={User} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Full Name" htmlFor="cf-name" error={errors.name?.message} labelSize="sm">
                            <AppInput id="cf-name" {...register("name")} placeholder="e.g. Jane Smith" />
                        </FormField>
                        <FormField label="Email Address" htmlFor="cf-email" error={errors.email?.message} labelSize="sm">
                            <AppInput id="cf-email" type="email" {...register("email")} placeholder="jane@example.com" />
                        </FormField>
                        <FormField label="Date of Birth" htmlFor="cf-dob" labelSize="sm">
                            <Controller
                                control={control}
                                name="dob"
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        placeholder="Select birth date"
                                        className="w-full font-normal hover:border-primary/60 focus-visible:border-primary focus-visible:ring-primary/20"
                                    />
                                )}
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Contact & Company" icon={Building2} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Phone Number" htmlFor="cf-phone" error={errors.phone?.message} labelSize="sm">
                            <AppInput id="cf-phone" {...register("phone")} placeholder="+1 555-0100" />
                        </FormField>
                        <FormField label="Company" htmlFor="cf-company" error={errors.company?.message} labelSize="sm">
                            <AppInput id="cf-company" {...register("company")} placeholder="e.g. Acme Corp" />
                        </FormField>
                        <FormField label="Street Address" htmlFor="cf-address" className="md:col-span-2" labelSize="sm">
                            <AppInput id="cf-address" {...register("address")} placeholder="123 Street Name, Apt 4" />
                        </FormField>
                        <FormField label="City" htmlFor="cf-city" labelSize="sm">
                            <AppInput id="cf-city" {...register("city")} placeholder="City" />
                        </FormField>
                        <FormField label="ZIP Code" htmlFor="cf-zip" labelSize="sm">
                            <AppInput id="cf-zip" {...register("zip")} placeholder="00000" />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.19s" }}>
                    <FormSection title="System Status" icon={ShieldCheck} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Account Status" htmlFor="cf-status" labelSize="sm">
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="cf-status" className={cn(
                                            "w-full transition-colors",
                                            field.value === "active"    && "border-emerald-500/50 bg-emerald-500/5 text-emerald-700",
                                            field.value === "inactive"  && "border-slate-400/50 bg-slate-500/5 text-slate-600",
                                            field.value === "pending"   && "border-amber-500/50 bg-amber-500/5 text-amber-700",
                                            field.value === "suspended" && "border-red-500/50 bg-red-500/5 text-red-700",
                                            field.value === "vip"       && "border-violet-500/50 bg-violet-500/5 text-violet-700",
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
                                )}
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.26s" }}>
                    <FormSection title="Profile Photo" icon={ImageIcon} className="grid grid-cols-1 gap-4">
                        <ImageUploadZone
                            preview={imagePreview}
                            onFileSelect={(file) => setImagePreview(URL.createObjectURL(file))}
                            onClear={() => setImagePreview(null)}
                            uploadLabel="Click to upload a photo"
                            uploadHint="PNG, JPG, WEBP — max 10 MB"
                            previewAlt="Profile photo preview"
                        />
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
