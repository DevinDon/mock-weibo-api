import { Controller } from '@rester/core';
import { getMongoRepository } from 'typeorm';
import { HOME_TIMELINE, PUBLIC_TIMELINE } from '../@constant';
import { User } from '../user/user.model';
import { StatusEntity } from './status.entity';
import { Status } from './status.model';

// insert, delete, update, select
// one, more

export interface PaginationParam {
  skip: number;
  take: number;
}

export interface ParamInsertStatus {
  comment: string;
  user: User;
}

@Controller()
export class StatusController {

  async insertStatus({ comment, user }: ParamInsertStatus) {
    const id = Date.now() + Math.random().toString().slice(2, 4);
    return StatusEntity
      .insert({
        id: +id,
        text: comment,
        user,
        created_at: new Date().toString(),
        source: '<a href="http://app.weibo.com/t/feed/6vtZb0" rel="nofollow">微博 weibo.com</a>',
        pic_urls: [],
        reposts_count: +Math.random().toString().slice(2, 5),
        attitudes_count: +Math.random().toString().slice(2, 5),
        comments_count: 0,
        idstr: id,
        textLength: comment.length,
        userType: -100
      });
  }

  async selectStatusesWithHomeTimeline({ skip, take: limit }: PaginationParam) {
    // 获取最新的微博
    const cursor = getMongoRepository(StatusEntity)
      .createCursor()
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(limit);
    const statuses: Status[] = [];
    for await (const status of cursor) {
      statuses.push(status);
    }
    return {
      ...HOME_TIMELINE,
      statuses,
      total_number: statuses.length
    };
  }

  async selectStatusesWithPublicTimeline({ skip, take: limit }: PaginationParam) {
    const cursor = getMongoRepository(StatusEntity)
      .aggregate([
        { $sample: { size: limit } },
        { $sort: { date: -1 } }
      ]);
    const statuses: Status[] = [];
    for await (const status of cursor) {
      statuses.push(status);
    }
    return {
      ...PUBLIC_TIMELINE,
      statuses,
      total_number: statuses.length
    };
  }

  async selectStatusByID(id: number) {
    return StatusEntity.findOne({ id });
  }

}
