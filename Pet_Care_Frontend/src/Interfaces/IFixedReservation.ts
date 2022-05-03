export interface IFixedReservation {
  id?: number;
  date: Date;
  startTime: string;
  endTime: string;
  user_id: number;
  advertisement_id: number;
  status: string;
  description: string;
  created_at?: Date;
}
