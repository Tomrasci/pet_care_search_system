import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField, Typography } from "@mui/material";
import React from "react";
import { render } from "react-dom";
import { useFormContext, Controller } from "react-hook-form";

export default function Step1() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            label="Start date"
            onChange={(e) => field.onChange(e)}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!errors.startDate}
                helperText={
                  errors.startDate ? "Date is required and must be valid" : ""
                }
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}
