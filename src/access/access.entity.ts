import { Column, Entity, MongoEntity, ObjectID } from '@rester/orm';
import { IncomingHttpHeaders } from 'http';
import { Access } from './access.model';

@Entity({ name: 'access' })
export class AccessEntity extends MongoEntity<Access> implements Access {

  @Column()
  _id: ObjectID;

  @Column()
  method: string;

  @Column()
  path: string;

  @Column()
  query?: string;

  @Column()
  headers: IncomingHttpHeaders;

  @Column()
  timestamp: Date;

  @Column()
  ips: string[];

  @Column()
  version: string;

  @Column()
  statusCode: number;

  @Column()
  statusMessage: string;

  @Column()
  length: number;

}
