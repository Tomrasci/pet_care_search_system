import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "./CaretakerCalendar.css";
import { useEffect } from "react";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import { ICaretakerAvailability } from "../../Interfaces/Caretaker/ICaretakerAvailability";
import CalendarFunctions from "../../Utils/CalendarFunctions";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { IDatesTimesInterface } from "../../Interfaces/Caretaker/IDatesTimesInterface";
import { IEventAvailableInfo } from "../../Interfaces/Caretaker/IEventAvailableInfo";
import momentPlugin from "@fullcalendar/moment";
import reservationApi from "../../Api/reservationApi";
import { IFetchedReservation } from "../../Interfaces/IFetchedReservation";
import { IReservationEvent } from "../../Interfaces/Caretaker/IReservationEvent";

interface Props {
  reserving?: boolean;
}

const CaretakerCalendar = ({ reserving }: Props) => {
  const [availability, setAvailability] = useState<ICaretakerAvailability[]>(
    []
  );
  const [caretakerAdvertisement, setCaretakerAdvertisement] =
    useState<ICaretakerAdvert>();

  const [mondayDates, setMondayDates] = useState<string[]>([]);
  const [mondayTimes, setMondayTimes] = useState<ICaretakerAvailability[]>([]);
  const [mondayArray, setMondayArray] = useState<IEventAvailableInfo[]>([]);

  const [tuesdayDates, setTuesdayDates] = useState<string[]>([]);
  const [tuesdayTimes, setTuesdayTimes] = useState<ICaretakerAvailability[]>(
    []
  );
  const [tuesdayArray, setTuesdayArray] = useState<IEventAvailableInfo[]>([]);

  const [wednesdayDates, setWednesdayDates] = useState<string[]>([]);
  const [wednesdayTimes, setWednesdayTimes] = useState<
    ICaretakerAvailability[]
  >([]);
  const [wednesdayArray, setWednesdayArray] = useState<IEventAvailableInfo[]>(
    []
  );

  const [thursdayDates, setThursdayDates] = useState<string[]>([]);
  const [thursdayTimes, setThursdayTimes] = useState<ICaretakerAvailability[]>(
    []
  );
  const [thursdayArray, setThursdayArray] = useState<IEventAvailableInfo[]>([]);

  const [fridayDates, setFridayDates] = useState<string[]>([]);
  const [fridayTimes, setFridayTimes] = useState<ICaretakerAvailability[]>([]);
  const [fridayArray, setFridayArray] = useState<IEventAvailableInfo[]>([]);

  const [saturdayDates, setSaturdayDates] = useState<string[]>([]);
  const [saturdayTimes, setSaturdayTimes] = useState<ICaretakerAvailability[]>(
    []
  );
  const [saturdayArray, setSaturdayArray] = useState<IEventAvailableInfo[]>([]);

  const [sundayDates, setSundayDates] = useState<string[]>([]);
  const [sundayTimes, setSundayTimes] = useState<ICaretakerAvailability[]>([]);
  const [sundayArray, setSundayArray] = useState<IEventAvailableInfo[]>([]);

  const [advertReservations, setAdvertReservations] = useState<
    IReservationEvent[]
  >([]);

  const [events, setEvents] = useState<IEventAvailableInfo[]>([]);

  async function getCaretakerAvailability() {
    const cAvailablity =
      await caretakerAdvertisementApi.getCaretakerAvailability(31);
    setAvailability(cAvailablity);
    const cAdvertisement =
      await caretakerAdvertisementApi.getCaretakerAdvertisement(31);
    setCaretakerAdvertisement(cAdvertisement);

    const mondayDatez = CalendarFunctions.getAllSelectedDays(
      cAdvertisement?.startDate || new Date(),
      cAdvertisement?.endDate || new Date("2022-04-30"),
      1
    );
    setMondayDates(mondayDatez);
    const mondayTimez = CalendarFunctions.dayTimes("Mon", cAvailablity);
    setMondayTimes(mondayTimez);
    const mondayArray = CalendarFunctions.getAllDaysWithTimes(
      mondayDatez,
      mondayTimez,
      "Mon"
    );
    setMondayArray(mondayArray);

    const tuesdayDatez = CalendarFunctions.getAllSelectedDays(
      cAdvertisement?.startDate || new Date(),
      cAdvertisement?.endDate || new Date("2022-04-30"),
      2
    );
    setTuesdayDates(tuesdayDatez);
    const tuesdayTimez = CalendarFunctions.dayTimes("Tue", cAvailablity);
    setTuesdayTimes(tuesdayTimez);
    const tuesdayArray = CalendarFunctions.getAllDaysWithTimes(
      tuesdayDatez,
      tuesdayTimez,
      "Tue"
    );
    setTuesdayArray(tuesdayArray);

    const wednesdayDatez = CalendarFunctions.getAllSelectedDays(
      cAdvertisement?.startDate || new Date(),
      cAdvertisement?.endDate || new Date("2022-04-30"),
      3
    );
    setWednesdayDates(wednesdayDatez);
    const wednesdayTimez = CalendarFunctions.dayTimes("Wed", cAvailablity);
    setWednesdayTimes(wednesdayTimes);
    const wednesdayArray = CalendarFunctions.getAllDaysWithTimes(
      wednesdayDatez,
      wednesdayTimez,
      "Wed"
    );
    setWednesdayArray(wednesdayArray);

    const thursdayDatez = CalendarFunctions.getAllSelectedDays(
      cAdvertisement?.startDate || new Date(),
      cAdvertisement?.endDate || new Date("2022-04-30"),
      4
    );
    setThursdayDates(thursdayDatez);
    const thursdayTimez = CalendarFunctions.dayTimes("Thu", cAvailablity);
    setThursdayTimes(thursdayTimes);
    const thursdayArray = CalendarFunctions.getAllDaysWithTimes(
      thursdayDatez,
      thursdayTimez,
      "Thu"
    );
    setThursdayArray(thursdayArray);
    console.log(`thursday array is ${JSON.stringify(thursdayArray)}`);

    const fridayDatez = CalendarFunctions.getAllSelectedDays(
      cAdvertisement?.startDate || new Date(),
      cAdvertisement?.endDate || new Date("2022-04-30"),
      5
    );
    setFridayDates(fridayDatez);
    const fridayTimez = CalendarFunctions.dayTimes("Fri", cAvailablity);
    setFridayTimes(fridayTimez);
    const fridayArray = CalendarFunctions.getAllDaysWithTimes(
      fridayDatez,
      fridayTimez,
      "Fri"
    );
    setFridayArray(fridayArray);

    const saturdayDatez = CalendarFunctions.getAllSelectedDays(
      cAdvertisement?.startDate || new Date(),
      cAdvertisement?.endDate || new Date("2022-04-30"),
      6
    );
    setSaturdayDates(saturdayDatez);
    const saturdayTimez = CalendarFunctions.dayTimes("Sat", cAvailablity);
    setSaturdayTimes(saturdayTimez);
    const saturdayArray = CalendarFunctions.getAllDaysWithTimes(
      saturdayDatez,
      saturdayTimez,
      "Sat"
    );
    setSaturdayArray(saturdayArray);

    const sundayDatez = CalendarFunctions.getAllSelectedDays(
      cAdvertisement?.startDate || new Date(),
      cAdvertisement?.endDate || new Date("2022-04-30"),
      0
    );
    setSundayDates(sundayDatez);
    const sundayTimez = CalendarFunctions.dayTimes("Sun", cAvailablity);
    setSundayTimes(sundayTimez);
    const sundayArray = CalendarFunctions.getAllDaysWithTimes(
      sundayDatez,
      sundayTimez,
      "Sun"
    );
    setSundayArray(sundayArray);

    const getEvents = mondayArray
      .concat(tuesdayArray)
      .concat(wednesdayArray)
      .concat(thursdayArray)
      .concat(fridayArray)
      .concat(saturdayArray)
      .concat(sundayArray);
    setEvents(getEvents);

    const advertReservations =
      await reservationApi.getAdvertisementReservations(31);
    let eventReservations = null;
    if (reserving) {
      eventReservations =
        CalendarFunctions.makeReservationsToEventsForOwner(advertReservations);
    } else {
      eventReservations =
        CalendarFunctions.makeReservationsToEvents(advertReservations);
    }
    setAdvertReservations(eventReservations);
  }

  useEffect(() => {
    getCaretakerAvailability();
  }, []);

  return (
    events &&
    advertReservations && (
      <FullCalendar
        plugins={[
          daygridPlugin,
          timeGridPlugin,
          bootstrap5Plugin,
          momentPlugin,
        ]}
        initialView="timeGridWeek"
        themeSystem="bootstrap5"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        eventTimeFormat={{
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }}
        height="auto"
        locale={"en-GB"}
        allDaySlot={false}
        slotLabelFormat={{ hour12: false, hour: "2-digit", minute: "2-digit" }}
        eventSources={[events, advertReservations]}
      />
    )
  );
};

export default CaretakerCalendar;
