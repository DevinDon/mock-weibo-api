import { BaseHandler, HTTP403Exception } from '@rester/core';
import { WeiboEntity } from '../weibo/weibo.entity';

export class ManageAuthHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const token = this.request.headers['authorization']
      && this.request.headers['authorization'].slice(7);
    // no token, 403
    if (!token) { throw new HTTP403Exception('need access token to manage apis'); }
    /** fetch user by token */
    const user = await WeiboEntity.findOne({ token });
    // valid token
    if (!(user && user.id === 0)) {
      throw new HTTP403Exception('invalid token for manage apis');
    }
    return next();
  }

}
