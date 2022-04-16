import { ITimeInterval } from "./ITimeInterval";

export interface IDaysObject {
  timeSelectValue: string[];
  mondayValue: string[];
  handleMonday: React.Dispatch<React.SetStateAction<string[]>>;
  tuesdayValue: string[];
  handleTuesday: React.Dispatch<React.SetStateAction<string[]>>;
  wednesdayValue: string[];
  handleWednesday: React.Dispatch<React.SetStateAction<string[]>>;
  thursdayValue: string[];
  handleThursday: React.Dispatch<React.SetStateAction<string[]>>;
  fridayValue: string[];
  handleFriday: React.Dispatch<React.SetStateAction<string[]>>;
  saturdayValue: string[];
  handleSaturday: React.Dispatch<React.SetStateAction<string[]>>;
  sundayValue: string[];
  handleSunday: React.Dispatch<React.SetStateAction<string[]>>;
}
