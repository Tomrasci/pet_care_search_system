export interface IUser {
  id?: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  name: string;
  surname: string;
  role: number;
  city: string;
  updated_at?: Date;
  advert_count: number;
  photo_link?: string;
}
