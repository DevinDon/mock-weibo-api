import { Controller } from '@rester/core';
import { getMongoRepository } from 'typeorm';
import { HOME_TIMELINE, PUBLIC_TIMELINE } from '../@constant';
import { StatusEntity } from './status.entity';
import { Status } from './status.model';

// insert, delete, update, select
// one, more

export interface PaginationParam {
  skip: number;
  take: number;
}

@Controller()
export class StatusController {

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
      .createCursor()
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(limit);
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

}
