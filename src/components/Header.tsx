'use client';

import { FC } from 'react';

interface HeaderProps {
  title: string;
  center?: boolean;
  subTitle?: string;
}

const Header: FC<HeaderProps> = ({ title, subTitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-2xl font-bold'>{title}</div>
      <div className='font-light text-neutral-500 mt-2'>{subTitle}</div>
    </div>
  );
};

export default Header;
