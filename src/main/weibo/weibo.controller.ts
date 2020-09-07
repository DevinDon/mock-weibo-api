import { Controller } from '@rester/core';
import { getMongoRepository } from 'typeorm';
import { getToken } from '../@constant';
import { UserEntity } from '../user/user.entity';
import { User } from '../user/user.model';
import { WeiboEntity } from './weibo.entity';

// insert, delete, update, select
// one, more

@Controller()
export class WeiboController {

  async getToken({ code }: { code: string }) {
    const token = getToken();
    const user: User = await getMongoRepository(UserEntity)
      .aggregate([{ $sample: { size: 1 } }])
      .project({ _id: false })
      .limit(1)
      .next();
    await WeiboEntity.insert({ id: user.id, token });
    return {
      access_token: token,
      uid: user.id,
      remind_in: Date.now() + 1000 * 3600 * 24 * 365,
      expires_in: Date.now() + 1000 * 3600 * 24 * 365,
      isRealName: true
    };
  }

}
