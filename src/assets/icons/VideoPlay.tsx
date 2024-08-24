import { IconProps } from '@/interface/icons'

const VideoPlay = (props: IconProps) => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className={props?.className} onClick={props?.onClick}>
      <path d="M50 8.33325C27 8.33325 8.33331 26.9999 8.33331 49.9999C8.33331 72.9999 27 91.6666 50 91.6666C73 91.6666 91.6666 72.9999 91.6666 49.9999C91.6666 26.9999 73 8.33325 50 8.33325ZM61.0833 57.2082L55.75 60.2916L50.4166 63.3749C43.5416 67.3332 37.9166 64.0832 37.9166 56.1666V49.9999V43.8333C37.9166 35.8749 43.5416 32.6666 50.4166 36.6249L55.75 39.7082L61.0833 42.7916C67.9583 46.7499 67.9583 53.2499 61.0833 57.2082Z" fill={props?.fill || "white"}/>
    </svg>
  )
}

export default VideoPlay


