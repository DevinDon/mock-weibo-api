import { loadResterConfig } from '@rester/core';
import fetch from 'node-fetch';

describe('Accesses View Test', () => {

  const { addresses: [{ protocol, host, port }] } = loadResterConfig();
  const url = `${protocol}://${host}:${port}/accesses`;

  it('should return 401 without token', async () => {
    const response = await fetch(url);
    expect(response.status).toEqual(401);
  });

  it('should return 403 with invalid token', async () => {
    const response = await fetch(url, { headers: { authorization: 'invalidtoken' } });
    expect(response.status).toEqual(401);
  });

  it('should return 200 & list with valid token', async () => {
    const response = await fetch(url, { headers: { authorization: 'Bearer admin' } });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result).toBeDefined();
    expect(result['list']).toBeDefined();
    expect(result['list'] instanceof Array).toBeTruthy();
  });

});
