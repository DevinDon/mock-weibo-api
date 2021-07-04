import { BaseView, GET, PathQuery, requiredParams, View } from '@rester/core';
import { getEntity, Pagination } from '@rester/orm';
import { UserEntity } from './user.entity';

// create, remove, modify, take, search
// one, more

@View('2/users')
export class UsersView extends BaseView {

  private entity: UserEntity;

  async init() {
    this.entity = getEntity(UserEntity);
  }

  @GET()
  async take(
    @PathQuery('random') random: boolean = false,
    @PathQuery('from') from: string = '000000000000000000000000',
    @PathQuery('take') take: number = 10,
  ): Promise<Pagination<string>> {
    return random
      ? this.entity.getRandomList({ take })
      : this.entity.getPagination({ from, take });
  }

  @GET('show.json')
  async show(
    @PathQuery('uid') id: number,
  ) {
    requiredParams({ id });
    return this.entity.findOne(id);
  }

}
