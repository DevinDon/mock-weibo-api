import { BaseView, GET, Handler, HandlerZone, HTTP400Exception, Inject, PathQuery, POST, RequestBody, View } from '@rester/core';
import { AuthHandler } from '../common/handlers';
import { User } from '../users/user.model';
import { CommentController, SelectCommentsParam } from './comment.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('2/comments')
export class CommentView extends BaseView {

  @Inject()
  private controller!: CommentController;

  @GET('show.json')
  async showCommentsByStatusID(
    @PathQuery('id') id: number,
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1,
  ) {
    if (!id) { throw new HTTP400Exception('param id is required'); }
    id = +id;
    count = +count || 20;
    page = +page || 1;
    const param: SelectCommentsParam = {
      id,
      skip: Math.max(0, page - 1) * count,
      take: count,
    };
    return this.controller.selectCommentsByStatusID(param);
  }

  @Handler(AuthHandler)
  @POST('create.json')
  async create(
    @HandlerZone() { user }: { user: User },
    @RequestBody() { id, comment }: { id: number; comment: string; } = {} as any,
  ) {
    if (!id) { throw new HTTP400Exception('request body field: id is required'); }
    if (!comment) { throw new HTTP400Exception('request body field: comment is required'); }
    return this.controller.insertCommentByStatusID({ id: +id, comment: comment.slice(0, 140), user });
  }

  @Handler(AuthHandler)
  @POST('reply.json')
  async reply(
    @HandlerZone() { user }: { user: User },
    @RequestBody() { id, cid, comment }: { id: number; cid: number; comment: string; } = {} as any,
  ) {
    if (!id) { throw new HTTP400Exception('param id is required'); }
    if (!cid) { throw new HTTP400Exception('param cid is required'); }
    if (!comment) { throw new HTTP400Exception('param id is required'); }
    return this.controller.insertCommentByCommentID({
      id: +id,
      cid: +cid,
      comment: encodeURIComponent(comment.slice(0, 140)),
      user,
    });
  }

  @Handler(AuthHandler)
  @POST('destroy.json')
  async destroy(
    @HandlerZone() { user }: { user: User },
    @RequestBody() { cid }: { cid: number } = {} as any,
  ) {
    if (!cid) { throw new HTTP400Exception('param cid is required'); }
    return this.controller.deleteCommentByCommentID({ cid: +cid, user });
  }

}
