import { IncomingHttpHeaders } from 'http';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('access')
export class AccessEntity extends BaseEntity {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  method!: string;

  @Column()
  path!: string;

  @Column({ nullable: true })
  query?: string;

  @Column()
  headers!: IncomingHttpHeaders;

  @Column()
  timestamp!: Date;

  @Column()
  ips!: string[];

  @Column()
  version!: string;

  @Column()
  statusCode!: number;

  @Column()
  statusMessage!: string;

  @Column()
  length!: number;

}
