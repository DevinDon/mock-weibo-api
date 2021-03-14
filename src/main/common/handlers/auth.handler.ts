import { BaseHandler, HTTP403Exception } from '@rester/core';
import { UserEntity } from '../../users/user.entity';
import { WeiboEntity } from '../../weibo/weibo.entity';
import { parseTokenFromRequest } from '../utils';

export class AuthHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {

    if (this.request.method?.toUpperCase() === 'OPTIONS') {
      return next();
    }

    const token = parseTokenFromRequest(this.request);
    const mapped = await WeiboEntity.findOne({ token });
    if (!mapped) {
      throw new HTTP403Exception('Invalid access token.');
    }
    this.zone.user = await UserEntity.findOne({ id: mapped.id });

    return next();

  }

}
