import { Controller } from '@rester/core';
import { randomSort } from '../util';
import { getHomeTimeline, HomeTimelineParam } from './data/home-timeline';
import { getPublicTimeline, PublicTimelineParam } from './data/public-timeline';
import { WeiboEntity } from './weibo.entity';
import { Weibo } from './weibo.model';

// insert, delete, update, select
// one, more

@Controller()
export class WeiboController {

  async selectOneByID(id: Weibo['id']) {
    return WeiboEntity.findOne(id);
  }

  async getPublicTimeline(param: PublicTimelineParam) {
    return getPublicTimeline(param);
  }

  async getHomeTimeline(param: HomeTimelineParam) {
    return getHomeTimeline(param);
  }

}
