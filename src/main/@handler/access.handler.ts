import { BaseHandler } from '@rester/core';
import { AccessEntity } from './access.entity';
import { logger } from '@iinfinity/logger';

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {

    const result = await next()
      .catch(error => {
        logger.warn(error);
        if ((error as string).includes('pool is draining')) {
          logger.error(`Database down: ${error}`);
          this.rester.connectDatabase().catch(reason => logger.warn(reason));
        }
        throw error;
      });
    AccessEntity.insert({
      date: new Date(),
      address: JSON.stringify(this.request.headers['x-real-ip']) || this.request.connection.remoteAddress || '',
      url: this.request.url,
      path: this.route.mapping.path,
      query: this.route.mapping.queryObject,
      headers: this.request.headers as any || [],
      statusCode: this.response.statusCode,
      statusMessage: this.response.statusMessage
    });
    return result;
  }

}
