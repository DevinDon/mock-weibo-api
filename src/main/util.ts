export function randomSort() {
  return Math.random() - 0.5;
}

export async function insertOneByOne<T>(data: T[], fn: (...args: any) => Promise<any>) {
  const results = await Promise.all(
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
