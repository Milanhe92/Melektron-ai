if (typeof window !== 'undefined') {
  window.global = window;
  window.Buffer = require('buffer').Buffer;
  window.process = require('process/browser');
}