import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb"
import { Separator } from "@/shared/ui/separator"
import { SidebarTrigger } from "@/shared/ui/sidebar"
import { TopbarUserMenu } from "@/layouts/app-layout/components/topbar-user-menu"
import { TopbarNotifications } from "@/layouts/app-layout/components/topbar-notifications"
import { menuData } from "@/layouts/app-layout/menu"

interface TopbarProps {
  module?: string
  page: string
}

export function Topbar({ module, page }: TopbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex flex-1 items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {module && (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">{module}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{page}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center gap-3">
          <TopbarNotifications />
          <TopbarUserMenu user={menuData.user} />
        </div>
      </div>
    </header>
  )
}
