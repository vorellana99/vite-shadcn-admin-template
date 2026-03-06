import { useState } from "react"
import { toast } from "sonner"
import { LineChart, Download, FileJson, FileSpreadsheet, Loader2 } from "lucide-react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/shared/ui/dialog"
import { DialogFormHeader } from "@/shared/components/forms/dialog-form-header"
import { AppButton } from "@/shared/components/buttons/app-button"
import { DatePicker } from "@/shared/components/date-picker/date-picker"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { FormField } from "@/shared/components/forms/form-field"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart"
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent } from "@/shared/ui/card"
import { dailySalesMockData, dailySalesMetrics } from "../data/daily-sales-mock"

interface DailySalesReportDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const chartConfig = {
    sales: {
        label: "Ventas ($)",
        color: "hsl(var(--primary))",
    },
}

export function DailySalesReportDialog({ open, onOpenChange }: DailySalesReportDialogProps) {
    const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
    const [branch, setBranch] = useState("all")
    const [isExporting, setIsExporting] = useState(false)

    const handleExportJSON = () => {
        try {
            const toastId = toast.loading("Preparando archivo JSON...")

            const exportData = {
                report: "Reporte de Ventas Diarias",
                fecha: date,
                sucursal: branch === "all" ? "Todas" : branch,
                generado: new Date().toLocaleString(),
                resumen: dailySalesMetrics,
                detalle: dailySalesMockData
            }

            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `reporte-ventas-${date}.json`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)

            toast.success("JSON descargado correctamente", { id: toastId })
        } catch (error) {
            console.error("Error exporting JSON:", error)
            toast.error("Error al exportar a JSON")
        }
    }

    const handleExportExcel = () => {
        try {
            const toastId = toast.loading("Preparando archivo Excel...")

            // 1. Prepare data for Excel (Summary + Detailed)
            const summaryData = [
                ["REPORTE DE VENTAS DIARIAS"],
                ["Fecha:", date],
                ["Sucursal:", branch === "all" ? "Todas" : branch],
                ["Generado:", new Date().toLocaleString()],
                [],
                ["RESUMEN DE MÉTRICAS"],
                ["Métrica", "Valor"],
                ["Total Ventas", dailySalesMetrics.totalSales],
                ["Transacciones", dailySalesMetrics.transactions],
                ["Ticket Promedio", dailySalesMetrics.avgTicket],
                ["Crecimiento", `${dailySalesMetrics.growth}%`],
                [],
                ["DETALLE POR HORA"],
                ["Hora", "Ventas ($)", "Transacciones", "Promedio ($)"]
            ]

            const detailedData = dailySalesMockData.map(row => [
                row.hour,
                row.sales,
                row.transactions,
                row.avgTicket
            ])

            const finalData = [...summaryData, ...detailedData]

            // 2. Create Workbook and Sheet
            const ws = XLSX.utils.aoa_to_sheet(finalData)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "Ventas Diarias")

            // 3. Save file
            XLSX.writeFile(wb, `reporte-ventas-${date}.xlsx`)

            toast.success("Excel descargado correctamente", { id: toastId })
        } catch (error) {
            console.error("Error exporting Excel:", error)
            toast.error("Error al exportar a Excel")
        }
    }

    const handleExportPDF = async () => {
        setIsExporting(true)
        const toastId = toast.loading("Generando tabla PDF...")

        try {
            // Give a small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 300))

            const doc = new jsPDF()
            const reportTitle = "REPORTE DE VENTAS DIARIAS"
            const branchName = branch === "all" ? "Todas las Sucursales" : `Sucursal: ${branch}`
            const generationDate = new Date().toLocaleString()

            // Header Section
            doc.setFontSize(18)
            doc.setTextColor(20, 83, 136) // Primary color approximation
            doc.text(reportTitle, 14, 20)

            doc.setFontSize(10)
            doc.setTextColor(100)
            doc.text(`Fecha del Reporte: ${date}`, 14, 28)
            doc.text(`${branchName}`, 14, 34)
            doc.text(`Generado: ${generationDate}`, 14, 40)

            // 1. Summary Metrics Table
            autoTable(doc, {
                startY: 50,
                head: [['Métrica', 'Valor']],
                body: [
                    ['Total Ventas', `$${dailySalesMetrics.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}`],
                    ['Transacciones Totales', `${dailySalesMetrics.transactions}`],
                    ['Ticket Promedio', `$${dailySalesMetrics.avgTicket.toLocaleString('en-US', { minimumFractionDigits: 2 })}`],
                    ['Crecimiento vs Ayer', `${dailySalesMetrics.growth}%`],
                ],
                theme: 'striped',
                headStyles: { fillColor: [20, 83, 136], textColor: 255 },
                margin: { top: 50 },
            })

            // 2. Detailed Sales Flow Table
            autoTable(doc, {
                startY: (doc as any).lastAutoTable.finalY + 15,
                head: [['Hora', 'Ventas ($)', 'Transacciones', 'Promedio ($)']],
                body: dailySalesMockData.map(row => [
                    row.hour,
                    `$${row.sales.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                    `${row.transactions}`,
                    `$${row.avgTicket.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                ]),
                theme: 'grid',
                headStyles: { fillColor: [60, 60, 60], textColor: 255 },
                styles: { fontSize: 9 },
            })

            doc.save(`reporte-ventas-${date}-${branch}.pdf`)
            toast.success("PDF generado exitosamente", { id: toastId })
        } catch (error) {
            console.error("Error generating PDF:", error)
            toast.error("Error al generar el PDF", { id: toastId })
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogFormHeader
                    title="Reporte: Ventas Diarias"
                    description="Resumen de las ventas procesadas durante el día seleccionado."
                    icon={LineChart}
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                    {/* Filters Sidebar */}
                    <div className="md:col-span-1 space-y-4 border-r pr-4 border-border/60">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Parámetros</h4>

                        <FormField label="Fecha" htmlFor="rep-date">
                            <DatePicker
                                value={date}
                                onChange={(val) => setDate(val || "")}
                                placeholder="Seleccionar fecha"
                                className="w-full"
                            />
                        </FormField>

                        <FormField label="Sucursal" htmlFor="rep-branch">
                            <Select value={branch} onValueChange={setBranch}>
                                <SelectTrigger id="rep-branch">
                                    <SelectValue placeholder="Todas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las sucursales</SelectItem>
                                    <SelectItem value="north">Sucursal Norte</SelectItem>
                                    <SelectItem value="south">Sucursal Sur</SelectItem>
                                    <SelectItem value="central">Sucursal Central</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormField>

                        <div className="pt-4">
                            <AppButton className="w-full" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Actualizar
                            </AppButton>
                        </div>
                    </div>

                    {/* Preview Content */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Summary Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Card className="bg-primary/5 border-primary/20 shadow-none">
                                <CardContent className="p-4">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">Total Ventas</p>
                                    <h3 className="text-2xl font-black text-primary mt-1">${dailySalesMetrics.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                                    <p className="text-[10px] text-green-600 font-bold mt-1 inline-flex items-center gap-1">↑ {dailySalesMetrics.growth}% <span className="text-muted-foreground font-normal">vs ayer</span></p>
                                </CardContent>
                            </Card>
                            <Card className="bg-blue-500/5 border-blue-500/20 shadow-none">
                                <CardContent className="p-4">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">Transacciones</p>
                                    <h3 className="text-2xl font-black text-blue-600 mt-1">{dailySalesMetrics.transactions}</h3>
                                    <p className="text-[10px] text-muted-foreground mt-1">Promedio: <span className="font-bold">18/hora</span></p>
                                </CardContent>
                            </Card>
                            <Card className="bg-orange-500/5 border-orange-500/20 shadow-none">
                                <CardContent className="p-4">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">Ticket Promedio</p>
                                    <h3 className="text-2xl font-black text-orange-600 mt-1">${dailySalesMetrics.avgTicket.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="h-1 w-full bg-orange-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-500 w-[65%]" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Chart Preview */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-foreground/80">Flujo de Ventas (Rendimiento por Hora)</h4>
                                <span className="text-[9px] text-primary-foreground bg-primary px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Vista Detallada</span>
                            </div>
                            <div className="h-[280px] w-full bg-white rounded-xl border border-border/60 p-6 shadow-sm">
                                <ChartContainer config={chartConfig} className="h-full w-full">
                                    <RechartsBarChart data={dailySalesMockData}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border)/40)" />
                                        <XAxis
                                            dataKey="hour"
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={10}
                                        />
                                        <YAxis
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `$${value}`}
                                            tickMargin={10}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar
                                            dataKey="sales"
                                            fill="var(--color-sales)"
                                            radius={[6, 6, 0, 0]}
                                            barSize={32}
                                        />
                                    </RechartsBarChart>
                                </ChartContainer>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-6 mt-8 border-t pt-6 flex-col sm:flex-row">
                    <div className="flex flex-1 gap-4">
                        <AppButton
                            variant="outline"
                            size="sm"
                            className="hidden sm:flex border-dashed"
                            onClick={handleExportJSON}
                        >
                            <FileJson className="mr-2 h-4 w-4 text-muted-foreground" />
                            JSON
                        </AppButton>
                        <AppButton
                            variant="outline"
                            size="sm"
                            className="hidden sm:flex border-dashed"
                            onClick={handleExportExcel}
                        >
                            <FileSpreadsheet className="mr-2 h-4 w-4 text-muted-foreground" />
                            Excel
                        </AppButton>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto">
                        <AppButton
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 sm:flex-none text-muted-foreground hover:text-foreground"
                        >
                            Cerrar
                        </AppButton>
                        <AppButton
                            className="shadow-xl shadow-primary/20 flex-1 sm:flex-none"
                            onClick={handleExportPDF}
                            disabled={isExporting}
                        >
                            {isExporting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-4 w-4" />
                            )}
                            {isExporting ? "Generando..." : "Exportar PDF"}
                        </AppButton>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
