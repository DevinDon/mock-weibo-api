import { Inject, View, PUT } from '@rester/core';
import { UserController } from './user.controller';

@View('weibo/0/user')
export class UserView {

  @Inject()
  private controller!: UserController;

  @PUT('update')
  async updateAll() {
    return this.controller.updateAll();
  }

}
