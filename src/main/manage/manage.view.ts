import { DELETE, GET, Inject, PathVariable, POST, PUT, RequestBody, View, HTTP400Exception } from '@rester/core';
import { ManageController } from './manage.controller';
import { Manage } from './manage.model';

// add, remove, modify, find(condition), get(random)
// one, more

@View('weibo/manage')
export class ManageView {

  @Inject()
  private controller!: ManageController;

  @PUT('comment')
  async fetchCommentsByStatusIDs(
    @RequestBody() { ids }: { ids: number[] } = { ids: [] }
  ) {
    if (!ids || !ids.length) { throw new HTTP400Exception('request body ids is required'); }
    ids = ids.map(id => +id).filter(id => id);
    return this.controller.fetchCommentsByStatusIDsAndSaveSafe(ids);
  }

  @PUT('comment/all')
  async fetchCommentsForAllStatuses() {
    return this.controller.fetchCommentsForAllStatus();
  }

  @PUT('comment/new')
  async fetchCommentsForNewStatuses() {
    return this.controller.fetchCommentsForNewStatus();
  }

  @PUT('status')
  async fetchNewStatusesByIDs(
    @RequestBody() { ids }: { ids: number[] } = { ids: [] }
  ) {
    if (!ids || !ids.length) { throw new HTTP400Exception('request body ids is required'); }
    return this.controller.fetchNewStatusesByIDs(ids);
  }

  @PUT('status/new')
  async fetchNewStatuses() {
    return this.controller.fetchNewStatuses();
  }

}
