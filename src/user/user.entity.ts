import { Column, Entity, MongoEntity, ObjectID, PaginationParam } from '@rester/orm';
import { Insecurity, User, UserID } from './user.model';

@Entity({ name: 'user' })
export class UserEntity extends MongoEntity<User> implements User {

  @Column()
  _id!: ObjectID;

  @Column({ index: true, unique: true })
  id!: number;

  @Column({ index: true, unique: true })
  idstr!: string;

  @Column()
  class!: number;

  @Column()
  screen_name!: string;

  @Column()
  name!: string;

  @Column()
  province!: string;

  @Column()
  city!: string;

  @Column()
  location!: string;

  @Column()
  description!: string;

  @Column()
  url!: string;

  @Column()
  profile_image_url!: string;

  @Column()
  cover_image_phone!: string;

  @Column()
  profile_url!: string;

  @Column()
  domain!: string;

  @Column()
  weihao!: string;

  @Column()
  gender!: string;

  @Column()
  followers_count!: number;

  @Column()
  friends_count!: number;

  @Column()
  pagefriends_count!: number;

  @Column()
  statuses_count!: number;

  @Column()
  video_status_count!: number;

  @Column()
  video_play_count!: number;

  @Column()
  favourites_count!: number;

  @Column()
  created_at!: string;

  @Column()
  following!: boolean;

  @Column()
  allow_all_act_msg!: boolean;

  @Column()
  geo_enabled!: boolean;

  @Column()
  verified!: boolean;

  @Column()
  verified_type!: number;

  @Column()
  remark!: string;

  @Column()
  email!: string;

  @Column()
  insecurity!: Insecurity;

  @Column()
  ptype!: number;

  @Column()
  allow_all_comment!: boolean;

  @Column()
  avatar_large!: string;

  @Column()
  avatar_hd!: string;

  @Column()
  verified_reason!: string;

  @Column()
  verified_trade!: string;

  @Column()
  verified_reason_url!: string;

  @Column()
  verified_source!: string;

  @Column()
  verified_source_url!: string;

  @Column()
  follow_me!: boolean;

  @Column()
  like!: boolean;

  @Column()
  like_me!: boolean;

  @Column()
  online_status!: number;

  @Column()
  bi_followers_count!: number;

  @Column()
  lang!: string;

  @Column()
  star!: number;

  @Column()
  mbtype!: number;

  @Column()
  mbrank!: number;

  @Column()
  block_word!: number;

  @Column()
  block_app!: number;

  @Column()
  credit_score!: number;

  @Column()
  user_ability!: number;

  @Column()
  urank!: number;

  @Column()
  story_read_state!: number;

  @Column()
  vclub_member!: number;

  @Column()
  is_teenager!: number;

  @Column()
  is_guardian!: number;

  @Column()
  is_teenager_list!: number;

  @Column()
  pc_new!: number;

  @Column()
  special_follow!: boolean;

  @Column()
  planet_video!: number;

  @Column()
  video_mark!: number;

  @Column()
  live_status!: number;

  @Column()
  tab_manage!: string;

  @Column()
  cardid!: string;

  @Column()
  avatargj_id!: string;

  @Column()
  verified_state?: number | undefined;

  @Column()
  verified_level?: number | undefined;

  @Column()
  verified_type_ext?: number | undefined;

  @Column()
  has_service_tel?: boolean | undefined;

  @Column()
  verified_reason_modified!: string;

  @Column()
  verified_contact_name!: string;

  @Column()
  verified_contact_email!: string;

  @Column()
  verified_contact_mobile!: string;

  @Column()
  cover_image!: string;

  @Column()
  unicom_free_pc!: string;

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  async insertOne(user: User) {
    const id = await this.collection
      .insertOne(user)
      .then(result => result.insertedId);
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

  async deleteOne(id: UserID) {
    await this.collection.deleteOne({ _id: new ObjectID(id) });
    return [id];
  }

  async updateOne(id: UserID, user: Partial<User>) {
    await this.collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: user },
    );
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

  async findOne(id: UserID) {
    return this.collection.findOne({ id });
  }

}

export type UserCollection = UserEntity['collection'];
