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
    <>
      <Controller
        name="firstName"
        defaultValue={""}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName?.message : ""}
          />
        )}
      />
    </>
  );
}
