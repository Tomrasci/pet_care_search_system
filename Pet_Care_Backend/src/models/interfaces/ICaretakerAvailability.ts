export interface ICaretakerAvailability {
  id: number;
  startTime: Date;
  endTime: Date;
  day_of_week: string;
  available: boolean;
  advertisement_id: number;
}
