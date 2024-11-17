import React from 'react';
import ProfileUpdate from '@/app/components/auth/profile/ProfileUpdate';

const Update = async({ params }) => {

  const { id } = await params;

  return (
    <>
       <ProfileUpdate id={id} />
    </>
  )
}

export default Update;