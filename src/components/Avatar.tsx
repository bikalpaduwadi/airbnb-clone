'use client';

import { FC } from 'react';
import Image from 'next/image';

interface AvatarProps {
  imageUrl?: string | null;
}

const Avatar: FC<AvatarProps> = ({ imageUrl }) => {
  const src = imageUrl || '/images/placeholder.jpg';
  return (
    <Image
      src={src}
      className='rounded-full'
      alt='Avatar'
      height='30'
      width='30'
    />
  );
};

export default Avatar;
