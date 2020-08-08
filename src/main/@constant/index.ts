/** GET https://api.weibo.com/2/statuses/home_timeline.json */
export const HOME_TIMELINE = {
  statuses: [],
  advertises: [],
  ad: [],
  hasvisible: false,
  previous_cursor: 0,
  next_cursor: 4532473318346809,
  previous_cursor_str: '0',
  next_cursor_str: '4532473318346809',
  total_number: 150,
  interval: 2000,
  uve_blank: -1,
  since_id: 4532501094083786,
  since_id_str: '4532501094083786',
  max_id: 4532473318346809,
  max_id_str: '4532473318346809',
  has_unread: 0
};

/** GET https://api.weibo.com/2/statuses/public_timeline.json */
export const PUBLIC_TIMELINE = {
  statuses: [],
  hasvisible: false,
  previous_cursor: 0,
  next_cursor: 0,
  previous_cursor_str: '0',
  next_cursor_str: '0',
  total_number: 20,
  interval: 0
};

/** https://api.weibo.com/2/comments/show.json */
export const SHOW_COMMENTS = {
  comments: [],
  marks: [],
  hasvisible: false,
  previous_cursor: 0,
  next_cursor: 3627802056659451,
  previous_cursor_str: '0',
  next_cursor_str: '3627802056659451',
  total_number: 184,
  since_id: 0,
  max_id: 3627802056659451,
  since_id_str: '0',
  max_id_str: '3627802056659451',
  status: {}
};

/** GET https://api.weibo.com/oauth2/authorize */
export const CODE = 'da010bfad7909e356a9dc57f50ef1e8e';

/** POST https://api.weibo.com/oauth2/access_token */
export const TOKEN = {
  access_token: '2.00Limi4D7kdwtC6cc1898765GSmw_D',
  remind_in: '157679999',
  expires_in: 157679999,
  uid: '3098913990',
  isRealName: 'true'
};