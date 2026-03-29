import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/shared/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card border-black/20 border-l-2 border-l-primary/40">
        <CardHeader>
          <CardDescription>Ingresos Totales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-emerald-300 bg-emerald-500/10 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tendencia al alza este mes <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitantes de los últimos 6 meses
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card border-l-2 border-l-red-400/60 border-red-300/50 bg-red-500/3 dark:border-red-900/40">
        <CardHeader>
          <CardDescription>Nuevos Clientes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-red-300 bg-red-500/10 text-red-600 dark:border-red-800 dark:text-red-400">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-red-600 dark:text-red-400">
            Bajó 20% este período <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            La adquisición requiere atención
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card border-black/20 border-l-2 border-l-primary/40">
        <CardHeader>
          <CardDescription>Cuentas Activas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-emerald-300 bg-emerald-500/10 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Alta retención de usuarios <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Interacción supera objetivos</div>
        </CardFooter>
      </Card>
      <Card className="@container/card border-black/20 border-l-2 border-l-primary/40">
        <CardHeader>
          <CardDescription>Tasa de Crecimiento</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-emerald-300 bg-emerald-500/10 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Rendimiento en constante mejora <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Cumple proyecciones de crecimiento</div>
        </CardFooter>
      </Card>
    </div>
  )
}
