import { BaseView, GET, Handler, HandlerZone, PathQuery, POST, RequestBody, requiredParams, View } from '@rester/core';
import { getEntity } from '@rester/orm';
import { UserAuthHandler } from '../common/handlers';
import { User } from '../user/user.model';
import { StatusEntity } from './status.entity';
import { PageParam } from './status.model';

// create, remove, modify, take, search
// one, more

@View('2/statuses')
export class StatusView extends BaseView {

  private entity: StatusEntity;

  async init() {
    this.entity = getEntity(StatusEntity);
  }

  @Handler(UserAuthHandler)
  @POST('create.json')
  async create(
    @HandlerZone() { user }: { user: User },
    @RequestBody() { comment }: { comment: string; } = {} as any,
  ) {
    requiredParams(comment);
    return this.entity.insertStatus({ comment: comment.slice(0, 140), user });
  }

  @GET('home_timeline.json')
  async getHomeTimeline(
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1,
  ) {
    count = Math.min(200, +count);
    page = +page || 1;
    const param: PageParam = {
      skip: Math.max(0, page - 1) * count,
      take: count,
    };
    return this.entity.selectStatusesWithHomeTimeline(param);
  }

  @GET('public_timeline.json')
  async getPublicTimeline(
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1,
  ) {
    count = Math.min(200, +count);
    page = +page || 1;
    const param: PageParam = {
      skip: Math.max(0, page - 1) * count,
      take: count,
    };
    return this.entity.selectStatusesWithPublicTimeline(param);
  }

  @GET('show.json')
  async show(
    @PathQuery('id') id: number,
  ) {
    requiredParams({ id });
    return this.entity.selectStatusByID(+id);
  }

}
