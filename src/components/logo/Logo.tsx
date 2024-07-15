import React from 'react'
import logo from '@/assets/images/logo/logo_clinica_automotriz.png';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Logo = () => {
  const router = useRouter()
  return (
    <div className='flex justify-start cursor-pointer gap-2' onClick={() => router.push('/')}>
      <Image src={logo} alt='logo clinica automotriz' width={150} height={30} priority />
    </div>
  )
}

export default Logo