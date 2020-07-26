import { CORSHandler, Rester } from '@rester/core';
import { MottoView } from './motto/motto.view';
import { WeiboView } from './weibo/weibo.view';

const rester = new Rester()
  .configViews
  .add(MottoView, WeiboView)
  .end()
  .configHandlers
  .add(CORSHandler)
  .end()
  .listen();
