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
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import { ICaretakerAvailability } from "../../Interfaces/Caretaker/ICaretakerAvailability";
import FilterWeekDay from "../../Utils/FilterWeekday";
import CaretakerCalendar from "../CaretakerAdvertisement/CaretakerCalendar";
import "../CaretakerAdvertisement/CaretakerCalendar.css";
import { enGB } from "date-fns/locale";
import FilterAvailableWeekDay from "../../Utils/FilterAvailableWeekday";
import { IReservation } from "../../Interfaces/IReservation";
import reservationApi from "../../Api/reservationApi";
import { toast } from "react-toastify";
import { IReservationObject } from "../../Interfaces/IReservationObject";
import ButtonBase from "../../Utils/ButtonBase";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ReservationForm from "./ReservationForm";

const ReserveFromCalendar = ({ currentUser }: any) => {
  const [availability, setAvailability] = useState<ICaretakerAvailability[]>(
    []
  );
  const [value, setValue] = React.useState<Date | null>(null);

  const [mondayInterval, setMondayInterval] = React.useState<string[]>([]);
  const [tuesdayInterval, setTuesdayInterval] = React.useState<string[]>([]);
  const [wednesdayInterval, setWednesdayInterval] = React.useState<string[]>(
    []
  );
  const [thursdayInterval, setThursdayInterval] = React.useState<string[]>([]);
  const [fridayInterval, setFridayInterval] = React.useState<string[]>([]);
  const [saturdayInterval, setSaturdayInterval] = React.useState<string[]>([]);
  const [sundayInterval, setSundayInterval] = React.useState<string[]>([]);

  const [currentInterval, setCurrentInterval] = React.useState<string[]>([]);
  const [selectInterval, setSelectInterval] = React.useState<string[]>([]);

  const [reservationDescription, setReservationDescription] =
    React.useState("");

  const reserving = true;

  useEffect(() => {
    async function getCaretakerAvailability() {
      const availabilityGet =
        await caretakerAdvertisementApi.getCaretakerAvailability(31);
      setAvailability(availabilityGet);

      const mondayArray = FilterWeekDay(availabilityGet, "Mon");
      const tuesdayArray = FilterWeekDay(availabilityGet, "Tue");
      const wednesdayArray = FilterWeekDay(availabilityGet, "Wed");
      const thursdayArray = FilterWeekDay(availabilityGet, "Thu");
      const fridayArray = FilterWeekDay(availabilityGet, "Fri");
      const saturdayArray = FilterWeekDay(availabilityGet, "Sat");
      const sundayArray = FilterWeekDay(availabilityGet, "Sun");

      setMondayInterval(mondayArray);
      setTuesdayInterval(tuesdayArray);
      setWednesdayInterval(wednesdayArray);
      setThursdayInterval(thursdayArray);
      setFridayInterval(fridayArray);
      setSaturdayInterval(saturdayArray);
      setSundayInterval(sundayArray);
    }
    getCaretakerAvailability();
  }, []);

  const theme = useTheme();
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

  useEffect(() => {
    if (value?.getDay() === 0) {
      setCurrentInterval(sundayInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 1) {
      setCurrentInterval(mondayInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 2) {
      setCurrentInterval(tuesdayInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 3) {
      setCurrentInterval(wednesdayInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 4) {
      setCurrentInterval(thursdayInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 5) {
      setCurrentInterval(fridayInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 6) {
      setCurrentInterval(saturdayInterval);
      setSelectInterval([]);
    }
  }, [setValue, value, availability]);

  function getStyles(time: string, timeValues: string[], theme: Theme) {
    return {
      fontWeight:
        timeValues.indexOf(time) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChangeMultiple = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectInterval(typeof value === "string" ? value.split(",") : value);
  };

  const handleReservation = async () => {
    let reservations: IReservation[] = [];

    function getValues(time: string, index: number) {
      reservations.push({
        date: value || new Date(),
        timeInterval: time,
        user_id: currentUser.id,
        advertisement_id: 31,
        status: "pending",
        description: reservationDescription,
      });
    }
    selectInterval.forEach(getValues);
    let reservs = {
      reservations: reservations,
    };

    const result = await reservationApi.createReservations(reservs);
    if (result.status !== 201) {
      toast.error("Reservation creation failed");
    } else {
      toast.success(
        "Reservation creation successful! Wait for caretaker to approve"
      );
    }
  };

  const reservationObject: IReservationObject = {
    handleSelectValue: setSelectInterval,
    selectValue: selectInterval,
    handleDateValue: setValue,
    dateValue: value,
    currentInterval: currentInterval,
    handleChangeMultiple: handleChangeMultiple,
    reservationDescription: reservationDescription,
    handleReservationDescription: setReservationDescription,
    handleReservation: handleReservation,
  };

  return (
    <>
      <CaretakerCalendar reserving={reserving} />
      <Grid container sx={{ mt: 10 }} justifyContent="center">
        <ButtonBase
          title="Reservation creation"
          buttonText="Make reservation"
          buttonIcon={<BookOnlineIcon />}
          content={<ReservationForm reservationObject={reservationObject} />}
        />
      </Grid>
    </>
  );
};

export default ReserveFromCalendar;
