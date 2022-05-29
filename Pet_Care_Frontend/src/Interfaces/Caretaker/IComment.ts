export interface IComment {
  id?: number;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  user_id: number;
  advertisement_id: number;
  user_photo_link?: string;
}
