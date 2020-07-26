import { GET, Inject, View, POST } from '@rester/core';
import { CODE, TOKEN, PUBLIC_TIMELINE } from './data';
import { WeiboController } from './weibo.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('weibo')
export class WeiboView {

  @Inject()
  private controller!: WeiboController;

  @GET('oauth2/authorize')
  async getCode() {
    return { code: CODE };
  }

  @POST('oauth2/access_token')
  async getToken() {
    return TOKEN;
  }

  @GET('2/statuses/public_timeline.json')
  async getPublicTimeline() {
    return PUBLIC_TIMELINE;
  }

}
