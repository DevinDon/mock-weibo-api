import { BaseHandler } from '@rester/core';
import { AccessEntity } from './access.entity';
import { logger } from '@iinfinity/logger';

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const result = await next();
    AccessEntity.insert({
      date: new Date(),
      address: JSON.stringify(this.request.headers['x-real-ip']) || this.request.connection.remoteAddress || '',
      url: this.request.url,
      path: this.route.mapping.path,
      query: this.route.mapping.queryObject,
      headers: this.request.headers as any || [],
      statusCode: this.response.statusCode,
      statusMessage: this.response.statusMessage
    }).catch(error => {
      logger.warn(`Access log insert failed: ${error}`);
      this.rester.connectDatabase().catch(reason => logger.warn(reason));
    });
    return result;
  }

}
