export interface IFetchedReservation {
  id?: number;
  date: Date;
  // startTime: string;
  // endTime: string;
  time_intervals: string;
  user_id: number;
  advertisement_id: number;
  status: string;
  description: string;
  created_at: Date;
}
