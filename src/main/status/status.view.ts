import { GET, Inject, PathVariable, POST, RequestBody, View } from '@rester/core';
import { StatusController } from './status.controller';

// add, remove, modify, find(condition), get(random)
// one, more

@View('status')
export class StatusView {

  @Inject()
  private controller!: StatusController;

  @GET('{{id}}')
  async getOneByID(
    @PathVariable('id') id: number
  ) {
    return this.controller.selectOneByID(+id);
  }

  @POST('insert')
  async insert(
    @RequestBody() body: string
  ) {
    const statuses = JSON.parse(body).statuses;
    return this.controller.insertToDatabase({ statuses });
  }

}
