import { Nunito } from 'next/font/google';

import Navbar from '../components/navbar/Navbar';
import ClientOnly from '../components/ClientOnly';
import LoginModal from '../components/modals/LoginModal';
import ToasterProvider from '../providers/ToasterProvider';
import RegisterModal from '../components/modals/RegisterModal';

import './globals.css';
import { AppUser } from '@/types/user';
import RentModal from '@/components/modals/RentModal';
import getCurrentUser from './actions/getCurrentUser';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = (await getCurrentUser()) as AppUser;

  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  );
}
