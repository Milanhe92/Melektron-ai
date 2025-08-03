// Дефиниши основне типове за квантни рачун
export type Complex = {
  real: number;
  imag: number;
};

export type ComplexVector = Complex[];
export type ComplexMatrix = Complex[][];

export type QuantumGate = {
  name: string;
  matrix: ComplexMatrix;
};

export type QuantumState = {
  amplitudes: ComplexVector;
  numQubits: number;
}