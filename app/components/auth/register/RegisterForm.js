"use client";
import React from 'react';
import Button from '../../Button';
import { useDarkMode } from '@/app/hooks/useDarkMode';
import { useAuth } from '@/app/hooks/useAuth';

const RegisterForm = () => {

  const { isDarkMode } = useDarkMode();
  const { userRegister, handleChange, formValues } = useAuth();

  return (
    <div className={`w-1/2 min-w-72 p-8 gap-4 rounded-3xl flex flex-col justify-center items-center ${isDarkMode ? "bg-orange-700" : "bg-green-700"} bg-opacity-25`}>
      <h2 className={`text-2xl ${isDarkMode ? "text-orange-700" : "text-green-700"} underline`}>Register:</h2>
      <form onSubmit={userRegister} className="flex flex-col justify-center items-center gap-4">
        <input
          type="text"
          name="first_name"
          placeholder="Ingresa tu nombre.."
          value={formValues.first_name}
          onChange={handleChange}
          required
          className="w-64 rounded-xl pl-2 h-8 text-gray-700"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Ingresa tu apellido.."
          value={formValues.last_name}
          onChange={handleChange}
          required
          className="w-64 rounded-xl pl-2 h-8 text-gray-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu email.."
          value={formValues.email}
          onChange={handleChange}
          required
          className="w-64 rounded-xl pl-2 h-8 text-gray-700"
        />
        <input
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña.."
          value={formValues.password}
          onChange={handleChange}
          required
          className="w-64 rounded-xl pl-2 h-8 text-gray-700"
        />
        <Button type="submit">Registrar</Button>
      </form>
    </div>
  );
};

export default RegisterForm;