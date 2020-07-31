import { Controller } from '@rester/core';
import { CommentEntity } from '../comment/comment.entity';
import { Comment } from '../comment/comment.model';
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

  async selectOneByStatusID(id: Comment['id']) {
    return CommentEntity.find({
      where: { 'status.id': id }
    });
  }

  async getPublicTimeline(param: PublicTimelineParam) {
    return getPublicTimeline(param);
  }

  async getHomeTimeline(param: HomeTimelineParam) {
    return getHomeTimeline(param);
  }

}
