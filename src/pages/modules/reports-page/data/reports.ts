import {
    BarChart,
    Users,
    LineChart,
    DollarSign,
    PieChart,
    Activity,
    Package,
    ShoppingCart,
    TrendingUp,
    CreditCard,
    Briefcase,
    Layers,
    FileText,
    Clock,
    MapPin,
    Percent,
    TrendingDown,
    Target,
    ShieldCheck,
    Zap
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ReportCategory = "Ventas" | "Clientes" | "Inventario" | "Financiero"

export interface ReportItem {
    id: string
    title: string
    description: string
    category: ReportCategory
    icon: LucideIcon
    path: string
}

export const reportsData: ReportItem[] = [
    // Categoria: Ventas
    {
        id: "rep-001",
        title: "Ventas Diarias",
        description: "Resumen de las ventas procesadas durante el día actual, desglosado por sucursal.",
        category: "Ventas",
        icon: LineChart,
        path: "/reports/daily-sales"
    },
    {
        id: "rep-002",
        title: "Rendimiento Mensual",
        description: "Comparativa del volumen de ventas versus el mes o año anterior.",
        category: "Ventas",
        icon: TrendingUp,
        path: "/reports/monthly-performance"
    },
    {
        id: "rep-003",
        title: "Cierre de Cajas",
        description: "Detalle de los cuadres de caja, diferencias e ingresos por métodos de pago.",
        category: "Ventas",
        icon: DollarSign,
        path: "/reports/register-closure"
    },
    {
        id: "rep-004",
        title: "Ventas por Vendedor",
        description: "Ranking y métricas de desempeño de los agentes comerciales de la empresa.",
        category: "Ventas",
        icon: Briefcase,
        path: "/reports/sales-by-agent"
    },
    {
        id: "rep-005",
        title: "Márgenes de Venta",
        description: "Análisis de rentabilidad porcentual por líneas de negocio y productos.",
        category: "Ventas",
        icon: Percent,
        path: "/reports/sales-margins"
    },

    // Categoria: Clientes
    {
        id: "rep-006",
        title: "Aquisición de Clientes",
        description: "Estadísticas sobre los nuevos registros y fuentes de adquisición.",
        category: "Clientes",
        icon: Users,
        path: "/reports/customer-acquisition"
    },
    {
        id: "rep-007",
        title: "Retención y Fuga",
        description: "Métricas relacionadas con la lealtad de los clientes y tasas de abandono (Churn).",
        category: "Clientes",
        icon: TrendingDown,
        path: "/reports/churn-rate"
    },
    {
        id: "rep-008",
        title: "Demografía Global",
        description: "Mapa geográfico de concentración y distribución de usuarios activos.",
        category: "Clientes",
        icon: MapPin,
        path: "/reports/demographics"
    },
    {
        id: "rep-009",
        title: "Historial de Actividad",
        description: "Auditoría de los últimos inicios de sesión, acciones y uso de la plataforma.",
        category: "Clientes",
        icon: Activity,
        path: "/reports/activity-logs"
    },
    {
        id: "rep-010",
        title: "Segmentos de Valor (LTV)",
        description: "Calculo del valor de vida por cliente para estrategias de fidelización.",
        category: "Clientes",
        icon: Target,
        path: "/reports/customer-ltv"
    },

    // Categoria: Inventario
    {
        id: "rep-011",
        title: "Stock Valorizado",
        description: "Reporte con el costo total actual de la mercancía dentro de los almacenes.",
        category: "Inventario",
        icon: Layers,
        path: "/reports/stock-value"
    },
    {
        id: "rep-012",
        title: "Rotación de Productos",
        description: "Identificación de la mercancía con mayor y menor movimiento en el sistema.",
        category: "Inventario",
        icon: Package,
        path: "/reports/product-turnover"
    },
    {
        id: "rep-013",
        title: "Kardex General",
        description: "Registro de ingresos, salidas y devoluciones de productos por fecha.",
        category: "Inventario",
        icon: FileText,
        path: "/reports/general-kardex"
    },
    {
        id: "rep-014",
        title: "Alertas de Reposición",
        description: "Listado crítico de SKUs que se encuentran por debajo del stock mínimo.",
        category: "Inventario",
        icon: Zap,
        path: "/reports/restock-alerts"
    },
    {
        id: "rep-015",
        title: "Compras por Proveedor",
        description: "Historial del volumen de pedidos realizados a cada vendedor asociado.",
        category: "Inventario",
        icon: ShoppingCart,
        path: "/reports/supplier-purchases"
    },

    // Categoria: Financiero
    {
        id: "rep-016",
        title: "Estado de Resultados",
        description: "Balance general sintetizado con ingresos, costos operativos y utilidades.",
        category: "Financiero",
        icon: PieChart,
        path: "/reports/income-statement"
    },
    {
        id: "rep-017",
        title: "Cuentas por Cobrar",
        description: "Seguimiento a carteras en mora mensual, deudas activas e intimaciones.",
        category: "Financiero",
        icon: Clock,
        path: "/reports/accounts-receivable"
    },
    {
        id: "rep-018",
        title: "Flujo de Efectivo",
        description: "Entradas y salidas de liquidez en tiempo real a nivel empresarial.",
        category: "Financiero",
        icon: BarChart,
        path: "/reports/cash-flow"
    },
    {
        id: "rep-019",
        title: "Cobranzas e Impuestos",
        description: "Resumen de comisiones financieras e impuestos retenidos pendientes de pago.",
        category: "Financiero",
        icon: ShieldCheck,
        path: "/reports/tax-collections"
    },
    {
        id: "rep-020",
        title: "Transacciones Pasarela",
        description: "Liquidaciones integradas desde las procesadoras de tarjetas de crédito.",
        category: "Financiero",
        icon: CreditCard,
        path: "/reports/gateway-transactions"
    }
]
