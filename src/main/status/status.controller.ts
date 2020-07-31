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

  async insertToDatabase({ statuses }: { statuses: Status[] }) {
    const pending = statuses.map(
      status => StatusEntity
        .insert(status)
        .then(result => ({ id: status.id }))
        .catch(reason => ({ id: status.id, failed: true }))
    );
    return Promise.all(pending);
  }

}
