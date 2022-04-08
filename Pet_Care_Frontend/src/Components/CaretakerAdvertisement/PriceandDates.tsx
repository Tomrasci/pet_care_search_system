import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";
import { DateRangePicker } from "@mui/lab";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { Controller } from "react-hook-form";
import { lt } from "date-fns/locale";
import { useState, useEffect } from "react";
import serviceTypeApi from "../../Api/serviceTypeApi";
import petTypeApi from "../../Api/petTypeApi";
import { IServiceType } from "../../Interfaces/Caretaker/IServiceType";
import { IPetType } from "../../Interfaces/IPetType";
import { string } from "yup/lib/locale";

interface Props {
  sendErrorPet: (e: boolean) => void;
  clickedPet: boolean;
  setSelectedPet: any;
  checkedStatePet: { value: IPetType; checked: boolean }[];
  setCheckedStatePet: any;
  petTypes: any;
  sendErrorService: (e: boolean) => void;
  clickedService: boolean;
  setSelectedService: any;
  checkedStateService: { value: IServiceType; checked: boolean }[];
  setCheckedStateService: any;
  serviceTypes: any;
}

export default function PriceandDates({
  sendErrorPet,
  clickedPet,
  setSelectedPet,
  checkedStatePet,
  setCheckedStatePet,
  petTypes,
  sendErrorService,
  clickedService,
  setSelectedService,
  checkedStateService,
  setCheckedStateService,
  serviceTypes,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  console.log(`checked state pet ${JSON.stringify(checkedStatePet)}`);
  console.log(
    `checked state pet first is  ${JSON.stringify(checkedStatePet[0])}`
  );

  let error = false;

  function handleCheckbox(position: number) {
    const updatedCheckedState = checkedStatePet.map(
      (item: any, index: number) =>
        index === position
          ? { value: item.value, checked: !item.checked }
          : { value: item.value, checked: item.checked }
    );

    setCheckedStatePet(updatedCheckedState);
  }

  useEffect(() => {
    const selectedPets = checkedStatePet.filter((pet) => pet.checked === true);
    // console.log(`selected languages are ${JSON.stringify(selectedLanguages)}`);
    setSelectedPet(selectedPets);

    error = checkedStatePet.filter((x) => x.checked === true).length < 1;
    if (error) {
      sendErrorPet(true);
    } else {
      sendErrorPet(false);
    }
  }, [checkedStatePet]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Schedule and price
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={lt}>
        <Grid container spacing={3} maxWidth="sm">
          <Grid item xs={12} md={6}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  mask="____-__-__"
                  label="Start date"
                  onChange={(e) => field.onChange(e)}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!errors.startDate}
                      helperText={
                        errors.startDate
                          ? "Start date is required and must be valid"
                          : ""
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  mask="____-__-__"
                  label="End date"
                  onChange={(e) => field.onChange(e)}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!errors.endDate}
                      helperText={
                        errors.endDate
                          ? "End date is required and must be valid"
                          : ""
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  label="Start time"
                  onChange={(e) => field.onChange(e)}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!errors.startTime}
                      helperText={
                        errors.startTime ? errors.startTime?.message : ""
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  label="End time"
                  onChange={(e) => field.onChange(e)}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!errors.endTime}
                      helperText={errors.endTime ? errors.endTime?.message : ""}
                    />
                  )}
                />
              )}
            />
            {/* "End time is required and must be valid" */}
          </Grid>
          <Grid item xs={6} md={3}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  error={!!errors.price}
                  helperText={
                    errors.price ? "Price is required and must be a number" : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <p>Eur</p>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography>Accepted pets</Typography>
          </Grid>
          {petTypes.map((pet: any, index: number) => {
            return (
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => handleCheckbox(index)}
                      name={pet.value.name}
                      key={index}
                      id={pet.value.name}
                      value={pet.value.name}
                      checked={checkedStatePet[index].checked}
                    />
                  }
                  key={index}
                  label={pet.value.name}
                />
              </Grid>
            );
          })}
          {clickedPet && error && (
            <Grid item xs={12}>
              <Typography color="red">
                Atleast one language must be selected
              </Typography>
            </Grid>
          )}
        </Grid>
      </LocalizationProvider>
    </React.Fragment>
  );
}
