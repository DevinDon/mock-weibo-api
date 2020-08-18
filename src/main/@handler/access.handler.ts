import { BaseHandler, HTTPException } from '@rester/core';
import { AccessEntity } from './access.entity';
import { logger } from '../@util';

// const log = { ok: 0, code: 11600, codeName: 'InterruptedAtShutdown', name: 'MongoError' };

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {

    let exception: HTTPException | undefined;
    const result = await next().catch(error => exception = error);

    const url = new URL('http://mock.don.red' + this.request.url || 'http://wrong');

    AccessEntity.insert({
      date: new Date(),
      address: JSON.stringify(this.request.headers['x-real-ip']) || this.request.connection.remoteAddress || '',
      url: this.request.url,
      path: url.pathname,
      query: Object.fromEntries(url.searchParams.entries()),
      headers: this.request.headers as any || [],
      statusCode: exception ? (exception.code || 500) : this.response.statusCode,
      statusMessage: this.response.statusMessage
    });

    if (exception) {
      throw exception;
    } else {
      return result;
    }

  }

}
