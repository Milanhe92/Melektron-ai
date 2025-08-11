import { Complex, ComplexVector, QuantumState, QuantumGate } from '../types'; // Dodat QuantumGate

export class QState implements QuantumState {
  amplitudes: ComplexVector;
  
  constructor(amplitudes: ComplexVector) {
    this.amplitudes = amplitudes;
  }
  
  measure(qubitIndex: number): number {
    // Pojednostavljena implementacija merenja
    const probability0 = Math.pow(this.amplitudes[0].real, 2) + 
                         Math.pow(this.amplitudes[0].imag, 2);
    return Math.random() < probability0 ? 0 : 1;
  }
  
  applyGate(gate: QuantumGate, targetQubit: number): QuantumState {
    // Implementacija primene kvantne kapije
    // Pošto je ovo pojednostavljena verzija, pretpostavljamo 1 kubit
    const newAmplitudes: ComplexVector = [
      {
        real: gate.matrix[0][0].real * this.amplitudes[0].real - 
              gate.matrix[0][0].imag * this.amplitudes[0].imag +
              gate.matrix[0][1].real * this.amplitudes[1].real - 
              gate.matrix[0][1].imag * this.amplitudes[1].imag,
        imag: gate.matrix[0][0].real * this.amplitudes[0].imag + 
              gate.matrix[0][0].imag * this.amplitudes[0].real +
              gate.matrix[0][1].real * this.amplitudes[1].imag + 
              gate.matrix[0][1].imag * this.amplitudes[1].real
      },
      {
        real: gate.matrix[1][0].real * this.amplitudes[0].real - 
              gate.matrix[1][0].imag * this.amplitudes[0].imag +
              gate.matrix[1][1].real * this.amplitudes[1].real - 
              gate.matrix[1][1].imag * this.amplitudes[1].imag,
        imag: gate.matrix[1][0].real * this.amplitudes[0].imag + 
              gate.matrix[1][0].imag * this.amplitudes[0].real +
              gate.matrix[1][1].real * this.amplitudes[1].imag + 
              gate.matrix[1][1].imag * this.amplitudes[1].real
      }
    ];
    
    return new QState(newAmplitudes);
  }
}