import { Outlet, useLocation } from "react-router-dom"

import { AppSidebar } from "@/layouts/app-layout/sidebar"
import { Topbar } from "@/layouts/app-layout/topbar"
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar"

const routeMeta: Record<string, { page: string; module?: string }> = {
  "/": { page: "Dashboard" },
  "/tables/basic": { page: "Basic Tables", module: "Tables" },
  "/tables/advanced": { page: "Advanced Tables", module: "Tables" },
  "/tables/datatable": { page: "Datatable", module: "Tables" },
  "/examples/customers": { page: "Customers", module: "Examples" },
  "/examples/products": { page: "Products", module: "Examples" },
}

export function AppLayout() {
  const { pathname } = useLocation()
  const meta = routeMeta[pathname] ?? { page: "Not Found" }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar page={meta.page} module={meta.module} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
