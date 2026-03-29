import { useCallback, useState } from "react"

import type { Product } from "./product-schema"
import { demoProducts } from "./product-data"

const LS_KEY = "products"

export function loadProducts(): Product[] {
    try {
        const raw = localStorage.getItem(LS_KEY)
        if (raw) {
            const parsed = JSON.parse(raw) as Product[]
            if (parsed.length < demoProducts.length) {
                localStorage.setItem(LS_KEY, JSON.stringify(demoProducts))
                return demoProducts
            }
            return parsed
        }
    } catch { /* ignore */ }
    localStorage.setItem(LS_KEY, JSON.stringify(demoProducts))
    return demoProducts
}

export function saveProducts(products: Product[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(products))
}

export function toFormValues(p: Product) {
    return {
        name: p.name ?? "",
        sku: p.sku ?? "",
        category: p.category ?? "",
        price: p.price ?? 0,
        stock: p.stock ?? 0,
        status: (p.status ?? "active") as Product["status"],
    }
}

export function useProducts() {
    const [products, setProducts] = useState<Product[]>(loadProducts)

    const persist = useCallback((next: Product[]) => {
        setProducts(next)
        saveProducts(next)
    }, [])

    const addProduct = useCallback((data: Omit<Product, "id" | "createdAt">) => {
        setProducts((prev) => {
            const maxId = prev.reduce((max, p) => Math.max(max, p.id), 0)
            const next = [...prev, { ...data, id: maxId + 1, createdAt: new Date().toISOString().slice(0, 10) }]
            saveProducts(next)
            return next
        })
    }, [])

    const updateProduct = useCallback((id: number, data: Omit<Product, "id" | "createdAt">) => {
        setProducts((prev) => {
            const next = prev.map((p) => (p.id === id ? { ...p, ...data } : p))
            saveProducts(next)
            return next
        })
    }, [])

    const deleteProduct = useCallback((id: number) => {
        setProducts((prev) => {
            const next = prev.filter((p) => p.id !== id)
            saveProducts(next)
            return next
        })
    }, [])

    return { products, persist, addProduct, updateProduct, deleteProduct }
}
