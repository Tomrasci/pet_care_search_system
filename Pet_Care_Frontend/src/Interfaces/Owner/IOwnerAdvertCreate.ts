export interface IOwnerAdvertCreate {
  name: string;
  surname: string;
  phone: string;
  address: string;
  day_price: number;
  description: string;
  extra_information: string;
  title: string;
  startDate: Date;
  endDate: Date;
  pets: number[];
  services: number[];
  languages: number[];
  user_id: number;
  time_intervals: string[];
}
