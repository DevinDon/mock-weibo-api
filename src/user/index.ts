import { ResterModule } from '@rester/core';
import { UserEntity } from './user.entity';
import { UsersView } from './users.view';

export const UserModule: ResterModule = {
  entities: [UserEntity],
  views: [UsersView],
};
