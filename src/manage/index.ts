import { ResterModule } from '@rester/core';
import { ManageEntity } from './manage.entity';
import { ManageView } from './manage.view';

export const ManageModule: ResterModule = {
  entities: [ManageEntity],
  views: [ManageView],
};
