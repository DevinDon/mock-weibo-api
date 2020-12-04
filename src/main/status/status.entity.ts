import { BaseEntity, Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import { User } from '../users/user.model';
import { AlchemyParams, Annotation, CommentManageInfo, ExtendInfo, Geo, NumberDisplayStrategy, PicUrl, Status, Visible } from './status.model';

@Entity('status')
export class StatusEntity extends BaseEntity implements Status {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  @Index({ unique: true })
  id!: number;

  @Column()
  visible!: Visible;

  @Column()
  created_at!: string;

  @Column()
  idstr!: string;

  @Column()
  mid!: string;

  @Column()
  can_edit!: boolean;

  @Column()
  show_additional_indication!: number;

  @Column()
  text!: string;

  @Column()
  textLength!: number;

  @Column()
  source_allowclick!: number;

  @Column()
  source_type!: number;

  @Column()
  source!: string;

  @Column()
  favorited!: boolean;

  @Column()
  truncated!: boolean;

  @Column()
  in_reply_to_status_id!: string;

  @Column()
  in_reply_to_user_id!: string;

  @Column()
  in_reply_to_screen_name!: string;

  @Column()
  pic_urls!: PicUrl[];

  @Column()
  geo!: Geo;

  @Column()
  is_paid!: boolean;

  @Column()
  mblog_vip_type!: number;

  @Column()
  user!: User;

  @Column()
  annotations!: Annotation[];

  @Column()
  reposts_count!: number;

  @Column()
  comments_count!: number;

  @Column()
  attitudes_count!: number;

  @Column()
  pending_approval_count!: number;

  @Column()
  isLongText!: boolean;

  @Column()
  reward_exhibition_type!: number;

  @Column()
  hide_flag!: number;

  @Column()
  mlevel!: number;

  @Column()
  biz_feature!: any;

  @Column()
  hasActionTypeCard!: number;

  @Column()
  darwin_tags!: any[];

  @Column()
  hot_weibo_tags!: any[];

  @Column()
  text_tag_tips!: any[];

  @Column()
  mblogtype!: number;

  @Column()
  userType!: number;

  @Column()
  more_info_type!: number;

  @Column()
  number_display_strategy!: NumberDisplayStrategy;

  @Column()
  positive_recom_flag!: number;

  @Column()
  content_auth!: number;

  @Column()
  gif_ids!: string;

  @Column()
  is_show_bulletin!: number;

  @Column()
  comment_manage_info!: CommentManageInfo;

  @Column()
  pic_num!: number;

  @Column()
  alchemy_params!: AlchemyParams;

  @Column()
  cardid!: string;

  @Column()
  thumbnail_pic!: string;

  @Column()
  bmiddle_pic!: string;

  @Column()
  original_pic!: string;

  @Column()
  picStatus!: string;

  @Column()
  biz_ids!: number[];

  @Column()
  topic_id!: string;

  @Column()
  sync_mblog?: boolean;

  @Column()
  is_imported_topic?: boolean;

  @Column()
  page_type?: number;

  @Column()
  version?: number;

  @Column()
  reward_scheme!: string;

  @Column()
  edit_count?: number;

  @Column()
  edit_at!: string;

  @Column()
  fid?: number;

  @Column()
  hide_multi_attitude?: number;

  @Column()
  extend_info!: ExtendInfo;

}
