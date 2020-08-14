import { GET, Handler, HandlerZone, HTTP400Exception, Inject, PathQuery, POST, View } from '@rester/core';
import { readFileSync } from 'fs';
import { getCode, getToken } from '../@constant';
import { AuthHandler } from '../@handler/auth.handler';
import { HTMLHandler } from '../@handler/html.handler';
import { RedirectToCallback } from '../@handler/redirect.handler';
import { isValidURL } from '../@util';
import { User } from '../user/user.model';
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
    if (!uri) { throw new HTTP400Exception('param redirect_uri is required'); }
    uri = decodeURIComponent(uri);
    if (!isValidURL(uri)) { throw new HTTP400Exception('param redirect_uri is invalid'); }
    return { location: uri, code: getCode() };
  }

  @POST('oauth2/access_token')
  async getToken(
    @PathQuery('code') code: string
  ) {
    if (!code) { throw new HTTP400Exception('param code is required'); }
    return getToken();
  }

  @Handler(AuthHandler)
  @GET('2/account/get_uid.json')
  async getUID(
    @HandlerZone() { user }: { user: User }
  ) {
    return { uid: user.id };
  }

}
