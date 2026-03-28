import { useEffect, useState } from "react"
import { Building, User, Globe, MapPin, ImageIcon } from "lucide-react"

import type { Customer, FormErrors } from "../data"
import { formSchema } from "../data"
import { AppButton } from "@/shared/components/buttons/app-button"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import { ImageUploadZone } from "@/shared/components/forms/image-upload-zone"
import { Dialog, DialogContent, DialogFooter } from "@/shared/ui/dialog"
import { AppInput } from "@/shared/components/inputs/app-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { cn } from "@/shared/lib/utils"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormField } from "@/shared/components/forms/form-field"
import { DialogFormHeader } from "@/shared/components/forms/dialog-form-header"

interface CustomerFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: Customer | null
  onSave: (data: Omit<Customer, "id" | "createdAt">) => void
}

export function CustomerFormDialog({
  open,
  onOpenChange,
  customer,
  onSave,
}: CustomerFormDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState<Customer["status"]>("active")
  const [avatar, setAvatar] = useState("")
  const [dob, setDob] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (open) {
      setName(customer?.name ?? "")
      setEmail(customer?.email ?? "")
      setPhone(customer?.phone ?? "")
      setCompany(customer?.company ?? "")
      setStatus(customer?.status ?? "active")
      setAvatar(customer?.avatar ?? "")
      setDob(customer?.dob ?? "")
      setAddress(customer?.address ?? "")
      setCity(customer?.city ?? "")
      setZip(customer?.zip ?? "")
      setErrors({})
    }
  }, [open, customer])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = formSchema.safeParse({ name, email, phone, company, status, avatar, dob, address, city, zip })
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl [&>button]:text-primary-foreground [&>button]:hover:text-primary-foreground/80 [&>button>svg]:!size-5 [&>button]:top-5 [&>button]:right-5">
        <DialogFormHeader
          title={customer ? "Edit Customer" : "New Customer"}
          description={customer ? "Update the customer's information." : "Register a new client in the system."}
          icon={User}
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-2">

          <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
            <FormSection title="General Information" icon={Globe} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <FormField label="Full Name" htmlFor="cf-name" error={errors.name} labelSize="sm">
                <AppInput
                  id="cf-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                />
              </FormField>

              <FormField label="Email Address" htmlFor="cf-email" error={errors.email} labelSize="sm">
                <AppInput
                  id="cf-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                />
              </FormField>

              <FormField label="Account Status" htmlFor="cf-status" labelSize="sm">
                <Select value={status} onValueChange={(v) => setStatus(v as Customer["status"])}>
                  <SelectTrigger id="cf-status" className={cn(
                    "w-full transition-colors",
                    status === "active"    && "border-emerald-500/50 bg-emerald-500/5 text-emerald-700",
                    status === "inactive"  && "border-slate-400/50 bg-slate-500/5 text-slate-600",
                    status === "pending"   && "border-amber-500/50 bg-amber-500/5 text-amber-700",
                    status === "suspended" && "border-red-500/50 bg-red-500/5 text-red-700",
                    status === "vip"       && "border-violet-500/50 bg-violet-500/5 text-violet-700",
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

              <FormField label="Date of Birth" htmlFor="cf-dob" labelSize="sm">
                <DatePicker
                  value={dob}
                  onChange={setDob}
                  placeholder="Select birth date"
                  className="w-full font-normal hover:border-primary/60 focus-visible:border-primary focus-visible:ring-primary/20"
                />
              </FormField>
            </FormSection>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
            <FormSection title="Contact & Work" icon={Building} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <FormField label="Phone Number" htmlFor="cf-phone" error={errors.phone} labelSize="sm">
                <AppInput
                  id="cf-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 555-0100"
                />
              </FormField>
              <FormField label="Company Name" htmlFor="cf-company" error={errors.company} labelSize="sm">
                <AppInput
                  id="cf-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme Corp"
                />
              </FormField>
            </FormSection>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.19s" }}>
            <FormSection title="Location" icon={MapPin} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <FormField label="Street Address" htmlFor="cf-address" className="md:col-span-2" labelSize="sm">
                <AppInput
                  id="cf-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Street Name, Apt 4"
                />
              </FormField>
              <FormField label="City" htmlFor="cf-city" labelSize="sm">
                <AppInput
                  id="cf-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </FormField>
              <FormField label="ZIP Code" htmlFor="cf-zip" labelSize="sm">
                <AppInput
                  id="cf-zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="00000"
                />
              </FormField>
            </FormSection>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.26s" }}>
            <FormSection title="Profile Photo" icon={ImageIcon} className="grid grid-cols-1 gap-4">
              <ImageUploadZone
                preview={avatar || null}
                onFileSelect={(file) => setAvatar(URL.createObjectURL(file))}
                onClear={() => setAvatar("")}
                uploadLabel="Click to upload a photo"
                uploadHint="PNG, JPG, GIF — max 5 MB"
                previewAlt="Profile photo preview"
              />
            </FormSection>
          </div>

          <DialogFooter className="pt-2">
            <AppButton type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </AppButton>
            <AppButton type="submit" className="min-w-[120px] shadow-lg shadow-primary/20">
              {customer ? "Save Changes" : "Create Customer"}
            </AppButton>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}
