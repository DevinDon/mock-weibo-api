import { BaseView, GET, Handler, HandlerZone, PathQuery, POST, RequestBody, requiredParams, View } from '@rester/core';
import { getEntity, Pagination } from '@rester/orm';
import { UserAuthHandler } from '../common/handlers';
import { User } from '../user/user.model';
import { CommentEntity } from './comment.entity';
import { SelectCommentsParam } from './comment.model';

// create, remove, modify, take, search
// one, more

@View('2/comments')
export class CommentsView extends BaseView {

  private entity: CommentEntity;

  async init() {
    this.entity = getEntity(CommentEntity);
  }

  @GET()
  async take(
    @PathQuery('random') random: boolean = false,
    @PathQuery('from') from: string = '000000000000000000000000',
    @PathQuery('take') take: number = 10,
  ): Promise<Pagination<string>> {
    return random
      ? this.entity.getRandomList({ take })
      : this.entity.getPagination({ from, take });
  }

  @GET('show.json')
  async showCommentsByStatusID(
    @PathQuery('id') id: number,
    @PathQuery('count') count: number = 20,
    @PathQuery('page') page: number = 1,
  ) {
    requiredParams({ id });
    id = +id;
    count = +count || 20;
    page = +page || 1;
    const param: SelectCommentsParam = {
      id,
      skip: Math.max(0, page - 1) * count,
      take: count,
    };
    return this.entity.selectCommentsByStatusID(param);
  }

  @Handler(UserAuthHandler)
  @POST('create.json')
  async create(
    @HandlerZone() { user }: { user: User },
    @RequestBody() { id, comment }: { id: number; comment: string; } = {} as any,
  ) {
    requiredParams({ id, comment });
    return this.entity.insertCommentByStatusID({ id: +id, comment: comment.slice(0, 140), user });
  }

  @Handler(UserAuthHandler)
  @POST('reply.json')
  async reply(
    @HandlerZone() { user }: { user: User },
    @RequestBody() { id, cid, comment }: { id: number; cid: number; comment: string; } = {} as any,
  ) {
    requiredParams({ id, cid, comment });
    return this.entity.insertCommentByCommentID({
      id: +id,
      cid: +cid,
      comment: encodeURIComponent(comment.slice(0, 140)),
      user,
    });
  }

  @Handler(UserAuthHandler)
  @POST('destroy.json')
  async destroy(
    @HandlerZone() { user }: { user: User },
    @RequestBody() { cid }: { cid: number } = {} as any,
  ) {
    requiredParams({ cid });
    return this.entity.deleteCommentByCommentID({ cid: +cid, user });
  }

}
