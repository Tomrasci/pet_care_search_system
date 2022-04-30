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

export const GridBreak = styled.div`
  width: 100%;
`;

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
    <Box marginY={5}>
      {advertDetails ? (
        <Box
          marginY={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
            Caretaker advertisements
          </Typography>
          <Box sx={{ mt: 5 }}></Box> */}
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
                    src={"http://localhost:3002/" + advertDetails.photo_link}
                    width="250"
                    height="150"
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
                    {advertDetails.age +
                      " " +
                      " years old." +
                      " " +
                      advertDetails.activity +
                      ". " +
                      advertDetails.day_price +
                      " eur per hour"}
                  </Typography>

                  <Box marginY={3}></Box>
                  <Typography color="inherit" sx={{ fontSize: 18 }}>
                    {advertDetails.description}
                  </Typography>
                  {advertDetails.extra_information ? (
                    <>
                      <Box marginY={3}></Box>
                      <Typography>{advertDetails.extra_information}</Typography>
                    </>
                  ) : (
                    ""
                  )}
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
                  return (
                    <>
                      <Box marginY={2}></Box>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <Typography>{service}</Typography>
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
                    Personal information
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                    Email: {currentUser.email}
                    <GridBreak />
                    <Box marginY={2}></Box>
                    Experience with pets: {advertDetails.experience}
                    <GridBreak />
                    <Box marginY={2}></Box>
                    Phone: {advertDetails.phone}
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
            {/* <Box sx={{ maxWidth: 1000 }} > */}
            <Typography color="inherit" sx={{ fontSize: 20, fontWeight: 600 }}>
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
            <Grid container item xs={12}>
              <Comments
                currentUser={currentUser}
                currentAdvertisement={advertDetails}
              />
              <Divider />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div>Loading</div>
      )}
    </Box>
  );
};

export default CaretakerAdvertisement;
