import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    price,
    category,
    imageSrc,
    location,
    roomCount,
    guestCount,
    description,
    bathroomCount,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      category,
      imageSrc,
      roomCount,
      guestCount,
      description,
      bathroomCount,
      userId: currentUser.id,
      price: parseInt(price, 10),
      locationValue: location.value,
    },
  });

  return NextResponse.json(listing);
}