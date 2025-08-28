import type { Metadata } from 'next';
import { Inter, Orbitron, Exo_2 } from 'next/font/google';
import './globals.css';
import TonProvider from '@/providers/TonProvider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

const orbitron = Orbitron({ 
  subsets: ['latin'], 
  variable: '--font-orbitron',
  display: 'swap',
});

const exo = Exo_2({ 
  subsets: ['latin'], 
  variable: '--font-exo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Melektron - Singularity Core',
  description: 'Kvantna revolucija koju je zasnovao Milan He',
  keywords: 'kvantna računica, blockchain, AI, veštačka inteligencija, Milan He',
  authors: [{ name: 'Milan He' }],
  openGraph: {
    title: 'Melektron - Singularity Core',
    description: 'Kvantna revolucija koju je zasnovao Milan He',
    type: 'website',
    locale: 'sr_RS',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${orbitron.variable} ${exo.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <TonProvider>
          {children}
        </TonProvider>
      </body>
    </html>
  );
}