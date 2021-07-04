import { ResterModule } from '@rester/core';
import { CommentEntity } from './comment.entity';
import { CommentView } from './comment.view';
import { CommentsView } from './comments.view';

export const CommentModule: ResterModule = {
  entities: [CommentEntity],
  views: [CommentView, CommentsView],
};
