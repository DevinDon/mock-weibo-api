import { Controller } from '@rester/core';
import { PUBLIC_TIMELINE } from './data';
import { WeiboEntity } from './weibo.entity';
import { Weibo } from './weibo.model';

// insert, delete, update, select
// one, more

@Controller()
export class WeiboController {

  async selectOneByID(id: Weibo['id']) {
    return WeiboEntity.findOne(id);
  }

  async generateRandomPosts() {
    return {
      ...PUBLIC_TIMELINE,
      statuses: PUBLIC_TIMELINE.statuses.sort(() => Math.random() - 0.5).slice(0, 20)
    };
  }

}
