import { useEffect, useState } from "react"
import { Building, User, Globe, MapPin, Camera, Check, Star } from "lucide-react"

import type { Customer, FormErrors } from "../data"
import { formSchema } from "../data"
import { AppButton } from "@/shared/components/buttons/app-button"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import { Dialog, DialogContent } from "@/shared/ui/dialog"
import { AppInput } from "@/shared/components/inputs/app-input"
import { cn } from "@/shared/lib/utils"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormField } from "@/shared/components/forms/form-field"

const STATUS_CONFIG = [
  {
    value: "active" as const,
    label: "Active",
    activeClass: "bg-green-500 text-white border-green-500",
    outlineClass: "border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-500/10",
  },
  {
    value: "vip" as const,
    label: "VIP",
    activeClass: "bg-violet-600 text-white border-violet-600",
    outlineClass: "border-violet-500/50 text-violet-600 dark:text-violet-400 hover:bg-violet-500/10",
  },
  {
    value: "pending" as const,
    label: "Pending",
    activeClass: "bg-amber-500 text-white border-amber-500",
    outlineClass: "border-amber-400/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10",
  },
  {
    value: "suspended" as const,
    label: "Suspended",
    activeClass: "bg-red-500 text-white border-red-500",
    outlineClass: "border-red-500/50 text-red-600 dark:text-red-400 hover:bg-red-500/10",
  },
  {
    value: "inactive" as const,
    label: "Inactive",
    activeClass: "bg-slate-400 text-white border-slate-400",
    outlineClass:
      "border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
  },
]

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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 gap-0 [&>button]:text-white/80 [&>button]:hover:text-white [&>button>svg]:!size-4 [&>button]:top-4 [&>button]:right-4 [&>button]:z-10">

        {/* GRADIENT HEADER */}
        <div
          className="relative overflow-hidden rounded-t-[var(--radius)] px-6 pt-5 pb-7"
          style={{
            background: "linear-gradient(135deg, hsl(215 78% 22%), hsl(215 75% 38%) 50%, hsl(217 91% 55%))",
          }}
        >
          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          {/* Context badge */}
          <span className="absolute top-4 right-12 text-[10px] font-bold tracking-widest uppercase text-white/50 bg-white/10 border border-white/15 px-2 py-0.5 rounded-full">
            {customer ? "Editing" : "New"}
          </span>
          {/* Icon + Title */}
          <div className="relative flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white leading-tight">
                {customer ? "Edit Customer" : "New Customer"}
              </h2>
              <p className="text-xs text-white/55 mt-0.5">
                {customer
                  ? "Update the customer's information."
                  : "Register a new client in the system."}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 pt-6 space-y-7">

            {/* SECTION: GENERAL INFO */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
              <div className="border-l-2 border-primary/50 pl-4 bg-primary/[0.025] rounded-r py-1">
                <FormSection title="General Information" icon={Globe}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-1">

                    {/* AVATAR */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={cn(
                          "group relative w-24 h-24 rounded-full cursor-pointer p-[3px]",
                          "transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30",
                          !avatar && "animate-pulse"
                        )}
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(215 75% 38%), hsl(217 91% 60%), hsl(215 75% 50%))",
                        }}
                        onClick={() => document.getElementById("cf-avatar")?.focus()}
                      >
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-muted flex items-center justify-center">
                          {avatar ? (
                            <img src={avatar} alt={name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center gap-1 text-muted-foreground">
                              <Camera className="w-6 h-6" />
                              {name && (
                                <span className="text-[11px] font-bold uppercase leading-none">
                                  {name.slice(0, 2)}
                                </span>
                              )}
                            </div>
                          )}
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="w-5 h-5 text-white drop-shadow" />
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Avatar
                      </span>
                    </div>

                    {/* Right fields */}
                    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Full Name" htmlFor="cf-name" error={errors.name}>
                        <AppInput
                          id="cf-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="focus-visible:ring-primary/25 focus-visible:ring-2"
                        />
                      </FormField>

                      <FormField label="Email Address" htmlFor="cf-email" error={errors.email}>
                        <AppInput
                          id="cf-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@company.com"
                          className="focus-visible:ring-primary/25 focus-visible:ring-2"
                        />
                      </FormField>

                      {/* STATUS PILLS */}
                      <FormField label="Account Status" htmlFor="cf-status" className="sm:col-span-2">
                        <div className="flex flex-wrap gap-2 pt-0.5">
                          {STATUS_CONFIG.map(({ value, label, activeClass, outlineClass }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setStatus(value)}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150",
                                status === value
                                  ? cn(activeClass, "scale-[1.05] shadow-sm")
                                  : cn(outlineClass, "hover:scale-[1.02]")
                              )}
                            >
                              {status === value && <Check className="w-3 h-3" />}
                              {value === "vip" && status !== value && (
                                <Star className="w-3 h-3 opacity-60" />
                              )}
                              {label}
                            </button>
                          ))}
                        </div>
                      </FormField>

                      <FormField label="Photo URL" htmlFor="cf-avatar">
                        <AppInput
                          id="cf-avatar"
                          value={avatar}
                          onChange={(e) => setAvatar(e.target.value)}
                          placeholder="https://api.dicebear.com/..."
                          className="focus-visible:ring-primary/25 focus-visible:ring-2"
                        />
                      </FormField>
                    </div>
                  </div>
                </FormSection>
              </div>
            </div>

            {/* SECTION: CONTACT & WORK */}
            <div className="animate-fade-in-up" style={{ animationDelay: "60ms" }}>
              <div className="border-l-2 border-primary/30 pl-4 bg-primary/[0.015] rounded-r py-1">
                <FormSection
                  title="Contact & Work"
                  icon={Building}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1"
                >
                  <FormField label="Phone Number" htmlFor="cf-phone" error={errors.phone}>
                    <AppInput
                      id="cf-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 555-0100"
                      className="focus-visible:ring-primary/25 focus-visible:ring-2"
                    />
                  </FormField>
                  <FormField label="Company Name" htmlFor="cf-company" error={errors.company}>
                    <AppInput
                      id="cf-company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="focus-visible:ring-primary/25 focus-visible:ring-2"
                    />
                  </FormField>
                </FormSection>
              </div>
            </div>

            {/* SECTION: LOCATION & DETAILS */}
            <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
              <div className="border-l-2 border-primary/20 pl-4 bg-primary/[0.01] rounded-r py-1">
                <FormSection
                  title="Location & Details"
                  icon={MapPin}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1"
                >
                  <FormField label="Street Address" htmlFor="cf-address" className="sm:col-span-2">
                    <AppInput
                      id="cf-address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Street Name, Apt 4"
                      className="focus-visible:ring-primary/25 focus-visible:ring-2"
                    />
                  </FormField>
                  <FormField label="City" htmlFor="cf-city">
                    <AppInput
                      id="cf-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="focus-visible:ring-primary/25 focus-visible:ring-2"
                    />
                  </FormField>
                  <FormField label="ZIP Code" htmlFor="cf-zip">
                    <AppInput
                      id="cf-zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="00000"
                      className="focus-visible:ring-primary/25 focus-visible:ring-2"
                    />
                  </FormField>
                  <FormField label="Date of Birth" htmlFor="cf-dob" className="sm:col-span-2">
                    <DatePicker
                      value={dob}
                      onChange={setDob}
                      placeholder="Select birth date"
                      className="w-full text-foreground hover:bg-transparent bg-transparent disabled:cursor-not-allowed disabled:opacity-50 !font-normal"
                    />
                  </FormField>
                </FormSection>
              </div>
            </div>

          </div>

          {/* STICKY FOOTER */}
          <div
            className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border/50 px-6 py-4 mt-7 flex justify-end gap-2 animate-fade-in-up"
            style={{ animationDelay: "180ms" }}
          >
            <AppButton
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              className="min-w-[130px] shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all"
              style={{
                background: "linear-gradient(135deg, hsl(215 75% 38%), hsl(217 91% 60%))",
              }}
            >
              {customer ? "Update Profile" : "Create Customer"}
            </AppButton>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}
