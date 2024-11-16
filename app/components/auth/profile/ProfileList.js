import React from 'react';
import ProfileData from './ProfileData';

const ProfileList = async ({ id }) => {
    
  const response = await fetch(`http://localhost:3000/api/auth/users/${id}`, { cache: "no-cache" });
  const responseToJson = await response.json();
  const data = Array.isArray(responseToJson) ? responseToJson : [responseToJson];

  return (
    <div className='flex justify-center items-center p-8'>
      {data.map((item) => (
        <ProfileData key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProfileList;