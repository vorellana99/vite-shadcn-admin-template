import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { BarChart2, Package, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

import type { Product } from "./product-schema"
import { formSchema, formDefaults, CATEGORIES } from "./product-schema"
import { loadProducts, saveProducts, toFormValues } from "./use-products"
import { AppInput } from "@/shared/components/inputs/app-input"
import { FormSelect } from "@/shared/components/forms/form-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { cn } from "@/shared/lib/utils"
import { FormField } from "@/shared/components/forms/form-field"
import { FormSection } from "@/shared/components/forms/form-section"
import { FormPageCard } from "@/shared/components/forms/form-page-card"

type FormValues = z.infer<typeof formSchema>

export default function ProductFormPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditing = id && id !== "new"
    const productId = isEditing ? parseInt(id, 10) : null

    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product | null>(null)

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaults,
    })

    useEffect(() => {
        const loaded = loadProducts()
        setProducts(loaded)
        if (productId) {
            const found = loaded.find(p => p.id === productId)
            if (found) {
                setProduct(found)
                reset(toFormValues(found))
            } else {
                toast.error("Product not found")
                navigate("/examples/products")
            }
        }
    }, [productId, navigate, reset])

    function handleReset() {
        reset(product ? toFormValues(product) : formDefaults)
    }

    function onSubmit(data: FormValues) {
        let nextProducts = [...products]
        if (productId && product) {
            nextProducts = products.map((p) =>
                p.id === productId ? { ...p, ...data } : p,
            )
            toast.success(`"${data.name}" has been updated.`)
        } else {
            const maxId = products.reduce((max, p) => Math.max(max, p.id), 0)
            const newProduct: Product = {
                ...data,
                id: maxId + 1,
                createdAt: new Date().toISOString().slice(0, 10),
            }
            nextProducts.push(newProduct)
            toast.success(`"${data.name}" has been created.`)
        }
        saveProducts(nextProducts)
        navigate("/examples/products")
    }

    function onInvalid() {
        toast.error("Please correct the errors before saving.")
    }

    return (
        <FormPageCard
            icon={Package}
            title={isEditing ? "Edit Product" : "New Product"}
            subtitle={isEditing ? "Update the product information." : "Register a new product in the catalog."}
            formId="product-form"
            submitText={isEditing ? "Save Changes" : "Create Product"}
            onReset={handleReset}
        >
            <form id="product-form" onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-8">

                <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <FormSection title="Product Info" icon={Package} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Name" htmlFor="pf-name" error={errors.name?.message} labelSize="sm" className="md:col-span-2">
                            <AppInput id="pf-name" {...register("name")} placeholder="e.g. Wireless Headphones" />
                        </FormField>
                        <FormField label="SKU" htmlFor="pf-sku" error={errors.sku?.message} labelSize="sm">
                            <AppInput id="pf-sku" {...register("sku")} placeholder="XX-000" />
                        </FormField>
                        <FormField label="Category" htmlFor="pf-category" error={errors.category?.message} labelSize="sm">
                            <Controller
                                control={control}
                                name="category"
                                render={({ field }) => (
                                    <FormSelect
                                        id="pf-category"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        placeholder="Select category"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </FormSelect>
                                )}
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                    <FormSection title="Pricing & Inventory" icon={BarChart2} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Price (USD)" htmlFor="pf-price" error={errors.price?.message} labelSize="sm">
                            <AppInput
                                id="pf-price"
                                type="number"
                                step="0.01"
                                min="0"
                                {...register("price", { valueAsNumber: true })}
                                placeholder="0.00"
                            />
                        </FormField>
                        <FormField label="Stock" htmlFor="pf-stock" error={errors.stock?.message} labelSize="sm">
                            <AppInput
                                id="pf-stock"
                                type="number"
                                min="0"
                                {...register("stock", { valueAsNumber: true })}
                                placeholder="0"
                            />
                        </FormField>
                    </FormSection>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.19s" }}>
                    <FormSection title="System Status" icon={ShieldCheck} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Product Status" htmlFor="pf-status" labelSize="sm">
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="pf-status" className={cn(
                                            "w-full transition-colors",
                                            field.value === "active"       && "border-emerald-500/50 bg-emerald-500/5 text-emerald-700",
                                            field.value === "low_stock"    && "border-amber-500/50 bg-amber-500/5 text-amber-700",
                                            field.value === "out_of_stock" && "border-red-500/50 bg-red-500/5 text-red-700",
                                            field.value === "discontinued" && "border-slate-400/50 bg-slate-500/5 text-slate-600",
                                            field.value === "coming_soon"  && "border-violet-500/50 bg-violet-500/5 text-violet-700",
                                        )}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active"       className="text-emerald-700 focus:bg-emerald-500/8">Active</SelectItem>
                                            <SelectItem value="low_stock"    className="text-amber-700 focus:bg-amber-500/8">Low Stock</SelectItem>
                                            <SelectItem value="out_of_stock" className="text-red-700 focus:bg-red-500/8">Out of Stock</SelectItem>
                                            <SelectItem value="discontinued" className="text-slate-600 focus:bg-slate-500/8">Discontinued</SelectItem>
                                            <SelectItem value="coming_soon"  className="text-violet-700 focus:bg-violet-500/8">Coming Soon</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </FormField>
                    </FormSection>
                </div>

            </form>
        </FormPageCard>
    )
}
