import { Controller } from '@rester/core';
import { Motto } from './motto.model';
import { MottoEntity } from './motto.entity';

// insert, delete, update, select
// one, more

@Controller()
export class MottoController {

  async insertOne(motto: Pick<Motto, 'author' | 'content' | 'date'>) {
    const id = await MottoEntity
      .insert(motto)
      .then(result => result.identifiers[0]);
    return MottoEntity.findOne(id);
  }

  async deleteOneByID(id: Motto['id']) {
    await MottoEntity.delete(id);
    return [id];
  }

  async updateOne(id: Motto['id'], motto: Pick<Motto, 'author' | 'content'>) {
    await MottoEntity.update(id, motto);
    return MottoEntity.findOne(id);
  }

  async updateOneWithLikeByID(id: Motto['id']) {
    await MottoEntity.createQueryBuilder()
      .update()
      .set({ like: () => '"like" + 1' })
      .where('id = :id', { id })
      .execute();
    return MottoEntity.findOne(id, { select: ['like'] });
  }

  async selectOneByRandom() {
    return MottoEntity.createQueryBuilder()
      .select()
      .orderBy('RANDOM()')
      .take(1)
      .getOne();
  }

  async selectOneByID(id: Motto['id']) {
    return MottoEntity.findOne(id);
  }

  async selectMoreByRandom(length: number) {
    return MottoEntity.createQueryBuilder()
      .select()
      .orderBy('RANDOM()')
      .take(length)
      .getMany();
  }

}
