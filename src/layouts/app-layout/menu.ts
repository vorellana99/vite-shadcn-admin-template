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
    role: "Administrador",
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
      title: "Tablas",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Tablas Básicas",
          url: "/tables/basic",
        },
        {
          title: "Tablas Avanzadas",
          url: "/tables/advanced",
        },
        {
          title: "Datatable",
          url: "/tables/datatable",
        },
      ],
    },
    {
      title: "Formularios",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Formularios Básicos",
          url: "/forms/basic",
        },
        {
          title: "Formularios Avanzados",
          url: "/forms/advanced",
        },
        {
          title: "Validación de Formularios",
          url: "#",
        },
      ],
    },
    {
      title: "Ejemplos",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Clientes",
          url: "/examples/customers",
        },
        {
          title: "Estudiantes",
          url: "/examples/students",
        },
        {
          title: "Productos",
          url: "/examples/products"
        },
        {
          title: "Gráficos",
          url: "#",
        },
        {
          title: "Línea de Tiempo",
          url: "#",
        },
        {
          title: "Notificaciones",
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
