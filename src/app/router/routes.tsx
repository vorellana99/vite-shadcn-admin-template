import { Route } from "react-router-dom"

import { AppLayout } from "@/layouts/app-layout/app-layout"
import DashboardPage from "@/modules/dashboard/pages/dashboard-page/dashboard-page"
import BasicTablesPage from "@/modules/examples/pages/basic-tables-page/basic-tables-page"

/** Rutas de la app. Se usa como hijo directo de <Routes> en router/index.tsx */
export const appRoutes = (
  <Route element={<AppLayout />}>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/tables/basic" element={<BasicTablesPage />} />
  </Route>
)
