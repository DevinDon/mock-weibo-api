import { ObjectID } from 'typeorm';
import { User } from '../user/user.model';

export interface Comment {

  _id: ObjectID;

  id: number;

  content?: string;

}
export interface Insecurity {
  sexual_content: boolean;
}

export interface Visible {
  type: number;
  list_id: number;
}

export interface PicUrl {
  thumbnail_pic: string;
}

export interface Insecurity2 {
  sexual_content: boolean;
}

export interface User2 {
  id: any;
  idstr: string;
  class: number;
  screen_name: string;
  name: string;
  province: string;
  city: string;
  location: string;
  description: string;
  url: string;
  profile_image_url: string;
  cover_image_phone: string;
  profile_url: string;
  domain: string;
  weihao: string;
  gender: string;
  followers_count: number;
  friends_count: number;
  pagefriends_count: number;
  statuses_count: number;
  video_status_count: number;
  video_play_count: number;
  favourites_count: number;
  created_at: string;
  following: boolean;
  allow_all_act_msg: boolean;
  geo_enabled: boolean;
  verified: boolean;
  verified_type: number;
  remark: string;
  email: string;
  insecurity: Insecurity2;
  ptype: number;
  allow_all_comment: boolean;
  avatar_large: string;
  avatar_hd: string;
  verified_reason: string;
  verified_trade: string;
  verified_reason_url: string;
  verified_source: string;
  verified_source_url: string;
  follow_me: boolean;
  like: boolean;
  like_me: boolean;
  online_status: number;
  bi_followers_count: number;
  lang: string;
  star: number;
  mbtype: number;
  mbrank: number;
  block_word: number;
  block_app: number;
  credit_score: number;
  user_ability: number;
  avatargj_id: string;
  urank: number;
  story_read_state: number;
  vclub_member: number;
  is_teenager: number;
  is_guardian: number;
  is_teenager_list: number;
  pc_new: number;
  special_follow: boolean;
  planet_video: number;
  video_mark: number;
  live_status: number;
  tab_manage: string;
}

export interface Annotation {
  client_mblogid: string;
  mapi_request?: boolean;
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

export interface Status {
  visible: Visible;
  created_at: string;
  id: any;
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
  thumbnail_pic: string;
  bmiddle_pic: string;
  original_pic: string;
  geo?: any;
  is_paid: boolean;
  mblog_vip_type: number;
  user: User2;
  annotations: Annotation[];
  picStatus: string;
  reposts_count: number;
  comments_count: number;
  attitudes_count: number;
  pending_approval_count: number;
  isLongText: boolean;
  reward_exhibition_type: number;
  hide_flag: number;
  mlevel: number;
  biz_feature: any;
  topic_id: string;
  sync_mblog: boolean;
  is_imported_topic: boolean;
  page_type: number;
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
}

export interface Comment {
  created_at: string;
  rootid: any;
  rootidstr: string;
  floor_number: number;
  text: string;
  disable_reply: number;
  user: User;
  mid: string;
  idstr: string;
  status: Status;
  readtimetype: string;
}

export interface Visible2 {
  type: number;
  list_id: number;
}

export interface PicUrl2 {
  thumbnail_pic: string;
}

export interface Insecurity3 {
  sexual_content: boolean;
}

export interface User3 {
  id: number;
  idstr: string;
  class: number;
  screen_name: string;
  name: string;
  province: string;
  city: string;
  location: string;
  description: string;
  url: string;
  profile_image_url: string;
  cover_image_phone: string;
  profile_url: string;
  domain: string;
  weihao: string;
  gender: string;
  followers_count: number;
  friends_count: number;
  pagefriends_count: number;
  statuses_count: number;
  video_status_count: number;
  video_play_count: number;
  favourites_count: number;
  created_at: string;
  following: boolean;
  allow_all_act_msg: boolean;
  geo_enabled: boolean;
  verified: boolean;
  verified_type: number;
  remark: string;
  email: string;
  insecurity: Insecurity3;
  ptype: number;
  allow_all_comment: boolean;
  avatar_large: string;
  avatar_hd: string;
  verified_reason: string;
  verified_trade: string;
  verified_reason_url: string;
  verified_source: string;
  verified_source_url: string;
  follow_me: boolean;
  like: boolean;
  like_me: boolean;
  online_status: number;
  bi_followers_count: number;
  lang: string;
  star: number;
  mbtype: number;
  mbrank: number;
  block_word: number;
  block_app: number;
  credit_score: number;
  user_ability: number;
  avatargj_id: string;
  urank: number;
  story_read_state: number;
  vclub_member: number;
  is_teenager: number;
  is_guardian: number;
  is_teenager_list: number;
  pc_new: number;
  special_follow: boolean;
  planet_video: number;
  video_mark: number;
  live_status: number;
  tab_manage: string;
}

export interface Annotation2 {
  client_mblogid: string;
  mapi_request?: boolean;
}

export interface NumberDisplayStrategy2 {
  apply_scenario_flag: number;
  display_text_min_number: number;
  display_text: string;
}

export interface CommentManageInfo2 {
  comment_permission_type: number;
  approval_comment_type: number;
}

export interface AlchemyParams {
  ug_red_envelope: boolean;
}

export interface Status2 {
  visible: Visible2;
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
  pic_urls: PicUrl2[];
  thumbnail_pic: string;
  bmiddle_pic: string;
  original_pic: string;
  geo?: any;
  is_paid: boolean;
  mblog_vip_type: number;
  user: User3;
  annotations: Annotation2[];
  picStatus: string;
  reposts_count: number;
  comments_count: number;
  attitudes_count: number;
  pending_approval_count: number;
  isLongText: boolean;
  reward_exhibition_type: number;
  hide_flag: number;
  mlevel: number;
  biz_feature: number;
  topic_id: string;
  sync_mblog: boolean;
  is_imported_topic: boolean;
  page_type: number;
  hasActionTypeCard: number;
  darwin_tags: any[];
  hot_weibo_tags: any[];
  text_tag_tips: any[];
  mblogtype: number;
  userType: number;
  more_info_type: number;
  number_display_strategy: NumberDisplayStrategy2;
  positive_recom_flag: number;
  content_auth: number;
  gif_ids: string;
  is_show_bulletin: number;
  comment_manage_info: CommentManageInfo2;
  pic_num: number;
  alchemy_params: AlchemyParams;
}

export interface RootObject {
  comments: Comment[];
  marks: any[];
  hasvisible: boolean;
  previous_cursor: number;
  next_cursor: number;
  previous_cursor_str: string;
  next_cursor_str: string;
  total_number: number;
  since_id: number;
  max_id: number;
  since_id_str: string;
  max_id_str: string;
  status: Status2;
}
