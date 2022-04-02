import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  startDate: Date | null;
  registerStartDate: UseFormRegisterReturn;
  startDateError: { message: string };
  endDate: Date | null;
  registerEndDate: UseFormRegisterReturn;
  endDateError: { message: string };
  startTime: Date | null;
  registerStartTime: UseFormRegisterReturn;
  startTimeError: { message: string };
  endTime: Date | null;
  registerEndTime: UseFormRegisterReturn;
  endTimeError: { message: string };
  dayPrice: number;
  registerDayPrice: UseFormRegisterReturn;
  dayPriceError: { message: string };
  setDateStart: (e: React.SetStateAction<Date | null>) => void;
  setDateEnd: (e: React.SetStateAction<Date | null>) => void;
  setTimeStart: (e: React.SetStateAction<Date | null>) => void;
  setTimeEnd: (e: React.SetStateAction<Date | null>) => void;
  handlePriceValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function PriceandDates({
  startDate,
  endDate,
  startTime,
  endTime,
  dayPrice,
  setDateStart,
  setDateEnd,
  setTimeStart,
  setTimeEnd,
  registerStartDate,
  startDateError,
  registerEndDate,
  endDateError,
  registerStartTime,
  startTimeError,
  registerEndTime,
  endTimeError,
  registerDayPrice,
  dayPriceError,
  handlePriceValues,
}: Props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Schedule and price
      </Typography>
      <Grid container spacing={3} maxWidth="md">
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              {...registerStartDate}
              className={`form-control ${startDateError ? "is-invalid" : ""}`}
              label="Start date"
              value={startDate}
              onChange={(newValue) => {
                console.log(newValue);
                setDateStart(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth name="startDate" />
              )}
            />
          </LocalizationProvider>
          <Typography color="red">{startDateError?.message}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End date"
              value={endDate}
              onChange={(newValue) => {
                setDateEnd(newValue);
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Start time"
              value={startTime}
              onChange={(newValue) => {
                setTimeStart(newValue);
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="End time"
              value={endTime}
              onChange={(newValue) => {
                setTimeEnd(newValue);
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            required
            id="price"
            value={dayPrice}
            onChange={handlePriceValues}
            label="Day price"
            fullWidth
            autoComplete="day-price"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2} md={1}>
          <p>Eur</p>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
