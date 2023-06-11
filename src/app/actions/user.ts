import { getServerSession } from 'next-auth/next';

import prisma from '@/libs/prismadb';
import authOptions from '@/libs/auth';
import { AppUser } from '@/types/user';

export const getSession = async () => {
  return await getServerSession(authOptions);
};

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString(),
    } as AppUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
