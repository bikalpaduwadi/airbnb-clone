'use client';

import { FC } from 'react';

import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import Container from '../Container';
import { AppUser } from '@/types/user';

interface NavbarProps {
  currentUser?: AppUser | null;
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-grow items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
