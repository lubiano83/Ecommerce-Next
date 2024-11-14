"use client";
import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import { useDarkMode } from '@/app/hooks/useDarkMode'; 

const Footer = () => {

  const { isDarkMode } = useDarkMode();

  return (
    <div className={`flex justify-evenly items-center px-8 py-4 bg-green-700 ${isDarkMode ? "bg-orange-700" : "bg-green-700"}`}>
        <h3 className='text-white'>#Todos los Derechos Reservados</h3>
        <Link href={"/"}>
          <Logo />
        </Link>
    </div>
  )
}

export default Footer;