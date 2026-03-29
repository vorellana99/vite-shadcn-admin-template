import { useState } from "react"
import { toast } from "sonner"

import type { Product } from "./product-schema"
import { useProducts } from "./use-products"
import { ProductFormDialog } from "./components/product-form-dialog"
import { ProductTable } from "./components/product-table"

export default function ProductsPage() {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    function handleAdd() {
        setEditingProduct(null)
        setDialogOpen(true)
    }

    function handleEdit(product: Product) {
        setEditingProduct(product)
        setDialogOpen(true)
    }

    function handleDelete(product: Product) {
        deleteProduct(product.id)
        toast.success(`"${product.name}" has been deleted.`)
    }

    function handleSave(data: Omit<Product, "id" | "createdAt">) {
        if (editingProduct) {
            updateProduct(editingProduct.id, data)
            toast.success(`"${data.name}" has been updated.`)
        } else {
            addProduct(data)
            toast.success(`"${data.name}" has been created.`)
        }
    }

    return (
        <>
            <ProductTable
                products={products}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <ProductFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                product={editingProduct}
                onSave={handleSave}
            />
        </>
    )
}
