import { logger } from '@iinfinity/logger';
import { Controller } from '@rester/core';
import { get, put } from 'superagent';
import { insertOneByOne } from '../util';
import { StatusEntity } from './status.entity';
import { Status } from './status.model';

// insert, delete, update, select
// one, more

@Controller()
export class StatusController {

  async selectOneByID(id: Status['id']) {
    return StatusEntity.findOne(id);
  }

  async insertToDatabase({ statuses }: { statuses: Status[] }) {
    return insertOneByOne(statuses, StatusEntity.insert.bind(StatusEntity));
  }

  async fetchNewStatuses() {
    const homeStatuses = await get('https://api.weibo.com/2/statuses/home_timeline.json?&page=1&count=200')
      .query({ access_token: '2.00Limi4DwNCgfEd11accecebGWMpaD' })
      .send()
      .then(response => response.body.statuses);
    const publicStatuses = await get('https://api.weibo.com/2/statuses/public_timeline.json?&page=1&count=200')
      .query({ access_token: '2.00Limi4DwNCgfEd11accecebGWMpaD' })
      .send()
      .then(response => response.body.statuses);
    const results = {
      home: await this.insertToDatabase({ statuses: homeStatuses }),
      public: await this.insertToDatabase({ statuses: publicStatuses })
    };
    logger.debug(`Fetch new data: ${results.home.success + results.public.success} ${results.home.total + results.home.total}`);
    await put('http://localhost/weibo/0/user/update').send();
    await put('http://localhost/weibo/0/comment/update').send();
    return results;
  }

  async test() {
    return get('https://api.weibo.com/2/comments/show.json?access_token=2.00Limi4D7kdwtC6aa1803987GSmw_D&id=4532900739955655')
      .send()
      .then(response => response.body);
  }

}
