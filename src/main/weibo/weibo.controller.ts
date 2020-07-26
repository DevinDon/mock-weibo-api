import { Controller } from '@rester/core';
import { Weibo } from './weibo.model';
import { WeiboEntity } from './weibo.entity';

// insert, delete, update, select
// one, more

@Controller()
export class WeiboController {

  async selectOneByID(id: Weibo['id']) {
    return WeiboEntity.findOne(id);
  }

}