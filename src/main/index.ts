import { CORSHandler, Rester } from '@rester/core';
import { CommentView } from './comment/comment.view';
import { AccessHandler } from './handler/access.handler';
import { StatusView } from './status/status.view';
import { WeiboView } from './weibo/weibo.view';

const rester = new Rester()
  .configViews
  .add(StatusView, WeiboView, CommentView)
  .end()
  .configHandlers
  .add(AccessHandler, CORSHandler)
  .end()
  .listen();
