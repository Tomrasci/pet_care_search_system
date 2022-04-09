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
import { IPetType } from "../../Interfaces/Caretaker/IPetType";
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

  let error = true;
  let errorService = true;

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
    setSelectedPet(selectedPets);

    error = checkedStatePet.filter((x) => x.checked === true).length < 1;

    if (error) {
      sendErrorPet(true);
    } else {
      sendErrorPet(false);
    }
  }, [checkedStatePet]);

  function handleServiceCheckbox(position: number) {
    const updatedCheckedState = checkedStateService.map(
      (item: any, index: number) =>
        index === position
          ? { value: item.value, checked: !item.checked }
          : { value: item.value, checked: item.checked }
    );

    setCheckedStateService(updatedCheckedState);
  }

  useEffect(() => {
    const selectedServices = checkedStateService.filter(
      (service) => service.checked === true
    );
    setSelectedService(selectedServices);

    errorService =
      checkedStateService.filter((x) => x.checked === true).length < 1;

    if (errorService) {
      sendErrorService(true);
    } else {
      sendErrorService(false);
    }
  }, [checkedStateService]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Schedule and price
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={lt}>
        <Grid container spacing={3} maxWidth="md">
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
                        errors.startDate ? errors.startDate?.message : ""
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
                      helperText={errors.endDate ? errors.endDate?.message : ""}
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
          {petTypes.map((pet: IPetType, index: number) => {
            return (
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => handleCheckbox(index)}
                      name={pet.name}
                      key={index}
                      id={pet.name}
                      value={pet.name}
                      checked={checkedStatePet[index].checked}
                    />
                  }
                  key={index}
                  label={pet.name}
                />
              </Grid>
            );
          })}

          {clickedPet && error && (
            <Grid item xs={12}>
              <Typography color="red">
                Atleast one pet must be selected
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography>Services</Typography>
          </Grid>
          {serviceTypes.map((service: IServiceType, index: number) => {
            const labelText =
              service.name === "house_sitting" ? "house sitting" : service.name;
            return (
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => handleServiceCheckbox(index)}
                      name={service.name}
                      key={index}
                      id={service.name}
                      value={service.name}
                      checked={checkedStateService[index].checked}
                    />
                  }
                  key={index}
                  label={labelText}
                />
              </Grid>
            );
          })}

          {clickedService && errorService && (
            <Grid item xs={12}>
              <Typography color="red">
                Atleast one service must be selected
              </Typography>
            </Grid>
          )}
        </Grid>
      </LocalizationProvider>
    </React.Fragment>
  );
}
