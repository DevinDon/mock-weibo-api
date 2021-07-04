export interface Manage {

  content?: string;

}

export interface ParamInsertCommentsForStatuses {
  slow?: boolean;
  overwrite?: boolean;
  reverse?: boolean;
}

export interface ParamFetchCommentsResult {
  comments: Comment[];
  next: boolean;
}

export interface Statistic {
  access: number;
  user: number;
  comment: number;
  status: number;
  update: number;
}
