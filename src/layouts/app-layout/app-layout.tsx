import { Suspense } from "react"
import { Outlet, useLocation } from "react-router-dom"

import { AppSidebar } from "@/layouts/app-layout/sidebar"
import { Topbar } from "@/layouts/app-layout/topbar"
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar"
import { PageSkeleton } from "@/shared/components/page-skeleton"
import { PageContent } from "@/layouts/app-layout/components/page-content"
import { menuData } from "@/layouts/app-layout/menu"

/**
 * TODO: Pendiente de pruebas unitarias.
 * Considerar testear:
 *  - Items con url="#", no deben aparecer en el resultado.
 *  - Sub-items con url="#", tampoco deben incluirse.
 *  - Items sin sub-items (ej. Dashboard, Reportes) se mapean correctamente.
 *  - Items con sub-items (ej. Tables, Examples) generan entradas por cada sub-item.
 *  - Un pathname inexistente devuelve el fallback "Not Found".
 */
const routeMeta: Record<string, string> = Object.fromEntries(
  menuData.navMain.flatMap(({ url, title, items }) => [
    ...(url !== "#" ? [[url, title]] : []),
    ...(items?.filter(s => s.url !== "#").map(s => [s.url, s.title]) ?? []),
  ])
)


export function AppLayout() {
  const { pathname } = useLocation()
  const page = routeMeta[pathname] ?? "Not Found"

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar page={page} />
        <PageContent>
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </PageContent>
      </SidebarInset>
    </SidebarProvider>
  )
}
