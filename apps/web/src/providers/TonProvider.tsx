'use client';

import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react';
import { ReactNode } from 'react';

interface TonProviderProps {
  children: ReactNode;
}

export default function TonProvider({ children }: TonProviderProps) {
  return (
    <TonConnectUIProvider 
      manifestUrl="https://melektron.ai/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
    >
      {children}
    </TonConnectUIProvider>
  );
}