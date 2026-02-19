import { ChartAreaInteractive } from "@/pages/modules/dashboard/dashboard-page/components/chart-area-interactive"
import { DataTable } from "@/shared/components/data-table/data-table"
import { SectionCards } from "@/pages/modules/dashboard/dashboard-page/components/section-cards"
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
