import { IconProps } from '@/interface/icons'

const PauseCircle = (props: IconProps) => {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" className={props?.className} onClick={props?.onClick}>
      <path d="M20 30V18M28 30V18M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default PauseCircle



