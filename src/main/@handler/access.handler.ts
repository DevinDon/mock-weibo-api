import { BaseHandler } from '@rester/core';
import { AccessEntity } from './access.entity';

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const result = await next();
    AccessEntity.insert({
      date: new Date(),
      address: JSON.stringify(this.request.headers['x-real-ip']) || this.request.connection.remoteAddress || '',
      url: this.request.url,
      headers: this.request.headers as any || [],
      statusCode: this.response.statusCode,
      statusMessage: this.response.statusMessage
    });
    return result;
  }

}
