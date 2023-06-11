import getCurrentUser from '../actions/user';
import getListings from '../actions/listings';
import EmptyState from '@/components/EmptyState';
import ClientOnly from '@/components/ClientOnly';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subTitle='Please login' />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No properties found'
          subTitle='Looks like you have not registered any properties.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient currentUser={currentUser} listings={listings} />
    </ClientOnly>
  );
};

export default PropertiesPage;
