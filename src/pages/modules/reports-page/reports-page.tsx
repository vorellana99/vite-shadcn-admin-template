
import { ReportCard } from "./components/report-card"
import { reportsData } from "./data/reports"
import type { ReportCategory } from "./data/reports"

export default function ReportsPage() {
    // Group reports by category
    const categories: ReportCategory[] = ["Ventas", "Clientes", "Inventario", "Financiero"]

    const groupedReports = categories.map(category => ({
        category,
        reports: reportsData.filter(report => report.category === category)
    }))

    return (
        <div className="flex-1 space-y-4 p-8 pt-1">
            <p className="text-base text-foreground/75 pb-4">
                Consulta y descarga la información detallada de tu negocio clasificada por áreas.
            </p>
            <div className="space-y-12 pb-8">
                {groupedReports.map((group) => (
                    <section key={group.category} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                                {group.category}
                            </h2>
                            <div className="h-px flex-1 bg-border/60" />
                        </div>

                        {/* Grid for report cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {group.reports.map((report) => (
                                <ReportCard
                                    key={report.id}
                                    title={report.title}
                                    description={report.description}
                                    icon={report.icon}
                                    onClick={() => console.log(`Navigating to ${report.path}`)}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
