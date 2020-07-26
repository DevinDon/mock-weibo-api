import { GET, Handler, Inject, PathQuery, POST, View } from '@rester/core';
import { readFileSync } from 'fs';
import { HTMLHandler } from '../handler/html';
import { RedirectToCallback } from '../handler/redirect';
import { CODE, TOKEN } from './data';
import { WeiboController } from './weibo.controller';

// add, remove, modify, find(condition), get(random)
// one, more

const INDEX = readFileSync('src/main/weibo/index.html');

@View('weibo')
export class WeiboView {

  @Inject()
  private controller!: WeiboController;

  @Handler(HTMLHandler)
  @GET()
  async index() {
    return INDEX;
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
