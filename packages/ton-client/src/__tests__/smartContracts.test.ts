// packages/ton-client/src/__tests__/smartContracts.test.ts
import { describe, test, expect } from '@jest/globals';
import { compileContract } from '../smartContracts';

describe('TON Smart Contracts', () => {
  test('should compile contract successfully', async () => {
    const result = await compileContract();
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('data');
    expect(typeof result.code).toBe('string');
  }, 30000);
});