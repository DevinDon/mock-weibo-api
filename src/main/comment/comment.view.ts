import { HTTP400Exception, Inject, PathVariable, PUT, View } from '@rester/core';
import { CommentController } from './comment.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('weibo/0/comment')
export class CommentView {

  @Inject()
  private controller!: CommentController;

}
