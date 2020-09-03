import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, Index } from 'typeorm';
import { Tinyurl } from './tinyurl.model';

@Entity('tinyurl')
export class TinyurlEntity extends BaseEntity implements Tinyurl {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ unique: true })
  @Index()
  short!: string;

  @Column()
  @Index()
  origin!: string;

  @Column()
  date!: Date;

}
