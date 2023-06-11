import { FC } from 'react';

import { AppUser } from '@/types/user';
import Header from '@/components/Header';
import { AppListing } from '@/types/listing';
import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';

interface FavoriteClientProps {
  listings: AppListing[];
  currentUser: AppUser | null;
}

const FavoriteClient: FC<FavoriteClientProps> = ({ currentUser, listings }) => {
  return (
    <Container>
      <Header title='Favorites' subTitle='List of places you have favorited' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
