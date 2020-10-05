import { BaseHandler } from '@rester/core';

export class HTMLHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    this.response.setHeader('Content-Type', 'text/html');
    return next();
  }

}
