import { QuantumState, QuantumGates, createQubit, quantumTeleportation } from './index';

describe('QuantumCore', () => {
  test('should create basic qubit', () => {
    const qubit = createQubit(0);
    expect(qubit.getState()).toEqual([1, 0]);
  });

  test('should apply Pauli X gate', () => {
    const qubit = createQubit(0);
    const result = qubit.applyOperator(QuantumGates.pauliX());
    expect(result.getState()).toEqual([0, 1]);
  });

  test('should measure qubit state', () => {
    const qubit = new QuantumState([0.6, 0.8]);
    const measurements = Array.from({ length: 1000 }, () => qubit.measure());
    const zeros = measurements.filter(m => m === 0).length;
    const ones = measurements.filter(m => m === 1).length;
    
    expect(zeros / 1000).toBeCloseTo(0.36, 1);
    expect(ones / 1000).toBeCloseTo(0.64, 1);
  });

  test('should teleport quantum state', () => {
    const original = new QuantumState([0.707, 0.707]);
    const teleported = quantumTeleportation(original);
    
    // Provera da li je stanje sačuvano
    expect(teleported.getState()[0]).toBeCloseTo(0.707, 3);
    expect(teleported.getState()[1]).toBeCloseTo(0.707, 3);
  });
});