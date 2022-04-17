import { ICaretakerAvailability } from '../models/interfaces/ICaretakerAvailability';
export default function fixWeekDayArray(
  dayArray: string[],
  day: string,
  cAdvertId
) {
  const fixedArray: ICaretakerAvailability[] = dayArray.map((interval) => ({
    startTime: interval.split('-')[0],
    endTime: interval.split('-')[1],
    day_of_week: day,
    available: true,
    advertisement_id: cAdvertId
  }));
  return fixedArray;
}
