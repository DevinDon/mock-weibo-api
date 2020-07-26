import { GET, Handler, Inject, PathQuery, POST, View } from '@rester/core';
import { RedirectToCallback } from '../handler/redirect';
import { CODE, TOKEN } from './data';
import { WeiboController } from './weibo.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('weibo')
export class WeiboView {

  @Inject()
  private controller!: WeiboController;

  @GET()
  async index() {
    return {
      可用功能: '请求方式 对应链接',
      getCode: 'GET oauth2/authorize',
      getToken: 'POST oauth2/access_token',
      getPublicTimeline: 'GET 2/statuses/public_timeline.json'
    };
  }

  @Handler(RedirectToCallback)
  @GET('oauth2/authorize')
  async getCode(
    // @PathQuery('client_id') id: string,
    // @PathQuery('response_type') type: 'code',
    @PathQuery('redirect_uri') uri: string
  ) {
    uri = decodeURIComponent(uri);
    return { location: uri, code: CODE };
  }

  @POST('oauth2/access_token')
  async getToken() {
    return TOKEN;
  }

  @GET('2/statuses/public_timeline.json')
  async getPublicTimeline(
    @PathQuery('count') count: number = 20
  ) {
    count = Math.min(50, +count);
    return this.controller.generateRandomPosts(count);
  }

}
