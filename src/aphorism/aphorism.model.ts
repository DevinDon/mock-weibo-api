export interface Aphorism {

  author?: string;

  content: string;

  like: number;

  createdAt: Date;

  updatedAt: Date;

}

export type AphorismID = string;

export type AphorismInsertParams = Pick<Aphorism, 'content'> & Partial<Pick<Aphorism, 'author'>>;

export type AphorismUpdateParams = Partial<AphorismInsertParams>;
