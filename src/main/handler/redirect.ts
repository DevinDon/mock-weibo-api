import { BaseHandler } from '@rester/core';

export class RedirectToCallback extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    this.response.statusCode = 302;
    const { location, code } = await next();
    this.response.setHeader('Location', `${location}/?code=${code}`);
  }

}
