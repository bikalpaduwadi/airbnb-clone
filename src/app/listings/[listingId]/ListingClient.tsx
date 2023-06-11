'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Range } from 'react-date-range';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';

import { AppUser } from '@/types/user';
import { useRouter } from 'next/navigation';
import { AppListing } from '@/types/listing';
import CATEGORIES from '@/constants/category';
import Container from '@/components/Container';
import useLoginModal from '@/hooks/useLoginModal';
import { AppReservation } from '@/types/reservation';
import ListingHead from '@/components/listings/ListingHead';
import ListingInfo from '@/components/listings/ListingInfo';
import ListingReservation from '@/components/listings/ListingReservation';

const initialDateRange = {
  key: 'selection',
  endDate: new Date(),
  startDate: new Date(),
};

interface ListingClientProps {
  listing: AppListing;
  currentUser: AppUser | null;
  reservations?: AppReservation[];
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        listingId: listing?.id,
        endDate: dateRange.endDate,
        startDate: dateRange.startDate,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return CATEGORIES.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            id={listing.id}
            title={listing.title}
            currentUser={currentUser}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              description={listing.description}
              locationValue={listing.locationValue}
              bathroomCount={listing.bathroomCount}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                isDisabled={isLoading}
                price={listing.price}
                dateRange={dateRange}
                totalPrice={totalPrice}
                disabledDates={disabledDates}
                onSubmit={onCreateReservation}
                onChangeDate={(value) => setDateRange(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
