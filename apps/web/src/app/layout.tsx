import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import './globals.css';
import TonProvider from '@/providers/TonProvider';

// Dinamički importuj Inter font bez SSR
const Inter = dynamic(() => import('next/font/google').then(mod => mod.Inter), {
  ssr: false,
  loading: () => null
});

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
      <body className={Inter ? Inter.className : ''}>
        <TonProvider>
          {children}
        </TonProvider>
      </body>
    </html>
  );
}