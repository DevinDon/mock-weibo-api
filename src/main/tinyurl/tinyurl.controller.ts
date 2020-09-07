import { Controller } from '@rester/core';
import { TinyurlEntity } from './tinyurl.entity';

// insert, delete, update, select
// one, more

@Controller()
export class TinyurlController {

  private reg = /http:\/\/mock.don.red\/tinyurl\/s\/(.*)/;

  private prefix: string = 'http://mock.don.red/tinyurl/s/';

  async shortenOrRestoreURL({ url }: { url: string }) {

    const match = url.match(this.reg);

    if (match && match[1]) {

      return this.idToURL({ id: match[1] });

    } else {

      let id = await TinyurlEntity.findOne({ origin: url })
        .then(record => record?.id);

      if (!id) {
        id = Date.now().toString(36) + Math.round(Math.random() * 1000).toString(36);
        await TinyurlEntity.insert({
          origin: url,
          id,
          date: new Date()
        });
      }

      return this.prefix + id;

    }

  }

  async idToURL({ id }: { id: string }) {
    return TinyurlEntity
      .findOne({ id })
      .then(record => record?.origin);
  }

}
