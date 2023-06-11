import prisma from '@/libs/prismadb';
import { AppListing } from '@/types/listing';
import getCurrentUser from './getCurrentUser';

export interface IListingParams {
  userId?: string;
  endDate?: string;
  category?: string;
  startDate?: string;
  roomCount?: number;
  guestCount?: number;
  bathroomCount?: number;
  locationValue?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      endDate,
      category,
      startDate,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safelistings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toString(),
    }));

    return safelistings;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getListingById(listingId: string) {
  if (!listingId) {
    return null;
  }

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      user: true,
    },
  });

  if (!listing) {
    return null;
  }

  return {
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  } as AppListing;
}

export async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
