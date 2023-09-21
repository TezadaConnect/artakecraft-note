import Navbar from '@src/components/common/Navbar';
import Provider from '@src/components/Provider';
import '@/src/css/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import LoadingComponent from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artakecraft Note',
  description: 'Take notes on your next story venture!'
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-slate-950 relative'}>
        <Provider>
          <Suspense fallback={<LoadingComponent />}>{children} </Suspense>
        </Provider>
      </body>
    </html>
  );
}
