import { useMemo, useState } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react"

import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

type Status = "active" | "on-hold" | "completed" | "cancelled"

interface Project {
  id: number
  name: string
  lead: string
  status: Status
  progress: number
  budget: number
  startDate: string
}

const projects: Project[] = [
  { id: 1, name: "Website Redesign", lead: "Alice Johnson", status: "active", progress: 72, budget: 45000, startDate: "2025-01-15" },
  { id: 2, name: "Mobile App v2", lead: "Bob Smith", status: "active", progress: 45, budget: 82000, startDate: "2025-02-01" },
  { id: 3, name: "API Migration", lead: "Carlos Rivera", status: "completed", progress: 100, budget: 30000, startDate: "2024-09-10" },
  { id: 4, name: "Data Pipeline", lead: "Diana Chen", status: "on-hold", progress: 33, budget: 56000, startDate: "2025-03-05" },
  { id: 5, name: "Cloud Migration", lead: "Erik Müller", status: "active", progress: 60, budget: 120000, startDate: "2024-11-20" },
  { id: 6, name: "Security Audit", lead: "Fiona Lee", status: "completed", progress: 100, budget: 18000, startDate: "2024-08-01" },
  { id: 7, name: "CRM Integration", lead: "George Park", status: "cancelled", progress: 15, budget: 42000, startDate: "2025-01-10" },
  { id: 8, name: "Analytics Dashboard", lead: "Hannah Kim", status: "active", progress: 88, budget: 35000, startDate: "2024-10-15" },
  { id: 9, name: "Payment Gateway", lead: "Ivan Torres", status: "on-hold", progress: 50, budget: 67000, startDate: "2025-02-20" },
  { id: 10, name: "E-commerce Platform", lead: "Julia Wang", status: "active", progress: 25, budget: 150000, startDate: "2025-04-01" },
]

const statusConfig: Record<Status, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Active", variant: "default" },
  "on-hold": { label: "On Hold", variant: "outline" },
  completed: { label: "Completed", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
}

type SortKey = "name" | "lead" | "progress" | "budget" | "startDate"
type SortDir = "asc" | "desc"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)
}

function SortIcon({
  column,
  sortKey,
  sortDir,
}: {
  column: SortKey
  sortKey: SortKey
  sortDir: SortDir
}) {
  if (sortKey !== column) return <ArrowUpDown className="ml-1 inline size-3.5 opacity-40" />
  return sortDir === "asc" ? (
    <ArrowUp className="ml-1 inline size-3.5" />
  ) : (
    <ArrowDown className="ml-1 inline size-3.5" />
  )
}

export default function AdvancedTablesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const filtered = useMemo(() => {
    let result = projects

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.lead.toLowerCase().includes(q),
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter)
    }

    result = [...result].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const cmp =
        typeof aVal === "string"
          ? aVal.localeCompare(bVal as string)
          : (aVal as number) - (bVal as number)
      return sortDir === "asc" ? cmp : -cmp
    })

    return result
  }, [search, statusFilter, sortKey, sortDir])

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            Advanced table with sorting, search, and status filtering.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
              <Input
                placeholder="Search by name or lead..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8"
                    onClick={() => handleSort("name")}
                  >
                    Project <SortIcon column="name" sortKey={sortKey} sortDir={sortDir} />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8"
                    onClick={() => handleSort("lead")}
                  >
                    Lead <SortIcon column="lead" sortKey={sortKey} sortDir={sortDir} />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8"
                    onClick={() => handleSort("progress")}
                  >
                    Progress <SortIcon column="progress" sortKey={sortKey} sortDir={sortDir} />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-3 ml-auto h-8"
                    onClick={() => handleSort("budget")}
                  >
                    Budget <SortIcon column="budget" sortKey={sortKey} sortDir={sortDir} />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8"
                    onClick={() => handleSort("startDate")}
                  >
                    Start Date <SortIcon column="startDate" sortKey={sortKey} sortDir={sortDir} />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No projects found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((project) => {
                  const sc = statusConfig[project.status]
                  return (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.lead}</TableCell>
                      <TableCell>
                        <Badge variant={sc.variant}>{sc.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-secondary h-2 w-24 overflow-hidden rounded-full">
                            <div
                              className="bg-primary h-full rounded-full transition-all"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-muted-foreground text-xs tabular-nums">
                            {project.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(project.budget)}
                      </TableCell>
                      <TableCell>{project.startDate}</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>

          <div className="text-muted-foreground text-sm">
            Showing {filtered.length} of {projects.length} projects
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
