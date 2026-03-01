import { Separator } from "@/shared/ui/separator"
import { SidebarTrigger } from "@/shared/ui/sidebar"
import { TopbarUserMenu } from "@/layouts/app-layout/components/topbar-user-menu"
import { TopbarNotifications } from "@/layouts/app-layout/components/topbar-notifications"
import { menuData } from "@/layouts/app-layout/menu"

interface TopbarProps {
  page: string
}

export function Topbar({ page }: TopbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex flex-1 items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 bg-muted-foreground/40"
        />

        <span className="text-lg font-semibold text-foreground">
          {page}
        </span>

        <div className="ml-auto flex items-center gap-3">
          <TopbarNotifications />
          <TopbarUserMenu user={menuData.user} />
        </div>
      </div>
    </header>
  )
}
