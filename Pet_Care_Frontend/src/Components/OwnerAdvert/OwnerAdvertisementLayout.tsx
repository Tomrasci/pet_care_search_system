import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ownerAdverisementApi from "../../Api/ownerAdverisementApi";
import { IOwnerAdvert } from "../../Interfaces/Owner/IOwnerAdvert";
import { ICurrentUser } from "../../Interfaces/User/ICurrentUser";
import "../CaretakerAdvertisement/CaretakerAdvertList.css";

export const GridBreak = styled.div`
  width: 100%;
`;

const OwnerAdvertisement = ({ currentUser }: { currentUser: ICurrentUser }) => {
  const [advertDetails, setAdvertDetails] = useState<IOwnerAdvert>();
  const { id } = useParams();

  useEffect(() => {
    const getAdvert = async () => {
      const advert = await ownerAdverisementApi.getOwnerAdvertisement(
        Number(id)
      );
      setAdvertDetails(advert);
    };
    getAdvert();
  }, []);

  return (
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
                    src={"http://localhost:3002/" + advertDetails.photo_link}
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
                    {advertDetails.hour_price + " eur per hour"}
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
                    Looking for services
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
                    Need to take care of pets
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
                    Looking for a person speaking language(s)
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
                    Phone: {advertDetails.phone}
                    {advertDetails.extra_information ? (
                      <>
                        <GridBreak />
                        <Box marginY={2}></Box>
                        Extra information: {advertDetails.extra_information}
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
              <Grid item xs={6}>
                <Typography
                  color="inherit"
                  sx={{ fontSize: 20, fontWeight: 600 }}
                >
                  Required for date(s) and time(s)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {advertDetails.endDate ? (
                  <Typography>
                    Date:
                    {" " +
                      new Date(advertDetails.startDate).toDateString() +
                      " " +
                      " - " +
                      new Date(advertDetails.endDate).toDateString()}
                  </Typography>
                ) : (
                  <Typography>
                    Date:
                    {" " + new Date(advertDetails.startDate).toDateString()}
                  </Typography>
                )}
                <GridBreak />
                Time(s):
                {advertDetails.time_intervals.map((time) => {
                  return <Typography>{time}</Typography>;
                })}
              </Grid>
            </Grid>
            <Box marginY={2}></Box>
            <Divider
              style={{ color: "#793209" }}
              sx={{ borderBottomWidth: 3 }}
            />
          </Grid>
        </Box>
      ) : (
        <div>Loading</div>
      )}
    </Box>
  );
};

export default OwnerAdvertisement;
