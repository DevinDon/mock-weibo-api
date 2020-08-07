import { logger } from '@iinfinity/logger';
import { Controller } from '@rester/core';
import { get, put } from 'superagent';
import { Result, insertOneByOne } from '../util';
import { StatusEntity } from './status.entity';
import { Status } from './status.model';

// insert, delete, update, select
// one, more

export interface Processed {
  ing: boolean;
  home: Result;
  public: Result;
  user: Result;
  comment: Result;
}

@Controller()
export class StatusController {

  processed: Processed = { ing: false } as any;

  async selectOneByID(id: Status['id']) {
    return StatusEntity.findOne(id);
  }

  async insertToDatabase({ statuses }: { statuses: Status[] }) {
    return insertOneByOne(statuses, StatusEntity.insert.bind(StatusEntity));
  }

  async fetchNewStatuses() {
    if (this.processed.ing) {
      return;
    } else {
      this.processed.ing = true;
    }
    const homeStatuses = await get('https://api.weibo.com/2/statuses/home_timeline.json?&page=1&count=200')
      .query({ access_token: '2.00Limi4DwNCgfEd11accecebGWMpaD' })
      .send()
      .then(response => response.body.statuses);
    const publicStatuses = await get('https://api.weibo.com/2/statuses/public_timeline.json?&page=1&count=200')
      .query({ access_token: '2.00Limi4DwNCgfEd11accecebGWMpaD' })
      .send()
      .then(response => response.body.statuses);
    this.processed.home = await this.insertToDatabase({ statuses: homeStatuses });
    this.processed.public = await this.insertToDatabase({ statuses: publicStatuses });
    logger.debug(`Fetch new data: ${this.processed.home.success + this.processed.public.success} / ${this.processed.home.total + this.processed.home.total}`);
    this.processed.user = await put('http://localhost/weibo/0/user/update').send() as any;
    this.processed.comment = await put('http://localhost/weibo/0/comment/update').send() as any;
    this.processed.ing = false;
    logger.debug('Update complete');
  }

  async test() {
    return get('https://api.weibo.com/2/comments/show.json?access_token=2.00Limi4D7kdwtC6aa1803987GSmw_D&id=4532900739955655')
      .send()
      .then(response => response.body);
  }

}
