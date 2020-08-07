import { Controller } from '@rester/core';
import { getMongoRepository } from 'typeorm';
import { SHOW_COMMENTS } from '../@constant';
import { StatusEntity } from '../status/status.entity';
import { CommentEntity } from './comment.entity';
import { Comment } from './comment.model';

// insert, delete, update, select
// one, more

export interface SelectCommentsParam {
  id: number;
  skip: number;
  take: number;
}

@Controller()
export class CommentController {

  async selectCommentsByStatusID({ id, skip, take: limit }: SelectCommentsParam) {
    // 返回最新的评论
    const cursor = getMongoRepository(CommentEntity)
      .createCursor({ 'status.id': id })
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(limit);
    const comments: Comment[] = [];
    for await (const status of cursor) {
      comments.push(status);
    }
    const result = {
      ...SHOW_COMMENTS,
      comments,
      status: await StatusEntity.findOne({ id })
    };
    result.total_number = result.comments.length;
    return result;
  }

}
