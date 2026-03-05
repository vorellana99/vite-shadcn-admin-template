import { useState } from "react"
import { ReportCard } from "./components/report-card"
import { reportsData } from "./data/reports"
import type { ReportCategory } from "./data/reports"
import { DataTableSearch, DataTableFilter } from "@/shared/components/data-table"

export default function ReportsPage() {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState<string>("_all")

    // Group reports by category
    const categories: ReportCategory[] = ["Ventas", "Clientes", "Inventario", "Financiero"]

    const filteredReports = reportsData.filter(report => {
        const searchLower = search.toLowerCase()
        const matchesSearch =
            report.title.toLowerCase().includes(searchLower) ||
            report.description.toLowerCase().includes(searchLower)

        const matchesCategory = category === "_all" || report.category === category

        return matchesSearch && matchesCategory
    })

    const groupedReports = categories
        .map(category => ({
            category,
            reports: filteredReports.filter(report => report.category === category)
        }))
        .filter(group => group.reports.length > 0)

    return (
        <div className="flex-1 space-y-4 p-8 pt-1">
            <div className="space-y-4">
                <p className="text-base text-foreground/75">
                    Consulta y descarga la información detallada de tu negocio clasificada por áreas.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    <DataTableSearch
                        placeholder="Buscar reportes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <DataTableFilter
                        placeholder="Categoría"
                        allOptionLabel="Todas las categorías"
                        value={category}
                        onValueChange={setCategory}
                        options={categories.map(c => ({ value: c, label: c }))}
                    />
                </div>
            </div>

            <div className="space-y-12 pb-8">
                {groupedReports.map((group) => (
                    <section key={group.category} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold tracking-tight text-muted-foreground">
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

                {groupedReports.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                        <p className="text-lg font-medium">No se encontraron reportes</p>
                        <p className="text-sm">Prueba con otros términos de búsqueda o cambia la categoría.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
