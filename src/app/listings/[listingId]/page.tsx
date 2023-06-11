import ListingClient from './ListingClient';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import getReservations from '@/app/actions/reservation';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { getListingById } from '@/app/actions/getListings';

interface ListingPageProps {
  listingId: string;
}

const ListingPage = async ({ params }: { params: ListingPageProps }) => {
  console.log('listingId', params.listingId);
  const listing = await getListingById(params.listingId);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
