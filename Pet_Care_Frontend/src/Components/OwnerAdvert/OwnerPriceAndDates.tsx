import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { lt } from "date-fns/locale";
import * as React from "react";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IPetType } from "../../Interfaces/Caretaker/IPetType";
import { IServiceType } from "../../Interfaces/Caretaker/IServiceType";
import { ITimeIntervalsObject } from "../../Interfaces/Owner/ITimeIntervalsObject";

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
  timesIntervalObject: ITimeIntervalsObject;
}

export default function OwnerPriceandDates({
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
  timesIntervalObject,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(time: string, timeValues: string[], theme: Theme) {
    return {
      fontWeight:
        timeValues.indexOf(time) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [petError, setPetError] = React.useState(true);
  const [serviceError, setServiceError] = React.useState(true);

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

  const handleChangeMultipleTimes = (
    event: SelectChangeEvent<typeof timesIntervalObject.selectedTimesValue>
  ) => {
    const {
      target: { value },
    } = event;
    timesIntervalObject.handleSelectIntervals(
      typeof value === "string" ? value.split(",") : value
    );
  };

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

  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography variant="h6" color="#793209" gutterBottom>
        Schedule, price and services
      </Typography>
      <Box marginY={2}></Box>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={lt}>
        <Grid container spacing={3} maxWidth="md">
          <Grid item xs={12} md={6}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  disablePast
                  inputFormat="yyyy-MM-dd"
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
                  inputFormat="yyyy-MM-dd"
                  disablePast
                  label="End date (if needed)"
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

          <Grid item xs={12}>
            <FormControl sx={{ minWidth: 802.03 }}>
              <InputLabel id="monday_select">Required time(s)</InputLabel>
              <Select
                labelId="monday_select"
                fullWidth
                id="monday_select"
                value={timesIntervalObject.selectedTimesValue}
                multiple
                onChange={handleChangeMultipleTimes}
                input={<OutlinedInput label="Monday times" />}
                MenuProps={MenuProps}
              >
                {timesIntervalObject.timeSelectValue.map((time) => (
                  <MenuItem
                    key={time}
                    value={time}
                    style={getStyles(
                      time,
                      timesIntervalObject.selectedTimesValue,
                      theme
                    )}
                  >
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={3}>
            <Controller
              name="hour_price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="hour_price"
                  name="hour_price"
                  label="Hour price"
                  type="number"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  error={!!errors.hour_price}
                  helperText={
                    errors.hour_price
                      ? "Hour price is required and must be a number"
                      : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid
            container
            item
            xs={2}
            md={1}
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
          >
            Eur
          </Grid>
          <Grid item xs={4} md={7}></Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography color="#793209" fontWeight={500}>
              Pets needing care
            </Typography>
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
            <Typography color="#793209" fontWeight={500}>
              Services
            </Typography>
          </Grid>
          {serviceTypes.map((service: IServiceType, index: number) => {
            const labelText =
              service.name === "house_sitting"
                ? "house sitting"
                : service.name === "medication_giving"
                ? "medication giving"
                : service.name;

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
