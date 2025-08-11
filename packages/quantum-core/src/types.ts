export interface Complex {
  real: number;
  imag: number;
}

export type ComplexVector = Complex[];
export type ComplexMatrix = Complex[][];

export interface QuantumState {
  amplitudes: ComplexVector;
  measure(qubitIndex: number): number;
  applyGate(gate: QuantumGate, targetQubit: number): QuantumState;
}

export interface QuantumGate {
  name: string;
  matrix: ComplexMatrix;
  qubitCount: number;
}

export interface QuantumOperation {
  apply(state: QuantumState): QuantumState;
}