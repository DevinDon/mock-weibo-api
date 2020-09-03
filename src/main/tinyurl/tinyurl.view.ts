import { GET, HTTP400Exception, HTTPResponse, Inject, PathVariable, POST, RequestBody, View } from '@rester/core';
import { ServerResponse } from 'http';
import { TinyurlController } from './tinyurl.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('tinyurl')
export class TinyurlView {

  @Inject()
  private controller!: TinyurlController;

  private prefix: string = 'http://mock.don.red/tinyurl/s/';

  @POST()
  async index(
    @RequestBody() { url }: { url: string } = {} as any
  ) {
    if (!url) {
      throw new HTTP400Exception('param url is required');
    }
    return { url: this.prefix + await this.controller.shortenOrRestoreURLtoCode({ url }) };
  }

  @GET('s/{{id}}')
  async redirect(
    @PathVariable('id') id: string,
    @HTTPResponse() response: ServerResponse
  ) {
    response.statusCode = 302;
    response.setHeader('Location', this.prefix + await this.controller.idToURL({ id }));
  }

}
