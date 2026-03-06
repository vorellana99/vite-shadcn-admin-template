import { Info, Settings, LifeBuoy } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/shared/ui/sidebar"

interface BrandSectionProps {
    logoUrl: string
    companyName: string
}

export function BrandSection({
    logoUrl,
    companyName,
}: BrandSectionProps) {
    const { isMobile } = useSidebar()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="h-[118px] p-[12px] justify-center hover:bg-transparent active:bg-transparent data-[state=open]:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 outline-none group/brand transition-none"
                        >
                            <div className="flex w-full h-full items-center justify-center overflow-hidden border-2 border-white rounded-xl bg-background/5 transition-colors duration-200 group-hover/brand:bg-background/25">
                                <img
                                    src={logoUrl}
                                    alt={companyName}
                                    className="w-full h-full object-contain p-2"
                                />
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl p-1.5"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            Opciones de Marca
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1.5 opacity-50" />
                        <DropdownMenuItem className="cursor-pointer gap-3 p-2.5 rounded-lg transition-colors focus:bg-primary/10 focus:text-primary group">
                            <div className="flex bg-primary/10 p-1.5 rounded-md text-primary transition-colors group-focus:bg-primary/20">
                                <Info className="size-4" />
                            </div>
                            <span className="font-medium">Información de Marca</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer gap-3 p-2.5 rounded-lg transition-colors focus:bg-primary/10 focus:text-primary group">
                            <div className="flex bg-blue-500/10 p-1.5 rounded-md text-blue-600 dark:text-blue-400 transition-colors group-focus:bg-blue-500/20">
                                <Settings className="size-4" />
                            </div>
                            <span className="font-medium">Configuración</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer gap-3 p-2.5 rounded-lg transition-colors focus:bg-primary/10 focus:text-primary group">
                            <div className="flex bg-emerald-500/10 p-1.5 rounded-md text-emerald-600 dark:text-emerald-400 transition-colors group-focus:bg-emerald-500/20">
                                <LifeBuoy className="size-4" />
                            </div>
                            <span className="font-medium">Soporte Técnico</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
