import { Complex, ComplexVector, QuantumState } from '../types';

export class QState implements QuantumState {
    amplitudes: ComplexVector;
    
    constructor(amplitudes: ComplexVector) {
        this.amplitudes = amplitudes;
    }
    
    measure(qubitIndex: number): number {
        // Implementacija merenja kvantnog stanja
        // Ovo je pojednostavljena verzija
        const probability0 = Math.pow(this.amplitudes[0].real, 2) + Math.pow(this.amplitudes[0].imag, 2);
        const random = Math.random();
        return random < probability0 ? 0 : 1;
    }
    
    applyGate(gate: QuantumGate, targetQubit: number): QuantumState {
        // Implementacija primene kvantne kapije
        // Ovo je pojednostavljena verzija za 1 kubit
        const newAmplitudes: ComplexVector = [
            {
                real: gate.matrix[0][0].real * this.amplitudes[0].real - gate.matrix[0][0].imag * this.amplitudes[0].imag +
                      gate.matrix[0][1].real * this.amplitudes[1].real - gate.matrix[0][1].imag * this.amplitudes[1].imag,
                imag: gate.matrix[0][0].real * this.amplitudes[0].imag + gate.matrix[0][0].imag * this.amplitudes[0].real +
                      gate.matrix[0][1].real * this.amplitudes[1].imag + gate.matrix[0][1].imag * this.amplitudes[1].real
            },
            {
                real: gate.matrix[1][0].real * this.amplitudes[0].real - gate.matrix[1][0].imag * this.amplitudes[0].imag +
                      gate.matrix[1][1].real * this.amplitudes[1].real - gate.matrix[1][1].imag * this.amplitudes[1].imag,
                imag: gate.matrix[1][0].real * this.amplitudes[0].imag + gate.matrix[1][0].imag * this.amplitudes[0].real +
                      gate.matrix[1][1].real * this.amplitudes[1].imag + gate.matrix[1][1].imag * this.amplitudes[1].real
            }
        ];
        
        return new QState(newAmplitudes);
    }
}