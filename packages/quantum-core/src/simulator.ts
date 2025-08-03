import { ComplexVector, QuantumGate, QuantumState } from './types';
import { QState } from './simulator/quantum-state';

export class QuantumSimulator {
  private state: QState;

  constructor(numQubits: number) {
    this.state = new QState(numQubits);
  }

  getStateVector(): ComplexVector {
    return this.state.amplitudes;
  }

  applyGate(gate: QuantumGate, targetQubit: number): void {
    this.state.applyGate(gate.matrix, targetQubit);
  }

  measure(): number {
    return this.state.measure();
  }
}