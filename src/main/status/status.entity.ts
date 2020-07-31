import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Status } from './status.model';

@Entity('status')
export class StatusEntity extends BaseEntity implements Status {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  id!: number;

  @Column({ nullable: true })
  content?: string;

}
