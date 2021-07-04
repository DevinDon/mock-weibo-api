import { ResterModule } from '@rester/core';
import { CommentEntity } from './comment.entity';
import { CommentsView } from './comments.view';

export const CommentModule: ResterModule = {
  entities: [CommentEntity],
  views: [CommentsView],
};
