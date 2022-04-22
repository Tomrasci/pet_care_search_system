export interface ITimeIntervalsObject {
  timeSelectValue: string[];
  selectedTimesValue: string[];
  handleSelectIntervals: React.Dispatch<React.SetStateAction<string[]>>;
}
