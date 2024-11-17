"use client";
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const Title = ({ children }) => {

    const { isDarkMode } = useDarkMode();

  return (
    <h2 className={`${isDarkMode ? "bg-orange-blue" : "bg-green-700"} text-2xl`}>{children}</h2>
  )
}

export default Title;