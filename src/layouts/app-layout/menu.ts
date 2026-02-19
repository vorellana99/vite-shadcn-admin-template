import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  SquareTerminal,
} from "lucide-react"

export const menuData = {
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
          url: "/tables/advanced",
        },
        {
          title: "Datatable",
          url: "/tables/datatable",
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
          title: "Customers",
          url: "/examples/customers",
        },
        {
          title: "Products",
          url: "/examples/products"
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
