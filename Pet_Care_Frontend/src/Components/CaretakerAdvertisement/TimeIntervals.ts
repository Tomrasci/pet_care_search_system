import { ITimeInterval } from "../../Interfaces/Caretaker/ITimeInterval";

const startTimes = ["6:00", "9:00", "12:00", "15:00", "18:00", "21:00"];
const endTimes = ["9:00", "12:00", "15:00", "18:00", "21:00", "24:00"];

function getInitialTimeIntervals() {
  const makeTimeInterval = [startTimes, endTimes].reduce((start, end) =>
    start.map((value, index) => value + " - " + end[index])
  );

  return makeTimeInterval;
}

function getDaysIntervals() {
  const makeTimeInterval = getInitialTimeIntervals();
  const newInterval: ITimeInterval[] = makeTimeInterval.map((value, index) => {
    return { timeInterval: value, available: false };
  });
  return newInterval;
}

export default { getInitialTimeIntervals, getDaysIntervals };
