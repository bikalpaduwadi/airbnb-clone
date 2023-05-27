'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push('/')}
      src='/images/logo.png'
      className='hidden md:block cursor-pointer'
      alt='logo'
      height='100'
      width='100'
    />
  );
};

export default Logo;
