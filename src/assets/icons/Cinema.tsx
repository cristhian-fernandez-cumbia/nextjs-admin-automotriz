import { IconProps } from '@/interface/icons'

const Cinema = (props: IconProps) => {
  return (
   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={props?.className} onClick={props?.onClick}>
      <path d="M15 2.25H3C2.17275 2.25 1.5 2.92275 1.5 3.75V14.25C1.5 15.0773 2.17275 15.75 3 15.75H15C15.8272 15.75 16.5 15.0773 16.5 14.25V3.75C16.5 2.92275 15.8272 2.25 15 2.25ZM15.0007 6.75C15 6.75 15 6.75 15.0007 6.75H14.6512L12.651 3.75H15L15.0007 6.75ZM7.15125 6.75L5.151 3.75H7.09875L9.099 6.75H7.15125ZM10.9012 6.75L8.901 3.75H10.8487L12.849 6.75H10.9012ZM3 3.75H3.34875L5.349 6.75H3V3.75ZM3 14.25V8.25H15L15.0015 14.25H3Z" fill={props?.fill || "black"} />
    </svg>
  )
}

export default Cinema

