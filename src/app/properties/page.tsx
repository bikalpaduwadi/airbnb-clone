import EmptyState from '@/components/EmptyState';
import ClientOnly from '@/components/ClientOnly';
import getListings from '../actions/getListings';
import PropertiesClient from './PropertiesClient';
import getCurrentUser from '../actions/getCurrentUser';

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
