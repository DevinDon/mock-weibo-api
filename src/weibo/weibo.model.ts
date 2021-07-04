import { ObjectID } from 'mongodb';

export interface Weibo {

  _id: ObjectID;

  id: number;

  token: string;

}
