export interface IOwnerAdvertGot {
  id: number;
  name: string;
  surname: string;
  phone: string;
  address: string;
  activity: string;
  hour_price: number;
  description: string;
  extra_information: string;
  title: string;
  photo_link: string;
  created_at: Date;
  updated_at: Date;
  startDate: Date;
  endDate: Date | null;
  time_intervals: string[];
  user_id: number;
  services: string[];
  pets: string[];
  languages: string[];
}
