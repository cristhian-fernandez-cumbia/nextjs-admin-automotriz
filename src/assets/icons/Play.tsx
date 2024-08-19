import { IconProps } from '@/interface/icons'

const Play = (props: IconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={props?.className}
      onClick={props?.onClick}
    >
      <path d="M4 3.94133C4 3.838 4.02467 3.73667 4.07133 3.646C4.22467 3.35267 4.57133 3.24667 4.84667 3.41L11.7067 7.46867C11.8 7.524 11.8767 7.606 11.928 7.70533C12.0813 7.99867 11.9813 8.36867 11.7067 8.53133L4.84667 12.59C4.763 12.6399 4.66743 12.6664 4.57 12.6667C4.25533 12.6667 4 12.3947 4 12.0593V3.94133Z" />
    </svg>
  )
}

export default Play