// packages/quantum-core/src/simulator.ts
export class QuantumState {
  private state: ComplexVector;
  
  constructor(public qubits: number) {
    this.state = new ComplexVector(1 << qubits).set(0, 1);
  }

  applyGate(gate: QuantumGate, targetQubit: number) {
    // Реална имплементација квантних капија
    const operation = gate.getMatrix();
    this.state = operation.apply(this.state, targetQubit);
  }

  measure(): number {
    // Квантно мерење са вероватноћама
    const probabilities = this.state.probabilities();
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < probabilities.length; i++) {
      cumulative += probabilities[i];
      if (random <= cumulative) return i;
    }
    
    return probabilities.length - 1;
  }
}