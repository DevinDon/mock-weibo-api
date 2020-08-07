import { GET, Handler, HTTP400Exception, Inject, PathQuery, POST, View } from '@rester/core';
import { readFileSync } from 'fs';
import { HTMLHandler } from '../@handler/html.handler';
import { RedirectToCallback } from '../@handler/redirect.handler';
import { CODE, TOKEN } from '../@constant';
import { WeiboController } from './weibo.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('weibo')
export class WeiboView {

  @Inject()
  private controller!: WeiboController;

  private readonly HTML: any = {};

  constructor() {
    this.HTML.index = readFileSync('src/main/@public/index.html');
  }

  @Handler(HTMLHandler)
  @GET()
  async index() {
    return this.HTML.index;
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

  // @GET('2/comments/show.json')
  // async showCommentsByStatusID(
  //   @PathQuery('id') id: number,
  //   @PathQuery('count') count: number = 20,
  //   @PathQuery('page') page: number = 1
  // ) {
  //   if (!id) { throw new HTTP400Exception('param id is required'); }
  //   id = +id;
  //   count = +count || 20;
  //   page = +page || 1;
  //   return this.controller.showComments({ id, count, page });
  // }

}
