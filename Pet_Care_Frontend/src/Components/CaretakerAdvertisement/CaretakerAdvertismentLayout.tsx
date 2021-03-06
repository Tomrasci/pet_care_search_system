import React, { useEffect } from "react";
import { useState } from "react";
import caretakerAdvertisementApi from "../../Api/caretakerAdvertisementApi";
import { ICaretakerAdvert } from "../../Interfaces/Caretaker/ICaretakerAdvert";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { ICurrentUser } from "../../Interfaces/User/ICurrentUser";
import Comments from "./Comments";
import "./CommentStyles.css";
import "./CaretakerAdvertList.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const GridBreak = styled.div`
  width: 100%;
`;
const theme = createTheme({
  palette: {
    primary: {
      main: "#793209",
    },
  },
});

const CaretakerAdvertisement = ({
  currentUser,
}: {
  currentUser: ICurrentUser;
}) => {
  const [advertDetails, setAdvertDetails] = useState<ICaretakerAdvert>();
  const { id } = useParams();

  useEffect(() => {
    const getAdvert = async () => {
      const advert = await caretakerAdvertisementApi.getCaretakerAdvertisement(
        Number(id)
      );
      setAdvertDetails(advert);
    };
    getAdvert();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box marginY={5}>
          {advertDetails ? (
            <Box
              marginY={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                container
                direction="column"
                display="flex"
                justifyContent="center"
                sx={{ maxWidth: 1000 }}
              >
                <Box sx={{ maxWidth: 1000 }}>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Grid
                      container
                      item
                      xs={12}
                      md={6}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        className="cardImage"
                        src={
                          "http://localhost:3002/" + advertDetails.photo_link
                        }
                        width="250"
                        height="250"
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                      xs={12}
                      md={6}
                    >
                      <Typography
                        color="inherit"
                        sx={{ fontSize: 24, fontWeight: 600 }}
                      >
                        {advertDetails.name + " " + advertDetails.surname}
                      </Typography>

                      <GridBreak />

                      <Typography sx={{ fontSize: 14 }}>
                        {advertDetails.activity +
                          ". " +
                          advertDetails.hour_price +
                          " eur per hour."}
                      </Typography>

                      <Box marginY={3}></Box>
                      <Grid
                        item
                        container
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                        xs={12}
                      >
                        <Typography color="inherit" sx={{ fontSize: 18 }}>
                          {advertDetails.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Box marginY={2}></Box>
                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>

                <Box sx={{ maxWidth: 1000 }}>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Grid item xs={6}>
                      <Typography
                        color="inherit"
                        sx={{ fontSize: 20, fontWeight: 600 }}
                      >
                        Caretaker available services
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        color="inherit"
                        sx={{ fontSize: 16, fontWeight: 600 }}
                      >
                        Service
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container>
                    {advertDetails.services.map((service) => {
                      const labelText =
                        service === "Owner_house_sitting"
                          ? "Owner house sitting"
                          : service === "Medication_giving"
                          ? "Medication giving"
                          : service === "Caretaker_house_sitting"
                          ? "Caretaker house sitting"
                          : service;
                      return (
                        <>
                          <Box marginY={2}></Box>
                          <Grid item xs={6}></Grid>
                          <Grid item xs={6}>
                            <Typography>{labelText}</Typography>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Box>
                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>

                <Box sx={{ maxWidth: 1000 }}>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Grid item xs={6}>
                      <Typography
                        color="inherit"
                        sx={{ fontSize: 20, fontWeight: 600 }}
                      >
                        Available care of pets
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        color="inherit"
                        sx={{ fontSize: 16, fontWeight: 600 }}
                      >
                        Pet
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container>
                    {advertDetails.pets.map((pet) => {
                      return (
                        <>
                          <Box marginY={2}></Box>
                          <Grid item xs={6}></Grid>
                          <Grid item xs={6}>
                            <Typography>{pet}</Typography>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Box>
                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>
                <Box sx={{ maxWidth: 1000 }}>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Grid item xs={6}>
                      <Typography
                        color="inherit"
                        sx={{ fontSize: 20, fontWeight: 600 }}
                      >
                        Languages
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        color="inherit"
                        sx={{ fontSize: 16, fontWeight: 600 }}
                      >
                        Language
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {advertDetails.languages.map((language) => {
                      return (
                        <>
                          <Box marginY={2}></Box>
                          <Grid item xs={6}></Grid>
                          <Grid item xs={6}>
                            <Typography>{language}</Typography>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Box>
                <Box marginY={2}></Box>

                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>
                <Box sx={{ maxWidth: 1000 }}>
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Grid item xs={6}>
                      <Typography
                        color="inherit"
                        sx={{ fontSize: 20, fontWeight: 600 }}
                      >
                        Other information
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                        Experience with pets: {advertDetails.experience}
                        <GridBreak />
                        <Box marginY={2}></Box>
                        Phone: {advertDetails.phone}
                        {advertDetails.extra_information ? (
                          <>
                            <GridBreak />
                            <Box marginY={2}></Box>
                            <Grid item xs={12}>
                              Extra information:
                              {advertDetails.extra_information}
                            </Grid>
                          </>
                        ) : (
                          ""
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box marginY={2}></Box>

                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>
                <Typography
                  color="inherit"
                  sx={{ fontSize: 20, fontWeight: 600 }}
                >
                  Schedule/Time reservation
                </Typography>
                <Grid
                  container
                  item
                  xs={12}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={"/ReserveFromCalendar/" + advertDetails.id}
                  >
                    <Button
                      style={{ minHeight: 60, fontSize: 20 }}
                      variant="contained"
                    >
                      Check schedule and reserve
                    </Button>
                  </Link>
                </Grid>
                <Box marginY={2}></Box>
                <Divider
                  style={{ color: "#793209" }}
                  sx={{ borderBottomWidth: 3 }}
                />
                <Box marginY={2}></Box>
                <Grid
                  container
                  item
                  xs={12}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    color="inherit"
                    sx={{ fontSize: 25, fontWeight: 600 }}
                  >
                    Advertisement comments
                  </Typography>
                </Grid>
                <Box marginY={2}></Box>
                <Grid item xs={12}>
                  <Comments
                    currentUser={currentUser}
                    currentAdvertisement={advertDetails}
                    isOwnerView={true}
                  />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <div>Loading</div>
          )}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default CaretakerAdvertisement;
