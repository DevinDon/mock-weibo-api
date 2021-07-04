import { BaseView, GET, HTTP400Exception, PathQuery, PUT, RequestBody, requiredParams, View } from '@rester/core';
import { getEntity } from '@rester/orm';
import { ManageEntity } from './manage.entity';

// create, remove, modify, take, search
// one, more

@View('manage')
export class ManageView extends BaseView {

  private entity: ManageEntity;

  async init() {
    this.entity = getEntity(ManageEntity);
  }

  @PUT('comment')
  async fetchCommentsByStatusIDs(
    @RequestBody() { ids }: { ids: number[] } = { ids: [] },
  ) {
    if (!ids || !ids.length) { throw new HTTP400Exception('request body ids is required'); }
    ids = ids.map(id => +id).filter(id => id);
    return this.entity.insertCommentsByStatusIDs(ids);
  }

  @PUT('comment/all')
  async fetchCommentsForAllStatuses() {
    return this.entity.insertCommentsForStatuses({ overwrite: true, reverse: false });
  }

  @PUT('comment/new')
  async fetchCommentsForNewStatuses() {
    return this.entity.insertCommentsForStatuses({ reverse: true });
  }

  @PUT('status')
  async fetchNewStatusesByIDs(
    @RequestBody() { ids }: { ids: number[] } = { ids: [] },
  ) {
    if (!ids || !ids.length) { throw new HTTP400Exception('request body ids is required'); }
    return this.entity.insertNewStatusesByIDs(ids);
  }

  @PUT('status/new')
  async fetchNewStatuses() {
    return this.entity.insertNewStatuses();
  }

  @PUT('user/all')
  async fetchAllUsersFromLocal() {
    return this.entity.insertAllUsers();
  }

  @PUT('access')
  async formatAccessLog() {
    return this.entity.updateFormatAccessLog();
  }

  @PUT('token')
  async updateAccessToken(
    @PathQuery('token') token: string,
  ) {
    requiredParams({ token });
    this.entity.token = token;
    return { token };
  }

  @GET('statistic')
  async statistic() {
    return this.entity.countStatistic();
  }

  @GET('test')
  async test() {
    return this.entity.test();
  }

}
