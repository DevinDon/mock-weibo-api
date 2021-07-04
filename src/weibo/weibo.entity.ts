import { Column, Entity, getEntity, MongoEntity, ObjectID, PaginationParam } from '@rester/orm';
import { generateToken } from '../common/constants';
import { UserEntity } from '../user/user.entity';
import { User } from '../user/user.model';
import { Weibo } from './weibo.model';

@Entity({ name: 'weibo' })
export class WeiboEntity extends MongoEntity<Weibo> implements Weibo {

  @Column()
  _id!: ObjectID;

  @Column()
  id!: number;

  @Column({ index: true, unique: true })
  token!: string;

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  getUserEntity(): UserEntity {
    return getEntity(UserEntity);
  }

  async getToken({ code }: { code: string }) {
    const token = generateToken();
    const user: User = await this.getUserEntity().collection
      .aggregate([{ $sample: { size: 1 } }])
      .project({ _id: false })
      .limit(1)
      .next() as User;
    await this.collection.insertOne({ id: user.id, token });
    return {
      access_token: token,
      uid: `${user.id}`,
      id: user.id,
      remind_in: Date.now() + 1000 * 3600 * 24 * 365,
      expires_in: Date.now() + 1000 * 3600 * 24 * 365,
      isRealName: true,
    };
  }

}

export type WeiboCollection = WeiboEntity['collection'];
