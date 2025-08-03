export class QuantumState {
  private state: number[];
  
  constructor(public qubits: number) {
    this.state = new Array(1 << qubits).fill(0);
    this.state[0] = 1;
  }

  applyGate(gate: number[][]) {
    console.log('Applying quantum gate', gate);
  }

  measure(): number {
    return Math.floor(Math.random() * this.state.length);
  }
}