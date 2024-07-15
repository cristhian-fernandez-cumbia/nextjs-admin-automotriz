import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Siderbar from '../siderbar/Siderbar'
import ToggleTheme from '@/components/toggleTheme/ToggleTheme'
import { User } from '@/assets/icons'

const Navbar = () => {
  return (
    <nav className='flex items-center px-2 gap-x-4 lg:px-6 justify-between w-full bg-background h-20 lg:justify-end'>
      <div className='block lg:hidden'>
        <Sheet>
          <SheetTrigger className='flex items-center'>
            <Menu />
          </SheetTrigger>
          <SheetContent side='left' className='p-0'>
            <Siderbar />
          </SheetContent>
        </Sheet>
      </div>
      <div className='flex gap-x-2 items-center'>
        <p className='font-semibold'>Anthony de la Cruz</p>
        <div className='w-9 h-9 bg-black rounded-full flex justify-center items-center'>
          <User fill='white'/>
        </div>
        <ToggleTheme />
      </div>
    </nav>
  )
}

export default Navbar