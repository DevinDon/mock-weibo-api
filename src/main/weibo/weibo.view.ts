import { GET, Handler, HandlerZone, HTTP400Exception, Inject, Part, partsToObject, PathQuery, POST, RequestBody, View } from '@rester/core';
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
    this.HTML.login = readFileSync('src/main/@public/login.html');
  }

  @Handler(HTMLHandler)
  @GET()
  async index() {
    return this.HTML.index;
  }

  @Handler(HTMLHandler)
  @GET('oauth2/authorize')
  async getCodeWithLogin(
    // @PathQuery('client_id') id: string,
    // @PathQuery('response_type') type: 'code',
    @PathQuery('redirect_uri') uri: string
  ) {
    return this.HTML.login;
  }

  @Handler(RedirectToCallback)
  @POST('oauth2/authorize/302')
  async getCode(
    @RequestBody() { redirect }: { redirect: string }
  ) {
    if (!redirect) { throw new HTTP400Exception('param redirect_uri is required'); }
    redirect = decodeURIComponent(redirect);
    if (!isValidURL(redirect)) { throw new HTTP400Exception('param redirect_uri is invalid'); }
    return { location: redirect, code: getCode() };
  }

  @POST('oauth2/access_token')
  async getToken(
    @PathQuery('code') codeInQuery: string,
    @RequestBody() params: Part[] | { code: string }
  ) {
    let code: string;
    if (codeInQuery) {
      code = codeInQuery;
    } else if (Array.isArray(params)) {
      code = partsToObject(params);
    } else {
      code = params.code;
    }
    if (!code) { throw new HTTP400Exception('param code is required'); }
    return this.controller.getToken({ code });
  }

  @Handler(AuthHandler)
  @GET('2/account/get_uid.json')
  async getUID(
    @HandlerZone() { user }: { user: User }
  ) {
    return { uid: user.id };
  }

}
