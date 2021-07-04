import { logger } from '@rester/logger';
import { MongoEntity } from '@rester/orm';
import { Cursor } from 'mongodb';
import { STEP } from '../constants';

export function isValidURL(url: string) {
  const regexp = /http[s]?:\/\/.*/;
  return regexp.test(url);
}

export interface Detail {
  _id?: string;
  id?: number;
  failed?: boolean;
}

export interface Result {
  total: number;
  success: number;
  failed: number;
  details?: Detail[];
}

export interface InsertResult<E = any> {
  ok: number;
  writeErrors: {
    code: number;
    index: number;
    errmsg: string;
    op: E;
  }[];
  writeConcernErrors: any[];
  insertedIds: {
    index: number;
    _id: string;
  }[];
  nInserted: number;
  nUpserted: number;
  nMatched: number;
  nModified: number;
  nRemoved: number;
  upserted: any[];
}

export function randomSort() {
  return Math.random() - 0.5;
}

export async function insertOneByOne<T>(
  data: T[],
  insertFn: (...args: any) => Promise<any>,
): Promise<Result> {
  const details = await Promise.all<Detail>(
    data.map(
      (item: any) => insertFn(item)
        .then(() => ({ id: item['id'] }))
        .catch(() => ({ id: item['id'], failed: true })),
    ),
  );
  return {
    total: details.length,
    success: details.filter(result => !result['failed']).length,
    failed: details.filter(result => result['failed']).length,
    // details
  };
}

export async function insertMany<T, E extends MongoEntity<any>>(
  data: T[],
  entity: E,
): Promise<Result> {
  if (!data || data.length === 0) {
    return { total: 0, success: 0, failed: 0 };
  }
  return entity.collection
    .insertMany(data, { ordered: false })
    .then(result => {
      return {
        total: result.result.n,
        success: result.insertedCount,
        failed: 0,
      };
    })
    .catch(error => {
      try {
        const raw = error.result.result;
        return {
          total: raw.insertedIds.length,
          success: raw.nInserted,
          failed: raw.writeErrors.length,
        };
      } catch (error) {
        return {
          total: data.length,
          success: 0,
          failed: 0,
        };
      }
    });
}

export function concatResults(...results: Result[]): Result {
  if (results.length === 0) {
    return {
      total: 0,
      success: 0,
      failed: 0,
      // details: []
    };
  }
  if (results.length === 1) {
    return results[0];
  }
  return {
    total: results.map(result => result.total).reduce((prev, next) => prev + next),
    success: results.map(result => result.success).reduce((prev, next) => prev + next),
    failed: results.map(result => result.failed).reduce((prev, next) => prev + next),
    // details: results.map(result => result.details).flat()
  };
}

export const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

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
    const array = await cursor.toArray();
    // add skip
    skip += step;
    // logic
    await loop(array);
    // close cursor
    cursor.close();
    // all done
    logger.debug(`Cursor step done: ${skip}.`);
  }

}
