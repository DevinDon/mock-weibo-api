import { GET, Inject, PathVariable, PUT, RequestBody, View } from '@rester/core';
import { StatusController } from './status.controller';
import { Status } from './status.model';

// add, remove, modify, find(condition), get(random)
// one, more

@View('weibo/0/status')
export class StatusView {

  @Inject()
  private controller!: StatusController;

  // @GET('{{id}}')
  // async getOneByID(
  //   @PathVariable('id') id: number
  // ) {
  //   return this.controller.selectOneByID(+id);
  // }

  @PUT('insert')
  async insert(
    @RequestBody() { statuses }: { statuses: Status[] }
  ) {
    statuses = statuses || [];
    return this.controller.insertToDatabase({ statuses });
  }

  @PUT('update')
  async update() {
    return this.controller.fetchNewStatuses();
  }

}
