'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';

import { AppUser } from '@/types/user';
import Header from '@/components/Header';
import Container from '@/components/Container';
import { AppReservation } from '@/types/reservation';
import ListingCard from '@/components/listings/ListingCard';

interface TripsClientProps {
  currentUser: AppUser;
  reservations: AppReservation[];
}

const TripsClient: FC<TripsClientProps> = ({ currentUser, reservations }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation Cancelled');
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
      <Header
        title='Trips'
        subTitle="Where you've been and where you're going"
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            onAction={onCancel}
            key={reservation.id}
            reservation={reservation}
            actionId={reservation.id}
            currentUser={currentUser}
            data={reservation.listing}
            actionLabel='Cancel reservation'
            disabled={deletingId === reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
