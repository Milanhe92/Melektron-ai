import { Complex, QuantumGate } from './types';

// Pomoćna funkcija za kreiranje kompleksnih brojeva
export const c = (real: number, imag: number = 0): Complex => ({ real, imag });

// Identity gate
export const IdentityGate: QuantumGate = {
  name: 'I',
  matrix: [
    [c(1), c(0)],
    [c(0), c(1)]
  ],
  qubitCount: 1
};

// Pauli-X gate (NOT gate)
export const XGate: QuantumGate = {
  name: 'X',
  matrix: [
    [c(0), c(1)],
    [c(1), c(0)]
  ],
  qubitCount: 1
};

// Pauli-Y gate
export const YGate: QuantumGate = {
  name: 'Y',
  matrix: [
    [c(0), c(0, -1)],
    [c(0, 1), c(0)]
  ],
  qubitCount: 1
};

// Pauli-Z gate
export const ZGate: QuantumGate = {
  name: 'Z',
  matrix: [
    [c(1), c(0)],
    [c(0), c(-1)]
  ],
  qubitCount: 1
};

// Hadamard gate
export const HGate: QuantumGate = {
  name: 'H',
  matrix: [
    [c(1/Math.sqrt(2)), c(1/Math.sqrt(2))],
    [c(1/Math.sqrt(2)), c(-1/Math.sqrt(2)))]
  ],
  qubitCount: 1
};