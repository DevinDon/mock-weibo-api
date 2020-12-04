import { BaseEntity, Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import { User } from '../users/user.model';
import { Comment, Status } from './comment.model';

@Entity('comment')
export class CommentEntity extends BaseEntity implements Comment {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  @Index({ unique: true })
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

  @Column()
  @Index()
  status_id!: number;

  @Column()
  readtimetype!: string;

}
