import moment from "moment";
import { ICaretakerAvailability } from "../Interfaces/Caretaker/ICaretakerAvailability";
import { IDatesTimesInterface } from "../Interfaces/Caretaker/IDatesTimesInterface";

const matchingDaysBetween = function (start: Date, end: Date, test: any) {
  var days = [];
  for (var day = moment(start); day.isBefore(end); day.add(1, "d")) {
    if (test(day)) {
      days.push(moment(day)); // push a copy of day
    }
  }
  return days;
};

const dayTimes = (day: string, daysArray: ICaretakerAvailability[]) => {
  const dayTimes = daysArray.filter((arrayDay) => {
    return arrayDay.day_of_week === day;
  });
  return dayTimes;
};

const getAllSelectedDays = (startDate: Date, endDate: Date, day: number) => {
  let start = moment(startDate.toLocaleString());
  let end = moment(endDate.toLocaleString());

  console.log(`start is ${start}`);
  console.log(`end is ${end}`);

  var arr = [];
  // Get "next" monday
  let tmp = start.clone().day(day);
  if (tmp.isAfter(start, "d")) {
    arr.push(tmp.format("YYYY-MM-DD"));
  }
  while (tmp.isBefore(end)) {
    tmp.add(7, "days");
    if (tmp.isSameOrBefore(end)) {
      arr.push(tmp.format("YYYY-MM-DD"));
    }
  }
  return arr;
};

const getAllDaysWithTimes = (
  dayArray: string[],
  timeArray: ICaretakerAvailability[],
  weekDay: string
) => {
  const newArray: IDatesTimesInterface[] = [];
  for (const time of timeArray) {
    if (time.startTime === "24:00:00") {
      time.startTime = "00:00:00";
    }
    if (time.endTime === "24:00:00") {
      time.endTime = "00:00:00";
    }
  }
  for (const day of dayArray) {
    for (const time of timeArray) {
      newArray.push({
        startTime: time.startTime,
        endTime: time.endTime,
        date: day,
        dayOfWeek: weekDay,
      });
    }
  }
  const newArr = newArray.map((day, index) => {
    return {
      start: day.date + "T" + day.startTime,
      end: day.date + "T" + day.endTime,
      date: day.date,
      display: "background",
    };
  });
  return newArr;
};

export default {
  matchingDaysBetween,
  dayTimes,
  getAllSelectedDays,
  getAllDaysWithTimes,
};
