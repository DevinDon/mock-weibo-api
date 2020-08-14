import { CORSHandler, Rester } from '@rester/core';
import { AccessHandler } from './@handler/access.handler';
import { logger } from './@util/logger';
import { CommentView } from './comment/comment.view';
import { ManageView } from './manage/manage.view';
import { StatusView } from './status/status.view';
import { UserView } from './user/user.view';
import { WeiboView } from './weibo/weibo.view';

const rester = new Rester()
  .configViews
  .add(CommentView, StatusView, UserView, WeiboView, ManageView)
  .end()
  .configHandlers
  .add(AccessHandler, CORSHandler)
  .end()
  .configLogger
  .set(logger)
  .end()
  .listen();
