import { Bell, ShoppingCart, UserPlus, AlertTriangle, CheckCircle2 } from "lucide-react"

import { Button } from "@/shared/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"

const notifications = [
    {
        id: 1,
        icon: ShoppingCart,
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
        title: "New order received",
        description: "Order #1042 from John Doe",
        time: "2m ago",
        unread: true,
    },
    {
        id: 2,
        icon: UserPlus,
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        title: "New user registered",
        description: "Maria García joined the platform",
        time: "15m ago",
        unread: true,
    },
    {
        id: 3,
        icon: AlertTriangle,
        iconBg: "bg-amber-500/10",
        iconColor: "text-amber-500 dark:text-amber-400",
        title: "Server warning",
        description: "CPU usage above 85% threshold",
        time: "1h ago",
        unread: true,
    },
    {
        id: 4,
        icon: CheckCircle2,
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-600 dark:text-blue-400",
        title: "Backup completed",
        description: "Daily backup finished successfully",
        time: "3h ago",
        unread: false,
    },
]

const unreadCount = notifications.filter((n) => n.unread).length

export function TopbarNotifications() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 rounded-full hover:bg-accent"
                >
                    <Bell className="size-7" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground leading-none">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80 rounded-xl p-1.5"
                side="bottom"
                align="end"
                sideOffset={8}
            >
                <div className="flex items-center justify-between px-2 py-1.5">
                    <DropdownMenuLabel className="p-0 text-sm font-semibold">
                        Notifications
                    </DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <span className="text-xs text-muted-foreground">
                            {unreadCount} unread
                        </span>
                    )}
                </div>
                <DropdownMenuSeparator className="my-1.5 opacity-50" />
                <DropdownMenuGroup className="space-y-0.5">
                    {notifications.map((n) => {
                        const Icon = n.icon
                        return (
                            <DropdownMenuItem
                                key={n.id}
                                className="cursor-pointer gap-3 p-2 rounded-lg items-start"
                            >
                                <div className={`flex shrink-0 ${n.iconBg} p-1.5 rounded-md ${n.iconColor} mt-0.5`}>
                                    <Icon className="size-4" />
                                </div>
                                <div className="flex-1 grid gap-0.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-medium leading-tight">{n.title}</span>
                                        <span className="text-[11px] text-muted-foreground shrink-0">{n.time}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground leading-tight">{n.description}</span>
                                </div>
                                {n.unread && (
                                    <div className="shrink-0 mt-1.5 h-2 w-2 rounded-full bg-primary" />
                                )}
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1.5 opacity-50" />
                <DropdownMenuItem className="cursor-pointer justify-center p-2 rounded-lg text-sm text-muted-foreground hover:text-foreground font-medium">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
