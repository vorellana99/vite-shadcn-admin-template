import { lazy, Suspense } from "react"
import { SectionsTable } from "@/pages/modules/dashboard/dashboard-page/components/sections-table"
import { SectionCards } from "@/pages/modules/dashboard/dashboard-page/components/section-cards"
import { Skeleton } from "@/shared/ui/skeleton"
import data from "./data.json"

const ChartAreaInteractive = lazy(() => import("@/pages/modules/dashboard/dashboard-page/components/chart-area-interactive").then(module => ({ default: module.ChartAreaInteractive })))

export default function DashboardPage() {
  return (
    <>
      <SectionCards />
      <Suspense fallback={<div className="px-4 lg:px-6"><Skeleton className="h-[400px] w-full rounded-xl" /></div>}>
        <ChartAreaInteractive />
      </Suspense>
      <SectionsTable data={data} />
    </>
  )
}
