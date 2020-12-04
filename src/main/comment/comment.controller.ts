import { Controller } from '@rester/core';
import { getMongoRepository } from 'typeorm';
import { SHOW_COMMENTS } from '../constants';
import { StatusEntity } from '../status/status.entity';
import { User } from '../users/user.model';
import { CommentEntity } from './comment.entity';
import { Comment } from './comment.model';

// insert, delete, update, select
// one, more

export interface SelectCommentsParam {
  id: number;
  skip: number;
  take: number;
}

export interface InsertCommentForStatusParam {
  id: number;
  comment: string;
  user: User;
}

export interface InsertCommentForCommentParam {
  id: number;
  cid: number;
  comment: string;
  user: User;
}

export interface DeleteCommentParam {
  cid: number;
  user: User;
}

@Controller()
export class CommentController {

  async selectCommentsByStatusID({ id, skip, take }: SelectCommentsParam) {
    // 返回最新的评论
    const comments: Comment[] = await getMongoRepository(CommentEntity)
      .createCursor({ 'status.id': id })
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(take)
      .toArray();
    return {
      ...SHOW_COMMENTS,
      comments,
      status: await StatusEntity.findOne({ id }),
      total_number: comments.length
    };
  }

  async insertCommentByStatusID({ id, comment, user }: InsertCommentForStatusParam) {
    const status = await StatusEntity.findOne({ id });
    if (!status) { return { status: `status ${id} is not exist` }; }
    const newComment: Comment = {
      id: Date.now(),
      created_at: new Date().toString(),
      text: comment,
      user,
      status: status as any
    } as any;
    // insert comment
    await CommentEntity.insert(newComment);
    // update count of status
    await getMongoRepository(StatusEntity).updateOne({ id }, { $inc: { comments_count: 1 } });
    return newComment;
  }

  async insertCommentByCommentID({ id, cid, comment, user }: InsertCommentForCommentParam) {
    const status = await StatusEntity.findOne({ id });
    if (!status) { return { status: `status ${id} is not exist` }; }
    const replyComment = await CommentEntity.findOne(
      { id: cid },
      { select: ['_id', 'id', 'content', 'created_at', 'text', 'user'] }
    );
    if (!replyComment) { return { status: `comment ${cid} is not exist` }; }
    const newComment: Comment = {
      id: +`${Date.now()}${Math.random().toString().slice(2, 6)}`,
      created_at: new Date().toString(),
      text: comment,
      reply_comment: replyComment,
      user,
      status: status as any
    } as any;
    // insert comment
    await CommentEntity.insert(newComment);
    // update count of status
    await getMongoRepository(StatusEntity).updateOne({ id }, { $inc: { comments_count: 1 } });
    return newComment;
  }

  async deleteCommentByCommentID({ cid, user }: DeleteCommentParam) {
    const comment = await CommentEntity.findOne({
      where: {
        id: cid,
        'user.id': user.id
      }
    });
    if (!comment) {
      return { status: `comment ${cid} is not exist` };
    } else {
      const result = comment.remove();
      // update count of status
      await getMongoRepository(StatusEntity).updateOne({ id: comment.status.id }, { $inc: { comments_count: -1 } });
      return result;
    }
  }

}
