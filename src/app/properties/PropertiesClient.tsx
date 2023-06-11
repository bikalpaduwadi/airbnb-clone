'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';

import { AppUser } from '@/types/user';
import Header from '@/components/Header';
import { AppListing } from '@/types/listing';
import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';

interface PropertiesClientProps {
  currentUser: AppUser;
  listings: AppListing[];
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Header title='Properties' subTitle='List of your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            key={listing.id}
            onAction={onCancel}
            actionId={listing.id}
            currentUser={currentUser}
            actionLabel='Delete Property'
            disabled={deletingId === listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
