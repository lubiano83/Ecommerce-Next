import React from 'react';
import Image from 'next/image';

const ProfileImage = ({ imageUrl }) => {
  return (
    <Image src={`http://localhost:8080${imageUrl}`} height={225} width={225} alt="profile image" className="border-2 border-black rounded-xl bg-white" />
)}

export default ProfileImage