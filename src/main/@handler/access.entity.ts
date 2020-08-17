import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('access')
export class AccessEntity extends BaseEntity {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  date!: Date;

  @Column()
  address!: string;

  @Column()
  url!: string;

  @Column({ default: '' })
  path!: string;

  @Column({ default: {} })
  query!: { [index: string]: string };

  @Column()
  headers!: { [index: string]: string }[];

  @Column()
  statusCode!: number;

  @Column()
  statusMessage?: string;

}
