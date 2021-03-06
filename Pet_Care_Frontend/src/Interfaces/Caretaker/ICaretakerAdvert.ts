export interface ICaretakerAdvert {
  id: number;
  name: string;
  surname: string;
  phone: string;
  address: string;
  experience: string;
  activity: string;
  city: string;
  hour_price: number;
  description: string;
  extra_information: string;
  title: string;
  languages: string[];
  photo_link: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  pets: string[];
  services: string[];
}
