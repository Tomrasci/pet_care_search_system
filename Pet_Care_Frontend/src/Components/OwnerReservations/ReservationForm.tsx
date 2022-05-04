import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import reservationApi from "../../Api/reservationApi";
import { IReservation } from "../../Interfaces/IReservation";
import { IReservationObject } from "../../Interfaces/IReservationObject";
import { enGB } from "date-fns/locale";
import moment from "moment";

interface Props {
  reservationObject: IReservationObject;
  onSave?: () => void;
}

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

const ReservationForm = ({ reservationObject, onSave }: Props) => {
  const theme = useTheme();

  const handleChangeMultiple = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    reservationObject.handleSelectValue(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleReservationSubmit = () => {
    reservationObject.handleReservation();
    if (onSave) {
      onSave();
    }
  };
  // console.log(`min date is ${reservationObject.minDate}`);
  // console.log(`max date is ${reservationObject.maxDate}`);

  return (
    <Box sx={{ mt: 5 }}>
      <form>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={enGB}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignContent="center"
          >
            <Grid item xs={12}>
              <DatePicker
                minDate={moment(reservationObject.minDate).toDate()}
                maxDate={moment(reservationObject.maxDate).toDate()}
                disablePast
                inputFormat="yyyy-MM-dd"
                mask="____-__-__"
                label="Select reservation date"
                value={reservationObject.dateValue}
                onChange={(newValue) => {
                  reservationObject.handleDateValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    name="reservationDate"
                    fullWidth
                    {...params}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ minWidth: 552.02 }}>
                <InputLabel id="res_select">
                  Reservation time(s) (Select a date first)
                </InputLabel>
                <Select
                  labelId="res_select"
                  fullWidth
                  id="res_select"
                  value={reservationObject.selectValue}
                  multiple
                  onChange={handleChangeMultiple}
                  input={
                    <OutlinedInput label="Reservation time(s) (Select a date first)" />
                  }
                  MenuProps={MenuProps}
                >
                  {reservationObject.currentInterval.sort().map((time) => (
                    <MenuItem
                      key={time}
                      value={time}
                      style={getStyles(
                        time,
                        reservationObject.currentInterval,
                        theme
                      )}
                    >
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Service description (ex. Dog walking)"
                fullWidth
                value={reservationObject.reservationDescription}
                onChange={(e) =>
                  reservationObject.handleReservationDescription(e.target.value)
                }
                autoComplete="title"
                variant="standard"
                required
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                onClick={handleReservationSubmit}
                sx={{ mt: 3, ml: 1 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </form>
    </Box>
  );
};
export default ReservationForm;
