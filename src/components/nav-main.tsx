import { useState } from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

let persistedSelectedId: string | null = null

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      isActive?: boolean
    }[]
  }[]
}) {
  const getInitialSelectedId = () => {
    if (persistedSelectedId) return persistedSelectedId
    for (const item of items) {
      for (const sub of item.items ?? []) {
        if (sub.isActive) return `${item.title}-${sub.title}`
      }
    }
    return null
  }
  const [selectedId, _setSelectedId] = useState<string | null>(getInitialSelectedId)
  const { isMobile, setOpenMobile } = useSidebar()

  const setSelectedId = (id: string) => {
    _setSelectedId(id)
    persistedSelectedId = id
  }

  const isDirectItem = (item: typeof items[number]) =>
    !item.items || item.items.length === 0

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (isDirectItem(item)) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={selectedId === item.title}
                  className="direct-menu-item"
                >
                  <a
                    href={item.url}
                    onClick={(e) => {
                      setSelectedId(item.title)
                      if (item.url === "#") e.preventDefault()
                      if (isMobile) setOpenMobile(false)
                    }}
                  >
                    {item.icon && <item.icon />}
                    <span className="font-semibold">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          const hasActiveChild = item.items?.some(
            (sub) => selectedId === `${item.title}-${sub.title}`
          )
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || hasActiveChild}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span className="font-semibold">{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-500 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="collapsible-menu-animation">
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={selectedId === `${item.title}-${subItem.title}`}
                        >
                          <a
                            href={subItem.url}
                            onClick={(e) => {
                              setSelectedId(`${item.title}-${subItem.title}`)
                              if (subItem.url === "#") e.preventDefault()
                              if (isMobile) setOpenMobile(false)
                            }}
                          >
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
