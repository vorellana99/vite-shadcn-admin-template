import {
    BadgeCheck,
    LogOut,
    Settings,
    Sparkles,
    Wrench,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Button } from "@/shared/ui/button"

interface TopbarUserMenuProps {
    user: {
        name: string
        email: string
        role: string
        avatar: string
    }
}

export function TopbarUserMenu({ user }: TopbarUserMenuProps) {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-9 items-center gap-2 rounded-full px-2 bg-slate-100/90 shadow-sm border border-slate-300 transition-all duration-200 hover:bg-slate-200/90 hover:border-slate-400 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Avatar className="h-7 w-7 rounded-full">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden flex-col text-left sm:flex">
                        <span className="text-sm font-medium leading-tight">{user.name}</span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60 rounded-xl p-1.5"
                side="bottom"
                align="end"
                sideOffset={8}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-3 px-2 py-2 text-left text-sm">
                        <Avatar className="h-9 w-9 rounded-lg">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{user.name}</span>
                            <span className="truncate text-xs text-muted-foreground">{user.role}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1.5 opacity-50" />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer gap-3 p-2 rounded-lg">
                        <div className="flex bg-amber-500/10 p-1.5 rounded-md text-amber-500 dark:text-amber-400">
                            <Sparkles className="size-4" />
                        </div>
                        <span className="font-medium">Upgrade to Pro</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1.5 opacity-50" />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer gap-3 p-2 rounded-lg">
                        <div className="flex bg-primary/10 p-1.5 rounded-md text-primary">
                            <BadgeCheck className="size-4" />
                        </div>
                        <span className="font-medium">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-3 p-2 rounded-lg">
                        <div className="flex bg-blue-500/10 p-1.5 rounded-md text-blue-600 dark:text-blue-400">
                            <Settings className="size-4" />
                        </div>
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-3 p-2 rounded-lg">
                        <div className="flex bg-emerald-500/10 p-1.5 rounded-md text-emerald-600 dark:text-emerald-400">
                            <Wrench className="size-4" />
                        </div>
                        <span>Support</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1.5 opacity-50" />
                <DropdownMenuItem className="cursor-pointer gap-3 p-2 rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive group">
                    <div className="flex bg-destructive/10 p-1.5 rounded-md text-destructive group-hover:bg-destructive/20 transition-colors">
                        <LogOut className="size-4" />
                    </div>
                    <span className="font-medium">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
