import React from 'react';
import ProfileData from "@/app/components/auth/profile/ProfileData";

const Profile = async({ params }) => {

  const { id } = await params;

  return (
    <>
      <ProfileData id={id} />
    </>
  );
}

export default Profile;