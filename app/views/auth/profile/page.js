import React from 'react';
import ProfileData from "@/app/components/auth/profile/ProfileData";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const Profile = async() => {

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
      <ProfileData id={userId} />
    </>
  );
}

export default Profile;