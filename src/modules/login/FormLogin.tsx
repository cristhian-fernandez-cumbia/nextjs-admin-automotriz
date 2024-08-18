import React, { useState } from 'react';
import { useRouter } from "next/navigation"
import { Hide, Show } from "@/assets/icons";
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import dotenv from 'dotenv';
dotenv.config();

const FormLogin = () => {
  const router = useRouter();
  const { register, handleSubmit, formState:{errors} } = useForm(); 
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log('data:::', data);
    console.log('process.env.MYSQL_HOST:::', process.env.MYSQL_HOST);
    console.log('process.env.MYSQL_USER:::', process.env.MYSQL_USER);

    const res = await signIn('credentials',{
      username: data.username,
      password: data.password,
      redirect: false
    });
    console.log({res});
    if (res && res.ok) {
      router.push("/");
    } else {
      alert("Usuario/Contraseña invalida")
    }
  });
  
  return (
    <form className='flex flex-col sm:w-full mx-auto' onSubmit={onSubmit}>
      <div className="relative">
        <input 
          type="text"
          {...register("username", { required: true })}
          placeholder='Usuario' 
          className='text-xl bg-ui-bg-input pl-6 border border-ui-border-input w-full px-3 py-2 mt-4 text-black rounded-md focus:outline-none;'
        />
        {errors.username && (
          <span className="text-red-500 text-xs">
            Usuario es requerido
          </span>
        )}
      </div>
      <div className="relative">
        {showPassword ? (
          <Show 
            fill="#1C2E45" 
            className="absolute top-8 right-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <Hide 
            fill="#1C2E45" 
            className="absolute top-8 right-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        )}
        <input 
          type={showPassword ? "text" : "password"}
          {...register("password", { required: true })}
          placeholder='Clave'
          className='text-xl bg-ui-bg-input pl-6 border border-ui-border-input w-full px-3 py-2 mt-5 text-black rounded-md focus:outline-none;'
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            Clave es requerida
          </span>
        )}
      </div>
      <div className='flex justify-end mt-8'>
        <h3 className='text-gray-400 font-semibold'>¿Olvidaste la clave?</h3>
      </div>
      <button className='bg-ui-red w-full p-3 rounded-[20px] text-white text-xl hover:bg-red-800 mt-4 font-semibold'>
        INGRESAR
      </button>
    </form>
  )
}

export default FormLogin