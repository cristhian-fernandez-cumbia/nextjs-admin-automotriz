import { IconProps } from '@/interface'

const Return = (props: IconProps) => {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={props?.className}>
      <path d="M20 12C20 7 15.1 7 15.1 7H13V4L7 10L13 16V13H15.2C18.7 13 17 20 17 20C17 20 20 15.9 20 12Z" fill="#000" fillOpacity="0.7"/>
      <path d="M4 10L10 16V14.5L5.5 10L10 5.5V4L4 10Z" fill="#000" fillOpacity="0.7"/>
    </svg>
  )
}

export default Return
