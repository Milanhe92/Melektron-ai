typescript:packages/quantum-core/src/simulator.ts
import { Complex, ComplexVector, ComplexMatrix, QuantumGate, QuantumState } from './types';

export class QuantumSimulator {
  private state: ComplexVector;
  private numQubits: number;

  constructor(numQubits: number) {
    this.numQubits = numQubits;
    const numStates = 1 << numQubits;
    this.state = new Array(numStates).fill(null).map((_, i) => 
      i === 0 ? { real: 1, imag: 0 } : { real: 0, imag: 0 }
    );
  }

  applyGate(gate: QuantumGate, targetQubit: number): void {
    const gateMatrix = gate.matrix;
    const newState: ComplexVector = new Array(this.state.length).fill(null).map(() => ({ real: 0, imag: 0 }));
    
    for (let i = 0; i < this.state.length; i++) {
      for (let j = 0; j < this.state.length; j++) {
        const amplitude = this.state[j];
        const gateValue = gateMatrix[i % gateMatrix.length][j % gateMatrix[0].length];
        
        newState[i].real += amplitude.real * gateValue.real - amplitude.imag * gateValue.imag;
        newState[i].imag += amplitude.real * gateValue.imag + amplitude.imag * gateValue.real;
      }
    }
    
    this.state = newState;
  }

  measure(): number {
    const probabilities = this.state.map(amplitude => 
      amplitude.real * amplitude.real + amplitude.imag * amplitude.imag
    );
    
    const sum = probabilities.reduce((acc, prob) => acc + prob, 0);
    const normalizedProbabilities = probabilities.map(prob => prob / sum);
    const random = Math.random();
    
    let cumulative = 0;
    for (let i = 0; i < normalizedProbabilities.length; i++) {
      cumulative += normalizedProbabilities[i];
      if (random <= cumulative) {
        return i;
      }
    }
    
    return normalizedProbabilities.length - 1;
  }

  getState(): ComplexVector {
    return this.state;
  }
}