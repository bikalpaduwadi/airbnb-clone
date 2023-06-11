'use client';

import { FC } from 'react';
import Image from 'next/image';

import Header from '../Header';
import { AppUser } from '@/types/user';
import HeartButton from '../HeartButton';
import useCountries from '@/hooks/useCountries';

interface ListingHeadProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser: AppUser | null;
}

const ListingHead: FC<ListingHeadProps> = ({
  id,
  title,
  imageSrc,
  currentUser,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Header
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
          fill
          src={imageSrc}
          alt='Image'
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
