import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Tables",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Basic Tables",
          url: "#",
          isActive: true,
        },
        {
          title: "Advanced Tables",
          url: "#",
          isActive: true,
        },
        {
          title: "Datatable",
          url: "#",
          isActive: true,
        },
      ],
    },
    {
      title: "Forms",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Basic Forms",
          url: "#",
          isActive: true,
        },
        {
          title: "Advanced Forms",
          url: "#",
          isActive: true,
        },
        {
          title: "Form Validation",
          url: "#",
          isActive: true,
        },
      ],
    },
    {
      title: "Examples",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Pricing Cards",
          url: "#",
          isActive: true,
        },
        {
          title: "Product Cards",
          url: "#",
          isActive: true,
        },
        {
          title: "Charts",
          url: "#",
          isActive: true,
        },
        {
          title: "Timeline",
          url: "#",
          isActive: true,
        },
        {
          title: "Toasts",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
