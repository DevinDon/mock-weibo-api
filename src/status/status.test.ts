import { loadResterConfig } from '@rester/core';
import fetch from 'node-fetch';
import { StatusInsertParams, StatusUpdateParams } from './status.model';

describe('Status View Test', () => {

  const { addresses: [{ protocol, host, port }] } = loadResterConfig();
  const url = `${protocol}://${host}:${port}/status`;
  const variables = {
    existID: '',
    notExistID: '000000000000000000000001',
  };

  it('should return 201 when POST status', async () => {
    const status: StatusInsertParams = { content: 'Hello, world!' };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(status),
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response.status).toEqual(201);
    const result = await response.json();
    expect(result['_id']).toBeDefined();
    variables.existID = result['_id'];
  });

  it('should return 404 when GET not exist status', async () => {
    const response = await fetch(`${url}/${variables.notExistID}`);
    expect(response.status).toEqual(404);
  });

  it('should return 200 when GET exist status', async () => {
    const response = await fetch(`${url}/${variables.existID}`);
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result).toBeDefined();
    expect(result['_id']).toBeDefined();
    expect(result['_id']).toEqual(variables.existID);
  });

  it('should return 404 when PUT not exist status', async () => {
    const status: StatusUpdateParams = { author: 'new author', content: 'new content' };
    const response = await fetch(`${url}/${variables.notExistID}`, {
      method: 'PUT',
      body: JSON.stringify(status),
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response.status).toEqual(404);
  });

  it('should return 200 when PUT exist status', async () => {
    const status: StatusUpdateParams = { author: 'new author', content: 'new content' };
    const response = await fetch(`${url}/${variables.existID}`, {
      method: 'PUT',
      body: JSON.stringify(status),
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result['_id']).toEqual(variables.existID);
    expect(result['author']).toEqual(status.author);
    expect(result['content']).toEqual(status.content);
  });

  it('should return 200 when DELETE not exist status', async () => {
    const response = await fetch(`${url}/${variables.notExistID}`, { method: 'DELETE' });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result instanceof Array).toBeTruthy();
    expect(result[0]).toEqual(variables.notExistID);
  });

  it('should return 200 when DELETE exist status', async () => {
    const response = await fetch(`${url}/${variables.existID}`, { method: 'DELETE' });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result instanceof Array).toBeTruthy();
    expect(result[0]).toEqual(variables.existID);
  });

});
