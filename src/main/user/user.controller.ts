import { Controller } from '@rester/core';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {

  async selectUserByID(id: number) {
    return UserEntity.findOne({ id });
  }

}
