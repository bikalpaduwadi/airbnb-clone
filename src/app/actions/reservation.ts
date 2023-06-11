import prisma from '@/libs/prismadb';
import { AppReservation } from '@/types/reservation';

interface IParams {
  userId?: string;
  authorId?: string;
  listingId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const appReservations = reservations.map(
      (reservation) =>
        ({
          ...reservation,
          createdAt: reservation.createdAt.toISOString(),
          startDate: reservation.startDate.toISOString(),
          endDate: reservation.endDate.toISOString(),
          listing: {
            ...reservation.listing,
            createdAt: reservation.listing?.createdAt.toISOString(),
          },
        } as AppReservation)
    );

    return appReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
