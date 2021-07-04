import { BaseView, GET, getPagination, Handler, PathQuery, View } from '@rester/core';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { AuthHandler } from '../common/handlers';
import { AccessEntity } from './access.entity';

@View('accesses')
@Handler(AuthHandler)
export class AccessView extends BaseView {

  private repo!: MongoRepository<AccessEntity>;

  async init() {
    this.repo = getMongoRepository(AccessEntity);
  }

  @GET()
  async all(
    @PathQuery('from') from: string = '000000000000000000000000',
    @PathQuery('take') take: number = 10,
  ) {
    return getPagination(this.repo, { from, take });
  }

}
