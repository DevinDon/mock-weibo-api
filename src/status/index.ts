import { ResterModule } from '@rester/core';
import { StatusEntity } from './status.entity';
import { StatusView } from './status.view';

export const StatusModule: ResterModule = {
  entities: [StatusEntity],
  views: [StatusView],
};
