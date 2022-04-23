export interface IOwnerAdvert {
  id: number;
  name: string;
  surname: string;
  phone: string;
  address: string;
  day_price: number;
  description: string;
  extra_information: string;
  title: string;
  languages: string[];
  photo_link: string;
  startDate: Date;
  endDate: Date | null;
  startTime: Date;
  endTime: Date;
  pets: string[];
  services: string[];
  time_intervals: string[];
}
