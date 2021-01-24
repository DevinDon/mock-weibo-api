import { BaseHandler, HTTPException } from '@rester/core';
import { logger } from '../utils';
import { AccessEntity } from './access.entity';

// const log = { ok: 0, code: 11600, codeName: 'InterruptedAtShutdown', name: 'MongoError' };

function safeParams(searchs: IterableIterator<[string, string]>) {
  const results: any = {};
  const params = Object.fromEntries(searchs);
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      results[key.replace(/\./g, '--dot--')] = value;
    }
  }
  return results;
}

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {

    let exception: HTTPException | undefined;
    const result = await next().catch(error => exception = error);

    const url = new URL('http://demo.don.red/weibo/api' + this.request.url || 'http://wrong');
    logger.debug(`${this.request.method} ${this.request.url} ${this.response.statusCode}`);

    AccessEntity.insert({
      date: new Date(),
      address: JSON.stringify(this.request.headers['x-real-ip']) || this.request.connection.remoteAddress || '',
      url: this.request.url,
      path: url.pathname,
      query: safeParams(url.searchParams.entries()),
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
