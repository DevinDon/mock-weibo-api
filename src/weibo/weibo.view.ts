import { BaseView, GET, Handler, HandlerZone, HTTP400Exception, HTTPResponse, Part, partsToObject, PathQuery, POST, RequestBody, requiredParams, ResourceResponse, View } from '@rester/core';
import { getEntity, isProd } from '@rester/orm';
import { ServerResponse } from 'http';
import { generateCode } from '../common/constants';
import { UserAuthHandler } from '../common/handlers';
import { isValidURL } from '../common/utils';
import { User } from '../user/user.model';
import { WeiboEntity } from './weibo.entity';

// create, remove, modify, take, search
// one, more

@View()
export class WeiboView extends BaseView {

  private entity: WeiboEntity;

  async init() {
    this.entity = getEntity(WeiboEntity);
    this.HTML.index = isProd() ? 'resources/index.html' : 'src/resources/index.html';
    this.HTML.login = isProd() ? 'resources/login.html' : 'src/resources/login.html';
  }

  private readonly HTML: any = {};

  @GET()
  async index() {
    return new ResourceResponse({ file: this.HTML.index });
  }

  @GET('oauth2/authorize')
  async getCodeWithLogin(
    // @PathQuery('client_id') id: string,
    // @PathQuery('response_type') type: 'code',
    @PathQuery('redirect_uri') uri: string,
  ) {
    return new ResourceResponse({ file: this.HTML.login });
  }

  @POST('oauth2/authorize/302')
  async getCode(
    @RequestBody() { redirect }: { redirect: string },
    @HTTPResponse() response: ServerResponse,
  ) {
    requiredParams({ redirect });
    redirect = decodeURIComponent(redirect);
    if (!isValidURL(redirect)) { throw new HTTP400Exception('param redirect_uri is invalid'); }
    response.statusCode = 302;
    response.setHeader('Location', `${redirect}/?code=${generateCode()}`);
    // return { location: redirect, code: getCode() };
  }

  @POST('oauth2/access_token')
  async getToken(
    @PathQuery('code') codeInQuery: string,
    @RequestBody() params: Part[] | { code: string },
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
    return this.entity.getToken({ code });
  }

  @Handler(UserAuthHandler)
  @GET('2/account/get_uid.json')
  async getUID(
    @HandlerZone() { user }: { user: User },
  ) {
    return { uid: user.id };
  }

}
