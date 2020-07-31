import { GET, Inject, PathVariable, POST, RequestBody, View } from '@rester/core';
import { StatusController } from './status.controller';
import { Status } from './status.model';

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
    @RequestBody() { statuses }: { statuses: Status[] }
  ) {
    statuses = statuses || [];
    const results = await this.controller.insertToDatabase({ statuses });
    return {
      total: results.length,
      success: results.filter(result => !Object.prototype.hasOwnProperty.call(result, 'failed')).length,
      results
    };
  }

}
