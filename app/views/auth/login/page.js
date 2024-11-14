import React from 'react';
import LoginForm from '@/app/components/auth/login/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-white h-full text-gray-700 p-8">
      <LoginForm />
    </div>
  )
}

export default Login;