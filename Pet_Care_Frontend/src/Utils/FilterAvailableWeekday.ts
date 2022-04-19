import { ICaretakerAvailability } from "../Interfaces/Caretaker/ICaretakerAvailability";

export default function FilterAvailableWeekDay(
  weekDayArray: ICaretakerAvailability[],
  day: string
) {
  const DayStringArray = weekDayArray
    .filter((weekDay) => {
      return weekDay.day_of_week === day && weekDay.available === true;
    })
    .map((weekDay) => {
      return (
        weekDay.startTime.replace(/:\d\d([ ap]|$)/, "$1") +
        " - " +
        weekDay.endTime.replace(/:\d\d([ ap]|$)/, "$1")
      );
    });

  return DayStringArray;
}
