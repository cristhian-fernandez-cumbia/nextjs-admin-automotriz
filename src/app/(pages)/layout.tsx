import Navbar from '@/components/navbar/Navbar'
import SiderbarMenu from '@/components/siderbarMenu/SiderbarMenu'
import React from 'react'

const layout = ({children}: {children: React.ReactElement}) => {
  return (
    <div className='flex w-full h-full'>
      <div className='hidden lg:block w-80 h-full xl:fixed'>
        <SiderbarMenu />
      </div>
      <div className='w-full xl:ml-80'>
        <Navbar />
        <div className='px-6 bg-white dark:bg-background'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout