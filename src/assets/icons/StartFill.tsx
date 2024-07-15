import { IconProps } from '@/interface'

const StartFill = (props: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M16.9 19.1L12 16.5L7.1 19.1L8 13.7L4 9.8L9.5 9L11.9 4L14.3 9L19.8 9.8L16 13.7L16.9 19.1Z" fill={props?.fill || "#efcb3b"} fillOpacity="0.99"/>
    </svg>
    
  )
}

export default StartFill