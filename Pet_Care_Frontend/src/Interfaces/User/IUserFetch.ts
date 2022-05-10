export interface IUserFetch {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  name: string;
  surname: string;
  role: number;
  city: string;
  updated_at?: Date;
  created_at?: Date;
}
