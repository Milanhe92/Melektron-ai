// apps/web/polyfills.js
if (typeof window !== 'undefined') {
  // Polyfill za Node.js globale u browseru
  globalThis.global = globalThis;
  globalThis.process = require('process/browser');
  
  // Buffer polyfill
  if (typeof Buffer === 'undefined') {
    globalThis.Buffer = require('buffer').Buffer;
  }
}

// Importuj polyfill-ove
require('crypto-browserify');
require('stream-browserify');
require('buffer');