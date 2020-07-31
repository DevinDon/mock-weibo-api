import { GET, HTTP400Exception, Inject, PathVariable, PUT, View, PathQuery } from '@rester/core';
import { CommentController } from './comment.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('comment')
export class CommentView {

  @Inject()
  private controller!: CommentController;

  @GET('show.json')
  async getOneByID(
    @PathQuery('id') id: number
  ) {
    if (!id) { throw new HTTP400Exception('param id is required'); }
    return this.controller.selectOneByStatusID(+id);
  }

  @PUT('update/{{id}}')
  async updateByID(
    @PathVariable('id') id: number
  ) {
    if (!id) {
      throw new HTTP400Exception('path variable id is required.');
    }
    id = +id;
    return this.controller.updateByID({ id });
  }

  @PUT('update')
  async update() {
    return this.controller.updateAll();
  }

}
