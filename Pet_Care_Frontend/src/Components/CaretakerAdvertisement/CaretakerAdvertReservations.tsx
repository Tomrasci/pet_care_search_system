import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IReservation } from "../../Interfaces/IReservation";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import reservationApi from "../../Api/reservationApi";
import { IFetchedReservation } from "../../Interfaces/IFetchedReservation";
import CancelIcon from "@mui/icons-material/Cancel";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import styles from "./caretakerReservations.module.css";

export default function ReservationsTable() {
  const [advertReservations, setAdvertReservations] = useState<
    IFetchedReservation[]
  >([]);
  const [advertDetails, setAdvertDetails] = useState<ICaretakerAdvert>();
  useEffect(() => {
    async function getAdvertDetailsAndReservations() {
      const advert: ICaretakerAdvert =
        await caretakerAdvertisementApi.getCaretakerAdvertisement(31);
      setAdvertDetails(advert);
      const advertReservations =
        await reservationApi.getAdvertisementReservations(advert.id);
      setAdvertReservations(advertReservations);
    }
    getAdvertDetailsAndReservations();
  }, []);

  const handleReservationConfirm = async (id: number) => {
    console.log("CLICKED");
    const result = await reservationApi.confirmReservation(id);
    console.log(`result.status is ${result.status}`);
    if (result.status !== 200) {
      toast.error("Reservation confirmation failed");
    } else {
      toast.success("Reservation was confirmed successfully!");
    }
  };

  const handleReservationCancel = async (id: number) => {
    const result = await reservationApi.cancelReservation(id);
    if (result.status !== 200) {
      toast.error("Reservation cancel failed");
    } else {
      toast.success("Reservation was cancelled successfully!");
    }
  };

  console.log("HELLO");

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      type: "date",
      valueFormatter: (value) =>
        new Date(value.value as string).toLocaleDateString(),
    },
    {
      field: "startTime",
      headerName: "Start Time",
      flex: 1,
    },
    {
      field: "endTime",
      headerName: "End Time",
      flex: 1,
    },
    // {
    //   field: "user_id",
    //   headerName: "User ID",
    //   flex: 1,
    // },
    // {
    //   field: "advertisement_id",
    //   headerName: "Advertisement ID",
    //   flex: 1,
    // },
    {
      field: "created_at",
      headerName: "Date created",
      flex: 2,
      type: "dateTime",
      valueFormatter: (value) =>
        new Date(value.value as string).toLocaleString(),
    },
    {
      field: "status",
      headerName: "Reservation status",
      flex: 1,
    },

    {
      field: "id",
      flex: 1,
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <ButtonGroup size="small">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleReservationConfirm(Number(`${params.id}`))}
              startIcon={<ThumbUpAltIcon />}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<CancelIcon />}
              onClick={() => handleReservationCancel(Number(`${params.id}`))}
            >
              Cancel
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    advertReservations && (
      <Box sx={{ width: 1 }}>
        <Typography variant="h4" align="center">
          Reservations list
        </Typography>
        <Card elevation={1}>
          <CardContent>
            <div style={{ height: 700, width: "100%" }}>
              <DataGrid
                rows={advertReservations}
                columns={columns}
                getRowId={(row) => row.id}
                pageSize={50}
                disableSelectionOnClick
              />
            </div>
          </CardContent>
        </Card>
      </Box>
    )
  );
}
