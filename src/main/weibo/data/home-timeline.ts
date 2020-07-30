import { getStatus } from "./status";

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

export interface HomeTimelineParam {
  page?: number;
  count?: number;
}

export function getHomeTimeline({ page, count }: HomeTimelineParam = { page: 1, count: 20 }) {
  page = page ?? 1;
  count = count ?? 20;
  return {
    ...HOME_TIMELINE,
    statuses: getStatus(count),
    total_number: count
  };
}
