import { Column, Entity, getEntity, MongoEntity, ObjectID, PaginationParam } from '@rester/orm';
import { SHOW_COMMENTS } from '../common/constants';
import { StatusEntity } from '../status/status.entity';
import { User } from '../user/user.model';
import { Comment, DeleteCommentParam, InsertCommentForCommentParam, InsertCommentForStatusParam, SelectCommentsParam, Status } from './comment.model';

@Entity({ name: 'comment' })
export class CommentEntity extends MongoEntity<Comment> implements Comment {

  @Column()
  _id: ObjectID;

  @Column({ index: true, unique: true })
  id!: number;

  @Column()
  content?: string | undefined;

  @Column()
  created_at!: string;

  @Column()
  rootid!: any;

  @Column()
  rootidstr!: string;

  @Column()
  floor_number!: number;

  @Column()
  text!: string;

  @Column()
  disable_reply!: number;

  @Column()
  user!: User;

  @Column()
  mid!: string;

  @Column()
  idstr!: string;

  @Column()
  status!: Status;

  @Column({ index: true })
  status_id!: number;

  @Column()
  readtimetype!: string;

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  getStatusEntity(): StatusEntity {
    return getEntity(StatusEntity);
  }

  async selectCommentsByStatusID({ id, skip, take }: SelectCommentsParam) {
    // 返回最新的评论
    const comments: Comment[] = await this.collection.aggregate()
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(take)
      .toArray();
    return {
      ...SHOW_COMMENTS,
      comments,
      status: await this.getStatusEntity().collection.findOne({ id }),
      total_number: comments.length,
    };
  }

  async insertCommentByStatusID({ id, comment, user }: InsertCommentForStatusParam) {
    const status = await this.getStatusEntity().collection.findOne({ id });
    if (!status) { return { status: `status ${id} is not exist` }; }
    const newComment: Comment = {
      id: Date.now(),
      created_at: new Date().toString(),
      text: comment,
      user,
      status: status as any,
    } as any;
    // insert comment
    await this.collection.insertOne(newComment);
    // update count of status comment
    await this.getStatusEntity().collection.updateOne({ id }, { $inc: { comments_count: 1 } });
    return newComment;
  }

  async insertCommentByCommentID({ id, cid, comment, user }: InsertCommentForCommentParam) {
    const status = await this.getStatusEntity().collection.findOne({ id });
    if (!status) { return { status: `status ${id} is not exist` }; }
    const replyComment = await this.collection.findOne(
      { id: cid },
      { projection: ['_id', 'id', 'content', 'created_at', 'text', 'user'] },
    );
    if (!replyComment) { return { status: `comment ${cid} is not exist` }; }
    const newComment: Comment = {
      id: +`${Date.now()}${Math.random().toString().slice(2, 6)}`,
      created_at: new Date().toString(),
      text: comment,
      reply_comment: replyComment,
      user,
      status: status as any,
    } as any;
    // insert comment
    await this.collection.insertOne(newComment);
    // update count of status
    await this.getStatusEntity().collection.updateOne({ id }, { $inc: { comments_count: 1 } });
    return newComment;
  }

  async deleteCommentByCommentID({ cid, user }: DeleteCommentParam) {
    const comment = await this.collection.findOne({
      where: {
        id: cid,
        'user.id': user.id,
      },
    });
    if (!comment) {
      return { status: `comment ${cid} is not exist` };
    } else {
      const result = this.collection.deleteOne({ id: cid });
      // update count of status
      await this.getStatusEntity().collection.updateOne({ id: comment.status.id }, { $inc: { comments_count: -1 } });
      return result;
    }
  }

}

export type CommentCollection = CommentEntity['collection'];
