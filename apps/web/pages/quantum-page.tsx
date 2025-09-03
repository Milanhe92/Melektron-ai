// pages/quantum-page.tsx
import dynamic from 'next/dynamic';

const AdvancedQuantumViz = dynamic(
  () => import('../components/AdvancedQuantumViz'),
  { ssr: false }
);

export default function QuantumPage() {
  return (
    <div>
      <h1>Kvantna Vizuelizacija</h1>
      <AdvancedQuantumViz theta={0.79} phi={0} />
    </div>
  );
}