// apps/web/src/pages/quantum-page.tsx
import AdvancedQuantumViz from '../components/AdvancedQuantumViz';

export default function QuantumPage() {
  return (
    <div>
      <h1>Квантна Визуелизација</h1>
      <AdvancedQuantumViz theta={0.79} phi={0} />
    </div>
  );
}