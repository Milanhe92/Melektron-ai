import { Complex, ComplexMatrix, QuantumGate } from './types';

// Хелпер за креирање комплексних бројева
const c = (real: number, imag: number = 0): Complex => ({ real, imag });

// Стандардне квантне капије
export const PauliX: QuantumGate = {
  name: 'X',
  matrix: [
    [c(0), c(1)],
    [c(1), c(0)]
  ]
};

export const PauliY: QuantumGate = {
  name: 'Y',
  matrix: [
    [c(0), c(0, -1)],
    [c(0, 1), c(0)]
  ]
};

export const PauliZ: QuantumGate = {
  name: 'Z',
  matrix: [
    [c(1), c(0)],
    [c(0), c(-1)]
  ]
};

export const Hadamard: QuantumGate = {
  name: 'H',
  matrix: [
    [c(1/Math.sqrt(2)), c(1/Math.sqrt(2))],
    [c(1/Math.sqrt(2)), c(-1/Math.sqrt(2))]
  ]
}