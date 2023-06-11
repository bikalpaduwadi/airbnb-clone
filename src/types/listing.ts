import { AppUser } from './user';
import { Listing } from '@prisma/client';

export type AppListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
  user?: AppUser | null;
};
