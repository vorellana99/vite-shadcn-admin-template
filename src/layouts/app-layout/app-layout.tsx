import { Suspense } from "react"
import { Outlet, useLocation } from "react-router-dom"

import { AppSidebar } from "@/layouts/app-layout/sidebar"
import { Topbar } from "@/layouts/app-layout/topbar"
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar"
import { PageSkeleton } from "@/shared/components/page-skeleton"

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
        <Topbar page={meta.page} />
        <div className="flex flex-1 flex-col p-2 pt-6">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
