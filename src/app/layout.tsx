import NextAuthProvider from '@src/components/NextAuthProvider';
import '@/src/css/globals.css';
import { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import ReduxProvider from '@src/components/ReduxProvider';

// const inter = Inter({ subsets: ['latin'] });

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
      <body className="bg-slate-950 relative">
        <NextAuthProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
