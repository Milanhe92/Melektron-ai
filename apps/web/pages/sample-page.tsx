import { GetServerSideProps } from 'next';
import { initTON } from '../src/lib/ton-utils';

interface PageProps {
  message: string;
  balance?: string;
  error?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    const tonServices = await initTON();
    const message = "TON klijent je uspešno inicijalizovan na serveru.";
    
    // Ako želite da dobijete balance, koristite odgovarajuću metodu
    // const balance = await tonServices.getBalance('neka-adresa');
    
    return {
      props: {
        message,
        // balance,
      },
    };
  } catch (error) {
    return {
      props: {
        message: 'Došlo je do greške pri inicijalizaciji TON klijenta',
        error: error instanceof Error ? error.message : 'Nepoznata greška',
      },
    };
  }
};

export default function SamplePage({ message, balance, error }: PageProps) {
  return (
    <div>
      <h1>TON Integracija</h1>
      <p>{message}</p>
      {balance && <p>Balance: {balance}</p>}
      {error && <p style={{ color: 'red' }}>Greška: {error}</p>}
    </div>
  );
}