import { Controller } from '@rester/core';
import { StatusEntity } from './status.entity';
import { Status } from './status.model';
import { get } from 'superagent';

// insert, delete, update, select
// one, more

@Controller()
export class StatusController {

  async selectOneByID(id: Status['id']) {
    return StatusEntity.findOne(id);
  }

  async insertToDatabase({ statuses }: { statuses: Status[] }) {
    const pending = statuses.map(
      status => StatusEntity
        .insert(status)
        .then(result => ({ id: status.id }))
        .catch(reason => ({ id: status.id, failed: true }))
    );
    return Promise.all(pending);
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
