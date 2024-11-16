"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import Image from 'next/image';

const MenuList = ({ show, handleShow, isDarkMode }) => {

  const path = usePathname();
  const { token, userLogout } = useAuth();

  return (
    <div className={`${show ? "opacity-100 visible" : "opacity-0 invisible"} transition-all fixed inset-0 bg-black/50 flex justify-start z-20`}>
      <aside className={`${!show ? "translate-x-48" : ""} transition-all w-72 ${isDarkMode ? "bg-orange-700" : "bg-green-700"}`}>
        <div className='cursor-pointer text-3xl text-white text-right flex justify-end pr-4 pt-4'><div onClick={handleShow} className='w-4 hover:text-gray-700 text-center'>x</div></div>
        <ul style={{ height: 'calc(100vh - 72px)' }} className='flex flex-col gap-4 px-3 pb-10 justify-evenly items-center text-center'>
          { token ? <Link href={"/views/auth/users"} className={`text-white p-2 hover:text-gray-700 font-bold`}><Image src={"/user-circle-svgrepo-com.svg"} height={50} width={50} alt="profile" /></Link> : "" }
          <Link href={"/"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/" ? "underline" : "no-underline"}`}>Inicio</div></Link>
          <Link href={"/views/products"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/views/products" ? "underline" : "no-underline"}`} >Tienda</div></Link>
          <Link href={"/views/contact"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/views/contact" ? "underline" : "no-underline"}`}>Contacto</div></Link>
          { token ? "" : <Link href={"/views/auth/register"} className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/views/auth/register" ? "underline" : "no-underline"}`}>Register</Link> }
          { token ? "" : <Link href={"/views/auth/login"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/views/auth/login" ? "underline" : "no-underline"}`}>Login</div></Link> }
          { token ? <p onClick={userLogout} className={`text-white p-2 hover:text-gray-700 font-bold`}>Salir</p> : "" }
        </ul>
      </aside>
    </div>
  )
}; export default MenuList;