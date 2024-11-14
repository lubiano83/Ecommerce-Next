import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const Button = ({ children, type, handleClick }) => {

  const { isDarkMode } = useDarkMode();

  return (
    <button type={type} onClick={handleClick} className={`border-2 border-white text-white rounded-xl py-1 px-2 ${isDarkMode? "bg-orange-700" : "bg-green-600"}`}>{children}</button>
  )
}

export default Button;
