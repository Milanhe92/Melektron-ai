// apps/web/pages/sample-page.tsx
// ISPRAVKA: Putanja do 'ton-utils' je korigovana.

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initTON } from '../src/lib/ton-utils';

type PageProps = {
  message: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    const { client, bridge } = await initTON();
    const message = "TON klijent je uspešno inicijalizovan na serveru.";

    return {
      props: {
        message,
      },
    };
  } catch (error) {
    console.error("Greška u getServerSideProps:", error);
    return {
      props: {
        message: "Došlo je do greške prilikom inicijalizacije.",
      },
    };
  }
};

const SamplePage = ({ message }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <h1>Status Inicijalizacije</h1>
      <p>{message}</p>
    </div>
  );
};

export default SamplePage;