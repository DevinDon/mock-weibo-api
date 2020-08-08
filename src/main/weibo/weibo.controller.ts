import { Controller } from '@rester/core';
import { getMongoRepository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { User } from '../user/user.model';
import { WeiboEntity } from './weibo.entity';

// insert, delete, update, select
// one, more

@Controller()
export class WeiboController {

  async selectUserByToken({ token }: { token: string }) {
    const userInside = await WeiboEntity.findOne({ token });
    if (!userInside) {
      const userRandom: User = await getMongoRepository(UserEntity)
        .createCursor({ $sample: { size: 1 } })
        .limit(1)
        .next();
      const result = await WeiboEntity.insert({ id: userRandom.id, token });
      return { uid: userRandom.id };
    }
    return { uid: userInside.id };
  }

}
