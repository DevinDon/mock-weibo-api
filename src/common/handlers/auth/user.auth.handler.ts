import { BaseHandler, HTTP403Exception, parseTokenFromRequest } from '@rester/core';
import { getEntity } from '@rester/orm';
import { UserEntity } from '../../../user/user.entity';
import { WeiboEntity } from '../../../weibo/weibo.entity';

export class UserAuthHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {

    if (this.request.method?.toUpperCase() === 'OPTIONS') {
      return next();
    }

    const token = parseTokenFromRequest(this.request);
    const mapped = await getEntity(WeiboEntity).collection.findOne({ token });
    if (!mapped) {
      throw new HTTP403Exception('Invalid access token.');
    }
    this.zone.user = await getEntity(UserEntity).collection.findOne({ id: mapped.id });

    return next();

  }

}
