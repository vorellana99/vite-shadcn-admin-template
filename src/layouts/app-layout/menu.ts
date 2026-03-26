import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  SquareTerminal,
  PieChart,
} from "lucide-react"

export const menuData = {
  user: {
    name: "Victor",
    email: "m@example.com",
    role: "Administrator",
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
    {
      title: "Reportes",
      url: "/reports",
      icon: PieChart,
    },
  ],
  navCore: [
    { title: "Perfil de Usuario", url: "/core/user/profile" },
    { title: "Configuración de Cuenta", url: "/core/user/settings" },
    { title: "Seguridad", url: "/core/user/security" },
    { title: "Configuración de Marca", url: "/core/brand/settings" },
    { title: "Soporte de Marca", url: "/core/brand/support" },
  ],
}
