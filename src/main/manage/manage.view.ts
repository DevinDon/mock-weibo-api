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
  async fetchNewCommentsByStatusIDs(
    @RequestBody() { ids }: { ids: number[] }
  ) {
    if (!ids || !ids.length) { throw new HTTP400Exception('request body ids is required'); }
    ids = ids.map(id => +id).filter(id => id);
    return this.controller.fetchCommentsByStatusIDsAndSaveSafe(ids);
  }

  @PUT('comment/all')
  async fetchNewCommentsForAllStatuses() {
    return this.controller.fetchNewCommentsForAllStatus();
  }

}
