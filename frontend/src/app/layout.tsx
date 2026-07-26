import type { ReactNode } from 'react';
import './globals.css';
import { Vazirmatn } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const vazirmatn = Vazirmatn({ subsets: ['latin'], variable: '--font-vazirmatn' });

export const metadata = {
  title: 'My App',
  description: 'Application layout with RTL direction and Vazirmatn font.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}