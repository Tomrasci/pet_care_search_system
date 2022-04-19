import { SelectChangeEvent } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

export interface IReservationObject {
  handleSelectValue: Dispatch<SetStateAction<string[]>>;
  selectValue: string[];
  handleDateValue: Dispatch<SetStateAction<Date | null>>;
  dateValue: Date | null;
  currentInterval: string[];
  reservationDescription: string;
  handleReservationDescription: Dispatch<SetStateAction<string>>;
  handleReservation: () => Promise<void>;
  handleChangeMultiple: (event: SelectChangeEvent<string[]>) => void;
}
