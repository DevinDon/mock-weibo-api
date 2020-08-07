import { GET, Inject, PathQuery, View } from '@rester/core';
import { PaginationParam, StatusController } from './status.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('weibo/2/statuses')
export class StatusView {

  @Inject()
  private controller!: StatusController;

  @GET('home_timeline.json')
  async getHomeTimeline(
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1
  ) {
    count = Math.min(200, +count);
    page = +page || 1;
    const param: PaginationParam = {
      skip: Math.max(0, page - 1) * count,
      take: count
    };
    return this.controller.selectStatusesWithHomeTimeline(param);
  }

  @GET('public_timeline.json')
  async getPublicTimeline(
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1
  ) {
    count = Math.min(200, +count);
    page = +page || 1;
    const param: PaginationParam = {
      skip: Math.max(0, page - 1) * count,
      take: count
    };
    return this.controller.selectStatusesWithPublicTimeline(param);
  }

}
