import { Controller } from '@rester/core';
import { StatusEntity } from './status.entity';
import { Status } from './status.model';
import { get, put } from 'superagent';
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
    const statuses = await get('https://api.weibo.com/2/statuses/public_timeline.json?&page=1&count=200')
      .query({ access_token: '2.00Limi4DwNCgfEd11accecebGWMpaD' })
      .send()
      .then(response => response.body.statuses);
    const results = await this.insertToDatabase({ statuses });
    await put('http://localhost/weibo/0/comment/update').send();
    await put('http://localhost/weibo/0/user/update').send();
    return results;
  }

  async test() {
    return get('https://api.weibo.com/2/comments/show.json?access_token=2.00Limi4D7kdwtC6aa1803987GSmw_D&id=4532900739955655')
      .send()
      .then(response => response.body);
  }

}
