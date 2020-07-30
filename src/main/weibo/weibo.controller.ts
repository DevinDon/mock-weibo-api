import { Controller } from '@rester/core';
import { HomeTimelineParam, getHomeTimeline } from './data/home-timeline';
import { getPublicTimeline } from './data/public-timeline';
import { randomSort } from './util';
import { WeiboEntity } from './weibo.entity';
import { Weibo } from './weibo.model';

// insert, delete, update, select
// one, more

@Controller()
export class WeiboController {

  private statuses: any[] = [];

  async selectOneByID(id: Weibo['id']) {
    return WeiboEntity.findOne(id);
  }

  async generateRandomPublicTimelinePosts(count: number) {
    const timeline = getPublicTimeline({ count });
    return {
      ...timeline,
      statuses: timeline.statuses.sort(randomSort)
    };
  }

  async generateRandomHomeTimelinePosts({ page, count }: HomeTimelineParam) {
    const timeline = getHomeTimeline({ page, count });
    return {
      ...timeline,
      statuses: timeline.statuses.sort(randomSort)
    };
  }

}
