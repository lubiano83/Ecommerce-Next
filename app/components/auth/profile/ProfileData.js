"use client";
import React from 'react';
import Image from 'next/image';
import { useDarkMode } from '@/app/hooks/useDarkMode';
import Button from '../../Button';
import Link from 'next/link';
import GoBack from '../../GoBack';

const ProfileData = ({ item }) => {

  const { isDarkMode } = useDarkMode();

  return (
    <div className={`w-full min-w-72 p-8 gap-4 rounded-3xl flex flex-col justify-center items-center ${isDarkMode ? "bg-orange-700" : "bg-green-700"} bg-opacity-25`}>
      <h1 className={`text-2xl underline ${isDarkMode ? "text-orange-700" : "text-green-700"}`}>Perfil de Usuario</h1>
      <div className='flex justify-center items-center flex-wrap gap-4'>
        <Image
          src={"/user-svgrepo-com.svg"}
          width={225}
          height={225}
          alt="profile image"
          className='border-2 border-black rounded-xl bg-white'
        />
        <div className='flex flex-col gap-1.5 text-sm'>
          <p><strong>Id:</strong> {item.user._id}</p>
          <p><strong>Nombre:</strong> {item.user.first_name} {item.user.last_name}</p>
          <p><strong>Email:</strong> {item.user.email}</p>
          <p><strong>Región:</strong> {item.user.address.region || "Sin datos"}</p>
          <p><strong>Ciudad:</strong> {item.user.address.city || "Sin datos"}</p>
          <p><strong>Calle:</strong> {item.user.address.street || "Sin datos"}</p>
          <p><strong>Número:</strong> {item.user.address.number || "Sin datos"}</p>
          <p><strong>Creación:</strong> {new Date(item.user.createdAt || "").toDateString()}</p>
          <p><strong>Actualización:</strong> {new Date(item.user.updatedAt || "").toDateString()}</p>
        </div>
      </div>
      <div className='flex gap-2'>
        <GoBack />
        <Link href={"/views/auth/update"}>
          <Button>Editar</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileData;