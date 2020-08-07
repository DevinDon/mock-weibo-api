export interface Result {
  id: number;
  failed?: true;
}

export interface Information {
  total: number;
  success: number;
  failed: number;
  results: Result[];
}

export function randomSort() {
  return Math.random() - 0.5;
}

export async function insertOneByOne<T>(
  data: T[],
  fn: (...args: any) => Promise<any>
): Promise<Information> {
  const results = await Promise.all<Result>(
    data.map(
      item => fn(item)
        .then(() => ({ id: item['id'] }))
        .catch(() => ({ id: item['id'], failed: true }))
    )
  );
  return {
    total: results.length,
    success: results.filter(result => !result['failed']).length,
    failed: results.filter(result => result['failed']).length,
    results
  };
}
