"use client";
import React from 'react';
import Logo from '../Logo';
import SvgImage from '../SvgImage';
import { useDarkMode } from "../../hooks/useDarkMode";
import Link from 'next/link';
import Menu from './Menu';

const NavBar = () => {

    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className={`flex justify-evenly items-center px-8 py-3 gap-2 ${isDarkMode ? "bg-orange-700" : "bg-green-700"}`}>
            <div className='flex justify-center items-center gap-2'>
                <Menu isDarkMode={isDarkMode}/>
                <Link href={"/"}>
                    <Logo />
                </Link>
            </div>
            <SvgImage src={"/sun-5-svgrepo-com.svg"} handleClick={toggleDarkMode}/>
            <Link href={"/views/cart"}>
                <SvgImage src={"/leaf-season-svgrepo-com.svg"} />
            </Link>
        </div>
    )
}

export default NavBar;