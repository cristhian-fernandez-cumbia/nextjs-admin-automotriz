'use client'
import React, { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FormLogin from './FormLogin';
import Image from 'next/image';
import logo from '@/assets/images/logo/logo_clinica_automotriz.png';
import banner from '@/assets/images/login/banner_sede_olivos.png';

const Login = () => {
  const router = useRouter();
  
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/');
      }
    };
    checkSession();
  }, []);
  
  return (
    <div className='flex flex-col md:flex-row-reverse h-screen'>
      <div className='md:w-1/2 flex flex-col justify-center items-center bg-primary md:h-full relative'>
        <Image 
          alt="banner" 
          src={banner} 
          className="w-full h-64 md:h-full object-cover"
        />
      </div>
      <div className='md:w-1/2 flex flex-col justify-center items-center relative'>
        <div className='w-full px-16 z-10 bg-white mb-10'>
          <Image 
            alt="logo" 
            src={logo} 
            className="flex justify-start right-1 relative mb-20 mt-5"
          />
          <h1 className='mb-10 mt-10 text-4xl font-extrabold text-black'>¡BIENVENIDOS!</h1>
          <FormLogin />
        </div>
        <div className='hidden lg:flex justify-end mt-12 absolute bottom-4 right-[68px] z-0 '>
            <div>
              <h3 className='text-black text-[12px] font-extrabold'>Powered by</h3>
              <Image 
                alt="logo" 
                src={logo} 
                className="flex w-28"
              />
            </div>
          </div>
      </div>
    </div>
  );
}

export default Login;