import { BaseView, GET, HTTP400Exception, Inject, PathQuery, View } from '@rester/core';
import { UserController } from './user.controller';

@View('2/users')
export class UserView extends BaseView {

  @Inject()
  private controller!: UserController;

  @GET('show.json')
  async show(
    @PathQuery('uid') id: number,
  ) {
    if (!id) { throw new HTTP400Exception('query param `id` is required'); }
    return this.controller.selectUserByID(+id);
  }

}
