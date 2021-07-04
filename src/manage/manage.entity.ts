import { logger, Logger } from '@rester/logger';
import { Column, Entity, getEntity, MongoEntity, ObjectID, PaginationParam } from '@rester/orm';
import { AggregationCursor } from 'mongodb';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { AccessEntity } from '../access/access.entity';
import { CommentEntity } from '../comment/comment.entity';
import { Comment } from '../comment/comment.model';
import { concatResults, insertMany, Result, sleep, traversingCursorWithStep } from '../common/utils';
import { StatusEntity } from '../status/status.entity';
import { Status } from '../status/status.model';
import { UserEntity } from '../user/user.entity';
import { Manage, ParamFetchCommentsResult, ParamInsertCommentsForStatuses, Statistic } from './manage.model';

@Entity({ name: 'manage' })
export class ManageEntity extends MongoEntity<Manage> implements Manage {

  @Column()
  _id: ObjectID;

  @Column()
  content?: string;

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  logger: Logger = logger;

  token: string = '';

  statistic: Statistic = {
    access: 0,
    user: 0,
    comment: 0,
    status: 0,
    update: 0,
  };

  private getStatusEntity(): StatusEntity {
    return getEntity(StatusEntity);
  }

  private getCommentEntity(): CommentEntity {
    return getEntity(CommentEntity);
  }

  private getUserEntity(): UserEntity {
    return getEntity(UserEntity);
  }

  private getAccessEntity(): AccessEntity {
    return getEntity(AccessEntity);
  }

  private async fetchCommentsByStatusID(id: number): Promise<Comment[] | false> {
    this.logger.debug(`Fetch comments by status ID ${id}`);
    return fetch(
      'https://api.weibo.com/2/comments/show.json'
      +
      new URLSearchParams({ access_token: this.token, id: `${id}` }),
    )
      .then(response => response.json())
      .then(body => body.comments)
      .catch((reason: any) => {
        this.logger.debug(`Fetch comments by status ID ${id} failed: ${JSON.stringify(reason)}`);
        return false;
      });
  }

  private async fetchAllCommentsByStatusID(id: number): Promise<ParamFetchCommentsResult> {
    this.logger.debug(`Fetch all comments by status ID ${id}`);
    const comments: Comment[] = [];
    let next = true;
    let result: Comment[] = [];
    for (let i = 1; i < 100; i++) {
      result = await fetch(
        'https://api.weibo.com/2/comments/show.json'
        +
        new URLSearchParams({ access_token: this.token, id: `${id}`, page: `${i}`, count: '200' }),
      )
        .then(response => response.json())
        .then(body => body.comments)
        .catch((reason: any) => {
          this.logger.debug(`Fetch comments by status ID ${id} failed: ${JSON.stringify(reason)}`);
          next = false;
          return [];
        }) || [];
      if (result.length === 0) {
        break;
      } else {
        comments.push(...result);
      }
    }
    return { comments: comments as any, next };
  }

  async insertCommentsByStatusIDs(ids: number[]) {
    this.logger.debug(`Save fetch comments by status IDs ${ids}`);
    const results: Result[] = [];
    for (const id of ids) {
      const comments = await this.fetchCommentsByStatusID(id);
      if (!comments) { continue; }
      results.push(await insertMany(comments, this.getCommentEntity()));
    }
    const result = concatResults(...results);
    this.logger.info(`Insert result: ${result.success} / ${result.total}`);
    return result;
  }

  async insertCommentsForStatuses(
    {
      slow = false,
      overwrite = false,
      reverse = false,
    }: ParamInsertCommentsForStatuses,
  ) {
    this.logger.debug(`Fetch comments for ${overwrite ? 'all' : 'new'} statuses`);
    const ids = (await this.getCommentEntity().collection
      .aggregate()
      .project({ _id: false, 'status.id': true })
      .map((v: Comment) => v?.status?.id)
      .filter((v: number | undefined) => v)
      .toArray()
    );
    const idset = new Set<number>(ids);
    const results: Result[] = [];
    await traversingCursorWithStepToArray<Status>({
      createCursor: () => this.getStatusEntity().collection
        .aggregate()
        .project({ _id: false, id: true, comments_count: true })
        .sort({ $natural: reverse ? -1 : 1 }),
      loop: async array => {
        for (let i = 0; i < array.length; i++) {

          /** target status */
          const status: Status = array[i];

          // status has no comment, continue
          if (status.comments_count === 0) {
            this.logger.debug(`Status ${status.id} has no comment`);
            continue;
          }

          // count of comments >= status.count
          if (ids.filter(id => id === status.id).length >= status.comments_count) {
            this.logger.debug('Count of comments is large to status.count');
            continue;
          }

          // if not overwrite && status already has comments, continue
          if (!overwrite && idset.has(status.id)) {
            this.logger.debug(`Status ${status.id} already has comments`);
            continue;
          }

          // got status
          this.logger.debug(`Got status: ${status.id}`);

          /** fetched comments */
          const { comments, next } = await this.fetchAllCommentsByStatusID(status.id);

          // status has no comment but count is not 0, update it & continue
          if (comments.length === 0) {
            this.logger.debug('Comments length is 0.');
          } else {
            // insert to database
            this.logger.debug(`Got comments: ${comments.length}`);
            const result = await insertMany(comments, this.getCommentEntity());
            this.logger.debug(`Insert result: ${result.success} / ${result.total}`);
            results.push(result);
          }

          // weibo 403 limit, stop fetch, return
          if (next === false) {
            this.logger.warn('Fetch failed, maybe 403 limit, stop fetch.');
            return;
          } else {
            // else update comments count
            // why count from db?
            // because some comments maybe delete from server but save on local
            const count = await this.getCommentEntity().collection.count({ 'status.id': status.id });
            this.logger.debug(`Update comments count ${status.id}: ${count}`);
            await this.getStatusEntity().collection.update({ id: status.id }, { comments_count: count });
          }

          // slowly, random delay 5s +- 10s
          if (slow) {
            await sleep(5 * 1000 + Math.random() * 10 * 1000);
          }
        }
      },
    });
    const result = concatResults(...results);
    this.logger.info(`Insert result: ${result.success} / ${result.total}`);
    return result;
  }

  async insertNewStatuses() {
    this.logger.debug('Fetch new statuses');
    const status = {
      home: await fetch('https://api.weibo.com/2/statuses/home_timeline.json?&page=1&count=200' + new URLSearchParams({ access_token: this.token }))
        .then(response => response.json())
        .then(response => response.statuses),
      public: await fetch('https://api.weibo.com/2/statuses/public_timeline.json?&page=1&count=200' + new URLSearchParams({ access_token: this.token }))
        .then(response => response.json())
        .then(response => response.statuses),
    };
    const results = {
      home: await insertMany(status.home, this.getStatusEntity()),
      public: await insertMany(status.public, this.getStatusEntity()),
    };
    const result: Result = concatResults(results.home, results.public);
    this.logger.info(`Fetch new status: ${result.success} / ${result.total}`);
    return result;
  }

  async insertNewStatusesByIDs(ids: number[]) {
    this.logger.debug(`Fetch statuses by IDs ${ids}`);
    const pending = ids.map(
      id => fetch('https://api.weibo.com/2/statuses/show.json?' + new URLSearchParams({ access_token: this.token, id: `${id}` }))
        .catch((reason: any) => this.logger.debug(`Fetch status ${id} failed, ${JSON.stringify(reason)}`)),
    );
    const statuses: Status[] = (await Promise.all(pending)).filter(status => status) as any;
    const result = await insertMany(statuses, this.getStatusEntity());
    this.logger.info(`Fetch new statuses: ${result.success} / ${result.total}`);
    return result;
  }

  async insertUsersFromComments() {
    this.logger.debug('Fetch users from comments');
    const results: Result[] = [];
    await traversingCursorWithStepToArray<Comment>({
      createCursor: () => this.getCommentEntity().collection
        .aggregate()
        .project({ _id: false, user: true })
        .map((comment: Comment) => comment.user) as any,
      loop: async array => {
        results.push(await insertMany(array, this.getUserEntity()));
      },
    });
    const result = concatResults(...results);
    this.logger.debug(`Fetch new users: ${result.success} / ${result.total}`);
    return result;
  }

  async insertUsersFromStatuses() {
    this.logger.debug('Fetch users from statuses');
    const results: Result[] = [];
    await traversingCursorWithStepToArray<Status>({
      createCursor: () => this.getStatusEntity().collection
        .aggregate()
        .project({ _id: false, user: true })
        .map((status: Status) => status.user) as any,
      loop: async array => {
        results.push(await insertMany(array, this.getUserEntity()));
      },
    });
    const result = concatResults(...results);
    this.logger.debug(`Fetch new users: ${result.success} / ${result.total}`);
    return result;
  }

  async insertAllUsers() {
    const result = concatResults(await this.insertUsersFromComments(), await this.insertUsersFromStatuses());
    this.logger.info(`Fetch all users: ${result.success} / ${result.total}`);
    return result;
  }

  async updateFormatAccessLog() {
    const result: { total: number, addresses: string[] } = { total: 0, addresses: [] };
    await traversingCursorWithStep({
      createCursor: () => this.getAccessEntity().collection.aggregate().sort({ _id: -1 }),
      loop: async cursor => {
        while (await cursor.hasNext()) {
          const access: AccessEntity = await cursor.next() as AccessEntity;
          this.logger.debug(`Access IP is ${access.ips.join(', ')}`);
        }
      },
    });
    this.logger.info('Format all done.');
    result.total = result.addresses.length;
    return result;
  }

  async countStatistic() {
    // 30s / update
    if (Date.now() - this.statistic.update > 30 * 1000) {
      this.logger.debug('Update statistic');
      this.statistic = {
        access: await this.getAccessEntity().collection.count(),
        user: await this.getUserEntity().collection.count(),
        comment: await this.getCommentEntity().collection.count(),
        status: await this.getStatusEntity().collection.count(),
        update: Date.now(),
      };
    }
    return this.statistic;
  }

  async test() {
    return 'ok';
  }

}

export type ManageCollection = ManageEntity['collection'];
function traversingCursorWithStepToArray<T>(arg0: { createCursor: () => AggregationCursor<Status>; loop: (array: any) => Promise<void>; }) {
  throw new Error('Function not implemented.');
}
