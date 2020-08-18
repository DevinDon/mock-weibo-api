import { logger } from '@iinfinity/logger';
import { Cursor } from 'typeorm';
import { STEP } from '../@constant';

interface TraversingCursorWithStepParam<T = any, F = any> {
  createCursor: () => Cursor<T>;
  skip?: number;
  step?: number;
  loop: (cursor: Cursor<T>) => Promise<F>;
}

export async function traversingCursorWithStep({ createCursor, skip = 0, step = STEP, loop }: TraversingCursorWithStepParam) {

  /** count */
  const count = await createCursor().count(false);

  // if has more data
  while (skip <= count) {
    /** cursor skip & limit */
    const cursor = createCursor().skip(skip).limit(step);
    skip += step;
    // logic
    await loop(cursor);
    // close cursor
    cursor.close();
    // all done
    logger.info(`Cursor step done: ${skip}.`);
  }

}
