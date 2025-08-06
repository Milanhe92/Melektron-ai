import { TonConnectUIProvider } from '@tonconnect/ui-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
        <TonConnectUIProvider 
          manifestUrl="https://melektron.ai/tonconnect-manifest.json"
          uiPreferences={{ theme: 'dark' }}
        >
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}