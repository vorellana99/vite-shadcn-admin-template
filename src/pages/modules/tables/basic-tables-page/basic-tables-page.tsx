import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

const employees = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Engineer", department: "Engineering" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Designer", department: "Design" },
  { id: 3, name: "Carlos Rivera", email: "carlos@example.com", role: "Manager", department: "Operations" },
  { id: 4, name: "Diana Chen", email: "diana@example.com", role: "Analyst", department: "Finance" },
  { id: 5, name: "Erik Müller", email: "erik@example.com", role: "Developer", department: "Engineering" },
]

const orders = [
  { id: "ORD-001", customer: "Acme Corp", amount: "$1,250.00", status: "completed", date: "2024-12-01" },
  { id: "ORD-002", customer: "Globex Inc", amount: "$890.00", status: "pending", date: "2024-12-03" },
  { id: "ORD-003", customer: "Initech LLC", amount: "$2,340.00", status: "completed", date: "2024-12-05" },
  { id: "ORD-004", customer: "Umbrella Co", amount: "$450.00", status: "cancelled", date: "2024-12-07" },
  { id: "ORD-005", customer: "Stark Industries", amount: "$3,100.00", status: "pending", date: "2024-12-09" },
  { id: "ORD-006", customer: "Wayne Enterprises", amount: "$1,780.00", status: "completed", date: "2024-12-11" },
]

const products = [
  { id: 1, name: "Wireless Headphones", sku: "WH-100", price: "$79.99", stock: 142, category: "Audio" },
  { id: 2, name: "Mechanical Keyboard", sku: "MK-200", price: "$129.99", stock: 58, category: "Peripherals" },
  { id: 3, name: "USB-C Hub", sku: "UH-300", price: "$49.99", stock: 230, category: "Accessories" },
  { id: 4, name: "Monitor Stand", sku: "MS-400", price: "$34.99", stock: 0, category: "Accessories" },
  { id: 5, name: "Webcam HD", sku: "WC-500", price: "$59.99", stock: 87, category: "Video" },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  completed: "default",
  pending: "outline",
  cancelled: "destructive",
}

export default function BasicTablesPage() {
  return (
    <>
      {/* Simple table */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
            <CardDescription>Basic table with employee data.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Table with badges */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Table with status badges and formatted data.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">{order.amount}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[order.status]}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Table with actions */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Table with stock indicators and row actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">{product.price}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                        {product.stock > 0 ? product.stock : "Out of stock"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
