/**
 * Osnovni tipovi za kvantne operacije
 */

// Tip za kvantno stanje
export type QuantumState = {
  amplitudes: number[];
  qubitCount: number;
};

// Tip za kvantna vrata (gate)
export type QuantumGate = {
  name: string;
  matrix: number[][];
  qubitCount: number;
};

// Tip za kvantni kola (quantum circuit)
export type QuantumCircuit = {
  gates: QuantumGate[];
  initialState: QuantumState;
};

// Tip za rezultat merenja
export type MeasurementResult = {
  state: number;
  probability: number;
};

// Tip za kvantnu teleportaciju
export type QuantumTeleportationResult = {
  success: boolean;
  originalState: QuantumState;
  teleportedState: QuantumState;
  measuredBits: [number, number];
};

// Tip za kvantno uplitanje (entanglement)
export type EntanglementResult = {
  qubit1: QuantumState;
  qubit2: QuantumState;
  correlation: number;
};

// Tip za kvantnu grešku
export type QuantumError = {
  code: string;
  message: string;
  timestamp: Date;
};

// Tip za parametre kvantnih operacija
export type QuantumOperationParams = {
  gate: QuantumGate;
  targetQubit: number;
  controlQubit?: number;
  angle?: number;
};

// Tip za rezultat kvantne simulacije
export type SimulationResult = {
  finalState: QuantumState;
  measurements: MeasurementResult[];
  steps: QuantumState[];
  duration: number;
};

// Definisanje kompleksnih brojeva za kvantne operacije
export type Complex = {
  real: number;
  imag: number;
};

export type ComplexVector = Complex[];
export type ComplexMatrix = Complex[][];

// Tip za kvantno stanje
export type QuantumState = {
  amplitudes: ComplexVector;
  qubitCount: number;
};

// Tip za kvantna vrata (gate)
export type QuantumGate = {
  name: string;
  matrix: ComplexMatrix;
  qubitCount: number;
};

// Dodaj ostale tipove po potrebi...

// Tip za Blochovu sferu
export type BlochSphere = {
  theta: number;
  phi: number;
  radius: number;
};

// Tip za kvantni algoritam
export type QuantumAlgorithm = {
  name: string;
  description: string;
  circuit: QuantumCircuit;
  complexity: string;
  speedup: number;
};

// Tip za kvantni registar
export type QuantumRegister = {
  size: number;
  state: QuantumState;
  history: QuantumState[];
};

// Tip za kvantni procesor
export type QuantumProcessor = {
  qubitCount: number;
  coherenceTime: number;
  gateFidelity: number;
  supportedGates: string[];
};

// Tip za kvantni hardver
export type QuantumHardware = {
  name: string;
  manufacturer: string;
  qubits: number;
  type: 'superconducting' | 'trapped-ion' | 'photonic';
};

// Tip za kvantni softver
export type QuantumSoftware = {
  name: string;
  version: string;
  apiVersion: string;
};

// Tip za kvantnu mrežu
export type QuantumNetwork = {
  nodes: QuantumProcessor[];
  connections: [number, number][];
  latency: number;
};

// Tip za kvantni neuron
export type QuantumNeuron = {
  weights: QuantumState;
  bias: number;
  activation: 'sigmoid' | 'relu' | 'tanh';
};

// Tip za kvantni klasifikator
export type QuantumClassifier = {
  layers: QuantumNeuron[];
  inputSize: number;
  outputSize: number;
};

// Tip za kvantni generator slučajnih brojeva
export type QRNGResult = {
  numbers: number[];
  entropy: number;
  distribution: 'uniform' | 'normal';
};

// Tip za kvantnu kriptografiju
export type QuantumKeyDistribution = {
  key: string;
  bits: number;
  errorRate: number;
  securityLevel: 'low' | 'medium' | 'high';
};

// Tip za kvantnu hemiju
export type MolecularStructure = {
  atoms: string[];
  bonds: [number, number, number][];
  energy: number;
};

// Tip za kvantni optimizator
export type OptimizationResult = {
  solution: number[];
  cost: number;
  iterations: number;
  convergence: number[];
};

// Tip za kvantni senzor
export type QuantumSensor = {
  type: 'magnetic' | 'gravitational' | 'temperature';
  sensitivity: number;
  resolution: number;
};

// Tip za kvantno mašinsko učenje
export type QMLModel = {
  algorithm: QuantumAlgorithm;
  trainingData: any[];
  accuracy: number;
  loss: number[];
};

// Tip za kvantni komunikacioni protokol
export type QuantumProtocol = {
  name: 'BB84' | 'E91' | 'B92';
  securityParams: any;
  keyRate: number;
};

// Tip za kvantnu metrologiju
export type MetrologyResult = {
  parameter: string;
  value: number;
  uncertainty: number;
  improvement: number;
};

// Tip za kvantni simulator
export type SimulatorConfig = {
  maxQubits: number;
  precision: 'single' | 'double';
  backend: 'CPU' | 'GPU' | 'QPU';
};

// Tip za kvantni kompajler
export type CompilerResult = {
  compiledCircuit: QuantumCircuit;
  optimizationLevel: number;
  gateCount: number;
  depth: number;
};

// Tip za kvantni debugger
export type DebugState = {
  step: number;
  state: QuantumState;
  probability: number;
  collapsed: boolean;
};

// Tip za kvantni vizualizator
export type Visualization = {
  type: 'bloch' | 'qsphere' | 'statevector';
  data: any;
};

// Tip za kvantni API odgovor
export type QuantumAPIResponse = {
  success: boolean;
  result?: any;
  error?: QuantumError;
  executionTime: number;
  timestamp: Date;
};