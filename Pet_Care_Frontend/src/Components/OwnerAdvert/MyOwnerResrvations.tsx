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
import { ICurrentUser } from "../../Interfaces/User/ICurrentUser";
import moment from "moment";

export default function OwnerReservations({
  currentUser,
}: {
  currentUser: ICurrentUser;
}) {
  const [ownerReservations, setOwnerReservations] = useState<
    IFetchedReservation[]
  >([]);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    async function getReservations() {
      let ownerReservs = null;
      if (currentUser) {
        ownerReservs = await reservationApi.getOwnerReservations(
          currentUser.id
        );
      }
      setOwnerReservations(ownerReservs);
    }
    getReservations();
  }, [refetch]);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,

      type: "date",
      valueFormatter: (value) => moment(value.value).format("YYYY-MM-DD"),
    },
    {
      field: "time_intervals",
      headerName: "Time",
      flex: 2,
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
  ];

  return ownerReservations && ownerReservations.length ? (
    <Box marginY={5} sx={{ width: 1 }}>
      <Typography variant="h4" align="center">
        Reservations list
      </Typography>
      <Box marginY={2}></Box>
      <Card elevation={1}>
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={ownerReservations}
              columns={columns}
              getRowId={(row) => row.id}
              pageSize={50}
              disableSelectionOnClick
              autoHeight
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  ) : (
    <Box marginY={15} alignItems="center" justifyContent="center">
      <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
        You don't have any reservations yet
      </Typography>
      <Box sx={{ minHeight: 300 }}></Box>
    </Box>
  );
}
