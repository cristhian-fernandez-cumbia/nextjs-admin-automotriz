import { IconProps } from '@/interface'

const Plus = (props: IconProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke={props?.fill || "#18181B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default Plus