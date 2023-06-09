'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';
import { FC, useCallback, useState } from 'react';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { AppUser } from '@/types/user';
import useRentModal from '@/hooks/useRentModal';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

interface UserMenuProps {
  currentUser?: AppUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal]);

  const handleRedirection = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          Airbnb your home
        </div>
        <div
          onClick={() => {
            setIsOpen((val) => !val);
          }}
          className='py-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu size={18} />
          <div className='hidden md:block'>
            <Avatar imageUrl={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  label='My trips'
                  onClick={() => handleRedirection('/trips')}
                />
                <MenuItem
                  label='My favorites'
                  onClick={() => handleRedirection('/favorites')}
                />
                <MenuItem
                  label='My reservations'
                  onClick={() => handleRedirection('/reservations')}
                />
                <MenuItem
                  label='My properties'
                  onClick={() => handleRedirection('/properties')}
                />
                <MenuItem
                  label='Airbnb my home'
                  onClick={() => {
                    rentModal.onOpen();
                  }}
                />
                <MenuItem
                  label='Logout'
                  onClick={() => {
                    signOut();
                    setIsOpen((val) => !val);
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label='Login'
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen((val) => !val);
                  }}
                />
                <MenuItem
                  label='Sign UP'
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen((val) => !val);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
