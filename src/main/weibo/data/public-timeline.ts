import { getStatuses } from './status';

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

export interface PublicTimelineParam {
  count: number;
  page: number;
}

export async function getPublicTimeline({ count, page }: PublicTimelineParam) {
  return {
    ...PUBLIC_TIMELINE,
    statuses: await getStatuses({ take: count, skip: Math.max(0, page - 1) * count }),
    total_number: count
  };
}
