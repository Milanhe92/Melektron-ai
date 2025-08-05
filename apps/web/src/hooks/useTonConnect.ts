import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from '@ton/core';
import { useCallback } from 'react';

export function useTonConnect() {
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
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minuta za potvrdu
        });
      },
      [tonConnectUI]
    ),
  };

  return {
    sender,
    connected: !!wallet,
    wallet: wallet?.account.address,
  };
}