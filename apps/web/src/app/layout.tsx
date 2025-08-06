import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TonProvider from '@/providers/TonProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Melektron AI',
  description: 'Napredna kvantna platforma',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TonProvider>
          {children}
        </TonProvider>
      </body>
    </html>
  );
}