import { GET, HTTP400Exception, Inject, PathQuery, View } from '@rester/core';
import { CommentController, SelectCommentsParam } from './comment.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('weibo/2/comments')
export class CommentView {

  @Inject()
  private controller!: CommentController;

  @GET('show.json')
  async showCommentsByStatusID(
    @PathQuery('id') id: number,
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1
  ) {
    if (!id) { throw new HTTP400Exception('param id is required'); }
    id = +id;
    count = +count || 20;
    page = +page || 1;
    const param: SelectCommentsParam = {
      id,
      skip: Math.max(0, page - 1) * count,
      take: count
    };
    return this.controller.selectCommentsByStatusID(param);
  }

}
