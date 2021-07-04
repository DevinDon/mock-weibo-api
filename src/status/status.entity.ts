import { Column, Entity, MongoEntity, ObjectID, PaginationParam } from '@rester/orm';
import { HOME_TIMELINE, PUBLIC_TIMELINE } from '../common/constants';
import { User } from '../user/user.model';
import { AlchemyParams, Annotation, CommentManageInfo, ExtendInfo, Geo, NumberDisplayStrategy, PageParam, ParamInsertStatus, PicUrl, Status, Visible } from './status.model';

@Entity({ name: 'status' })
export class StatusEntity extends MongoEntity<Status> implements Status {

  @Column()
  _id: ObjectID;

  @Column({ index: true, unique: true })
  id: number;

  @Column()
  visible: Visible;

  @Column()
  created_at: string;

  @Column()
  idstr: string;

  @Column()
  mid: string;

  @Column()
  can_edit: boolean;

  @Column()
  show_additional_indication: number;

  @Column()
  text: string;

  @Column()
  textLength: number;

  @Column()
  source_allowclick: number;

  @Column()
  source_type: number;

  @Column()
  source: string;

  @Column()
  favorited: boolean;

  @Column()
  truncated: boolean;

  @Column()
  in_reply_to_status_id: string;

  @Column()
  in_reply_to_user_id: string;

  @Column()
  in_reply_to_screen_name: string;

  @Column()
  pic_urls: PicUrl[];

  @Column()
  geo: Geo;

  @Column()
  is_paid: boolean;

  @Column()
  mblog_vip_type: number;

  @Column()
  user: User;

  @Column()
  annotations: Annotation[];

  @Column()
  reposts_count: number;

  @Column()
  comments_count: number;

  @Column()
  attitudes_count: number;

  @Column()
  pending_approval_count: number;

  @Column()
  isLongText: boolean;

  @Column()
  reward_exhibition_type: number;

  @Column()
  hide_flag: number;

  @Column()
  mlevel: number;

  @Column()
  biz_feature: any;

  @Column()
  hasActionTypeCard: number;

  @Column()
  darwin_tags: any[];

  @Column()
  hot_weibo_tags: any[];

  @Column()
  text_tag_tips: any[];

  @Column()
  mblogtype: number;

  @Column()
  userType: number;

  @Column()
  more_info_type: number;

  @Column()
  number_display_strategy: NumberDisplayStrategy;

  @Column()
  positive_recom_flag: number;

  @Column()
  content_auth: number;

  @Column()
  gif_ids: string;

  @Column()
  is_show_bulletin: number;

  @Column()
  comment_manage_info: CommentManageInfo;

  @Column()
  pic_num: number;

  @Column()
  alchemy_params: AlchemyParams;

  @Column()
  cardid: string;

  @Column()
  thumbnail_pic: string;

  @Column()
  bmiddle_pic: string;

  @Column()
  original_pic: string;

  @Column()
  picStatus: string;

  @Column()
  biz_ids: number[];

  @Column()
  topic_id: string;

  @Column()
  sync_mblog?: boolean;

  @Column()
  is_imported_topic?: boolean;

  @Column()
  page_type?: number;

  @Column()
  version?: number;

  @Column()
  reward_scheme: string;

  @Column()
  edit_count?: number;

  @Column()
  edit_at: string;

  @Column()
  fid?: number;

  @Column()
  hide_multi_attitude?: number;

  @Column()
  extend_info: ExtendInfo;

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  async insertStatus({ comment, user }: ParamInsertStatus) {
    const id = Date.now() + Math.random().toString().slice(2, 4);
    return this.collection
      .insertOne({
        id: +id,
        text: comment,
        user,
        created_at: new Date().toString(),
        source: '<a href="http://app.weibo.com/t/feed/6vtZb0" rel="nofollow">微博 weibo.com</a>',
        pic_urls: [],
        reposts_count: +Math.random().toString().slice(2, 5),
        attitudes_count: +Math.random().toString().slice(2, 5),
        comments_count: 0,
        idstr: id,
        textLength: comment.length,
        userType: -100,
      } as any);
  }

  async selectStatusesWithHomeTimeline({ skip, take: limit }: PageParam) {
    // 获取最新的微博
    const cursor = this.collection.aggregate()
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);
    const statuses: Status[] = [];
    for await (const status of cursor) {
      statuses.push(status);
    }
    return {
      ...HOME_TIMELINE,
      statuses,
      total_number: statuses.length,
    };
  }

  async selectStatusesWithPublicTimeline({ skip, take: limit }: PageParam) {
    const cursor = this.collection.aggregate([
      { $sample: { size: limit } },
      { $sort: { date: -1 } },
    ]);
    const statuses: Status[] = [];
    for await (const status of cursor) {
      statuses.push(status);
    }
    return {
      ...PUBLIC_TIMELINE,
      statuses,
      total_number: statuses.length,
    };
  }

  async selectStatusByID(id: number) {
    return this.collection.findOne({ id });
  }

}

export type StatusCollection = StatusEntity['collection'];
