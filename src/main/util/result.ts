export interface Detail {
  id: number;
  failed?: boolean;
}

export interface Result {
  total: number;
  success: number;
  failed: number;
  details: Detail[];
}

export function randomSort() {
  return Math.random() - 0.5;
}

export async function insertOneByOne<T>(
  data: T[],
  fn: (...args: any) => Promise<any>
): Promise<Result> {
  const details = await Promise.all<Detail>(
    data.map(
      item => fn(item)
        .then(() => ({ id: item['id'] }))
        .catch(() => ({ id: item['id'], failed: true }))
    )
  );
  return {
    total: details.length,
    success: details.filter(result => !result['failed']).length,
    failed: details.filter(result => result['failed']).length,
    details: details
  };
}

export function concatResult(...results: Result[]): Result {
  return {
    total: results.map(result => result.total).reduce((prev, next) => prev + next),
    success: results.map(result => result.success).reduce((prev, next) => prev + next),
    failed: results.map(result => result.failed).reduce((prev, next) => prev + next),
    details: results.map(result => result.details).flat()
  };
}
