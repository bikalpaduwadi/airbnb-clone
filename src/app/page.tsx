import Image from 'next/image';

import Container from '@/components/Container';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from './actions/getCurrentUser';
import ListingCard from '@/components/listings/ListingCard';
import getListings, { IListingParams } from './actions/getListings';

interface HomePageProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomePageProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  const isEmpty = !listings.length;

  if (isEmpty) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {listings.map((listing: any) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
