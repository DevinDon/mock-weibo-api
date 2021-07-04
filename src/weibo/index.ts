import { ResterModule } from '@rester/core';
import { WeiboEntity } from './weibo.entity';
import { WeiboView } from './weibo.view';

export const WeiboModule: ResterModule = {
  entities: [WeiboEntity],
  views: [WeiboView],
};
