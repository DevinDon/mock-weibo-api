import { logger } from '@iinfinity/logger';
import { Cursor } from 'typeorm';
import { STEP } from '../constants';

interface ParamTraversingCursorWithStep<T = any, F = any> {
  createCursor: () => Cursor<T>;
  skip?: number;
  step?: number;
  loop: (cursor: Cursor<T>) => Promise<F>;
}

interface ParamTraversingCursorWithStepToArray<T = any, F = any> {
  createCursor: () => Cursor<T>;
  skip?: number;
  step?: number;
  loop: (array: T[]) => Promise<F>;
}

export async function traversingCursorWithStep<T = any, F = any>(
  { createCursor, skip = 0, step = STEP, loop }: ParamTraversingCursorWithStep<T, F>,
) {

  /** count */
  const count = await createCursor().count(false);

  // if has more data
  while (skip <= count) {
    /** cursor skip & limit */
    const cursor = createCursor().skip(skip).limit(step);
    // add skip
    skip += step;
    // logic
    await loop(cursor);
    // close cursor
    cursor.close();
    // all done
    logger.debug(`Cursor step done: ${skip}.`);
  }

}

export async function traversingCursorWithStepToArray<T = any, F = any>(
  { createCursor, skip = 0, step = STEP, loop }: ParamTraversingCursorWithStepToArray<T, F>,
) {

  /** count */
  const count = await createCursor().count(false);

  // if has more data
  while (skip <= count) {
    /** cursor skip & limit */
    const cursor = createCursor().skip(skip).limit(step);
    // add skip
    skip += step;
    // logic
    await loop(await cursor.toArray());
    // close cursor
    cursor.close();
    // all done
    logger.debug(`Cursor step done: ${skip}.`);
  }

}
