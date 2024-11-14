import React from 'react';
import RegisterForm from '@/app/components/auth/register/RegisterForm';

const Register = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-white h-full text-gray-700 p-8">
      <RegisterForm />
    </div>
  )
}

export default Register;