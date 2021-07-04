import { BaseHandler, parseIPsFromRequest } from '@rester/core';
import { getEntity } from '@rester/orm';
import { AccessEntity } from '../../access/access.entity';

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const result = await next();

    const access = {
      method: this.request.method?.toUpperCase() || 'UNKNOWN',
      path: this.mapping?.path ?? this.request.url,
      query: JSON.stringify(this.mapping?.queryObject),
      headers: this.request.headers,
      timestamp: new Date(),
      ips: parseIPsFromRequest(this.request),
      version: this.request.httpVersion,
      statusCode: this.response.statusCode,
      statusMessage: this.response.statusMessage,
      length: result ? result.length : 0,
    };

    (getEntity(AccessEntity) as AccessEntity).collection
      .insertOne(access)
      .catch(error => this.rester.logger.warn(`Record log failed: ${error}`));

    return result;
  }

}
