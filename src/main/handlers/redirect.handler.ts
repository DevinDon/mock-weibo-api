import { BaseHandler } from '@rester/core';

export class RedirectToCallback extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const { location, code } = await next();
    this.response.statusCode = 302;
    this.response.setHeader('Location', `${location}/?code=${code}`);
  }

}
