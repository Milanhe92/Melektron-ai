// apps/web/pages/sample-page.tsx
// DODATO: Primer koji pokazuje ispravnu upotrebu server-side logike.

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initTON } from '../lib/ton-utils';

// Tipovi za podatke koji se dobijaju sa servera.
// Napomena: Ne možemo proslediti instance klasa kao što je TonClient direktno,
// pa prosleđujemo samo serijalizabilne podatke (npr. stringove, brojeve).
type PageProps = {
  message: string;
};

// Funkcija koja se izvršava ISKLJUČIVO na serveru pri svakom zahtevu.
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    // Logika iz ton-utils.ts se poziva ovde, na serveru.
    const { client, bridge } = await initTON();

    // Ovde se može izvršiti neka operacija, npr. dohvatanje podataka sa blockchaina.
    // const balance = await client.getBalance(...);

    // Vraćamo samo podatke koji su potrebni React komponenti za renderovanje.
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

// React komponenta koja prima podatke kao props.
// Ova komponenta se renderuje i na serveru i na klijentu, ali NEMA pristup Node.js modulima.
const SamplePage = ({ message }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <h1>Status Inicijalizacije</h1>
      <p>{message}</p>
    </div>
  );
};

export default SamplePage;