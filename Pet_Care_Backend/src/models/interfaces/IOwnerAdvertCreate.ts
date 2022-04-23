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
  endDate: Date | null;
  time_intervals: string;
  user_id: number;
}
