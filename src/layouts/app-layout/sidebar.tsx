import * as React from "react"

import { NavMain } from "@/layouts/app-layout/components/nav-main"
import { UserMenu } from "@/layouts/app-layout/components/user-menu"
import { TenantSwitcher } from "@/layouts/app-layout/components/tenant-switcher"
import { menuData } from "@/layouts/app-layout/menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/shared/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TenantSwitcher teams={menuData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={menuData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
