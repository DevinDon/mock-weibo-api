import { BaseHandler, HTTP403Exception } from '@rester/core';
import { WeiboEntity } from '../weibo/weibo.entity';

export class AuthHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const token = this.request.headers['authorization']
      && this.request.headers['authorization'].slice(7);
    // no token, 403
    if (!token) { throw new HTTP403Exception('need access token & login'); }
    // mapped a user
    const user = await WeiboEntity.findOne({ token });
    if (!user) { throw new HTTP403Exception('invalid access token'); }
    this.zone.user = user;
    return next();
  }

}
