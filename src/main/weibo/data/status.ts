import { StatusEntity } from '../../status/status.entity';

export interface ParamGetStatuses {
  count: number;
  page: number;
}

export async function getStatuses({ count, page }: ParamGetStatuses) {
  return StatusEntity.find(
    {
      skip: (page - 1) * count,
      take: count
    }
  );
}
