import CancelIcon from "@mui/icons-material/Cancel";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  createTheme,
  Grid,
  ThemeProvider,
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

  const checkColumnHideConfirm = (id: any) => {
    const reservation = advertReservations.find((r) => r.id === Number(id));
    if (reservation && reservation.status === "confirmed") {
      return true;
    }
    return false;
  };

  const checkColumnHideCancel = (id: any) => {
    const reservation = advertReservations.find((r) => r.id === Number(id));
    if (reservation && reservation.status === "cancelled") {
      return true;
    }
    return false;
  };

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      minWidth: 100,
      type: "date",
      valueFormatter: (value) => moment(value.value).format("YYYY-MM-DD"),
    },
    {
      field: "time_intervals",
      headerName: "Reserved times",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "user_email",
      headerName: "User",
      flex: 1,
      minWidth: 200,
    },

    {
      field: "created_at",
      headerName: "Date and time created",
      flex: 1,
      minWidth: 200,
      type: "dateTime",
      valueFormatter: (value) =>
        moment(value.value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "status",
      headerName: "Reservation status",
      flex: 1,
      minWidth: 100,
    },

    {
      field: "id",
      minWidth: 250,
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
              disabled={checkColumnHideConfirm(params.id)}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<CancelIcon />}
              onClick={() => handleReservationCancel(Number(`${params.id}`))}
              disabled={checkColumnHideCancel(params.id)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  return advertReservations && advertReservations.length ? (
    <Box marginY={5} sx={{ width: 1 }}>
      <Typography variant="h4" fontWeight={500} color="#793209" align="center">
        Reservation list
      </Typography>
      <Box marginY={2}></Box>

      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={10}>
          <DataGrid
            sx={{
              borderColor: "#793209",
              borderWidth: 2,
              borderBottomColor: "#793209",
              overflow: "visible",
            }}
            rows={advertReservations}
            columns={columns}
            getRowId={(row) => row.id}
            disableSelectionOnClick
          />
        </Grid>
      </Grid>
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
