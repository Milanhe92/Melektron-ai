'use client';

// Dodaj ovaj import na početku fajla
import 'node-fetch';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode } from 'react';

interface TonProviderProps {
  children: ReactNode;
}

export default function TonProvider({ children }: TonProviderProps) {
  return (
    <TonConnectUIProvider 
      manifestUrl="https://melektron.ai/tonconnect-manifest.json"
      uiPreferences={{ theme: 'dark' }}
    >
      {children}
    </TonConnectUIProvider>
  );
}