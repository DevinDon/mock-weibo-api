import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('access')
export class AccessEntity extends BaseEntity {

  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  date!: Date;

  @Column()
  address!: string;

  @Column()
  url!: string;

  @Column()
  headers!: { [index: string]: string }[];

  @Column()
  statusCode!: number;

  @Column()
  statusMessage?: string;

}
