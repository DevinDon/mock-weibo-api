import { BaseHandler } from '@rester/core';
import { AccessEntity } from '../../access';
import { parseIPsFromRequest } from '../utils';

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const result = await next();

    const ips = parseIPsFromRequest(this.request);

    AccessEntity
      .insert({
        method: this.request.method?.toUpperCase(),
        path: this.mapping?.path ?? this.request.url,
        query: JSON.stringify(this.mapping?.queryObject),
        headers: this.request.headers,
        timestamp: new Date(),
        ips,
        version: this.request.httpVersion,
        statusCode: this.response.statusCode,
        statusMessage: this.response.statusMessage,
        length: result ? result.length : 0,
      })
      .catch(error => this.rester.logger.warn(`Record log failed: ${error}`));

    return result;
  }

}
