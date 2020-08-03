import { Controller } from '@rester/core';
import { getMongoRepository } from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { Comment } from '../comment/comment.model';
import { StatusEntity } from '../status/status.entity';
import { Status } from '../status/status.model';
import { UserEntity } from './user.entity';
import { logger } from '@iinfinity/logger';

@Controller()
export class UserController {

  async updateAll() {

    const results = [];

    const statusCursor = getMongoRepository(StatusEntity).createCursor();
    while (await statusCursor.hasNext()) {
      const status: Status = await statusCursor.next();
      const result = await UserEntity.insert(status.user)
        .then(() => ({ id: status.user.id }))
        .catch(() => ({ id: status.user.id, failed: true }));
      results.push(result);
      logger.debug(`User from status: ${JSON.stringify(result)}`);
    }

    const commentCursor = getMongoRepository(CommentEntity).createCursor();
    while (await commentCursor.hasNext()) {
      const comment: Comment = await commentCursor.next();
      const result = await UserEntity.insert(comment.user)
        .then(() => ({ id: comment.user.id }))
        .catch(() => ({ id: comment.user.id, failed: true }));
      results.push(result);
      logger.debug(`User from comment: ${JSON.stringify(result)}`);
    }

    return {
      total: results.length,
      failed: results.filter(result => result['failed']).length,
      results
    };

  }

}
