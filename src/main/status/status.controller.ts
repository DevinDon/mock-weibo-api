import { Controller } from '@rester/core';
import { StatusEntity } from './status.entity';
import { Status } from './status.model';
import { get } from 'superagent';
import { insertOneByOne } from '../util';

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
    return get('https://api.weibo.com/2/statuses/public_timeline.json?access_token=2.00Limi4D7kdwtC6aa1803987GSmw_D&page=1&count=200')
      .send()
      .then(response => response.body.statuses);
  }

  async test() {
    return get('https://api.weibo.com/2/comments/show.json?access_token=2.00Limi4D7kdwtC6aa1803987GSmw_D&id=4532900739955655')
      .send()
      .then(response => response.body);
  }

}
