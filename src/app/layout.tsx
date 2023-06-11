import { Nunito } from 'next/font/google';

import { AppUser } from '@/types/user';
import Navbar from '../components/navbar/Navbar';
import ClientOnly from '../components/ClientOnly';
import RentModal from '@/components/modals/RentModal';
import getCurrentUser from './actions/getCurrentUser';
import LoginModal from '../components/modals/LoginModal';
import SearchModal from '@/components/modals/SearchModal';
import ToasterProvider from '../providers/ToasterProvider';
import RegisterModal from '../components/modals/RegisterModal';

import './globals.css';

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
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  );
}
