import { IconProps } from '@/interface/icons'

const IconUsers = (props: IconProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={props?.className}>
      <path d="M9.99935 8.33335C11.8403 8.33335 13.3327 6.84097 13.3327 5.00002C13.3327 3.15907 11.8403 1.66669 9.99935 1.66669C8.1584 1.66669 6.66602 3.15907 6.66602 5.00002C6.66602 6.84097 8.1584 8.33335 9.99935 8.33335Z" stroke={props?.fill || "black"} strokeWidth="2"/>
      <path d="M16.6663 14.5834C16.6663 16.6542 16.6663 18.3334 9.99967 18.3334C3.33301 18.3334 3.33301 16.6542 3.33301 14.5834C3.33301 12.5125 6.31801 10.8334 9.99967 10.8334C13.6813 10.8334 16.6663 12.5125 16.6663 14.5834Z" stroke={props?.fill || "black"} strokeWidth="2"/>
    </svg>
  )
}

export default IconUsers
