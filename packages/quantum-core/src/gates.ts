typescript:packages/quantum-core/src/gates.ts
import { Complex, QuantumGate } from './types';
import { c } from './types';

export const XGate: QuantumGate = {
  name: 'X',
  matrix: [
    [c(0), c(1)],
    [c(1), c(0)]
  ]
};

export const YGate: QuantumGate = {
  name: 'Y',
  matrix: [
    [c(0), c(0, -1)],
    [c(0, 1), c(0)]
  ]
};

export const ZGate: QuantumGate = {
  name: 'Z',
  matrix: [
    [c(1), c(0)],
    [c(0), c(-1)]
  ]
};

export const HGate: QuantumGate = {
  name: 'H',
  matrix: [
    [c(1/Math.sqrt(2)), c(1/Math.sqrt(2))],
    [c(1/Math.sqrt(2)), c(-1/Math.sqrt(2))]
  ]
};