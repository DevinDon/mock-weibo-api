import { ObjectID } from 'typeorm';

export interface Status {

  _id: ObjectID;

  id: number;

  content?: string;

}
