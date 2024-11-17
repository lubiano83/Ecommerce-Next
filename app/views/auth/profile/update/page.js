import React from 'react';
import ProfileUpdate from '@/app/components/auth/profile/ProfileUpdate';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const Update = async() => {

  let userId = null;

  try {
    const cookieStore = await cookies();
    const coderCookieToken = cookieStore.get('coderCookieToken')?.value;

    if (!coderCookieToken) {
      throw new Error('Token no encontrado. Por favor, inicia sesión.');
    }

    const decoded = jwt.verify(coderCookieToken, process.env.COOKIE_KEY);
    userId = decoded.id;
  } catch (error) {
    console.error("Error al procesar el token:", error.message);
    userId = null;
  }

  return (
    <>
       <ProfileUpdate id={userId} />
    </>
  )
}

export default Update;