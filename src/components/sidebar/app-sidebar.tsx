import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
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
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Tables",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Basic Tables",
          url: "/tables/basic",
        },
        {
          title: "Advanced Tables",
          url: "#",
        },
        {
          title: "Datatable",
          url: "#",
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
        },
        {
          title: "Advanced Forms",
          url: "#",
        },
        {
          title: "Form Validation",
          url: "#",
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
        },
        {
          title: "Product Cards",
          url: "#",
        },
        {
          title: "Charts",
          url: "#",
        },
        {
          title: "Timeline",
          url: "#",
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
