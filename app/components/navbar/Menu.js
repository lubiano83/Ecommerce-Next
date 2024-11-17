"use client";
import React from 'react';
import MenuList from './MenuList';
import { useShow } from '@/app/hooks/useShow';
import SvgImage from '../SvgImage';

const Menu = ({ isDarkMode, id }) => {

    const { show, handleShow } = useShow();

  return (
    <div onClick={ handleShow }>
        <SvgImage src={"/menu-svgrepo-com.svg"} />
        <MenuList handleShow={ handleShow } show={ show } isDarkMode={ isDarkMode } id={id} />
    </div>
  )
}

export default Menu;