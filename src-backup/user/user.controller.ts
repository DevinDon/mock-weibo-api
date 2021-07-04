import { BaseController, Controller } from '@rester/core';
import { UserEntity } from './user.entity';

@Controller()
export class UserController extends BaseController {

  async selectUserByID(id: number) {
    return UserEntity.findOne({ id });
  }

}
