import { BaseHandler, HTTP403Exception } from '@rester/core';
import { getMongoRepository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { User } from '../user/user.model';
import { WeiboEntity } from '../weibo/weibo.entity';

export class AuthHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const token = this.request.headers['authorization']
      && this.request.headers['authorization'].slice(7);
    // no token, 403
    if (!token) { throw new HTTP403Exception('need access token & login'); }
    // mapped a user
    const mapped = await WeiboEntity.findOne({ token });
    let user: User;
    if (!mapped) { // create a new map
      user = await getMongoRepository(UserEntity)
        .aggregate([{ $sample: { size: 1 } }])
        .limit(1)
        .next();
      const result = await WeiboEntity.insert({ id: user.id, token });
    } else {
      user = (await UserEntity.findOne({ id: mapped.id }))!;
    }
    this.zone.user = user;
    return next();
  }

}
