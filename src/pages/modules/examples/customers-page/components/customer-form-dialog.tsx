import { useEffect, useState, useRef } from "react"
import { Building, Calendar, User, Camera, Globe, MapPin } from "lucide-react"

import type { Customer, FormErrors } from "../data"
import { formSchema } from "../data"
import { AppButton } from "@/shared/components/buttons/app-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { cn } from "@/shared/lib/utils"

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
  const dobInputRef = useRef<HTMLInputElement>(null)

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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto [&>button]:text-primary-foreground [&>button]:hover:text-primary-foreground/80 [&>button>svg]:!size-5 [&>button]:top-5 [&>button]:right-5">
        {/* Customized Header with Primary Background */}
        <DialogHeader className="-mt-6 -mx-6 px-6 py-6 pb-6 bg-primary text-primary-foreground rounded-t-lg relative">
          <div className="flex items-center gap-4">
            <div className="bg-primary-foreground/20 p-3 rounded-xl shadow-sm">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-primary-foreground">
                {customer ? "Edit Customer" : "New Customer"}
              </DialogTitle>
              <DialogDescription className="mt-1 text-primary-foreground/80">
                {customer ? "Update the customer's information." : "Register a new client in the system."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-10 md:space-y-8 mt-4">
          {/* SECTION: GENERAL INFO */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              General Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 flex flex-col items-center justify-center gap-3 bg-muted/30 rounded-lg p-4 border border-dashed border-muted-foreground/20">
                <Avatar className="h-24 w-24 border-2 border-background shadow-md">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="bg-primary/5 text-primary text-2xl font-bold">
                    {name ? name.substring(0, 2).toUpperCase() : <Camera className="w-8 h-8 opacity-40" />}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[10px] text-muted-foreground font-medium text-center">AVATAR PREVIEW</span>
              </div>

              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cf-name" className="text-xs font-bold">Full Name</Label>
                  <Input id="cf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" />
                  {errors.name && <p className="text-destructive text-[10px] font-medium">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="cf-email" className="text-xs font-bold">Email Address</Label>
                  <Input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" />
                  {errors.email && <p className="text-destructive text-[10px] font-medium">{errors.email}</p>}
                </div>

                <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="cf-status" className="text-xs font-bold">Account Status</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as Customer["status"])}>
                    <SelectTrigger id="cf-status" className={cn(
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
                </div>

                <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="cf-avatar" className="text-xs font-bold">Photo URL</Label>
                  <Input id="cf-avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://api.dicebear.com/..." />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: CONTACT & COMPANY */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <Building className="w-4 h-4" />
              Contact & Work
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="cf-phone" className="text-xs font-bold">Phone Number</Label>
                <Input id="cf-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555-0100" />
                {errors.phone && <p className="text-destructive text-[10px] font-medium">{errors.phone}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="cf-company" className="text-xs font-bold">Company Name</Label>
                <Input id="cf-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Acme Corp" />
                {errors.company && <p className="text-destructive text-[10px] font-medium">{errors.company}</p>}
              </div>
            </div>
          </div>

          {/* SECTION: LOCATION & PERSONAL */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              Location & Details
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="cf-address" className="text-xs font-bold">Street Address</Label>
                <Input id="cf-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Street Name, Apt 4" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="cf-city" className="text-xs font-bold">City</Label>
                <Input id="cf-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="cf-zip" className="text-xs font-bold">ZIP Code</Label>
                <Input id="cf-zip" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="00000" />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="cf-dob" className="text-xs font-bold">Date of Birth</Label>
                <div className="relative isolate group">
                  <Calendar
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground z-10 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => dobInputRef.current?.showPicker()}
                  />
                  <Input
                    ref={dobInputRef}
                    id="cf-dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="pl-9 [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <AppButton type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </AppButton>
            <AppButton type="submit" className="min-w-[120px] shadow-lg shadow-primary/20">
              {customer ? "Update Profile" : "Create Customer"}
            </AppButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

