import { loadResterConfig } from '@rester/core';
import fetch from 'node-fetch';

describe('Comments View Test', () => {

  const { addresses: [{ protocol, host, port }] } = loadResterConfig();
  const url = `${protocol}://${host}:${port}/comments`;

  it('should return 200 & list', async () => {
    const response = await fetch(url);
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result).toBeDefined();
    expect(result['list']).toBeDefined();
    expect(result['list'] instanceof Array).toBeTruthy();
  });

});
