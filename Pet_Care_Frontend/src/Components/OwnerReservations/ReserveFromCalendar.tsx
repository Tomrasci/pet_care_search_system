import BookOnlineIcon from "@mui/icons-material/BookOnline";
import {
  Box,
  createTheme,
  Grid,
  SelectChangeEvent,
  Theme,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import reservationApi from "../../Api/reservationApi";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { ICaretakerAvailability } from "../../Interfaces/Caretaker/ICaretakerAvailability";
import { IFixedReservation } from "../../Interfaces/IFixedReservation";
import { IReservation } from "../../Interfaces/IReservation";
import { IReservationObject } from "../../Interfaces/IReservationObject";
import ButtonBase from "../../Utils/ButtonBase";
import CalendarFunctions from "../../Utils/CalendarFunctions";
import FilterWeekDay from "../../Utils/FilterWeekday";
import CaretakerCalendar from "../CaretakerAdvertisement/CaretakerCalendar";
import "../CaretakerAdvertisement/CaretakerCalendar.css";
import ReservationForm from "./ReservationForm";

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
  const theme = createTheme({
    palette: {
      primary: {
        main: "#793209",
      },
    },
  });

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
      const wednInterval = [...wednesdayInterval];
      CalendarFunctions.filterExistingReservationsFromTImes(
        advertReservations,
        wednInterval,
        3,
        value
      );

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

  const datata = value ? moment(value).toDate() : new Date();

  const handleReservation = async () => {
    const reservationDate = value ? moment(value).toDate() : new Date();
    const reservation: IReservation = {
      date: reservationDate,
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
      setValue(null);
      setReservationDescription("");
      setSelectInterval([]);
      setCurrentInterval([]);

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
      <ThemeProvider theme={theme}>
        <Grid
          container
          sx={{ mt: 5 }}
          justifyContent="center"
          display="flex"
          alignItems="center"
        >
          <Grid item md={1} sm={0}></Grid>
          <Grid item md={10} sm={12}>
            <ButtonBase
              title="Reservation creation"
              buttonText="Make reservation"
              buttonIcon={<BookOnlineIcon />}
              content={
                <ReservationForm reservationObject={reservationObject} />
              }
            />
          </Grid>
          <Grid item md={1} sm={0}></Grid>
        </Grid>
        <CaretakerCalendar reserving={reserving} currentUser={currentUser} />
        <Grid container sx={{ mt: 10 }} justifyContent="center">
          <ButtonBase
            title="Reservation creation"
            buttonText="Make reservation"
            buttonIcon={<BookOnlineIcon />}
            content={<ReservationForm reservationObject={reservationObject} />}
          />
        </Grid>
        <Box marginY={10}></Box>
      </ThemeProvider>
    </>
  );
};

export default ReserveFromCalendar;
