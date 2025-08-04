// Фајл: apps/web/src/app/quantum-shim.d.ts
declare module '@melektron/quantum-core' {
  export class QuantumSimulator {
    constructor(numQubits: number);
    applyGate(gate: any, targetQubit: number): void;
    measure(): number;
  }
}