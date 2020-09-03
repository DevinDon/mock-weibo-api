import { Controller } from '@rester/core';
import { Tinyurl } from './tinyurl.model';
import { TinyurlEntity } from './tinyurl.entity';

// insert, delete, update, select
// one, more

@Controller()
export class TinyurlController {

  async shortenOrRestoreURL({ url }: { url: string }) {

    if (url.includes('don.red')) {

      return TinyurlEntity.findOne({ short: url })
        .then(record => record?.origin);

    } else {

      let short = await TinyurlEntity.findOne({ origin: url })
        .then(record => record?.short);

      if (!short) {
        short = Date.now().toString(36) + Math.round(Math.random() * 1000).toString(36);
        await TinyurlEntity.insert({
          origin: url,
          short,
          date: new Date()
        });
        return short;
      }

    }

  }

}
