`typescript:packages/quantum-core/src/types.ts
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
};

// Помоћне функције
export const c = (real: number, imag: number = 0): Complex => ({ real, imag });
export const add = (a: Complex, b: Complex): Complex => ({ 
  real: a.real + b.real, 
  imag: a.imag + b.imag 
});
export const multiply = (a: Complex, b: Complex): Complex => ({
  real: a.real * b.real - a.imag * b.imag,
  imag: a.real * b.imag + a.imag * b.real
});