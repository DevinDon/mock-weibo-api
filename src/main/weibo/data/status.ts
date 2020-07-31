import { StatusEntity } from '../../status/status.entity';

export interface ParamGetStatuses {
  skip: number;
  take: number;
}

export async function getStatuses(param: ParamGetStatuses) {
  return StatusEntity.find(param);
}
