import {
  BarChart4,
  Settings,
  ShieldCheck,
  CircleHelpIcon
} from 'lucide-react'

import {
  IconCustomers,
  IconRecording,
  IconUsers,
  Home
} from '@/assets/icons'

export const dataGeneralSiderbar = [
  {
    icon: Home ,
    label: "Dashboard",
    children: [
      {
        label: "Inicio",
        href: "/",
      }
    ]
  },
  {
    icon: IconCustomers ,
    label: "Clientes",
    children: [
      {
        label: "Emision de citas",
        href: "/citas",
      },
      {
        label: "Clientes",
        href: "/clientes",
      }
    ]
  },
  {
    icon: IconRecording ,
    label: "Seguimiento",
    children: [
      {
        label: "Grabaciones",
        href: "/grabaciones",
      }
    ]
  },
  {
    icon: IconUsers ,
    label: "Configuracion",
    children: [
      {
        label: "Usuarios",
        href: "/usuarios",
      }
    ]
  }
]

export const dataToolsSidebar = [
  {
    icon: CircleHelpIcon,
    label: "Preguntas",
    href: "/preguntas"
  },
  {
    icon: BarChart4,
    label: "Analiticas",
    href: "/analiticas"
  }
]

export const dataSupportSidebar = [
  {
    icon: Settings,
    label: "Configuracion",
    href: "/configuracion"
  },
  {
    icon: ShieldCheck,
    label: "Seguridad",
    href: "/seguridad"
  }
]