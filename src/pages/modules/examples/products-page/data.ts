import { z } from "zod"

export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().int().min(0, "Stock must be 0 or more"),
  status: z.enum(["active", "discontinued", "low_stock", "out_of_stock", "coming_soon"]),
  createdAt: z.string(),
})

export type Product = z.infer<typeof productSchema>

export const formSchema = productSchema.omit({ id: true, createdAt: true })

export type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>

export const categories = ["Audio", "Peripherals", "Accessories", "Video", "Storage", "Networking"] as const

const LS_KEY = "products"

const demoProducts: Product[] = [
  { id: 1, name: "Wireless Headphones", sku: "WH-100", category: "Audio", price: 79.99, stock: 142, status: "active", createdAt: "2025-01-10" },
  { id: 2, name: "Mechanical Keyboard", sku: "MK-200", category: "Peripherals", price: 129.99, stock: 58, status: "active", createdAt: "2025-01-15" },
  { id: 3, name: "USB-C Hub", sku: "UH-300", category: "Accessories", price: 49.99, stock: 230, status: "active", createdAt: "2025-01-20" },
  { id: 4, name: "Monitor Stand", sku: "MS-400", category: "Accessories", price: 34.99, stock: 0, status: "discontinued", createdAt: "2025-01-25" },
  { id: 5, name: "Webcam HD", sku: "WC-500", category: "Video", price: 59.99, stock: 87, status: "active", createdAt: "2025-02-01" },
  { id: 6, name: "Bluetooth Speaker", sku: "BS-600", category: "Audio", price: 44.99, stock: 195, status: "active", createdAt: "2025-02-05" },
  { id: 7, name: "Ergonomic Mouse", sku: "EM-700", category: "Peripherals", price: 69.99, stock: 73, status: "active", createdAt: "2025-02-10" },
  { id: 8, name: "External SSD 1TB", sku: "ES-800", category: "Storage", price: 109.99, stock: 44, status: "active", createdAt: "2025-02-15" },
  { id: 9, name: "Laptop Sleeve 15\"", sku: "LS-900", category: "Accessories", price: 24.99, stock: 310, status: "active", createdAt: "2025-02-20" },
  { id: 10, name: "Desk Lamp LED", sku: "DL-010", category: "Accessories", price: 39.99, stock: 0, status: "discontinued", createdAt: "2025-02-25" },
  { id: 11, name: "Noise Cancelling Earbuds", sku: "NC-110", category: "Audio", price: 149.99, stock: 62, status: "active", createdAt: "2025-03-01" },
  { id: 12, name: "Wi-Fi 6 Router", sku: "WR-120", category: "Networking", price: 89.99, stock: 38, status: "active", createdAt: "2025-03-05" },
  { id: 13, name: "USB Microphone", sku: "UM-130", category: "Audio", price: 99.99, stock: 55, status: "active", createdAt: "2025-03-10" },
  { id: 14, name: "Portable Charger 20K", sku: "PC-140", category: "Accessories", price: 29.99, stock: 420, status: "active", createdAt: "2025-03-15" },
  { id: 15, name: "4K Capture Card", sku: "CC-150", category: "Video", price: 179.99, stock: 21, status: "active", createdAt: "2025-03-20" },
  { id: 16, name: "Power Strip 8-Outlet", sku: "PS-160", category: "Accessories", price: 34.99, stock: 12, status: "low_stock", createdAt: "2025-03-22" },
  { id: 17, name: "Bluetooth Dongle 5.0", sku: "BD-170", category: "Peripherals", price: 14.99, stock: 0, status: "out_of_stock", createdAt: "2025-03-25" },
  { id: 18, name: "Smart Watch Series G", sku: "SW-180", category: "Accessories", price: 199.99, stock: 0, status: "coming_soon", createdAt: "2025-04-01" },
  { id: 19, name: "USB-C to HDMI Adapter", sku: "AD-190", category: "Accessories", price: 19.99, stock: 5, status: "low_stock", createdAt: "2025-03-28" },
  { id: 20, name: "Vertical Mouse", sku: "VM-200", category: "Peripherals", price: 49.99, stock: 88, status: "active", createdAt: "2025-03-30" },
  { id: 21, name: "RGB LED Strip 5m", sku: "LS-210", category: "Accessories", price: 29.99, stock: 150, status: "active", createdAt: "2025-04-05" },
  { id: 22, name: "Privacy Screen Filter", sku: "SF-220", category: "Accessories", price: 44.99, stock: 3, status: "low_stock", createdAt: "2025-04-08" },
  { id: 23, name: "Thunderbolt 4 Cable", sku: "TC-230", category: "Networking", price: 59.99, stock: 0, status: "out_of_stock", createdAt: "2025-04-10" },
  { id: 24, name: "VR Headset Pro", sku: "VR-240", category: "Video", price: 599.99, stock: 0, status: "coming_soon", createdAt: "2025-05-01" },
  { id: 25, name: "Mechanical Gaming Mouse", sku: "GM-250", category: "Peripherals", price: 74.99, stock: 220, status: "active", createdAt: "2025-04-12" },
]

/**
 * Loads products from localStorage. If empty, seeds with {@link demoProducts}.
 *
 * Because localStorage takes priority, changes to `demoProducts` in code won't
 * be visible until the stored data is cleared:
 * ```js
 * localStorage.removeItem("products")
 * ```
 */
export function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Product[]
      // If we added more demo products in code, update localStorage to include them
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
