import { getMongoRepository } from 'typeorm';

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
  insertFn: (...args: any) => Promise<any>
): Promise<Result> {
  const details = await Promise.all<Detail>(
    data.map(
      item => insertFn(item)
        .then(() => ({ id: item['id'] }))
        .catch(() => ({ id: item['id'], failed: true }))
    )
  );
  return {
    total: details.length,
    success: details.filter(result => !result['failed']).length,
    failed: details.filter(result => result['failed']).length,
    // details
  };
}

export async function insertMany<T, E>(
  data: T[],
  entity: E
): Promise<Result> {
  const result: any = await getMongoRepository(entity as any)
    .bulkWrite([{ insertMany: data }], { ordered: false })
    .then(r => r.result)
    .catch(error => error.result?.result);
  return result
    ? {
      total: result.insertedIds.length,
      success: result.nInserted,
      failed: result.writeErrors.length,
      // details: result.insertedIds
    }
    : {
      total: 0,
      success: 0,
      failed: 0,
      // details: []
    };
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
