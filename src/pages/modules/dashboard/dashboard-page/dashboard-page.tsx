import { lazy, Suspense } from "react"
import { SectionsTable } from "@/pages/modules/dashboard/dashboard-page/components/sections-table"
import { SectionCards } from "@/pages/modules/dashboard/dashboard-page/components/section-cards"
import { Skeleton } from "@/shared/ui/skeleton"
import { menuData } from "@/layouts/app-layout/menu"
import data from "./data.json"

const ChartAreaInteractive = lazy(() => import("@/pages/modules/dashboard/dashboard-page/components/chart-area-interactive").then(module => ({ default: module.ChartAreaInteractive })))

export default function DashboardPage() {
  return (
    <>
      <div className="animate-fade-in-up px-4 lg:px-6">
        <div className="flex flex-col gap-0.5">
          <p className="text-xl font-semibold text-foreground">
            Bienvenido, {menuData.user.name}
          </p>
          <p className="text-sm text-muted-foreground capitalize">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="animate-fade-in-up px-4 lg:px-6" style={{ animationDelay: "0s" }}>
        <div className="flex items-center gap-3 border-b border-border/40 pb-3">
          <div className="h-5 w-0.5 rounded-full bg-primary" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Resumen Ejecutivo</h2>
        </div>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
        <SectionCards />
      </div>

      <div className="animate-fade-in-up px-4 lg:px-6" style={{ animationDelay: "0.12s" }}>
        <div className="flex items-center gap-3 border-b border-border/40 pb-3">
          <div className="h-5 w-0.5 rounded-full bg-primary" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Análisis de Rendimiento</h2>
        </div>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
        <Suspense fallback={<div className="px-4 lg:px-6"><Skeleton className="h-[400px] w-full rounded-xl" /></div>}>
          <ChartAreaInteractive />
        </Suspense>
      </div>

      <div className="animate-fade-in-up px-4 lg:px-6" style={{ animationDelay: "0.26s" }}>
        <div className="flex items-center gap-3 border-b border-border/40 pb-3">
          <div className="h-5 w-0.5 rounded-full bg-primary" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Documentación</h2>
        </div>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "0.32s" }}>
        <SectionsTable data={data} />
      </div>
    </>
  )
}
