import { BaseHandler } from '@rester/core';
import { AccessEntity } from './access.entity';
import { logger } from '@iinfinity/logger';

// const log = { ok: 0, code: 11600, codeName: 'InterruptedAtShutdown', name: 'MongoError' };

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {

    const result = await next()
      .catch(async error => {
        // logger.warn(typeof error, JSON.stringify(error), error.code === 11600, error.name === 'MongoError');
        // if (error.name === 'MongoError' || error.code === 11600) {
        //   logger.error(`Database down: ${error}`);
        //   await this.rester.connectDatabase(1000).catch(reason => logger.warn(reason));
        // }
        await this.rester.connectDatabase(1000).catch(reason => logger.warn(reason));
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
