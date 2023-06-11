import getCurrentUser from '../actions/user';
import FavoriteClient from './FavoriteClient';
import EmptyState from '@/components/EmptyState';
import ClientOnly from '@/components/ClientOnly';
import { getFavoriteListings } from '../actions/listings';

const FavoritesPage = async ({}) => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites found'
          subTitle='Looks like you have no favorite listings'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoriteClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
