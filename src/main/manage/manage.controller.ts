import { delay } from '@iinfinity/delay';
import { Controller } from '@rester/core';
import { get } from 'superagent';
import { getMongoRepository } from 'typeorm';
import { URL } from 'url';
import { AccessEntity } from '../@handler/access.entity';
import { concatResults, insertMany, Result } from '../@util';
import { traversingCursorWithStep, traversingCursorWithStepToArray } from '../@util/cursor';
import { logger } from '../@util/logger';
import { CommentEntity } from '../comment/comment.entity';
import { Comment } from '../comment/comment.model';
import { StatusEntity } from '../status/status.entity';
import { Status } from '../status/status.model';
import { UserEntity } from '../user/user.entity';
import { WeiboEntity } from '../weibo/weibo.entity';

export interface ParamInsertCommentsForStatuses {
  slow?: boolean;
  overwrite?: boolean;
  reverse?: boolean;
}

// insert, delete, update, select
// one, more

@Controller()
export class ManageController {

  token: string = '2.00Limi4DwNCgfEd11accecebGWMpaD';

  private async fetchCommentsByStatusID(id: number): Promise<Comment[] | false> {
    logger.debug(`Fetch comments by status ID ${id}`);
    return get('https://api.weibo.com/2/comments/show.json')
      .query({ access_token: this.token })
      .query({ id })
      .send()
      .then(response => response.body.comments)
      .catch(reason => {
        logger.debug(`Fetch comments by status ID ${id} failed: ${JSON.stringify(reason)}`);
        return false;
      });
  }

  async insertCommentsByStatusIDs(ids: number[]) {
    logger.debug(`Save fetch comments by status IDs ${ids}`);
    const results: Result[] = [];
    for (const id of ids) {
      const comments = await this.fetchCommentsByStatusID(id);
      if (!comments) { continue; }
      results.push(await insertMany(comments, CommentEntity));
    }
    const result = concatResults(...results);
    logger.debug(`Insert result: ${result.success} / ${result.total}`);
    return result;
  }

  async insertCommentsForStatuses(
    {
      slow = false,
      overwrite = false,
      reverse = false
    }: ParamInsertCommentsForStatuses
  ) {
    logger.debug(`Fetch comments for ${overwrite ? 'all' : 'new'} statuses`);
    const ids = new Set<number>(
      (await getMongoRepository(CommentEntity)
        .createCursor()
        .project({ _id: false, 'status.id': true })
        .toArray()
      ).map(v => v.status.id)
    );
    const results: Result[] = [];
    await traversingCursorWithStepToArray<Status>({
      createCursor: () => getMongoRepository(StatusEntity).createCursor().project({ _id: false, id: true }).sort({ $natural: reverse ? -1 : 1 }),
      loop: async array => {
        for (let i = 0; i < array.length; i++) {

          /** target status */
          const status: Status = array[i];

          // status has no comment, continue
          if (status.comments_count === 0) {
            logger.debug(`Status ${status.id} has no comment`);
            continue;
          }

          // if not overwrite && status already has comments, continue
          if (!overwrite && ids.has(status.id)) {
            logger.debug(`Status ${status.id} already has comments`);
            continue;
          }
          logger.debug(`Got status: ${status.id}`);

          /** fetched comments */
          const comments = await this.fetchCommentsByStatusID(status.id);

          // weibo 403 limit, stop fetch, return
          if (comments === false) {
            logger.warn('Fetch failed, maybe 403 limit, stop fetch.');
            return;
          }

          // status has no comment but count is not 0, update it & continue
          if (comments.length === 0) {
            logger.debug('Comments length is 0, update status.');
            await StatusEntity.update({ id: status.id }, { comments_count: 0 });
            continue;
          }

          // insert to database
          logger.debug(`Got comments: ${comments.length}`);
          const result = await insertMany(comments, CommentEntity);
          logger.debug(`Insert result: ${result.success} / ${result.total}`);
          results.push(result);

          // slowly, random delay 5s +- 10s
          if (slow) {
            await delay(5 * 1000 + Math.random() * 10 * 1000);
          }
        }
      }
    });
    const result = concatResults(...results);
    logger.debug(`Insert result: ${result.success} / ${result.total}`);
    return result;
  }

  async insertNewStatuses() {
    logger.debug('Fetch new statuses');
    const status = {
      home: await get('https://api.weibo.com/2/statuses/home_timeline.json?&page=1&count=200')
        .query({ access_token: this.token })
        .send()
        .then(response => response.body.statuses),
      public: await get('https://api.weibo.com/2/statuses/public_timeline.json?&page=1&count=200')
        .query({ access_token: this.token })
        .send()
        .then(response => response.body.statuses)
    };
    const results = {
      home: await insertMany(status.home, StatusEntity),
      public: await insertMany(status.public, StatusEntity)
    };
    const result: Result = concatResults(results.home, results.public);
    logger.debug(`Fetch new status: ${result.success} / ${result.total}`);
    return result;
  }

  async insertNewStatusesByIDs(ids: number[]) {
    logger.debug(`Fetch statuses by IDs ${ids}`);
    const pending = ids.map(
      id => get('https://api.weibo.com/2/statuses/show.json')
        .query({ access_token: this.token })
        .query({ id })
        .send()
        .catch(reason => logger.debug(`Fetch status ${id} failed, ${JSON.stringify(reason)}`))
    );
    const statuses: Status[] = (await Promise.all(pending)).filter(status => status) as any;
    const result = await insertMany(statuses, StatusEntity);
    logger.debug(`Fetch new statuses: ${result.success} / ${result.total}`);
    return result;
  }

  async insertUsersFromComments() {
    logger.debug('Fetch users from comments');
    const results: Result[] = [];
    await traversingCursorWithStepToArray<Comment>({
      createCursor: () => getMongoRepository(CommentEntity).createCursor().project({ _id: false, user: true }).sort({ $natural: -1 }),
      loop: async array => {
        results.push(await insertMany(array.map(comment => comment.user), UserEntity));
      }
    });
    const result = concatResults(...results);
    logger.debug(`Fetch new users: ${result.success} / ${result.total}`);
    return result;
  }

  async insertUsersFromStatuses() {
    logger.debug('Fetch users from statuses');
    const results: Result[] = [];
    await traversingCursorWithStepToArray<Status>({
      createCursor: () => getMongoRepository(StatusEntity).createCursor().project({ _id: false, user: true }).sort({ $natural: -1 }),
      loop: async array => {
        results.push(await insertMany(array.map(status => status.user), UserEntity));
      }
    });
    const result = concatResults(...results);
    logger.debug(`Fetch new users: ${result.success} / ${result.total}`);
    return result;
  }

  async insertAllUsers() {
    const result = concatResults(await this.insertUsersFromComments(), await this.insertUsersFromStatuses());
    logger.debug(`Fetch all users: ${result.success} / ${result.total}`);
    return result;
  }

  async updateFormatAccessLog() {
    const result: { total: number, addresses: string[] } = { total: 0, addresses: [] };
    await traversingCursorWithStep({
      createCursor: () => getMongoRepository(AccessEntity).createCursor(),
      loop: async cursor => {
        while (await cursor.hasNext()) {
          const access: AccessEntity = await cursor.next();
          access.date = new Date(access.date || 0);
          const url = new URL('http://mock.don.red' + access.url);
          access.path = url.pathname;
          access.query = Object.fromEntries(url.searchParams.entries());
          AccessEntity.update({ _id: access._id }, access);
          logger.debug(`Access IP is ${access.address}`);
          result.addresses.push(access.address);
        }
      }
    });
    logger.info('Format all done.');
    result.total = result.addresses.length;
    return result;
  }

  async test() {
    const result = await insertMany(
      [
        { id: 123, token: 'test3' },
        { id: 123, token: 'test4' },
      ],
      WeiboEntity
    );
    logger.debug(result);
    return result;
  }

}
