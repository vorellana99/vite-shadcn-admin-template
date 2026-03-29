import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import type { Product } from "./product-schema"
import { useProducts } from "./use-products"
import { ProductTable } from "./components/product-table"

export default function ProductsPage() {
    const navigate = useNavigate()
    const { products, deleteProduct } = useProducts()

    function handleAdd() {
        navigate("/examples/products/new")
    }

    function handleDelete(product: Product) {
        deleteProduct(product.id)
        toast.success(`"${product.name}" has been deleted.`)
    }

    return (
        <ProductTable
            products={products}
            onAdd={handleAdd}
            onDelete={handleDelete}
        />
    )
}
