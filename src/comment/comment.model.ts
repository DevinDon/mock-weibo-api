export interface Comment {

  author?: string;

  content: string;

  like: number;

  createdAt: Date;

  updatedAt: Date;

}

export type CommentID = string;

export type CommentInsertParams = Pick<Comment, 'content'> & Partial<Pick<Comment, 'author'>>;

export type CommentUpdateParams = Partial<CommentInsertParams>;
