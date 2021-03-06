import moment from "moment";
import { ICaretakerAvailability } from "../Interfaces/Caretaker/ICaretakerAvailability";
import { IDatesTimesInterface } from "../Interfaces/Caretaker/IDatesTimesInterface";
import { IFetchedReservation } from "../Interfaces/IFetchedReservation";
import { IReservationEvent } from "../Interfaces/Caretaker/IReservationEvent";
import { IFixedReservation } from "../Interfaces/IFixedReservation";

const matchingDaysBetween = function (start: Date, end: Date, test: any) {
  var days = [];
  for (var day = moment(start); day.isBefore(end); day.add(1, "d")) {
    if (test(day)) {
      days.push(moment(day));
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

  var arr = [];
  let tmp = start.clone().day(day);
  if (tmp.isSameOrAfter(start, "d")) {
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

const makeReservationsToEvents = (reservationArray: IFixedReservation[]) => {
  const reservations = reservationArray.map((res) => {
    return {
      ...res,
      startTime: res.startTime.replace(/\s/g, ""),
      endTime: res.endTime.replace(/\s/g, ""),
      date: res.date.toString().split("T")[0],
    };
  });
  const eventReservations: IReservationEvent[] = reservations.map(
    (reservation) => {
      return {
        start: reservation.date + "T" + reservation.startTime,
        end: reservation.date + "T" + reservation.endTime,
        date: reservation.date,
        title: reservation.description,
      };
    }
  );
  return eventReservations;
};

const makeReservationsToEventsForOwner = (
  reservationArray: IFixedReservation[]
) => {
  const reservations = reservationArray.map((res) => {
    return {
      ...res,
      startTime: res.startTime.replace(/\s/g, ""),
      endTime: res.endTime.replace(/\s/g, ""),
      date: res.date.toString().split("T")[0],
    };
  });
  const eventReservations: IReservationEvent[] = reservations.map(
    (reservation) => {
      return {
        start: reservation.date + "T" + reservation.startTime,
        end: reservation.date + "T" + reservation.endTime,
        date: reservation.date,
        title: "RESERVED",
      };
    }
  );
  return eventReservations;
};

const filterExistingReservationsFromTImes = (
  reservationArray: IFixedReservation[],
  weekdayInterval: string[],
  day: number,
  date: Date | null
) => {
  for (const reservation of reservationArray) {
    if (
      new Date(reservation.date).getDay() === day &&
      new Date(reservation.date).toLocaleDateString() ===
        date?.toLocaleDateString()
    ) {
      if (
        weekdayInterval.includes(
          reservation.startTime + "-" + reservation.endTime
        )
      ) {
        const index = weekdayInterval.indexOf(
          reservation.startTime + "-" + reservation.endTime
        );
        if (index > -1) {
          weekdayInterval.splice(index, 1);
        }
      }
    }
  }
  return weekdayInterval;
};
function fixReservationTimes(reservationArray: IFetchedReservation[]) {
  const fixedArray: IFixedReservation[] = [];
  for (var i = 0; i < reservationArray.length; i++) {
    const timeArray = reservationArray[i].time_intervals.split(",");
    for (var j = 0; j < timeArray.length; j++) {
      fixedArray.push({
        startTime: timeArray[j].split("-")[0],
        endTime: timeArray[j].split("-")[1],
        date: reservationArray[i].date,
        user_id: reservationArray[i].user_id,
        advertisement_id: reservationArray[i].advertisement_id,
        status: reservationArray[i].status,
        description: reservationArray[i].description,
      });
    }
  }
  return fixedArray;
}

export default {
  matchingDaysBetween,
  dayTimes,
  getAllSelectedDays,
  getAllDaysWithTimes,
  makeReservationsToEvents,
  makeReservationsToEventsForOwner,
  filterExistingReservationsFromTImes,
  fixReservationTimes,
};
