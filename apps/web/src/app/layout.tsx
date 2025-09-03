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
  metadataBase: new URL('https://melektron.com'), // 🚀 ispravljeno
  title: 'Melektron - Singularity Core',
  description: 'Kvantna revolucija koju je zasnovao Milan He',
  keywords: ['kvantna računica', 'blockchain', 'AI', 'veštačka inteligencija', 'Milan He'],
  authors: [{ name: 'Milan He' }],
  openGraph: {
    title: 'Melektron - Singularity Core',
    description: 'Kvantna revolucija koju je zasnovao Milan He',
    type: 'website',
    locale: 'sr_RS',
    url: 'https://melektron.com',
    siteName: 'Melektron',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Melektron Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@MilanHe', // ako imaš Twitter handle
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={`${orbitron.variable} ${exo.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <TonProvider>
          {children}
        </TonProvider>
      </body>
    </html>
  );
}