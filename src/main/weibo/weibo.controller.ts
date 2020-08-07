import { Controller } from '@rester/core';
import { getHomeTimeline, HomeTimelineParam } from './data/home-timeline';
import { getPublicTimeline, PublicTimelineParam } from './data/public-timeline';
import { showComments, ShowCommentsParam } from './data/show-comments';
import { WeiboEntity } from './weibo.entity';
import { Weibo } from './weibo.model';
import { logger } from '@iinfinity/logger';

// insert, delete, update, select
// one, more

@Controller()
export class WeiboController {

  async selectOneByID(id: Weibo['id']) {
    return WeiboEntity.findOne(id);
  }

  async selectOneByStatusID(param: ShowCommentsParam) {
    logger.debug(JSON.stringify(param));
    return showComments(param);
  }

  async getPublicTimeline(param: PublicTimelineParam) {
    return getPublicTimeline(param);
  }

  async getHomeTimeline(param: HomeTimelineParam) {
    return getHomeTimeline(param);
  }

}
