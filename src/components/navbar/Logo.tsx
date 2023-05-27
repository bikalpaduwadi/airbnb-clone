'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <Image
      src='/images/logo.png'
      className='hidden md:block cursor-pointer'
      alt='logo'
      height='100'
      width='100'
    />
  );
};

export default Logo;
