import React from 'react';
import ProfileList from '@/app/components/auth/profile/ProfileList';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const Profile = async() => {

  const cookieStore = await cookies()
  const coderCookieToken = cookieStore.get('coderCookieToken')?.value;

  if (!coderCookieToken) {
    throw new Error('Token no encontrado.');
  }

  const decoded = jwt.verify(coderCookieToken, process.env.COOKIE_KEY);
  const userId = decoded.id;

  return (
    <div className="flex flex-col w-full justify-center items-center bg-white h-full text-gray-700 p-8">
      <ProfileList id={userId} />
    </div>
  )
}

export default Profile;