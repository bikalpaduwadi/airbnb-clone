'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';

import Avatar from '../Avatar';
import { AppUser } from '@/types/user';
import Category from '@/models/Category';
import useCountries from '@/hooks/useCountries';
import ListingCategory from './ListingCategory';

interface ListingInfoProps {
  roomCount: number;
  guestCount: number;
  category?: Category;
  description: string;
  user?: AppUser | null;
  locationValue: string;
  bathroomCount: number;
}

const ListingInfo: FC<ListingInfoProps> = ({
  user,
  category,
  roomCount,
  guestCount,
  description,
  locationValue,
  bathroomCount,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  const Map = dynamic(() => import('../Map'), { ssr: false });
  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl flex flex-row items-center gap-2 font-semibold'>
          <div>Hosted by {user?.name}</div>
          <Avatar imageUrl={user?.image} />
        </div>
        <div className='flex flex-row gap-4 items-center font-light text-neutral-500'>
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />

      {category && <ListingCategory category={category} />}

      <hr />
      <div className='text-lg font-light text-neutral-500'>{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
