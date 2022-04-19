export interface IGotReservation {
  id?: number;
  date: Date;
  timeInterval: string;
  user_id: number;
  advertisement_id: number;
  status: string;
  description: string;
}
