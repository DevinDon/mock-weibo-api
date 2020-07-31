import { logger } from '@iinfinity/logger';
import { Controller } from '@rester/core';
import { get } from 'superagent';
import { getMongoRepository } from 'typeorm';
import { StatusEntity } from '../status/status.entity';
import { Status } from '../status/status.model';
import { insertOneByOne } from '../util';
import { CommentEntity } from './comment.entity';
import { Comment } from './comment.model';

// insert, delete, update, select
// one, more

@Controller()
export class CommentController {

  async hasComments(id: number) {
    const result = !! await CommentEntity.findOne({
      where: { 'status.id': id }
    });
    logger.debug(`${id} ${result ? 'has' : 'does not has'} comments.`);
    return result;
  }

  async updateByID({ id }: { id: Comment['id'] }) {
    const comments: Comment[] = await get('https://api.weibo.com/2/comments/show.json?access_token=2.00Limi4D7kdwtC6aa1803987GSmw_D&page=1&count=200')
      .query({ id })
      .send()
      .then(response => response.body.comments)
      .catch(reason => (logger.warn('Update by ID failed: ', reason), []));
    return insertOneByOne(comments, CommentEntity.insert.bind(CommentEntity));
  }

  async updateAll() {
    const results = {};
    const cursor = getMongoRepository(StatusEntity)
      .createCursor();
    while (await cursor.hasNext()) {
      const status: Status = await cursor.next();
      if (status.comments_count === 0 || this.hasComments(status.id)) { continue; }
      results[status.id] = await this.updateByID({ id: status.id });
      logger.debug(`${status.id}: ${results[status.id].failed} / ${results[status.id].total}`);
    }
    return results;
  }

}
