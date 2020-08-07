import { logger } from '@iinfinity/logger';
import { Controller } from '@rester/core';
import { get } from 'superagent';
import { getMongoRepository } from 'typeorm';
import { StatusEntity } from '../status/status.entity';
import { Status } from '../status/status.model';
import { insertOneByOne } from '../@util';
import { CommentEntity } from './comment.entity';
import { Comment } from './comment.model';

// insert, delete, update, select
// one, more

@Controller()
export class CommentController {

}
