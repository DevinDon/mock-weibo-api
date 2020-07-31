import { CORSHandler, Rester } from '@rester/core';
import { AccessHandler } from './handler/access.handler';
import { StatusView } from './status/status.view';
import { WeiboView } from './weibo/weibo.view';

const rester = new Rester()
  .configViews
  .add(StatusView, WeiboView)
  .end()
  .configHandlers
  .add(AccessHandler, CORSHandler)
  .end()
  .listen();
