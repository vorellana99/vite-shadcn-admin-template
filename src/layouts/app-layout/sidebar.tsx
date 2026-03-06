import * as React from "react"

import { NavMain } from "@/layouts/app-layout/components/nav-main"
import { BrandSection } from "@/layouts/app-layout/components/brand-section"
import { menuData } from "@/layouts/app-layout/menu"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/shared/ui/sidebar"

// Path to the brand logo in public folder
const LOGO_URL = "/logo-moderna.png"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-0">
        <BrandSection
          logoUrl={LOGO_URL}
          companyName="Acme Corp"
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuData.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <TopbarUserMenu user={menuData.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
