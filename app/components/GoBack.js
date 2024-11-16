"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

const GoBack = () => {
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };

  return (
    <Button handleClick={goBack}>Volver</Button>
  );
};

export default GoBack;