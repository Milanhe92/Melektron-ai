import type { Metadata } from 'next';
import './globals.css';
import TonProvider from '@/providers/TonProvider';

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
      <body>
        <TonProvider>
          {children}
        </TonProvider>
      </body>
    </html>
  );
}