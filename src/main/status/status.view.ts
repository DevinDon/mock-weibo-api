import { BaseView, GET, Handler, HandlerZone, HTTP400Exception, Inject, PathQuery, POST, RequestBody, View } from '@rester/core';
import { AuthHandler } from '../common/handlers';
import { User } from '../users/user.model';
import { PaginationParam, StatusController } from './status.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('2/statuses')
export class StatusView extends BaseView {

  @Inject()
  private controller!: StatusController;

  @Handler(AuthHandler)
  @POST('create.json')
  async create(
    @HandlerZone() { user }: { user: User },
    @RequestBody() { comment }: { comment: string; } = {} as any,
  ) {
    if (!comment) { throw new HTTP400Exception('request body field: comment is required'); }
    return this.controller.insertStatus({ comment: comment.slice(0, 140), user });
  }

  @GET('home_timeline.json')
  async getHomeTimeline(
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1,
  ) {
    count = Math.min(200, +count);
    page = +page || 1;
    const param: PaginationParam = {
      skip: Math.max(0, page - 1) * count,
      take: count,
    };
    return this.controller.selectStatusesWithHomeTimeline(param);
  }

  @GET('public_timeline.json')
  async getPublicTimeline(
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1,
  ) {
    count = Math.min(200, +count);
    page = +page || 1;
    const param: PaginationParam = {
      skip: Math.max(0, page - 1) * count,
      take: count,
    };
    return this.controller.selectStatusesWithPublicTimeline(param);
  }

  @GET('show.json')
  async show(
    @PathQuery('id') id: number,
  ) {
    if (!id) { throw new HTTP400Exception('query param `id` is required'); }
    return this.controller.selectStatusByID(+id);
  }

}
