import { BaseView, cleanify, DELETE, ExistResponse, GET, PathVariable, POST, PUT, RequestBody, requiredAtLeastOneParam, requiredParams, View } from '@rester/core';
import { getEntity } from '@rester/orm';
import { CommentEntity } from './comment.entity';
import { CommentID, CommentInsertParams, CommentUpdateParams } from './comment.model';

// create, remove, modify, take, search
// one, more

@View('comment')
export class CommentView extends BaseView {

  private entity: CommentEntity;

  async init() {
    this.entity = getEntity(CommentEntity);
  }

  @POST()
  async create(
    @RequestBody() { author, content }: CommentInsertParams,
  ) {
    requiredParams({ content });
    return new ExistResponse({
      statusCode: 201,
      data: await this.entity.insertOne({
        author,
        content,
        like: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      message: 'Comment created failed.',
    });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: CommentID) {
    return this.entity.deleteOne(id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: CommentID,
    @RequestBody() { author, content }: CommentUpdateParams,
  ) {
    requiredAtLeastOneParam({ author, content });
    return new ExistResponse({
      data: await this.entity.updateOne(id, cleanify({ author, content, updateAt: new Date() })),
      message: 'Comment not found.',
    });
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: CommentID,
  ) {
    return new ExistResponse({
      data: await this.entity.findOne(id),
      message: 'Comment not found.',
    });
  }

}
