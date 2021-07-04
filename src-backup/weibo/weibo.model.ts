import { ObjectID } from 'typeorm';

export interface Weibo {

  _id: ObjectID;

  id: number;

  token: string;

}
