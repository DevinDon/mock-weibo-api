import { BaseHandler, HTTP403Exception, parseTokenFromRequest } from '@rester/core';
import { getEntity } from '@rester/orm';
import { UserEntity } from '../../../user/user.entity';

export class UserAuthHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {

    if (this.request.method?.toUpperCase() === 'OPTIONS') {
      return next();
    }

    const token = parseTokenFromRequest(this.request);
    const mapped = await WeiboEntity.findOne({ token });
    if (!mapped) {
      throw new HTTP403Exception('Invalid access token.');
    }
    this.zone.user = await getEntity(UserEntity).findOne({ id: mapped.id });

    return next();

  }

}
