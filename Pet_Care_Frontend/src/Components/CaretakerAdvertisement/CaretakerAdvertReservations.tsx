import CancelIcon from "@mui/icons-material/Cancel";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import reservationApi from "../../Api/reservationApi";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { IFetchedReservation } from "../../Interfaces/IFetchedReservation";
import { ICurrentUser } from "../../Interfaces/User/ICurrentUser";

export default function ReservationsTable({
  currentUser,
}: {
  currentUser: ICurrentUser;
}) {
  const [advertReservations, setAdvertReservations] = useState<
    IFetchedReservation[]
  >([]);
  const [advertDetails, setAdvertDetails] = useState<ICaretakerAdvert>();
  const [refetch, setRefetch] = useState(true);

  const handleReservationConfirm = async (id: number) => {
    const result = await reservationApi.confirmReservation(id);
    if (result.status !== 200) {
      toast.error("Reservation confirmation failed");
    } else {
      setRefetch(!refetch);
      toast.success("Reservation was confirmed successfully!");
    }
  };

  const handleReservationCancel = async (id: number) => {
    const result = await reservationApi.cancelReservation(id);
    if (result.status !== 200) {
      toast.error("Reservation cancel failed");
    } else {
      setRefetch(!refetch);
      toast.success("Reservation was cancelled successfully!");
    }
  };
  useEffect(() => {
    async function getAdvertDetails() {
      const advert: ICaretakerAdvert =
        await caretakerAdvertisementApi.getUserCaretakerAdvertisement(
          currentUser.id
        );
      setAdvertDetails(advert);
    }
    getAdvertDetails();
  }, []);

  useEffect(() => {
    async function getReservations() {
      let advertReservs = null;
      if (advertDetails) {
        advertReservs =
          await reservationApi.getAdvertisementReservationsWithUser(
            advertDetails.id
          );
      }
      setAdvertReservations(advertReservs);
    }
    getReservations();
  }, [advertDetails, refetch]);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",

      type: "date",
      valueFormatter: (value) => moment(value.value).format("YYYY-MM-DD"),
    },
    {
      field: "time_intervals",
      headerName: "Reserved times",
      flex: 2,
    },
    {
      field: "user_email",
      headerName: "User",
      flex: 1,
    },

    {
      field: "created_at",
      headerName: "Date created",
      flex: 1,
      type: "dateTime",
      valueFormatter: (value) =>
        moment(value.value).format("YYYY-MM-DD HH:mm:ss"),
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
              Confirm
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

  return advertReservations && advertReservations.length ? (
    <Box marginY={5}>
      <Typography variant="h4" align="center">
        Reservations list
      </Typography>
      <Box marginY={2}></Box>

      {/* <Box sx={{ width: "100%" }}> */}
      <Grid container alignItems="center" justifyContent="center">
        <Grid item md={10} xs={12}>
          <DataGrid
            rows={advertReservations}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={50}
            disableSelectionOnClick
            autoHeight
          />
        </Grid>
      </Grid>
      {/* </Box> */}
    </Box>
  ) : (
    <Box marginY={15} alignItems="center" justifyContent="center">
      <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
        Your advertisement does not have any reservations yet
      </Typography>
      <Box sx={{ minHeight: 300 }}></Box>
    </Box>
  );
}
