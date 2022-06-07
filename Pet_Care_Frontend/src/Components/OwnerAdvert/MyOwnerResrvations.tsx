import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import reservationApi from "../../Api/reservationApi";
import { IFetchedReservation } from "../../Interfaces/IFetchedReservation";
import { ICurrentUser } from "../../Interfaces/User/ICurrentUser";

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
  }, [refetch, currentUser]);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 100,
      type: "date",
      valueFormatter: (value) => moment(value.value).format("YYYY-MM-DD"),
    },
    {
      field: "time_intervals",
      headerName: "Time",
      flex: 2,
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
  ];

  return ownerReservations && ownerReservations.length ? (
    <Box marginY={5} sx={{ width: 1 }}>
      <Typography variant="h4" fontWeight={500} color="#793209" align="center">
        Reservations list
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
            rows={ownerReservations}
            columns={columns}
            getRowId={(row) => row.id}
            disableSelectionOnClick
            autoHeight
          />
        </Grid>
      </Grid>
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
