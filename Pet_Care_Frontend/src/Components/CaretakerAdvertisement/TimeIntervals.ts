import { ITimeInterval } from "../../Interfaces/Caretaker/ITimeInterval";

const startTimes = [
  "00:00",
  "02:00",
  "04:00",
  "06:00",
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
  "22:00",
];
const endTimes = [
  "02:00",
  "04:00",
  "06:00",
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
  "22:00",
  "24:00",
];

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
