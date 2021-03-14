import { BaseHandler, HTTP403Exception } from '@rester/core';
import { WeiboEntity } from '../../weibo/weibo.entity';
import { parseTokenFromRequest } from '../utils';

export class AuthHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {

    if (this.request.method?.toUpperCase() === 'OPTIONS') {
      return next();
    }

    const token = parseTokenFromRequest(this.request);
    const user = this.zone.user = await WeiboEntity.findOne({ token });
    if (!user) {
      throw new HTTP403Exception('No Permission.');
    }

    return next();

  }

}
