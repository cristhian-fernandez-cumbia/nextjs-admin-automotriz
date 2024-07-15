import { IconProps } from '@/interface/icons'

const IconSiderbarLine = (props: IconProps) => {
  return (
    <svg width="10" height="24" viewBox="0 0 10 24" fill="none" className={props?.className}>
      <path d="M5 1L5 19" stroke={props?.fill || "#FDDA04"} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="5" cy="19" r="5" fill={props?.fill || "#FDDA04"}/>
    </svg>
  )
}

export default IconSiderbarLine




