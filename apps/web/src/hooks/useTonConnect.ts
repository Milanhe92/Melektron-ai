import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from '@ton/core';
import { useCallback } from 'react';

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  wallet: string | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const sender: Sender = {
    send: useCallback(
      async (args: SenderArguments) => {
        await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
      [tonConnectUI]
    ),
  };

  return {
    sender,
    connected: !!wallet,
    wallet: wallet?.account.address || null,
  };
}