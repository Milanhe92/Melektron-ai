// Фајл: apps/web/quantum-fallback.js
module.exports = {
  QuantumSimulator: class DummyQuantum {
    constructor() {
      console.log("QuantumSimulator is in dummy mode");
    }
    applyGate() {}
    measure() { return 0; }
  }
};