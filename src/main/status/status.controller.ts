import { Controller } from '@rester/core';
import { StatusEntity } from './status.entity';
import { Status } from './status.model';

// insert, delete, update, select
// one, more

@Controller()
export class StatusController {

  async selectOneByID(id: Status['id']) {
    return StatusEntity.findOne(id);
  }

  async insertToDatabase({ statuses }: any) {
    return StatusEntity.insert(statuses);
  }

}
