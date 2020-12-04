import { ObjectID } from 'typeorm';
import { User } from '../users/user.model';

export interface Status {

  _id: ObjectID;

}

export interface Visible {
  type: number;
  list_id: number;
}

export interface PicUrl {
  thumbnail_pic: string;
}

export interface Geo {
  type: string;
  coordinates: number[];
}

export interface Insecurity {
  sexual_content: boolean;
}

export interface Place {
  poiid: string;
  title: string;
  type: string;
}

export interface Source {
  appid: string;
  name: string;
  url: string;
}

export interface Annotation {
  shooting: number;
  client_mblogid: string;
  mapi_request?: boolean;
  place: Place;
  type: string;
  uuid?: number;
  client: string;
  source: Source;
  share_sid?: number;
  mode: string;
  origin: string;
}

export interface NumberDisplayStrategy {
  apply_scenario_flag: number;
  display_text_min_number: number;
  display_text: string;
}

export interface CommentManageInfo {
  comment_permission_type: number;
  approval_comment_type: number;
}

export interface AlchemyParams {
  ug_red_envelope: boolean;
}

export interface ExtendInfo {
  from_same_city: boolean;
}

export interface Status {
  visible: Visible;
  created_at: string;
  id: number;
  idstr: string;
  mid: string;
  can_edit: boolean;
  show_additional_indication: number;
  text: string;
  textLength: number;
  source_allowclick: number;
  source_type: number;
  source: string;
  favorited: boolean;
  truncated: boolean;
  in_reply_to_status_id: string;
  in_reply_to_user_id: string;
  in_reply_to_screen_name: string;
  pic_urls: PicUrl[];
  geo: Geo;
  is_paid: boolean;
  mblog_vip_type: number;
  user: User;
  annotations: Annotation[];
  reposts_count: number;
  comments_count: number;
  attitudes_count: number;
  pending_approval_count: number;
  isLongText: boolean;
  reward_exhibition_type: number;
  hide_flag: number;
  mlevel: number;
  biz_feature: any;
  hasActionTypeCard: number;
  darwin_tags: any[];
  hot_weibo_tags: any[];
  text_tag_tips: any[];
  mblogtype: number;
  userType: number;
  more_info_type: number;
  number_display_strategy: NumberDisplayStrategy;
  positive_recom_flag: number;
  content_auth: number;
  gif_ids: string;
  is_show_bulletin: number;
  comment_manage_info: CommentManageInfo;
  pic_num: number;
  alchemy_params: AlchemyParams;
  cardid: string;
  thumbnail_pic: string;
  bmiddle_pic: string;
  original_pic: string;
  picStatus: string;
  biz_ids: number[];
  topic_id: string;
  sync_mblog?: boolean;
  is_imported_topic?: boolean;
  page_type?: number;
  version?: number;
  reward_scheme: string;
  edit_count?: number;
  edit_at: string;
  fid?: number;
  hide_multi_attitude?: number;
  extend_info: ExtendInfo;
}
