"use client";
import React from 'react';

const ProfileData = async({ id }) => {

  const user = await fetch(`http:localhost:3000/api/auth/users/${id}`, { cache: "no-cache" }).then(res => res.json());

  return (
    <div>
    
    </div>
  );
};

export default ProfileData;