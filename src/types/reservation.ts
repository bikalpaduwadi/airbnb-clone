import { AppUser } from './user';
import { AppListing } from './listing';
import { Listing, Reservation } from '@prisma/client';

export type AppReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  endDate: string;
  startDate: string;
  createdAt: string;
  listing: AppListing;
};
