export interface ICommentWithUser {
  id: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_name: string;
  user_id: number;
  advertisement_id: number;
}
