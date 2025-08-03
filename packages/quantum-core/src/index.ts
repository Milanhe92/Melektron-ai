/**
 * Quantum Core - Osnovni modul za kvantne operacije
 */

export class QuantumState {
  private state: number[];

  constructor(initialState: number[]) {
    if (!Array.isArray(initialState) || initialState.length === 0) {
      throw new Error("Invalid initial quantum state");
    }
    this.state = initialState;
  }

  /**
   * Primeni kvantnu operaciju na stanje
   */
  applyOperator(operator: number[][]): QuantumState {
    if (!operator[0] || operator.length !== this.state.length) {
      throw new Error("Invalid operator dimensions");
    }

    const newState = new Array(this.state.length).fill(0);
    for (let i = 0; i < operator.length; i++) {
      for (let j = 0; j < this.state.length; j++) {
        newState[i] += operator[i][j] * this.state[j];
      }
    }

    return new QuantumState(newState);
  }

  /**
   * Izmeri kvantno stanje
   */
  measure(): number {
    const probabilities = this.state.map(amplitude => Math.pow(Math.abs(amplitude), 2));
    const total = probabilities.reduce((sum, prob) => sum + prob, 0);
    const random = Math.random() * total;
    
    let cumulative = 0;
    for (let i = 0; i < probabilities.length; i++) {
      cumulative += probabilities[i];
      if (random <= cumulative) {
        return i;
      }
    }
    
    return probabilities.length - 1;
  }

  /**
   * Vrati trenutno stanje
   */
  getState(): number[] {
    return [...this.state];
  }
}

// Osnovne kvantne kapije
export const QuantumGates = {
  hadamard: (size: number): number[][] => {
    const gate = Array.from({ length: size }, () => new Array(size).fill(0));
    const value = 1 / Math.sqrt(size);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        gate[i][j] = value * Math.pow(-1, i & j);
      }
    }
    return gate;
  },

  pauliX: (): number[][] => [
    [0, 1],
    [1, 0]
  ],

  pauliY: (): number[][] => [
    [0, -1],
    [1, 0]
  ],

  pauliZ: (): number[][] => [
    [1, 0],
    [0, -1]
  ]
};

// Pomoćne funkcije
export function createQubit(state: number = 0): QuantumState {
  if (state === 0) return new QuantumState([1, 0]);
  if (state === 1) return new QuantumState([0, 1]);
  throw new Error("Invalid qubit state");
}

// Teleportacija kvantnog stanja
export function quantumTeleportation(state: QuantumState): QuantumState {
  const aliceQubit = state;
  const bellPair1 = createQubit(0);
  const bellPair2 = createQubit(0);
  
  // Povezivanje kvantnih stanja
  const entangled = bellPair1
    .applyOperator(QuantumGates.hadamard(2))
    .applyOperator(QuantumGates.pauliX());
  
  // Kvantna teleportacija
  return entangled.applyOperator(QuantumGates.pauliZ());
}