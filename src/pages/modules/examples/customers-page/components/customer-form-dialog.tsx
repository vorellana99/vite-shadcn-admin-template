import { useEffect, useState } from "react"

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
  const [status, setStatus] = useState<"active" | "inactive">("active")
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (open) {
      setName(customer?.name ?? "")
      setEmail(customer?.email ?? "")
      setPhone(customer?.phone ?? "")
      setCompany(customer?.company ?? "")
      setStatus(customer?.status ?? "active")
      setErrors({})
    }
  }, [open, customer])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = formSchema.safeParse({ name, email, phone, company, status })
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{customer ? "Edit Customer" : "New Customer"}</DialogTitle>
          <DialogDescription>
            {customer ? "Update the customer information below." : "Fill in the details to create a new customer."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cf-name">Name</Label>
            <Input id="cf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cf-email">Email</Label>
            <Input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@company.com" />
            {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cf-phone">Phone</Label>
              <Input id="cf-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555-0100" />
              {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cf-company">Company</Label>
              <Input id="cf-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
              {errors.company && <p className="text-destructive text-xs">{errors.company}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cf-status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as "active" | "inactive")}>
              <SelectTrigger id="cf-status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <AppButton type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </AppButton>
            <AppButton type="submit">Save</AppButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
