import { ChartAreaInteractive } from "@/modules/dashboard/pages/dashboard-page/components/chart-area-interactive"
import { DataTable } from "@/shared/components/data-table/data-table"
import { SectionCards } from "@/modules/dashboard/pages/dashboard-page/components/section-cards"
import data from "./data.json"

export default function DashboardPage() {
  return (
    <>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </>
  )
}
