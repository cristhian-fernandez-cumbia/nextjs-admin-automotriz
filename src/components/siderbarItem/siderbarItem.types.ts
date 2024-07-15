export type SiderItemProps = {
  item :{
    label: string,
    icon: React.ComponentType,
    children: SiderSubItemProps[]
  },
  key: string
}

type SiderSubItemProps = {
  label: string,
  href: string
}