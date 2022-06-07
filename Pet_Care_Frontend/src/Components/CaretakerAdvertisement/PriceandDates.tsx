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
import { IDaysObject } from "../../Interfaces/Caretaker/IDaysObject";
import { IPetType } from "../../Interfaces/Caretaker/IPetType";
import { IServiceType } from "../../Interfaces/Caretaker/IServiceType";
import { Container } from "../../Layout/FooterStyles";

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
  daysObject: IDaysObject;
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
  daysObject,
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

  const handleChangeMultipleMonday = (
    event: SelectChangeEvent<typeof daysObject.mondayValue>
  ) => {
    const {
      target: { value },
    } = event;
    daysObject.handleMonday(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeMultipleTuesday = (
    event: SelectChangeEvent<typeof daysObject.tuesdayValue>
  ) => {
    const {
      target: { value },
    } = event;
    daysObject.handleTuesday(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeMultipleWednesday = (
    event: SelectChangeEvent<typeof daysObject.wednesdayValue>
  ) => {
    const {
      target: { value },
    } = event;
    daysObject.handleWednesday(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeMultipleThursday = (
    event: SelectChangeEvent<typeof daysObject.thursdayValue>
  ) => {
    const {
      target: { value },
    } = event;
    daysObject.handleThursday(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeMultipleFriday = (
    event: SelectChangeEvent<typeof daysObject.fridayValue>
  ) => {
    const {
      target: { value },
    } = event;
    daysObject.handleFriday(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeMultipleSaturday = (
    event: SelectChangeEvent<typeof daysObject.saturdayValue>
  ) => {
    const {
      target: { value },
    } = event;
    daysObject.handleSaturday(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeMultipleSunday = (
    event: SelectChangeEvent<typeof daysObject.sundayValue>
  ) => {
    const {
      target: { value },
    } = event;
    daysObject.handleSunday(
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                      required
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
                  label="End date"
                  onChange={(e) => field.onChange(e)}
                  renderInput={(params) => (
                    <TextField
                      name="endDate"
                      required
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
            <FormControl
              sx={{
                width: {
                  sx: 1.0,
                  md: 700,
                  sm: 550,
                  xs: 300,
                },
              }}
            >
              <InputLabel id="monday_select">Monday times</InputLabel>
              <Select
                labelId="monday_select"
                fullWidth
                id="monday_select"
                value={daysObject.mondayValue}
                multiple
                onChange={handleChangeMultipleMonday}
                input={<OutlinedInput label="Monday times" />}
                MenuProps={MenuProps}
              >
                {daysObject.timeSelectValue.map((time) => (
                  <MenuItem
                    key={time}
                    value={time}
                    style={getStyles(time, daysObject.mondayValue, theme)}
                  >
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              sx={{
                width: {
                  sx: 1.0,
                  md: 700,
                  sm: 550,
                  xs: 300,
                },
              }}
            >
              <InputLabel id="tuesday_select">Tuesday times</InputLabel>
              <Select
                labelId="tuesday_select"
                fullWidth
                id="tuesday_select"
                value={daysObject.tuesdayValue}
                multiple
                onChange={handleChangeMultipleTuesday}
                input={<OutlinedInput label="Tuesday times" />}
                MenuProps={MenuProps}
              >
                {daysObject.timeSelectValue.map((time) => (
                  <MenuItem
                    key={time}
                    value={time}
                    style={getStyles(time, daysObject.tuesdayValue, theme)}
                  >
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              sx={{
                width: {
                  sx: 1.0,
                  md: 700,
                  sm: 550,
                  xs: 300,
                },
              }}
            >
              <InputLabel id="wednesday_select">Wednesday times</InputLabel>
              <Select
                labelId="wednesday_select"
                fullWidth
                id="wednesday_select"
                value={daysObject.wednesdayValue}
                multiple
                onChange={handleChangeMultipleWednesday}
                input={<OutlinedInput label="Wednesday times" />}
                MenuProps={MenuProps}
              >
                {daysObject.timeSelectValue.map((time) => (
                  <MenuItem
                    key={time}
                    value={time}
                    style={getStyles(time, daysObject.wednesdayValue, theme)}
                  >
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              sx={{
                width: {
                  sx: 1.0,
                  md: 700,
                  sm: 550,
                  xs: 300,
                },
              }}
            >
              <InputLabel id="thursday_select">Thursday times</InputLabel>
              <Select
                labelId="thursday_select"
                fullWidth
                id="thursday_select"
                value={daysObject.thursdayValue}
                multiple
                onChange={handleChangeMultipleThursday}
                input={<OutlinedInput label="Thursday times" />}
                MenuProps={MenuProps}
              >
                {daysObject.timeSelectValue.map((time) => (
                  <MenuItem
                    key={time}
                    value={time}
                    style={getStyles(time, daysObject.thursdayValue, theme)}
                  >
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              sx={{
                width: {
                  sx: 1.0,
                  md: 700,
                  sm: 550,
                  xs: 300,
                },
              }}
            >
              <InputLabel id="friday_select">Friday times</InputLabel>
              <Select
                labelId="friday_select"
                fullWidth
                id="friday_select"
                value={daysObject.fridayValue}
                multiple
                onChange={handleChangeMultipleFriday}
                input={<OutlinedInput label="Friday times" />}
                MenuProps={MenuProps}
              >
                {daysObject.timeSelectValue.map((time) => (
                  <MenuItem
                    key={time}
                    value={time}
                    style={getStyles(time, daysObject.fridayValue, theme)}
                  >
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              sx={{
                width: {
                  sx: 1.0,
                  md: 700,
                  sm: 550,
                  xs: 300,
                },
              }}
            >
              <InputLabel id="saturday_select">Saturday times</InputLabel>
              <Select
                labelId="saturday_select"
                fullWidth
                id="saturday_select"
                value={daysObject.saturdayValue}
                multiple
                onChange={handleChangeMultipleSaturday}
                input={<OutlinedInput label="Saturday times" />}
                MenuProps={MenuProps}
              >
                {daysObject.timeSelectValue.map((time) => (
                  <MenuItem
                    key={time}
                    value={time}
                    style={getStyles(time, daysObject.saturdayValue, theme)}
                  >
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              sx={{
                width: {
                  sx: 1.0,
                  md: 700,
                  sm: 550,
                  xs: 300,
                },
              }}
            >
              <InputLabel id="sunday_select">Sunday times</InputLabel>
              <Select
                labelId="sunday_select"
                fullWidth
                id="sunday_select"
                value={daysObject.sundayValue}
                multiple
                onChange={handleChangeMultipleSunday}
                input={<OutlinedInput label="Sunday times" />}
                MenuProps={MenuProps}
              >
                {daysObject.timeSelectValue.map((time) => (
                  <MenuItem
                    key={time}
                    value={time}
                    style={getStyles(time, daysObject.sundayValue, theme)}
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
                  required
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
          <Grid item xs={4} md={8}></Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography color="#793209" fontWeight={500}>
              Accepted pets *
            </Typography>
          </Grid>
          {petTypes.map((pet: IPetType, index: number) => {
            return (
              <Grid item md={2} xs={4}>
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
              Services *
            </Typography>
          </Grid>
          {serviceTypes.map((service: IServiceType, index: number) => {
            const labelText =
              service.name === "Owner_house_sitting"
                ? "Owner house sitting"
                : service.name === "Medication_giving"
                ? "Medication giving"
                : service.name === "Caretaker_house_sitting"
                ? "Caretaker house sitting"
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
