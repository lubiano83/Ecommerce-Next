"use client";
import React from 'react';
import { useDarkMode } from '@/app/hooks/useDarkMode';

const ProfileUpdate = () => {

    const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-w-72 p-8 gap-4 rounded-3xl flex flex-col justify-center items-center ${isDarkMode ? "bg-orange-700" : "bg-green-700"} bg-opacity-25`}>
      <h1 className={`text-2xl underline ${isDarkMode ? "text-orange-700" : "text-green-700"}`}>Editar Usuario</h1>
      <div className='flex justify-center items-center flex-wrap gap-4'>
        
      </div>
    </div>
  )
}

export default ProfileUpdate;