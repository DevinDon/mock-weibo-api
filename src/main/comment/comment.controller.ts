import { Controller } from '@rester/core';
import { getMongoRepository } from 'typeorm';
import { SHOW_COMMENTS } from '../@constant';
import { StatusEntity } from '../status/status.entity';
import { User } from '../user/user.model';
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
    const result = await CommentEntity.insert(newComment);
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
    const result = await CommentEntity.insert(newComment);
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
    }
    return comment.remove();
  }

}
