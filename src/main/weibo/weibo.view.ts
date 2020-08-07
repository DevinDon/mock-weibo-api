import { GET, Handler, HTTP400Exception, Inject, PathQuery, POST, View } from '@rester/core';
import { readFileSync } from 'fs';
import { HTMLHandler } from '../@handler/html.handler';
import { RedirectToCallback } from '../@handler/redirect.handler';
import { CODE, TOKEN } from './data';
import { WeiboController } from './weibo.controller';

// add, remove, modify, find(condition), get(random)
// one, more

const INDEX = readFileSync('src/main/@public/index.html');

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
  async getToken(
    @PathQuery('code') code: string
  ) {
    if (!code) {
      throw new HTTP400Exception('param code is required');
    }
    return TOKEN;
  }

  @GET('2/statuses/public_timeline.json')
  async getPublicTimeline(
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1
  ) {
    count = Math.min(50, +count);
    page = +page || 1;
    return this.controller.getPublicTimeline({ count, page });
  }

  @GET('2/statuses/home_timeline.json')
  async getHomeTimeline(
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1
  ) {
    count = Math.min(20, +count);
    page = +page || 1;
    return this.controller.getHomeTimeline({ count, page });
  }

  @GET('2/comments/show.json')
  async showCommentsByStatusID(
    @PathQuery('id') id: number,
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1
  ) {
    if (!id) { throw new HTTP400Exception('param id is required'); }
    id = +id;
    count = +count || 20;
    page = +page || 1;
    return this.controller.showComments({ id, count, page });
  }

}
