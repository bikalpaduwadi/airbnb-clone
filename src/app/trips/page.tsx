import TripsClient from './TripsClient';
import EmptyState from '@/components/EmptyState';
import ClientOnly from '@/components/ClientOnly';
import getReservations from '../actions/reservation';
import getCurrentUser from '../actions/getCurrentUser';

const TripsPage = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subTitle='Please login' />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No trips found'
          subTitle='Looks like you havent reserved any trips.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};

export default TripsPage;
