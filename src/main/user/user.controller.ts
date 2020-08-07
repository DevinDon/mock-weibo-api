import { logger } from '@iinfinity/logger';
import { Controller } from '@rester/core';
import { getMongoRepository } from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { Comment } from '../comment/comment.model';
import { StatusEntity } from '../status/status.entity';
import { Status } from '../status/status.model';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {

}
