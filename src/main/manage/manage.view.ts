import { DELETE, GET, Inject, PathVariable, POST, PUT, RequestBody, View, HTTP400Exception } from '@rester/core';
import { ManageController } from './manage.controller';
import { Manage } from './manage.model';

// add, remove, modify, find(condition), get(random)
// one, more

@View('weibo/manage')
export class ManageView {

  private process = {
    all: false,
    new: false
  };

  @Inject()
  private controller!: ManageController;

  @PUT('comment')
  async fetchCommentsByStatusIDs(
    @RequestBody() { ids }: { ids: number[] }
  ) {
    if (!ids || !ids.length) { throw new HTTP400Exception('request body ids is required'); }
    ids = ids.map(id => +id).filter(id => id);
    return this.controller.fetchCommentsByStatusIDsAndSaveSafe(ids);
  }

  @PUT('comment/all')
  async fetchCommentsForAllStatuses() {
    if (this.process.all) {
      return { processing: true };
    } else {
      this.process.all = true;
      return this.controller.fetchCommentsForAllStatus().then(results => (this.process.all = false) || results);
    }
  }

  @PUT('comment/new')
  async fetchCommentsForNewStatuses() {
    if (this.process.new) {
      return { processing: true };
    } else {
      this.process.new = true;
      return this.controller.fetchCommentsForNewStatus().then(results => (this.process.new = false) || results);
    }
  }

}
