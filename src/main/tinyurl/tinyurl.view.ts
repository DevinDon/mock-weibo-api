import { HTTP400Exception, Inject, POST, RequestBody, View } from '@rester/core';
import { TinyurlController } from './tinyurl.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('tinyurl')
export class TinyurlView {

  @Inject()
  private controller!: TinyurlController;

  @POST()
  async index(
    @RequestBody() { url }: { url: string } = {} as any
  ) {
    if (!url) {
      throw new HTTP400Exception('param url is required');
    }
    return { url: this.controller.shortenOrRestoreURL({ url }) };
  }

}
