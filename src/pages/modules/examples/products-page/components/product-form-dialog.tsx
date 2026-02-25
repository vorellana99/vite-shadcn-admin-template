import { useEffect, useState } from "react"

import type { Product, FormErrors } from "../data"
import { formSchema, categories } from "../data"
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

interface ProductFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
  onSave: (data: Omit<Product, "id" | "createdAt">) => void
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onSave,
}: ProductFormDialogProps) {
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [status, setStatus] = useState<Product["status"]>("active")
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (open) {
      setName(product?.name ?? "")
      setSku(product?.sku ?? "")
      setCategory(product?.category ?? categories[0])
      setPrice(product ? String(product.price) : "")
      setStock(product ? String(product.stock) : "")
      setStatus(product?.status ?? "active")
      setErrors({})
    }
  }, [open, product])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = formSchema.safeParse({
      name,
      sku,
      category,
      price: Number(price),
      stock: Number(stock),
      status,
    })
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "New Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Update the product information below." : "Fill in the details to create a new product."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="pf-name">Name</Label>
            <Input id="pf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" />
            {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="pf-sku">SKU</Label>
              <Input id="pf-sku" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="XX-000" />
              {errors.sku && <p className="text-destructive text-xs">{errors.sku}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pf-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="pf-category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-destructive text-xs">{errors.category}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="pf-price">Price</Label>
              <Input id="pf-price" type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
              {errors.price && <p className="text-destructive text-xs">{errors.price}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pf-stock">Stock</Label>
              <Input id="pf-stock" type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" />
              {errors.stock && <p className="text-destructive text-xs">{errors.stock}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="pf-status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as "active" | "discontinued")}>
              <SelectTrigger id="pf-status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
                <SelectItem value="coming_soon">Coming Soon</SelectItem>
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
