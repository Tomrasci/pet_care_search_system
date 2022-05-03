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
import CalendarFunctions from "../../Utils/CalendarFunctions";
import { IReservationEvent } from "../../Interfaces/Caretaker/IReservationEvent";
import { IFetchedReservation } from "../../Interfaces/IFetchedReservation";
import { useParams } from "react-router";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { IFixedReservation } from "../../Interfaces/IFixedReservation";

const ReserveFromCalendar = ({ currentUser }: any) => {
  const { id } = useParams();
  const [availability, setAvailability] = useState<ICaretakerAvailability[]>(
    []
  );
  const [value, setValue] = React.useState<Date | null>(null);
  const [advertDetails, setAdvertDetails] = React.useState<ICaretakerAdvert>();

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

  const [advertReservations, setAdvertReservations] = useState<
    IFixedReservation[]
  >([]);

  const reserving = true;

  useEffect(() => {
    async function getCaretakerAvailability() {
      const availabilityGet =
        await caretakerAdvertisementApi.getCaretakerAvailability(Number(id));
      setAvailability(availabilityGet);

      const mondayArray = FilterWeekDay(availabilityGet, "Mon");
      const tuesdayArray = FilterWeekDay(availabilityGet, "Tue");
      const wednesdayArray = FilterWeekDay(availabilityGet, "Wed");
      const thursdayArray = FilterWeekDay(availabilityGet, "Thu");
      const fridayArray = FilterWeekDay(availabilityGet, "Fri");
      const saturdayArray = FilterWeekDay(availabilityGet, "Sat");
      const sundayArray = FilterWeekDay(availabilityGet, "Sun");

      const advertReservations =
        await reservationApi.getConfirmedAdvertisementReservations(Number(id));
      const fixedReservations =
        CalendarFunctions.fixReservationTimes(advertReservations);
      setAdvertReservations(fixedReservations);

      const advert = await caretakerAdvertisementApi.getCaretakerAdvertisement(
        Number(id)
      );
      setAdvertDetails(advert);

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
      const sundInterval = [...sundayInterval];
      CalendarFunctions.filterExistingReservationsFromTImes(
        advertReservations,
        sundInterval,
        0,
        value
      );
      setCurrentInterval(sundInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 1) {
      const mondInterval = [...mondayInterval];
      CalendarFunctions.filterExistingReservationsFromTImes(
        advertReservations,
        mondInterval,
        1,
        value
      );
      setCurrentInterval(mondInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 2) {
      const tuesdInterval = [...tuesdayInterval];
      CalendarFunctions.filterExistingReservationsFromTImes(
        advertReservations,
        tuesdInterval,
        2,
        value
      );
      setCurrentInterval(tuesdInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 3) {
      console.log(`initial wednesdayInterval ${wednesdayInterval}`);
      const wednInterval = [...wednesdayInterval];
      CalendarFunctions.filterExistingReservationsFromTImes(
        advertReservations,
        wednInterval,
        3,
        value
      );
      console.log(`new wedneInterval ${wednInterval}`);

      setCurrentInterval(wednInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 4) {
      const thursInterval = [...thursdayInterval];
      CalendarFunctions.filterExistingReservationsFromTImes(
        advertReservations,
        thursInterval,
        4,
        value
      );
      setCurrentInterval(thursInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 5) {
      const fridInterval = [...fridayInterval];
      CalendarFunctions.filterExistingReservationsFromTImes(
        advertReservations,
        fridInterval,
        5,
        value
      );
      setCurrentInterval(fridInterval);
      setSelectInterval([]);
    }
    if (value?.getDay() === 6) {
      const satInterval = [...saturdayInterval];
      CalendarFunctions.filterExistingReservationsFromTImes(
        advertReservations,
        satInterval,
        6,
        value
      );
      setCurrentInterval(satInterval);
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
    // let reservations: IReservation[] = [];

    // function getValues(time: string, index: number) {
    //   reservations.push({
    //     date: value || new Date(),
    //     timeInterval: time,
    //     user_id: currentUser.id,
    //     advertisement_id: Number(id),
    //     status: "pending",
    //     description: reservationDescription,
    //   });
    // }
    // selectInterval.forEach(getValues);
    // let reservs = {
    //   reservations: reservations,
    // };

    const reservation: IReservation = {
      date: value || new Date(),
      timeInterval: selectInterval.toString(),
      user_id: currentUser.id,
      advertisement_id: Number(id),
      status: "pending",
      description: reservationDescription,
    };

    const result = await reservationApi.createReservations(reservation);
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
    minDate: advertDetails?.startDate,
    maxDate: advertDetails?.endDate,
  };

  return (
    <>
      <CaretakerCalendar reserving={reserving} currentUser={currentUser} />
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
