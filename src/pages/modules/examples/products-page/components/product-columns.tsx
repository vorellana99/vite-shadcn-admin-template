import { Link } from "react-router-dom"
import type { ColumnDef } from "@tanstack/react-table"
import { SortableHeader } from "@/shared/components/data-table"
import { ProductStatusBadge } from "./product-status-badge"
import { AppBadge } from "@/shared/components/badges/app-badge"
import { ProductRowActions } from "./product-row-actions"
import type { Product } from "../product-schema"

interface ColumnCallbacks {
  onDelete: (product: Product) => void
  isMobile?: boolean
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

export function getProductColumns({ onDelete, isMobile }: ColumnCallbacks): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
      cell: ({ row }) => {
        const product = row.original
        return isMobile ? (
          <span className="font-medium">{product.name}</span>
        ) : (
          <Link
            to={`/examples/products/${product.id}`}
            className="font-medium hover:underline hover:text-primary transition-colors relative z-20"
          >
            {product.name}
          </Link>
        )
      },
      enableHiding: false,
    },
    {
      accessorKey: "sku",
      header: ({ column }) => <SortableHeader column={column}>SKU</SortableHeader>,
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("sku")}</span>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => <SortableHeader column={column}>Category</SortableHeader>,
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <div className="flex justify-end">
          <SortableHeader column={column}>Price</SortableHeader>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right tabular-nums">
          {formatCurrency(row.getValue("price"))}
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <div className="flex justify-end">
          <SortableHeader column={column}>Stock</SortableHeader>
        </div>
      ),
      cell: ({ row }) => {
        const stock = row.getValue("stock") as number
        return (
          <div className="text-right">
            <AppBadge variant={stock > 10 ? "secondary" : stock > 0 ? "outline" : "destructive"}>
              {stock > 0 ? stock : "Out of stock"}
            </AppBadge>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
      cell: ({ row }) => (
        <ProductStatusBadge status={row.getValue("status")} />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ProductRowActions
          product={row.original}
          onDelete={onDelete}
          isMobile={isMobile}
        />
      ),
    },
  ]
}
