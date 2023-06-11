import EmptyState from '@/components/EmptyState';
import ClientOnly from '@/components/ClientOnly';
import ReservationClient from './ReservationClient';
import getReservations from '../actions/reservation';
import getCurrentUser from '../actions/getCurrentUser';

const ReservationPage = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subTitle='Please login' />
      </ClientOnly>
    );
  }
  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No reservations found'
          subTitle='Looks like you have no reservations on your property'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationClient
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ReservationPage;
