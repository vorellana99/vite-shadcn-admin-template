import { useCallback, useState } from "react"
import { toast } from "sonner"

import type { Product } from "./data"
import { loadProducts, saveProducts } from "./data"
import { ProductFormDialog } from "./components/product-form-dialog"
import { ProductTable } from "./components/product-table"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(loadProducts)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const persist = useCallback((next: Product[]) => {
    setProducts(next)
    saveProducts(next)
  }, [])

  function handleAdd() {
    setEditingProduct(null)
    setDialogOpen(true)
  }

  function handleEdit(product: Product) {
    setEditingProduct(product)
    setDialogOpen(true)
  }

  function handleDelete(product: Product) {
    const next = products.filter((p) => p.id !== product.id)
    persist(next)
    toast.success(`"${product.name}" has been deleted.`)
  }

  function handleSave(data: Omit<Product, "id" | "createdAt">) {
    if (editingProduct) {
      const next = products.map((p) =>
        p.id === editingProduct.id ? { ...p, ...data } : p,
      )
      persist(next)
      toast.success(`"${data.name}" has been updated.`)
    } else {
      const maxId = products.reduce((max, p) => Math.max(max, p.id), 0)
      const newProduct: Product = {
        ...data,
        id: maxId + 1,
        createdAt: new Date().toISOString().slice(0, 10),
      }
      persist([...products, newProduct])
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
