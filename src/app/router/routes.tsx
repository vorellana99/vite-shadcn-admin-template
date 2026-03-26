import { lazy } from "react"
import { Route } from "react-router-dom"

import { AppLayout } from "@/layouts/app-layout/app-layout"

const DashboardPage = lazy(() => import("@/pages/modules/dashboard/dashboard-page/dashboard-page"))
const BasicTablesPage = lazy(() => import("@/pages/modules/tables/basic-tables-page/basic-tables-page"))
const AdvancedTablesPage = lazy(() => import("@/pages/modules/tables/advanced-tables-page/advanced-tables-page"))
const DatatablePage = lazy(() => import("@/pages/modules/tables/datatable-page/datatable-page"))
const CustomersPage = lazy(() => import("@/pages/modules/examples/customers-page/customers-page"))
const ProductsPage = lazy(() => import("@/pages/modules/examples/products-page/products-page"))
const ReportsPage = lazy(() => import("@/pages/modules/reports-page/reports-page"))
const UserSettingsPage = lazy(() => import("@/pages/core/user/user-settings/user-settings-page"))
const UserSecurityPage = lazy(() => import("@/pages/core/user/user-security/user-security-page"))
const BrandSettingsPage = lazy(() => import("@/pages/core/brand/brand-settings/brand-settings-page"))
const BrandSupportPage = lazy(() => import("@/pages/core/brand/brand-support/brand-support-page"))

/** Rutas de la app. Se usa como hijo directo de <Routes> en router/index.tsx */
export const appRoutes = (
  <Route element={<AppLayout />}>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/tables/basic" element={<BasicTablesPage />} />
    <Route path="/tables/advanced" element={<AdvancedTablesPage />} />
    <Route path="/tables/datatable" element={<DatatablePage />} />
    <Route path="/examples/customers" element={<CustomersPage />} />
    <Route path="/examples/products" element={<ProductsPage />} />
    <Route path="/reports" element={<ReportsPage />} />

    {/* Core Routes */}
    <Route path="/core/user/profile" element={<UserSettingsPage />} />
    <Route path="/core/user/settings" element={<UserSettingsPage />} />
    <Route path="/core/user/security" element={<UserSecurityPage />} />
    <Route path="/core/brand/settings" element={<BrandSettingsPage />} />
    <Route path="/core/brand/support" element={<BrandSupportPage />} />
  </Route>
)
