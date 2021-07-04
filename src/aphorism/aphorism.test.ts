import { loadResterConfig } from '@rester/core';
import fetch from 'node-fetch';
import { AphorismInsertParams, AphorismUpdateParams } from './aphorism.model';

describe('Aphorism View Test', () => {

  const { addresses: [{ protocol, host, port }] } = loadResterConfig();
  const url = `${protocol}://${host}:${port}/aphorism`;
  const variables = {
    existID: '',
    notExistID: '000000000000000000000001',
  };

  it('should return 201 when POST aphorism', async () => {
    const aphorism: AphorismInsertParams = { content: 'Hello, world!' };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(aphorism),
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response.status).toEqual(201);
    const result = await response.json();
    expect(result['_id']).toBeDefined();
    variables.existID = result['_id'];
  });

  it('should return 404 when GET not exist aphorism', async () => {
    const response = await fetch(`${url}/${variables.notExistID}`);
    expect(response.status).toEqual(404);
  });

  it('should return 200 when GET exist aphorism', async () => {
    const response = await fetch(`${url}/${variables.existID}`);
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result).toBeDefined();
    expect(result['_id']).toBeDefined();
    expect(result['_id']).toEqual(variables.existID);
  });

  it('should return 404 when PUT not exist aphorism', async () => {
    const aphorism: AphorismUpdateParams = { author: 'new author', content: 'new content' };
    const response = await fetch(`${url}/${variables.notExistID}`, {
      method: 'PUT',
      body: JSON.stringify(aphorism),
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response.status).toEqual(404);
  });

  it('should return 200 when PUT exist aphorism', async () => {
    const aphorism: AphorismUpdateParams = { author: 'new author', content: 'new content' };
    const response = await fetch(`${url}/${variables.existID}`, {
      method: 'PUT',
      body: JSON.stringify(aphorism),
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result['_id']).toEqual(variables.existID);
    expect(result['author']).toEqual(aphorism.author);
    expect(result['content']).toEqual(aphorism.content);
  });

  it('should return 200 when DELETE not exist aphorism', async () => {
    const response = await fetch(`${url}/${variables.notExistID}`, { method: 'DELETE' });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result instanceof Array).toBeTruthy();
    expect(result[0]).toEqual(variables.notExistID);
  });

  it('should return 200 when DELETE exist aphorism', async () => {
    const response = await fetch(`${url}/${variables.existID}`, { method: 'DELETE' });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result instanceof Array).toBeTruthy();
    expect(result[0]).toEqual(variables.existID);
  });

});
