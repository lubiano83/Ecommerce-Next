import React from 'react';
import Image from 'next/image';

const SvgImage = ({src, handleClick}) => {
  return (
    <Image src={src} alt={"organic 4 life svg image"} height={35} width={35} onClick={handleClick} className='hover:scale-110 cursor-pointer' priority/>
  )
}; export default SvgImage;