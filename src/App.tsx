import { Route, Routes } from "react-router-dom"

import DashboardPage from "@/app/dashboard/page"
import BasicTablesPage from "@/app/tables/basic/page"
import { AppLayout } from "@/layouts/app-layout"

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tables/basic" element={<BasicTablesPage />} />
      </Route>
    </Routes>
  )
}
