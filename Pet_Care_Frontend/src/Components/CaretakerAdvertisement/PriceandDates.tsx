import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import TimePicker from "@mui/lab/TimePicker";
import { Checkbox, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { lt } from "date-fns/locale";
import * as React from "react";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IPetType } from "../../Interfaces/Caretaker/IPetType";
import { IServiceType } from "../../Interfaces/Caretaker/IServiceType";

import Timeit from "react-timeit";

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
  getValues: (payload?: string | string[]) => any;
  clickedTime: boolean;
  sendErrorEndTime: (e: boolean) => void;
  watchTime: (
    names?: string | string[] | ((data: any, options: any) => void)
  ) => unknown;
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
  getValues,
  clickedTime,
  sendErrorEndTime,
  watchTime,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const timeErrorMessage = "End time must be after start time";

  const [timeError, setTimeError] = React.useState(true);
  const [petError, setPetError] = React.useState(true);
  const [serviceError, setServiceError] = React.useState(true);

  const [timeCalc, setTimeCalc] = React.useState(true);

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

    const error = checkedStatePet.filter((x) => x.checked === true).length < 1;
    setPetError(error);

    if (error) {
      sendErrorPet(true);
    } else {
      sendErrorPet(false);
    }
  }, [checkedStatePet]);

  useEffect(() => {
    const st = getValues("startTime");
    const ed = getValues("endTime");

    if (ed <= st) {
      setTimeError(true);
      sendErrorEndTime(true);
    } else {
      setTimeError(false);
      sendErrorEndTime(false);
    }
  }, [watchTime(["endTime", "startTime"])]);

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

    const errorService =
      checkedStateService.filter((x) => x.checked === true).length < 1;
    setServiceError(errorService);

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
                      name="startDate"
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
                      name="endDate"
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
                <TextField
                  type="time"
                  fullWidth
                  {...field}
                  error={!!errors.startTime}
                  helperText={errors.startTime ? errors.startTime?.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <TextField type="time" fullWidth {...field} />
              )}
            />

            {clickedTime && timeError && (
              <Grid item xs={12}>
                <Typography color="red">{timeErrorMessage}</Typography>
              </Grid>
            )}
          </Grid>
          <Grid item xs={6} md={3}>
            <Controller
              name="day_price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="day_price"
                  name="day_price"
                  label="Price"
                  type="number"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  error={!!errors.day_price}
                  helperText={
                    errors.day_price
                      ? "Price is required and must be a number"
                      : ""
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
                      key={pet.id}
                      id={pet.name}
                      value={pet.name}
                      checked={checkedStatePet[index].checked}
                    />
                  }
                  key={pet.id}
                  label={pet.name}
                />
              </Grid>
            );
          })}

          {clickedPet && petError && (
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
                      key={service.id}
                      id={service.name}
                      value={service.name}
                      checked={checkedStateService[index].checked}
                    />
                  }
                  key={service.id}
                  label={labelText}
                />
              </Grid>
            );
          })}

          {clickedService && serviceError && (
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
