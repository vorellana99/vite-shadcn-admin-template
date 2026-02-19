import { Route } from "react-router-dom"

import { AppLayout } from "@/layouts/app-layout/app-layout"
import DashboardPage from "@/pages/modules/dashboard/dashboard-page/dashboard-page"
import BasicTablesPage from "@/pages/modules/tables/basic-tables-page/basic-tables-page"
import AdvancedTablesPage from "@/pages/modules/tables/advanced-tables-page/advanced-tables-page"
import DatatablePage from "@/pages/modules/tables/datatable-page/datatable-page"
import CustomersPage from "@/pages/modules/examples/customers-page/customers-page"
import ProductsPage from "@/pages/modules/examples/products-page/products-page"

/** Rutas de la app. Se usa como hijo directo de <Routes> en router/index.tsx */
export const appRoutes = (
  <Route element={<AppLayout />}>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/tables/basic" element={<BasicTablesPage />} />
    <Route path="/tables/advanced" element={<AdvancedTablesPage />} />
    <Route path="/tables/datatable" element={<DatatablePage />} />
    <Route path="/examples/customers" element={<CustomersPage />} />
    <Route path="/examples/products" element={<ProductsPage />} />
  </Route>
)
