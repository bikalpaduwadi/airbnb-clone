'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FC, useState, useCallback } from 'react';

import { AppUser } from '@/types/user';
import Header from '@/components/Header';
import Container from '@/components/Container';
import { AppReservation } from '@/types/reservation';
import ListingCard from '@/components/listings/ListingCard';

interface ReservationClientProps {
  currentUser: AppUser;
  reservations: AppReservation[];
}

const ReservationClient: FC<ReservationClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Header title='Reservations' subTitle='Bookings on your properties' />
      <div className='m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            onAction={onCancel}
            key={reservation.id}
            reservation={reservation}
            currentUser={currentUser}
            actionId={reservation.id}
            data={reservation.listing}
            actionLabel='Cancel guest reservation'
            disabled={deletingId === reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
