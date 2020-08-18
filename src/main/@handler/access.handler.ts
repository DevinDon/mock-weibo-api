import { BaseHandler } from '@rester/core';
import { AccessEntity } from './access.entity';

// const log = { ok: 0, code: 11600, codeName: 'InterruptedAtShutdown', name: 'MongoError' };

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {

    const url = new URL('http://mock.don.red' + this.request.url || 'http://wrong');
    AccessEntity.insert({
      date: new Date(),
      address: JSON.stringify(this.request.headers['x-real-ip']) || this.request.connection.remoteAddress || '',
      url: this.request.url,
      path: url.pathname,
      query: Object.fromEntries(url.searchParams.entries()),
      headers: this.request.headers as any || [],
      statusCode: this.response.statusCode,
      statusMessage: this.response.statusMessage
    });
    return next();
  }

}
