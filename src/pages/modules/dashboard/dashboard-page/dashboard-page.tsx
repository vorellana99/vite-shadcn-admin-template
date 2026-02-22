import { ChartAreaInteractive } from "@/pages/modules/dashboard/dashboard-page/components/chart-area-interactive"
import { SectionsTable } from "@/pages/modules/dashboard/dashboard-page/components/sections-table"
import { SectionCards } from "@/pages/modules/dashboard/dashboard-page/components/section-cards"
import data from "./data.json"

export default function DashboardPage() {
  return (
    <>
      <SectionCards />
      <ChartAreaInteractive />
      <SectionsTable data={data} />
    </>
  )
}
