import DashboardPage from "@/app/dashboard/page"
import { AppLayout } from "@/layouts/app-layout"

export default function App() {
  return (
    <AppLayout page="Dashboard">
      <DashboardPage />
    </AppLayout>
  )
}
