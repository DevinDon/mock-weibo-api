import { Controller } from '@rester/core';
import { get } from 'superagent';
import { getMongoRepository } from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { Comment } from '../comment/comment.model';
import { StatusEntity } from '../status/status.entity';
import { Status } from '../status/status.model';
import { insertOneByOne, Information } from '../util';
import { logger } from '../util/logger';

// insert, delete, update, select
// one, more

@Controller()
export class ManageController {

  private async fetchCommentsByStatusID(id: number): Promise<Comment[]> {
    logger.debug(`Fetch comments by status ID ${id}`);
    return get('https://api.weibo.com/2/comments/show.json?access_token=2.00Limi4D7kdwtC6aa1803987GSmw_D&page=1&count=200')
      .query({ id })
      .send()
      .then(response => response.body.comments)
      .catch(reason => (logger.warn(`Fetch comments by status ID ${id} failed: ${JSON.stringify(reason)}`), []));
  }

  async fetchCommentsByStatusIDsAndSaveFast(ids: number[]) {
    logger.debug(`Fast fetch comments by status IDs ${ids}`);
    const pending = ids.map(id => this.fetchCommentsByStatusID(id));
    const comments = (await Promise.all(pending)).flat();
    return insertOneByOne(comments, CommentEntity.insert.bind(CommentEntity));
  }

  async fetchCommentsByStatusIDsAndSaveSafe(ids: number[]) {
    logger.debug(`Save fetch comments by status IDs ${ids}`);
    const results = [];
    for (const id of ids) {
      const comments = await this.fetchCommentsByStatusID(id);
      results.push(await insertOneByOne(comments, CommentEntity.insert.bind(CommentEntity)));
    }
    return results;
  }

  async fetchCommentsForAllStatus() {
    logger.debug('Fetch comments for all statuses');
    const results = [];
    const cursor = getMongoRepository(StatusEntity).createCursor();
    logger.debug('Got cursor of database status');
    while (await cursor.hasNext()) {
      const status: Status = await cursor.next();
      if (status.comments_count === 0) {
        logger.debug(`Status ${status.id} has no comment`);
        continue;
      }
      logger.debug(`Got status: ${status.id}`);
      const comments = await this.fetchCommentsByStatusID(status.id);
      logger.debug(`Got comments: ${comments.length}`);
      const result = await insertOneByOne(comments, CommentEntity.insert.bind(CommentEntity));
      logger.debug(`Got result: ${result.success} / ${result.total}`);
      results.push(result);
    }
    return results;
  }

  async fetchCommentsForNewStatus() {
    logger.debug('Fetch comments for new statuses');
    const results = [];
    const cursor = getMongoRepository(StatusEntity).createCursor();
    logger.debug('Got cursor of database status');
    while (await cursor.hasNext()) {
      const status: Status = await cursor.next();
      if (status.comments_count === 0) {
        logger.debug(`Status ${status.id} has no comment`);
        continue;
      }
      if (await CommentEntity.findOne({ where: { 'status.id': status.id } })) {
        logger.debug(`Status ${status.id} already has comments`);
        continue;
      }
      logger.debug(`Got status: ${status.id}`);
      const comments = await this.fetchCommentsByStatusID(status.id);
      logger.debug(`Got comments: ${comments.length}`);
      const result = await insertOneByOne(comments, CommentEntity.insert.bind(CommentEntity));
      logger.debug(`Insert result: ${result.success} / ${result.total}`);
      results.push(result);
    }
    return results;
  }

  async fetchNewStatuses() {
    logger.debug('Fetch new statuses');
    const homeStatuses: Status[] = await get('https://api.weibo.com/2/statuses/home_timeline.json?&page=1&count=200')
      .query({ access_token: '2.00Limi4DwNCgfEd11accecebGWMpaD' })
      .send()
      .then(response => response.body.statuses);
    const publicStatuses: Status[] = await get('https://api.weibo.com/2/statuses/public_timeline.json?&page=1&count=200')
      .query({ access_token: '2.00Limi4DwNCgfEd11accecebGWMpaD' })
      .send()
      .then(response => response.body.statuses);
    const homeResult = await insertOneByOne(homeStatuses, StatusEntity.insert.bind(StatusEntity));
    const publicResult = await insertOneByOne(publicStatuses, StatusEntity.insert.bind(StatusEntity));
    const result: Information = {
      total: homeResult.total + publicResult.total,
      success: homeResult.success + publicResult.success,
      failed: homeResult.failed + publicResult.success,
      results: homeResult.results.concat(publicResult.results)
    };
    logger.debug(`Fetch new status: ${result.success} / ${result.total}`);

  }

}
