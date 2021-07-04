import { Column, Entity, MongoEntity, ObjectID, PaginationParam } from '@rester/orm';
import { Comment, CommentID } from './comment.model';

@Entity({ name: 'comment' })
export class CommentEntity extends MongoEntity<Comment> implements Comment {

  @Column()
  _id: ObjectID;

  @Column({ index: true })
  author?: string;

  @Column()
  content: string;

  @Column()
  like: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  async insertOne(comment: Comment) {
    const id = await this.collection
      .insertOne(comment)
      .then(result => result.insertedId);
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

  async deleteOne(id: CommentID) {
    await this.collection.deleteOne({ _id: new ObjectID(id) });
    return [id];
  }

  async updateOne(id: CommentID, comment: Partial<Comment>) {
    await this.collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: comment },
    );
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

  async findOne(id: CommentID) {
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

}

export type CommentCollection = CommentEntity['collection'];
