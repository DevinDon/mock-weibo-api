import { BaseView, GET, Handler, PathQuery, View } from '@rester/core';
import { getEntity } from '@rester/orm';
import { UserAuthHandler } from '../common/handlers';
import { AccessEntity } from './access.entity';

@View('accesses')
@Handler(UserAuthHandler)
export class AccessView extends BaseView {

  private entity: AccessEntity;

  async init() {
    this.entity = getEntity(AccessEntity);
  }

  @GET()
  async all(
    @PathQuery('from') from: string = '000000000000000000000000',
    @PathQuery('take') take: number = 10,
  ) {
    return this.entity.getPagination({ from, take });
  }

}
