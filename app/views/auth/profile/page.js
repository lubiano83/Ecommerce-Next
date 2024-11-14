import React from 'react';
import ProfileData from '@/app/components/auth/profile/ProfileData';

const Profile = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-white h-full text-gray-700 p-8">
      <ProfileData />
    </div>
  )
}

export default Profile;