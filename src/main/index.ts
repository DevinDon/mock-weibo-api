import { CORSHandler, ExceptionHandler, ParameterHandler, Rester, RouterHandler, SchemaHandler } from '@rester/core';
import { AccessEntity } from './@handler/access.entity';
import { AccessHandler } from './@handler/access.handler';
import { logger } from './@util/logger';
import { CommentEntity } from './comment/comment.entity';
import { CommentView } from './comment/comment.view';
import { ManageEntity } from './manage/manage.entity';
import { ManageView } from './manage/manage.view';
import { StatusEntity } from './status/status.entity';
import { StatusView } from './status/status.view';
import { TinyurlEntity } from './tinyurl/tinyurl.entity';
import { TinyurlView } from './tinyurl/tinyurl.view';
import { UserEntity } from './user/user.entity';
import { UserView } from './user/user.view';
import { WeiboEntity } from './weibo/weibo.entity';
import { WeiboView } from './weibo/weibo.view';

const rester = new Rester()
  .configViews
  .add(CommentView, StatusView, UserView, WeiboView, ManageView, TinyurlView)
  .end()
  .configHandlers
  .set(ExceptionHandler, SchemaHandler, RouterHandler, AccessHandler, CORSHandler, ParameterHandler)
  .end()
  .configLogger
  .set(logger)
  .end();

rester.configDatabase.setEntities([
  CommentEntity, AccessEntity, ManageEntity, StatusEntity, TinyurlEntity, UserEntity, WeiboEntity
]);

rester.listen();
