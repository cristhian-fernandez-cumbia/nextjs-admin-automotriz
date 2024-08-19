import { IconProps } from '@/interface/icons'

const PlayCircle = (props: IconProps) => {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" className={props?.className} onClick={props?.onClick}>
      <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 16L32 24L20 32V16Z" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default PlayCircle




