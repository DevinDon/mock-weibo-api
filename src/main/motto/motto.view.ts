import { DELETE, GET, Inject, PathVariable, POST, PUT, RequestBody, View } from '@rester/core';
import { MottoController } from './motto.controller';
import { Motto } from './motto.model';

// add, remove, modify, find(condition), get(random)
// one, more

@View('motto')
export class MottoView {

  @Inject()
  private controller!: MottoController;

  @POST()
  async addOne(
    @RequestBody() motto: Motto
  ) {
    const insert: Pick<Motto, 'author' | 'content' | 'date'> = {
      author: motto.author,
      content: motto.content,
      date: Date.now()
    };
    return this.controller.insertOne(insert);
  }

  @POST('{{id}}')
  async likeOne(
    @PathVariable('id') id: number
  ) {
    return this.controller.updateOneWithLikeByID(+id);
  }

  @DELETE('{{id}}')
  async removeOne(@PathVariable('id') id: number) {
    return this.controller.deleteOneByID(+id);
  }

  @PUT('{{id}}')
  async modifyOne(
    @PathVariable('id') id: number,
    @RequestBody() motto: Motto
  ) {
    const update: Pick<Motto, 'author' | 'content'> = {
      author: motto.author,
      content: motto.content
    };
    return this.controller.updateOne(+id, update);
  }

  @GET()
  async getOne() {
    return this.controller.selectOneByRandom();
  }

  @GET('{{id}}')
  async getOneByID(
    @PathVariable('id') id: number
  ) {
    return this.controller.selectOneByID(+id);
  }

  @GET('more/{{length}}')
  async getMore(
    @PathVariable('length') length: number
  ) {
    return this.controller.selectMoreByRandom(+length);
  }

}
