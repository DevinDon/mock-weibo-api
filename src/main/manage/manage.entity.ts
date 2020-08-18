import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Manage } from './manage.model';

@Entity('manage')
export class ManageEntity extends BaseEntity implements Manage {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ nullable: true })
  content?: string;

}
