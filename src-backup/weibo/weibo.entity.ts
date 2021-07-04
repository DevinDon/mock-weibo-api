import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Weibo } from './weibo.model';

@Entity('weibo')
export class WeiboEntity extends BaseEntity implements Weibo {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  id!: number;

  @Column({ unique: true })
  token!: string;

}
