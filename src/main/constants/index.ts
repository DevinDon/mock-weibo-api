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
export function getCode() {
  const code = +`${Date.now()}${Math.random().toString().slice(2, 8)}`;
  return code.toString(16);
}

/** POST https://api.weibo.com/oauth2/access_token */
export function getToken() {
  return `0.00${Math.random().toString().slice(2)}${Date.now()}`;
}

/** Database cursor step. */
export const STEP = 10000;
