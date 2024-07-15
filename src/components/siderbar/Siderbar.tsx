'use client'
import React from 'react'
import {dataGeneralSiderbar, dataToolsSidebar, dataSupportSidebar} from './Siderbar.data'
import SiderbarItem from '../siderbarItem/SiderbarItem'
import { Button } from '@/components/ui/button'
import Logo from '../logo/Logo'
import { Logout } from '@/assets/icons'
import { signOut } from 'next-auth/react';

const Siderbar = () => {
  const handleCloseClick = () => {
    signOut()
  };
  return (
    <div className='flex flex-col justify-between h-full bg-ui-gray'>
      <div className='px-4 pt-8'>
        <Logo />
        <div >
          <p className='mt-5 mb-4 text-center font-bold text-black'>ADMINISTRATIVO</p>
          {
            dataGeneralSiderbar.map((item) => (
              <SiderbarItem key={item.label} item={item} />
            ))
          }
        </div>
      </div>
      <div>
        <div>
          <Button variant={'ghost'} className='w-full text-black bg-ui-gray-light dark:bg-gray-600 rounded-none text-[15px] p-7 font-extrabold' onClick={handleCloseClick}>
            <Logout className='mr-2'/>
            SALIR DE SESIÓN
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Siderbar